# Chiffrement des données de VictorTrail (AES-256-GCM, données compressées en gzip avant chiffrement).
# Compatible WebCrypto : ct = chiffré || tag (16 octets), iv de 12 octets.
# Clés : variables d'environnement VT_KO (propriétaire) et VT_KC (équipe), en base64url,
# ou VT_KEYS = chemin d'un fichier JSON {"o": ..., "c": ...}.
import os, json, gzip, base64, secrets

def _b64u(s):
    s = s.strip()
    return base64.urlsafe_b64decode(s + '=' * (-len(s) % 4))

def keys():
    ko, kc = os.environ.get('VT_KO'), os.environ.get('VT_KC')
    p = os.environ.get('VT_KEYS')
    if p and os.path.exists(p):
        d = json.load(open(p))
        ko, kc = ko or d.get('o'), kc or d.get('c')
    if not ko or not kc:
        raise SystemExit('Clés VictorTrail absentes : définir VT_KO et VT_KC (ou VT_KEYS).')
    return _b64u(ko), _b64u(kc)

def enc(obj, key):
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    raw = obj if isinstance(obj, (bytes, bytearray)) else json.dumps(obj, ensure_ascii=False, separators=(',', ':')).encode()
    iv = secrets.token_bytes(12)
    ct = AESGCM(key).encrypt(iv, gzip.compress(raw, 9, mtime=0), None)
    return {'v': 1, 'iv': base64.b64encode(iv).decode(), 'ct': base64.b64encode(ct).decode()}

def dec(box, key, as_json=True):
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    raw = gzip.decompress(AESGCM(key).decrypt(base64.b64decode(box['iv']), base64.b64decode(box['ct']), None))
    return json.loads(raw) if as_json else raw
