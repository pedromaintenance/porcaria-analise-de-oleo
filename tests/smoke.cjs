const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const ROOT=path.join(__dirname,'..');
class El{constructor(){this.innerHTML='';this.textContent='';this.listeners={};this.classList={add(){},remove(){}};this.value='';}addEventListener(n,cb){this.listeners[n]=cb;}click(){if(this.listeners.click)this.listeners.click({target:this});}focus(){}setSelectionRange(){}append(){}remove(){}}
const nodes={'#app':new El(),'#toast':new El(),'#import-file':new El()};
const store=new Map();const ctx={console,window:{addEventListener(){}},document:{querySelector:s=>nodes[s]||new El(),createElement:()=>new El(),body:{append(){}}},navigator:{},location:{protocol:'file:'},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setTimeout(fn){return 1},clearTimeout(){},URL:{createObjectURL:()=> 'blob:abc',revokeObjectURL(){}},Blob:class{constructor(a,b){this.a=a;this.b=b;}}};vm.createContext(ctx);
for(const f of ['js/cases.js','js/library.js','js/app.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
const TEST=ctx.window.PORCARIA_TEST,CASES=Array.from(TEST.cases),state=()=>TEST.getState();
assert.equal(CASES.length,72);assert.equal(ctx.window.PORCARIA_MANUALS.length>=15,true);
assert.equal(CASES.filter(c=>c.outcome==='replace').length,7);
assert.equal(nodes['#app'].innerHTML.includes('Campanhas de diagnóstico'),true);
assert.ok(nodes['#app'].innerHTML.includes('data-action="install"'),'Instalação manual precisa estar disponível na tela inicial');
assert.equal(Object.values(state().records).length,0);
// Every mission can start in instructor, calculate safe and unsafe outcomes; no corporate raw IDs.
TEST.reset(true);
for(const c of CASES){assert.ok(c.id&&c.manual&&c.system);assert.ok(ctx.window.PORCARIA_MANUALS.some(x=>x.id===c.manual));
 const good=TEST.compute(c,{triage:c.risk==='alto'||c.risk==='critico'?'secure':'plan',tests:['history','visual','instrument','lab'],hyp:'correct',act:'correct'});
 assert.ok(good.score>=70,'good score '+c.id);assert.ok(good.delta>0,'good delta '+c.id);
 const wrong=TEST.compute(c,{triage:'release',tests:['history'],hyp:'bad',act:'premature'});
 assert.ok(wrong.delta<0,'premature penalty '+c.id);assert.ok(wrong.spent>=c.defectCost,'replacement cost '+c.id);
 const noTests=TEST.compute(c,{triage:'plan',tests:[],hyp:'correct',act:'correct'});
 assert.ok(noTests.score<=62,'no-evidence cap '+c.id);
}
// No unsafe naming or raw IDs in published cases.
const pub=fs.readFileSync(path.join(ROOT,'js/cases.js'),'utf8');for(const r of [/BRAZAURO/i,/GMINING/i,/TOCANTINZINHO/i,/U330-/i,/SOS-U330/i,/\b\d{3}-\d{3}\b/,/KYD\d{5}/])assert.ok(!r.test(pub),'sensitive data: '+r);
// all critical cases have proper triage score behavior
for(const c of CASES.filter(x=>x.risk==='critico')){
 const wrong=TEST.compute(c,{triage:'release',tests:[],hyp:'correct',act:'correct'});
 assert.ok(wrong.score<=45,'unsafe triage cap '+c.id);
}
// Instructor reset/ normal starter logic. Initial cash, inventory and unlock controls.
TEST.reset(false);assert.equal(state().wallet,1200);assert.equal(state().samples,1);assert.equal(state().manuals.length,2);
TEST.start(CASES[0].id);assert.equal(state().session.stage,'triage');assert.equal(state().session.id,CASES[0].id);
const send=(action,dataset={})=>nodes['#app'].listeners.click({target:{closest:()=>({dataset:{action,...dataset}})}});
send('triage',{choice:'secure'});assert.equal(state().session.stage,'investigate');
let oldWallet=state().wallet;send('test',{test:'visual'});assert.equal(state().wallet,oldWallet-25);
send('next',{next:'diagnose'});send('hyp',{choice:'correct'});send('next',{next:'act'});send('act',{choice:'correct'});send('finish');assert.equal(state().session.stage,'result');assert.ok(state().records[CASES[0].id].attempts===1);assert.ok(state().wallet>0);
// instructor flow always requires explicit checkbox, and clears all prior records
send('nav',{page:'profile'});
assert.ok(nodes['#app'].innerHTML.includes('data-action="instructor-prompt"'),'Modo Instrutor deve estar visível na tela Carreira');
assert.ok(nodes['#app'].innerHTML.includes('data-page="settings"'),'Configurações devem estar acessíveis pela tela Carreira');
send('instructor-prompt');assert.ok(nodes['#app'].innerHTML.includes('Exportar meu save JSON'));send('instructor-apply');assert.ok(!state().instructor);
nodes['#app'].listeners.change({target:{id:'discard-ok',checked:true}});send('instructor-apply');assert.equal(state().instructor,true);assert.equal(Object.keys(state().records).length,0);assert.equal(state().wallet,1200);
assert.ok(!fs.readFileSync(path.join(ROOT,'index.html'),'utf8').match(/https?:\/\//));
const sw=fs.readFileSync(path.join(ROOT,'service-worker.js'),'utf8');for(const x of ['./index.html','./js/cases.js','./js/library.js','./js/app.js','./css/style.css'])assert.ok(sw.includes(x));
console.log(JSON.stringify({status:'PASS',missions:CASES.length,manuals:ctx.window.PORCARIA_MANUALS.length,tools:ctx.window.PORCARIA_TOOLS.length,parts:ctx.window.PORCARIA_PARTS.length,validatedReplacement:CASES.filter(c=>c.outcome==='replace').length,checks:['game load','all mission outcomes','credit penalties','evidence caps','severity caps','privacy scan','stage progression','state persistence','instructor confirmation','service worker file list']},null,2));
