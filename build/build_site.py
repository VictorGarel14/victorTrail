# usage : python3 build_site.py <data.json> <state.json> <dossier du site>
import json,shutil,os,sys
DATA,STATE,OUT=sys.argv[1],sys.argv[2],sys.argv[3].rstrip('/')+'/'
HERE=os.path.dirname(os.path.abspath(__file__))+'/'
d=json.load(open(DATA))
st=json.load(open(STATE))
d['social']={k:(st.get('social') or {}).get(k,'') for k in ('ig','tt')}
BD='M0 92 H52 C60 88 66 80 70 70 L76 50 L80 30 L83 14 L86 30 L90 50 L96 70 C100 80 106 88 114 92 H150 L196 52 L214 64 L262 2 L286 34 L304 22 L360 92 H568'
BT='M67 70 H99 M74 50 H92 M64 92 C70 80 96 80 102 92'
BC='M50 92 C60 88 66 80 70 70 L76 50 L80 30 L83 14 L86 30 L90 50 L96 70 C100 80 106 88 114 92 H150 L196 52 L214 64 L262 2 L286 34 L304 22 L330 92'
h=open(HERE+'app.html').read().replace('__BRAND_D__',BD).replace('__BRAND_T__',BT).replace('__BRAND_C__',BC)
h=h.replace('__DATA__',json.dumps(d,ensure_ascii=False).replace('</','<\\/'))
open(OUT+'index.html','w').write(h)
print('ok',os.path.getsize(OUT+'index.html'))
