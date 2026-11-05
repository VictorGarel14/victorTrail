# Jumeau local : retrouve dans mes sorties autour de Nice les portions qui reproduisent
# le profil de chaque section de mes courses.
# usage : python3 twin.py <site> [fichiers .fit ou dossiers ...]
#   - ajoute les sorties .fit à build/twin-lib.json (bibliothèque persistante, zone privée masquée)
#   - lit <site>/courses/*.json et écrit <site>/twin.json
import sys, os, json, math, glob, warnings
warnings.filterwarnings('ignore')
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__)) + '/'
SITE = sys.argv[1].rstrip('/') + '/'
LIB = HERE + 'twin-lib.json'
STEP = 50.0           # m entre deux points rééchantillonnés
PRIV = 1000.0         # m masqués autour de chaque départ / arrivée
REF = (43.7034, 7.2663)  # Nice centre (place Masséna) pour les distances d'accès
N = 25                # points de comparaison par section

def hav(a, b, c, d):
    R = 6371000.0
    p1, p2 = math.radians(a), math.radians(c)
    dp, dl = p2 - p1, math.radians(d - b)
    x = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(x))

def smooth(v, w):
    if len(v) < w: return v
    k = np.ones(w) / w
    p = np.pad(v, (w // 2, w // 2), mode='edge')
    return np.convolve(p, k, mode='valid')[:len(v)]

def resample(dist, cols):
    dist = np.asarray(dist, float)
    g = np.arange(0, dist[-1], STEP)
    return g, [np.interp(g, dist, np.asarray(c, float)) for c in cols]

# ---------------- lecture des FIT ----------------
def read_fit(path):
    import fitdecode
    R = []
    sport = None
    for m in fitdecode.FitReader(path):
        if not isinstance(m, fitdecode.FitDataMessage): continue
        if m.name == 'session':
            try: sport = m.get_value('sport')
            except Exception: pass
        if m.name != 'record': continue
        d = {f.name: f.value for f in m.fields}
        la, lo = d.get('position_lat'), d.get('position_long')
        el = d.get('enhanced_altitude', d.get('altitude'))
        ts, ds = d.get('timestamp'), d.get('distance')
        if la is None or lo is None or el is None or ts is None or ds is None: continue
        R.append((ts.timestamp(), ds, la * 180 / 2 ** 31, lo * 180 / 2 ** 31, el))
    if len(R) < 50: return None
    R.sort()
    # distance strictement croissante
    out = [R[0]]
    for r in R[1:]:
        if r[1] > out[-1][1]: out.append(r)
    R = out
    t = [r[0] for r in R]; ds = [r[1] for r in R]
    g, (la, lo, el, tt) = resample(ds, [[r[2] for r in R], [r[3] for r in R], [r[4] for r in R], t])
    el = smooth(el, 5)
    t0 = t[0]
    # temps en mouvement cumulé (on retire les arrêts : < 0,3 m/s)
    mv = np.zeros(len(g))
    for i in range(1, len(g)):
        dt = tt[i] - tt[i - 1]
        mv[i] = mv[i - 1] + (dt if dt > 0 and STEP / dt >= 0.3 else min(dt, STEP / 0.8) if dt > 0 else 0)
    # zone privée : départ et arrivée
    s, e = (la[0], lo[0]), (la[-1], lo[-1])
    keep = np.array([hav(la[i], lo[i], *s) > PRIV and hav(la[i], lo[i], *e) > PRIV for i in range(len(g))])
    import datetime
    day = datetime.datetime.fromtimestamp(t0 + 3600, datetime.timezone.utc).strftime('%Y-%m-%d')
    return {
        'id': str(int(t0)), 'date': day, 'km': round(float(g[-1]) / 1000, 2),
        'sport': str(sport or ''),
        'la': [round(float(x), 5) if k else None for x, k in zip(la, keep)],
        'lo': [round(float(x), 5) if k else None for x, k in zip(lo, keep)],
        'el': [round(float(x), 1) if k else None for x, k in zip(el, keep)],
        'mv': [int(x) for x in mv],
        'start': [round(s[0], 3), round(s[1], 3)],
    }

def load_lib():
    if os.path.exists(LIB): return json.load(open(LIB))
    return {'v': 1, 'acts': {}}

def add_fits(lib, paths):
    n = 0
    files = []
    for p in paths:
        if os.path.isdir(p): files += glob.glob(p.rstrip('/') + '/*.fit') + glob.glob(p.rstrip('/') + '/*.bin')
        elif os.path.isfile(p): files.append(p)
    for f in files:
        try: a = read_fit(f)
        except Exception as ex:
            print('illisible', f, ex); continue
        if not a: continue
        # on garde les sorties à moins de 120 km de Nice (pas les voyages)
        if hav(a['start'][0], a['start'][1], *REF) > 120000: continue
        # on ne garde que les sorties qui ont du relief
        el = np.array([x for x in a['el'] if x is not None])
        if len(el) < 20: continue
        dpos = np.clip(np.diff(el), 0, None).sum()
        if dpos < 150: continue
        a['dp'] = int(dpos)
        del a['start']
        if a['id'] not in lib['acts']: n += 1
        lib['acts'][a['id']] = a
    return n

# ---------------- sections de course ----------------
def course_track(c):
    P = c['pts']
    km = np.array([p[2] for p in P]) * 1000
    g, (la, lo, el) = resample(km, [[p[0] for p in P], [p[1] for p in P], [p[3] for p in P]])
    return g, la, lo, smooth(el, 5)

def split_sections(g, el, H=50.0, min_len=700):
    # points de bascule montée/descente avec hystérésis H (zigzag)
    piv = [0]; trend = 0; hi = lo_ = 0
    for i in range(1, len(el)):
        if trend == 0:
            if el[i] > el[hi]: hi = i
            if el[i] < el[lo_]: lo_ = i
            if el[hi] - el[lo_] > H:
                trend = 1 if hi > lo_ else -1
                first = lo_ if trend == 1 else hi
                if first != 0: piv.append(first)
                ext = hi if trend == 1 else lo_
            continue
        if trend == 1:
            if el[i] >= el[ext]: ext = i
            elif el[ext] - el[i] > H: piv.append(ext); trend = -1; ext = i
        else:
            if el[i] <= el[ext]: ext = i
            elif el[i] - el[ext] > H: piv.append(ext); trend = 1; ext = i
    if piv[-1] != len(el) - 1: piv.append(len(el) - 1)
    S = []
    for a, b in zip(piv, piv[1:]):
        L = g[b] - g[a]
        dz = el[b] - el[a]
        S.append([a, b, L, dz])
    # fusion des morceaux trop courts dans le voisin
    changed = True
    while changed and len(S) > 1:
        changed = False
        for i, s in enumerate(S):
            if s[2] < min_len:
                j = i - 1 if i > 0 else i + 1
                lo_, hi_ = sorted([i, j])
                a, b = S[lo_][0], S[hi_][1]
                S[lo_:hi_ + 1] = [[a, b, g[b] - g[a], el[b] - el[a]]]
                changed = True
                break
    out = []
    for a, b, L, dz in S:
        seg = el[a:b + 1]
        up = float(np.clip(np.diff(seg), 0, None).sum()); dn = float(-np.clip(np.diff(seg), None, 0).sum())
        gr = dz / L * 100 if L else 0
        kind = 'montee' if gr >= 4 else 'descente' if gr <= -4 else 'roulant'
        out.append({'a': a, 'b': b, 'k0': round(g[a] / 1000, 2), 'k1': round(g[b] / 1000, 2), 'L': L, 'dz': dz,
                    'up': round(up), 'dn': round(dn), 'gr': round(gr, 1), 'kind': kind})
    return out

# ---------------- comparaison ----------------
def prep_acts(lib):
    A = []
    for a in lib['acts'].values():
        el = np.array([np.nan if x is None else x for x in a['el']], float)
        la = np.array([np.nan if x is None else x for x in a['la']], float)
        lo = np.array([np.nan if x is None else x for x in a['lo']], float)
        A.append((a, el, la, lo, np.array(a['mv'], float)))
    return A

def match(prof, L, A, top=3, scales=(0.85, 0.92, 1.0, 1.08, 1.15), ud=None, tk=(12.0, 0.10)):
    """prof : altitudes relatives de la section (N points), L : longueur (m).
    ud : (D+, D-) à respecter (blocs longs). Classement : ressemblance x proximité de Nice."""
    rng = float(prof.max() - prof.min())
    tol = tk[0] + tk[1] * rng
    cand = []
    for a, el, la, lo, mv in A:
        n = len(el)
        for rev in (False, True):
            E = el[::-1] if rev else el
            nanc = np.concatenate([[0], np.cumsum(np.isnan(E))])
            dE = np.nan_to_num(np.diff(E))
            cu = np.concatenate([[0], np.cumsum(np.clip(dE, 0, None))])
            cd = np.concatenate([[0], np.cumsum(-np.clip(dE, None, 0))])
            for s in scales:
                w = int(round(L * s / STEP))
                if w < 4 or w >= n: continue
                starts = np.arange(0, n - w)
                offs = np.round(np.linspace(0, w, N)).astype(int)
                idx = starts[:, None] + offs[None, :]
                ok = (nanc[starts + w + 1] - nanc[starts]) == 0
                if not ok.any(): continue
                X = E[idx]
                X = X - X[:, :1]
                with np.errstate(all='ignore'):
                    err = np.sqrt(np.mean((X - prof[None, :]) ** 2, axis=1))
                err[~ok] = np.inf
                sc = np.exp(-0.5 * (err / tol) ** 2) * math.exp(-0.5 * (math.log(s) / 0.15) ** 2)
                if ud:
                    uw = cu[starts + w] - cu[starts]; dw = cd[starts + w] - cd[starts]
                    sc = sc * np.exp(-0.5 * ((uw - ud[0]) / (0.12 * ud[0] + 30)) ** 2) * np.exp(-0.5 * ((dw - ud[1]) / (0.12 * ud[1] + 30)) ** 2)
                order = np.argsort(-sc)[:40]
                for i in order:
                    if sc[i] < 0.3: break
                    i0, i1 = int(starts[i]), int(starts[i] + w)
                    if rev: i0, i1 = n - 1 - i1, n - 1 - i0
                    m = (i0 + i1) // 2
                    dist = hav(la[m], lo[m], *REF) / 1000 if not np.isnan(la[m]) else 50
                    cand.append((float(sc[i]) * math.exp(-dist / 150), float(sc[i]), float(err[i]), a, i0, i1, rev))
    cand.sort(key=lambda x: -x[0])
    res = []
    for rk, sc, err, a, i0, i1, rev in cand:
        laa = a['la'][i0:i1 + 1]; loo = a['lo'][i0:i1 + 1]
        mid = (laa[len(laa) // 2], loo[len(loo) // 2])
        if any(hav(mid[0], mid[1], *r['mid']) < 600 for r in res): continue
        res.append({'sc': sc, 'err': err, 'a': a, 'i0': i0, 'i1': i1, 'rev': rev, 'mid': mid})
        if len(res) >= top: break
    return res

def desc(r, A_el):
    a = r['a']; i0, i1 = r['i0'], r['i1']
    el = [x for x in a['el'][i0:i1 + 1]]
    la = a['la'][i0:i1 + 1]; lo = a['lo'][i0:i1 + 1]
    if r['rev']: el, la, lo = el[::-1], la[::-1], lo[::-1]
    d = np.diff(np.array(el, float))
    mv = a['mv']
    t = abs(mv[i1] - mv[i0])
    # tracé simplifié pour la carte (un point sur 2, max 160)
    st = max(1, len(la) // 160)
    pts = [[la[k], lo[k], round(el[k])] for k in range(0, len(la), st)]
    if pts[-1][0] != la[-1]: pts.append([la[-1], lo[-1], round(el[-1])])
    return {
        'act': a['id'], 'date': a['date'], 'actKm': a['km'],
        'k0': round(i0 * STEP / 1000, 1), 'k1': round(i1 * STEP / 1000, 1),
        'L': round((i1 - i0) * STEP / 1000, 2), 'up': int(np.clip(d, 0, None).sum()), 'dn': int(-np.clip(d, None, 0).sum()),
        'rev': r['rev'], 'pct': int(round(r['sc'] * 100)), 'err': int(round(r['err'])),
        'min': None if r['rev'] else int(round(t / 60)),
        'from': round(hav(la[0], lo[0], *REF) / 1000, 1),
        'pts': pts,
    }

def run_course(cid, c, A):
    g, la, lo, el = course_track(c)
    secs = split_sections(g, el)
    out = []
    for s in secs:
        a, b = s['a'], s['b']
        offs = np.round(np.linspace(a, b, N)).astype(int)
        prof = el[offs] - el[a]
        M = match(prof, s['L'], A) if A else []
        out.append({'k0': s['k0'], 'k1': s['k1'], 'L': round(s['L'] / 1000, 2), 'up': s['up'], 'dn': s['dn'],
                    'gr': s['gr'], 'kind': s['kind'], 'prof': [round(float(x)) for x in prof],
                    'm': [desc(r, None) for r in M]})
    # blocs entre points de passage (répétition générale)
    blocks = []
    cps = [0.0] + [p['km'] for p in c.get('cps', []) if p.get('km')]
    cps = sorted(set(round(x, 2) for x in cps + [c['km']]))
    names = {round(p['km'], 2): p['nm'] for p in c.get('cps', []) if p.get('km')}
    for k0, k1 in zip(cps, cps[1:]):
        a, b = int(k0 * 1000 / STEP), min(len(g) - 1, int(k1 * 1000 / STEP))
        if b - a < 20: continue
        offs = np.round(np.linspace(a, b, N)).astype(int)
        prof = el[offs] - el[a]
        seg = el[a:b + 1]
        uu = float(np.clip(np.diff(seg), 0, None).sum()); dd = float(-np.clip(np.diff(seg), None, 0).sum())
        M = match(prof, g[b] - g[a], A, top=2, scales=(0.8, 0.9, 1.0, 1.1, 1.2), ud=(uu, dd), tk=(30.0, 0.25)) if A else []
        blocks.append({'k0': k0, 'k1': k1, 'to': names.get(round(k1, 2), 'Arrivée'), 'from': names.get(round(k0, 2), 'Départ'),
                       'L': round((g[b] - g[a]) / 1000, 1), 'up': int(np.clip(np.diff(seg), 0, None).sum()),
                       'dn': int(-np.clip(np.diff(seg), None, 0).sum()), 'prof': [round(float(x)) for x in prof],
                       'm': [desc(r, None) for r in M]})
    # couverture : part du parcours (en km et en D+) avec un jumeau à 75 % ou plus
    good = [s for s in out if s['m'] and s['m'][0]['pct'] >= 75]
    totL = sum(s['L'] for s in out) or 1
    totU = sum(s['up'] for s in out) or 1
    cov = {'km': round(100 * sum(s['L'] for s in good) / totL), 'dp': round(100 * sum(s['up'] for s in good) / totU)}
    return {'secs': out, 'blocks': blocks, 'cov': cov}

def main():
    lib = load_lib()
    n = add_fits(lib, sys.argv[2:])
    json.dump(lib, open(LIB, 'w'), separators=(',', ':'))
    A = prep_acts(lib)
    res = {'n': len(lib['acts']), 'courses': {}}
    for f in sorted(glob.glob(SITE + 'courses/*.json')):
        cid = os.path.basename(f)[:-5]
        res['courses'][cid] = run_course(cid, json.load(open(f)), A)
    json.dump(res, open(SITE + 'twin.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    print('jumeau : %d sorties (+%d), %s' % (len(lib['acts']), n, {k: v['cov'] for k, v in res['courses'].items()}))

if __name__ == '__main__':
    main()
