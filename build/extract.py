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
const wk=w=>{const p=P.find(x=>x.ws===w);if(!p)return null;return{ws:w,label:p.label,phase:p.phase.name,note:p.note||'',km:p.km,dp:p.dp,min:p.totMin,sessions:p.sessions.map(s=>({d:s.d,day:JOURS[s.d],title:s.title,cat:s.cat,min:s.min,z:s.z,dp:s.dp||0,km:s.cat==='run'?kmOf(s):null,key:!!s.key,done:!!sessionDone(s,w),goal:goalOf(s)}))}};
const st=weekStats(ws);
const K=progKPIs().map(k=>{const D=dState(k);return{id:k.id,g:k.g,l:k.l,val:k.now==null?null:k.fmt(k.now),u:k.u,delta:D.s,good:D.n,sub:(k.sub||'').replace(/<[^>]+>/g,''),why:k.why,bars:!!k.bars,pts:!!k.pts,inv:k.id==='thr',spark:(k.spark||[]).filter(p=>p.v!=null&&isFinite(p.v)).map(p=>[p.d,+p.v.toFixed(3)])}});
const F=buildFollow();
const R=RACES.map(r=>({id:r.id,name:r.name,date:r.date,start:r.start,place:r.place,km:r.km,dp:r.dp,role:r.role,info:r.info,ready:readiness2(r).score}));
const tr=trajectory();
return {today:t,prog:seasonProg(),phase:phaseOf(t).name,phaseGoal:phaseOf(t).goal,planStart:PLAN_START,week:wk(ws),next:wk(addD(ws,7)),weekReal:{h:+(st.min/60).toFixed(1),km:+st.km.toFixed(1),dp:r0(st.dp),n:st.n},
 weeks:F.weeks,acts:F.acts,kpis:K,races:R,index:(state.index||[]).slice(-1)[0]||null,
 traj:{real:tr.pts.filter((_,i)=>i%3===0).map(p=>[p.d,+p.real.toFixed(1)]),plan:tr.plan.filter((_,i)=>i%3===0).map(p=>[p.d,+p.v.toFixed(1)])},
 fits:Object.fromEntries(['train','diag','rt100','mb42'].map(f=>[f,fitItems(f).map(x=>({cat:x.cat,name:x.name,brand:x.brand,bag:x.bag,eid:x.eid}))])),
 phases:PHASES.map(p=>({short:p.short,name:p.name,from:p.from,to:p.to}))}})()
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
