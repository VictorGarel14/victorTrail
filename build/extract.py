import asyncio,json,sys
from playwright.async_api import async_playwright
# usage : python3 extract.py <carnet.html> <dossier des documents db> <sortie data.json>
CARNET,D,OUT=sys.argv[1],sys.argv[2].rstrip('/')+'/',sys.argv[3]
st=json.load(open(D+'state.json'));
acts={}
import glob
for f in glob.glob(D+'acts-*.json'): acts.update(json.load(open(f)).get('items',{}))
kv=json.load(open(D+'kitviz.json'))['items']
JS=r"""
(()=>{const t=todayStr(),ws=mondayOf(t),P=getPlan();
const wk=w=>{const p=P.find(x=>x.ws===w);if(!p)return null;return{ws:w,label:p.label,phase:p.phase.name,note:p.note||'',km:p.km,dp:p.dp,min:p.totMin,sessions:p.sessions.map(s=>({d:s.d,day:JOURS[s.d],title:s.title,cat:s.cat,min:s.min,z:s.z,dp:s.dp||0,km:s.cat==='run'?kmOf(s):null,key:!!s.key,done:!!sessionDone(s,w),goal:goalOf(s),gk:s.gym||null}))}};
const st=weekStats(ws);
const K=progKPIs().map(k=>{const D=dState(k);return{id:k.id,g:k.g,l:k.l,val:k.now==null?null:k.fmt(k.now),u:k.u,delta:D.s,good:D.n,sub:(k.sub||'').replace(/<[^>]+>/g,''),why:k.why,bars:!!k.bars,pts:!!k.pts,inv:k.id==='thr',spark:(k.spark||[]).filter(p=>p.v!=null&&isFinite(p.v)).map(p=>[p.d,+p.v.toFixed(3)])}});
const F=buildFollow();
const R=RACES.map(r=>({id:r.id,name:r.name,date:r.date,start:r.start,place:r.place,km:r.km,dp:r.dp,role:r.role,info:r.info,ready:readiness2(r).score}));

const ztxt=x=>String(x||'').replace(/\{(Z[1-5])\}/g,(m,z)=>zoneTxt(z)+' bpm');
const plan=P.map(w=>({ws:w.ws,label:w.label,ph:w.phase.key,phase:w.phase.name,min:w.totMin,km:w.km,dp:w.dp,note:w.note||'',s:w.sessions.filter(s=>!/optionnel/i.test(s.title)||true).map(s=>({d:s.d,t:s.title,c:s.cat,m:s.min,z:s.z,dp:s.dp||0,km:s.cat==='run'?kmOf(s):null,k:!!s.key,ds:ztxt(s.desc),g:goalOf(s),gk:s.gym||null,sl:s.slot||'',zt:s.z?zoneTxt(s.z)+' bpm':null,pc:s.z&&s.cat==='run'&&!(s.dp&&s.dp/(s.min/60)>180)?zPace(s.z):null,wo:s.blocks?s.blocks.map(b=>{const fl=v=>Math.round(v*10)/10;const tt=b.reps?b.reps+' × '+(b.dist?b.dist+' m':(b.on<1?Math.round(b.on*60)+'"':fl(b.on)+"'"))+(b.off?' / '+(b.off<1?Math.round(b.off*60)+'"':fl(b.off)+"'"):''):fl(b.min)+"'";return [tt,b.l,b.z,b.z==='VMA'?zPace('VMA'):(s.hill||b.hill)&&b.z!=='Z1'&&b.z!=='Z2'?'en côte : FC':zPace(b.z)]}):null,done:w.ws<=ws?!!sessionDone(s,w.ws):null}))}));
const strat={};RACES.forEach(r=>{const st=stratState(r.id),C=CPS[r.id],H=+st.goal||1;const NR=nRates(r.id);const o={goal:H,gh:st.gh,ml:st.ml,na:st.na};
  if(NR){const FL=NR.fl;o.fl={n:FL.n,vol:FL.vol,water:FL.water,iso:FL.iso,el:FL.el,drink:NR.R.d?nShort(NR.R.d):'',elec:NR.R.e?nShort(NR.R.e):''};o.rhythm=nRhythm(NR);o.items=NR.R.items.map(it=>({n:nShort(it.p),q:it.q}));o.tot={c:r0(NR.R.tot.c),na:r0(NR.R.tot.na),caf:r0(NR.R.tot.caf||0)};
    const L20=[];NR.L.forEach(x=>{if(x.kind==='drink')L20.push(fr(NR.drinkMl/3)+' ml de '+nShort(x.p));else if(x.kind==='elec'&&x.p.ml&&NR.fl.el)L20.push(fr(x.per*x.p.ml/3)+' ml de '+nShort(x.p));else{const k=x.per/3,nb=Math.round(1/k);L20.push(k>=1.5?fr(k)+' '+nShort(x.p):nb<=1?'1 '+nShort(x.p):'1 '+nShort(x.p)+' tous les '+nb+' bips (toutes les '+nEvery(x.per)+')')}});if(NR.water>5)L20.push(fr(NR.water/3)+" ml d'eau");o.cues=L20}
  if(C&&C.pts.length){let prev=0;o.rows=C.pts.map(([nm,km,bar])=>{const t=C.limit?H*bar/C.limit:null;const c=clockAt(r,t),cb=clockAt(r,bar);const row={nm,km,t:fmtH(t),th:+t.toFixed(3),bh:bar,clock:c.txt,night:c.night,bar:fmtH(bar),barClock:cb.txt,marge:fmtH(bar-t),base:C.base.includes(nm)};
    if(NR){const ca=nCarry(NR,prev,t);row.carry=ca.map(z=>z.n+' '+nShort(z.x.p)).join(' · ')}prev=t;return row})}
  if(NR&&o.rows){const A=st.assist||{};const isA=nm=>A[nm]!==false;const FL=NR.fl;const pts=[{nm:'Départ',th:0}].concat(o.rows.slice(0,-1));
    const nextA=i=>{for(let j=i+1;j<pts.length;j++)if(isA(pts[j].nm))return pts[j];return null};
    const lab=c=>c.n+' '+(c.x.kind==='drink'||(c.x.kind==='elec'&&c.x.p.ml)?'dose'+(c.n>1?'s':'')+' de ':'')+nShort(c.x.p);
    o.assist=pts.map((p,i)=>{const on=i===0||isA(p.nm);if(!on)return{nm:p.nm,on:false};const nx=nextA(i);const t1=nx?nx.th:H;const L=(t1-p.th)*st.ml;const fills=Math.max(1,Math.ceil(L/FL.cap));
      const cc=nCarry(NR,p.th,t1).filter(c=>!(c.x.kind==='drink'||(c.x.kind==='elec'&&c.x.p.ml&&FL.el)));
      NR.L.forEach(x=>{const k=x.kind==='drink'?FL.iso:(x.kind==='elec'&&x.p.ml&&FL.el)?FL.el:0;if(k)cc.unshift({x,n:Math.ceil(fills*k*FL.vol/(x.p.ml||500)-1e-9)})});
      return{nm:p.nm,on:true,stop:i===0?null:p.base?RAVITO.stop.base:RAVITO.stop.assist,give:cc.map(lab),solid:NR.solid>1?r0(NR.solid*(t1-p.th)):0,until:nx?nx.nm:'arrivée',dur:fmtH(t1-p.th),liters:+(L/1000).toFixed(1),fills:fills-1,flasks:{water:FL.water,iso:FL.iso,el:FL.el,drink:NR.R.d?nShort(NR.R.d):''}}})}
  {const B=ravitoBudget(r.id);if(B)o.stopTot=B.tot}
  strat[r.id]=o});
const tr=trajectory();
return {plan,strat,today:t,prog:seasonProg(),phase:phaseOf(t).name,phaseGoal:phaseOf(t).goal,planStart:PLAN_START,week:wk(ws),next:wk(addD(ws,7)),weekReal:{h:+(st.min/60).toFixed(1),km:+st.km.toFixed(1),dp:r0(st.dp),n:st.n},
 weeks:F.weeks,acts:F.acts,ravito:{ref:RAVITO.ref.txt,types:RAVITO.types,order:RAVITO.order,rules:RAVITO.rules,crew:RAVITO.crew,before:RAVITO.before},ixgoal:(()=>{const L=(state.index||[]).slice().sort((a,b)=>a.date.localeCompare(b.date));const sc=state.raceScore||{};return{target:IXGOAL.target,start:IXGOAL.start,cur:(L[L.length-1]||{}).utmb||IXGOAL.start.v,nice:IXGOAL.nice,steps:IXGOAL.steps.map(x=>({lab:x.lab,date:RACES.find(r=>r.id===x.race).date,txt:x.txt,lo:x.lo,score:+sc[x.race]||null}))}})(),gym:Object.fromEntries(Object.entries(GYM).map(([k,g])=>[k,{n:g.name,w:g.when,dur:g.dur,intro:g.intro,ex:g.ex.map(e=>[e[1],e[2]])}])),kpis:K,races:R,index:(state.index||[]).slice(-1)[0]||null,
 traj:{real:tr.pts.filter((_,i)=>i%3===0).map(p=>[p.d,+p.real.toFixed(1)]),plan:tr.plan.filter((_,i)=>i%3===0).map(p=>[p.d,+p.v.toFixed(1)])},
 fits:Object.fromEntries(['train','diag','rt100','mb42'].map(f=>[f,fitItems(f).map(x=>({cat:x.cat,name:x.name,brand:x.brand,bag:x.bag,eid:x.eid}))])),
 phases:PHASES.map(p=>({short:p.short,name:p.name,from:p.from,to:p.to,goal:p.goal}))}})()
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        html=open(CARNET).read()
        await pg.set_content('<!doctype html><html><head><meta charset=utf8></head><body>'+html+'</body></html>');await pg.wait_for_timeout(400)
        await pg.evaluate("([s,a,k])=>{Object.assign(state,s);state.acts=a;KITVIZ=k;PLAN=null}",[st,acts,kv])
        out=await pg.evaluate(JS)
        json.dump(out,open(OUT,'w'),ensure_ascii=False,indent=1)
        print(errs or 'ok', out['today'], out['phase'], len(out['acts'] or []), [k['l']+'='+str(k['val']) for k in out['kpis']])
        await b.close()
asyncio.run(main())
