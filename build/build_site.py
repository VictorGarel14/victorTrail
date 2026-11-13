# usage : python3 build_site.py <data.json> <state.json> <dossier du site>
import json,shutil,os,sys
DATA,STATE,OUT=sys.argv[1],sys.argv[2],sys.argv[3].rstrip('/')+'/'
HERE=os.path.dirname(os.path.abspath(__file__))+'/'
d=json.load(open(DATA))
st=json.load(open(STATE))
d['crew']=json.load(open(HERE+'crew.json')) if os.path.exists(HERE+'crew.json') else {}
d['courses']=sorted(os.path.basename(f)[:-5] for f in __import__('glob').glob(OUT+'courses/*.json'))
# animations des exercices produites par extract.py à côté de data.json
_an=os.path.join(os.path.dirname(os.path.abspath(DATA)),'anim.js')
if os.path.exists(_an) and os.path.abspath(_an)!=os.path.abspath(OUT+'anim.js'): shutil.copy(_an,OUT+'anim.js')
pf=st.get('profile') or {}
def _num(x):
    try: return float(str(x).replace(',','.'))
    except Exception: return None
d['body']={'w':_num(pf.get('weight')),'fcmax':pf.get('fcmax'),'fcrest':pf.get('fcrest')}
d['lab']=pf.get('lab'); d['zl']=pf.get('zl'); d['zsp']=pf.get('zsp')
d['social']={k:(st.get('social') or {}).get(k,'') for k in ('ig','tt')}
BD='M0 92 H52 C60 88 66 80 70 70 L76 50 L80 30 L83 14 L86 30 L90 50 L96 70 C100 80 106 88 114 92 H150 L196 52 L214 64 L262 2 L286 34 L304 22 L360 92 H568'
BT='M67 70 H99 M74 50 H92 M64 92 C70 80 96 80 102 92'
BC='M50 92 C60 88 66 80 70 70 L76 50 L80 30 L83 14 L86 30 L90 50 L96 70 C100 80 106 88 114 92 H150 L196 52 L214 64 L262 2 L286 34 L304 22 L330 92'
h=open(HERE+'app.html').read().replace('__BRAND_D__',BD).replace('__BRAND_T__',BT).replace('__BRAND_C__',BC)
# données chiffrées : bundle complet (clé propriétaire) et bundle Assistance (clé équipe)
sys.path.insert(0,HERE);import vtcrypt
KO,KC=vtcrypt.keys()
CREW_KEYS={'races','strat','crew','courses','ravito','today','planStart','physio','index','social'}
crew={k:(v if k in CREW_KEYS else ([] if isinstance(v,list) else {} if isinstance(v,dict) else v if not isinstance(v,(str,int,float)) else v)) for k,v in d.items()}
for k in ('acts','plan','week','weeks','weekReal','kpis','gym','fits','traj','phases','ixgoal','next','prog'):
    if k in crew: crew[k]=[] if isinstance(d[k],list) else {} if isinstance(d[k],dict) else None
crew['crewMode']=True
pack={'v':1,'o':vtcrypt.enc(d,KO),'c':vtcrypt.enc(crew,KC)}
CH=json.load(open(HERE+'changelog.json'))
h=h.replace('__CHANGES__',json.dumps(CH,ensure_ascii=False)).replace('__VERSION__',CH[0]['v'])
h=h.replace('__DATA__',json.dumps(pack))
open(OUT+'index.html','w').write(h)
print('ok',os.path.getsize(OUT+'index.html'))
