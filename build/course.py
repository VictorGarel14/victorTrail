# usage : python3 course.py <fichier.gpx> <km officiel> <sortie.json> [nom:km ...]
# Simplifie le tracé (≈ 700 points), calcule km cumulés et altitude, place les points de passage au km officiel (mise à l'échelle).
import sys,re,math,json
src,KM,OUT=sys.argv[1],float(sys.argv[2]),sys.argv[3]
cps=[(a.rsplit(':',1)[0],float(a.rsplit(':',1)[1])) for a in sys.argv[4:]]
s=open(src).read()
P=[(float(a),float(b),float(e) if e else None) for a,b,e in re.findall(r'<(?:trkpt|rtept) lat="([-\d.]+)" lon="([-\d.]+)"[^>]*>\s*(?:<ele>([-\d.]+)</ele>)?',s)]
if not P: P=[(float(b),float(a),None) for a,b in re.findall(r'<(?:trkpt|rtept) lon="([-\d.]+)" lat="([-\d.]+)"',s)]
def hav(a,b):
  R=6371000;p1,p2=math.radians(a[0]),math.radians(b[0]);dl=math.radians(b[1]-a[1]);dp=p2-p1
  return 2*R*math.asin(math.sqrt(math.sin(dp/2)**2+math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2))
cum=[0.0]
for i in range(1,len(P)): cum.append(cum[-1]+hav(P[i-1],P[i]))
tot=cum[-1];f=KM*1000/tot
# Douglas-Peucker (en mètres approx.)
def perp(p,a,b):
  k=111320*math.cos(math.radians(a[0]))
  ax,ay=a[1]*k,a[0]*110540;bx,by=b[1]*k,b[0]*110540;px,py=p[1]*k,p[0]*110540
  dx,dy=bx-ax,by-ay
  if dx==dy==0: return math.hypot(px-ax,py-ay)
  t=max(0,min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy)));return math.hypot(px-ax-t*dx,py-ay-t*dy)
def dp(i0,i1,eps,keep):
  st=[(i0,i1)]
  while st:
    a,b=st.pop();m,idx=0,-1
    for i in range(a+1,b):
      d=perp(P[i],P[a],P[b])
      if d>m:m,idx=d,i
    if m>eps: keep.add(idx);st+= [(a,idx),(idx,b)]
eps=8
while True:
  keep={0,len(P)-1};dp(0,len(P)-1,eps,keep)
  if len(keep)<=900: break
  eps*=1.4
K=sorted(keep)
E=[p[2] for p in P if p[2] is not None];up=0
if E:
  ref=E[0]
  for e in E:
    if e-ref>3: up+=e-ref;ref=e
    elif e<ref: ref=e
pts=[[round(P[i][0],5),round(P[i][1],5),round(cum[i]*f/1000,2),round(P[i][2]) if P[i][2] is not None else None] for i in K]
def at(km):
  m=km*1000/f
  for i in range(1,len(cum)):
    if cum[i]>=m:
      u=(m-cum[i-1])/max(1e-9,cum[i]-cum[i-1]);a,b=P[i-1],P[i]
      return [round(a[0]+(b[0]-a[0])*u,5),round(a[1]+(b[1]-a[1])*u,5)]
  return [P[-1][0],P[-1][1]]
out={'km':KM,'gpxKm':round(tot/1000,2),'dp':round(up),'pts':pts,'cps':[{'nm':n,'km':k,'ll':at(k)} for n,k in cps]}
json.dump(out,open(OUT,'w'),separators=(',',':'))
print('ok',len(pts),'points',round(tot/1000,1),'km gpx ->',KM,'· D+',round(up),'·',[ (c['nm'],c['ll']) for c in out['cps']])
