/* Raider LogicLab: the Try it tools. Each tool is LL.tool(kind, (host, cfg, lesson) => {...}). */
(function(){
'use strict';
const {esc,$,$$}=LL;

/* ---------- sorter: tag each sentence Conclusion / Premise / Neither, then see the building ---------- */
const TAGS={'':['?','Tap to label'],c:['Conclusion',''],p:['Premise',''],n:['Neither','']},CYC=['c','p','n'];
LL.tool('sorter',function(host,T){let pi=0;
  function passage(){const P=T.passages[pi];const pick=P.s.map(()=>'');let checked=false;
    function draw(){const allOk=checked&&P.s.every((x,i)=>pick[i]===x.r);
      host.innerHTML=`<div class="qbox"><span class="k">Argument ${pi+1} of ${T.passages.length}: ${esc(P.t)}</span>
       <div class="sents">${P.s.map((x,i)=>`<button class="sent ${pick[i]}${checked&&pick[i]!==x.r?' wrong':''}" data-i="${i}" aria-label="${esc(x.x)}. Label: ${TAGS[pick[i]][0]}"><span class="tag">${TAGS[pick[i]][0]}</span>${esc(x.x)}</button>`).join('')}</div>
       <div class="legend"><span>Tap a sentence to change its label: Conclusion → Premise → Neither.</span></div>
       ${checked&&!allOk?`<div class="fb no">${P.s.map((x,i)=>pick[i]!==x.r?`<p>“${esc(x.x.slice(0,48))}${x.x.length>48?'…':''}” is <b>${TAGS[x.r][0]}</b>. ${x.why}</p>`:'').join('')}<p>Fix the ones outlined in red, or press Check again.</p></div>`:''}
       ${allOk?`<div class="fb ok">✓ All right. Here’s the argument as a building:</div>${building(P)}`:''}
       <div class="formrow">${allOk?(pi+1<T.passages.length?`<button class="btn" data-next>Next argument ›</button>`:(T.stage2?`<button class="btn" data-s2>One more skill ›</button>`:'')):`<button class="btn" data-check>Check</button>`}</div></div>`;
      $$('[data-i]',host).forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;pick[i]=CYC[(CYC.indexOf(pick[i])+1)%3];checked=false;draw();const nb=$(`[data-i="${i}"]`,host);nb&&nb.focus()}));
      const c=$('[data-check]',host);if(c)c.addEventListener('click',()=>{if(pick.some(x=>!x)){checked=false;draw();const f=document.createElement('p');f.className='fb info';f.textContent='Give every sentence a label first.';$('.sents',host).after(f);return}checked=true;draw();LL.say(LK.text($('.fb',host)))});
      const n=$('[data-next]',host);if(n)n.addEventListener('click',()=>{pi++;passage()});
      const s2=$('[data-s2]',host);if(s2)s2.addEventListener('click',()=>{host.innerHTML=`<p class="lead">${T.stage2.intro}</p><div id="s2"></div>`;LL.mcRun($('#s2',host),T.stage2.items,{k:'Argument or explanation?'})})}
    draw()}
  passage()});
function building(P){const c=P.s.filter(x=>x.r==='c'),p=P.s.filter(x=>x.r==='p');
  return `<div style="display:flex;flex-direction:column;gap:6px;max-width:640px" aria-label="The conclusion on top, held up by the premises">
   <div style="border:2.5px solid var(--rj);border-radius:10px;padding:8px 12px;background:var(--card);text-align:center"><b style="font-size:13px;letter-spacing:.08em;color:var(--rj)">CONCLUSION</b><br>${c.map(x=>esc(x.x)).join(' ')}</div>
   <div style="display:flex;gap:6px">${p.map(x=>`<div style="flex:1;border:2px solid var(--v-s);border-radius:8px;padding:8px 10px;min-height:90px;background:var(--card);font-size:15px"><b style="font-size:12px;letter-spacing:.08em;color:var(--v-s)">PREMISE</b><br>${esc(x.x)}</div>`).join('')}</div>
   <div style="height:10px;border-radius:3px;background:var(--fg);opacity:.25"></div></div>`}

/* ---------- cases: a run of multiple-choice cases, optionally in stages ---------- */
LL.tool('cases',function(host,T){const st=T.stages||[{items:T.items,k:T.k}];let si=0;
  function stage(){const S=st[si];host.innerHTML=`${S.intro?`<p class="lead">${S.intro}</p>`:''}<div id="cr"></div>`;
    LL.mcRun($('#cr',host),S.items,{k:S.k,shuffle:S.shuffle,end:si+1<st.length?`<p>Next: ${esc(st[si+1].title||'one more set')}.</p><div><button class="btn sm" data-nx>Go on ›</button></div>`:(T.end||'')});
    host.addEventListener('click',function h(e){if(e.target.closest('[data-nx]')){host.removeEventListener('click',h);si++;stage()}})}
  stage()});

/* ---------- counter: the counterexample hunt (validity) ----------
   A small world of real things. Every "All/No" statement is computed from it, and each one also matches the real world. */
const W={
 things:[['Biscuit','a pet dog','🐶',['dogs','mammals','animals','pets','furry']],['Rusty','a stray dog','🐕',['dogs','mammals','animals','furry']],
  ['Mr. Whiskers','a pet cat','🐱',['cats','mammals','animals','pets','furry']],['Shadow','a barn cat','🐈',['cats','mammals','animals','furry']],
  ['Nemo','a pet goldfish','🐠',['fish','animals','pets']],['Bruce','a shark','🦈',['fish','animals']],
  ['Daisy','a cow','🐄',['mammals','animals','furry']],['Mr. Snuggles','a teddy bear','🧸',['furry']]],
 groups:{dogs:'dogs',cats:'cats',mammals:'mammals',fish:'fish',animals:'animals',pets:'pets',furry:'things with fur or hair'}};
const has=(t,g)=>t[3].includes(g);
const allAre=(a,b)=>W.things.filter(t=>has(t,a)).every(t=>has(t,b));
const noneAre=(a,b)=>!W.things.some(t=>has(t,a)&&has(t,b));
const FORMS=[
 {id:'f1',name:'All A are B. x is A. So x is B.',vars:'ABx',valid:true,lines:v=>[[`All ${W.groups[v.A]} are ${W.groups[v.B]}.`,allAre(v.A,v.B)],[`${v.x[0]} is one of the ${W.groups[v.A]}.`,has(v.x,v.A)],[`So ${v.x[0]} is one of the ${W.groups[v.B]}.`,has(v.x,v.B)]]},
 {id:'f2',name:'All A are B. x is B. So x is A.',vars:'ABx',valid:false,lines:v=>[[`All ${W.groups[v.A]} are ${W.groups[v.B]}.`,allAre(v.A,v.B)],[`${v.x[0]} is one of the ${W.groups[v.B]}.`,has(v.x,v.B)],[`So ${v.x[0]} is one of the ${W.groups[v.A]}.`,has(v.x,v.A)]]},
 {id:'f3',name:'All A are B. All B are C. So all A are C.',vars:'ABC',valid:true,lines:v=>[[`All ${W.groups[v.A]} are ${W.groups[v.B]}.`,allAre(v.A,v.B)],[`All ${W.groups[v.B]} are ${W.groups[v.C]}.`,allAre(v.B,v.C)],[`So all ${W.groups[v.A]} are ${W.groups[v.C]}.`,allAre(v.A,v.C)]]},
 {id:'f4',name:'All A are B. All C are B. So all A are C.',vars:'ABC',valid:false,lines:v=>[[`All ${W.groups[v.A]} are ${W.groups[v.B]}.`,allAre(v.A,v.B)],[`All ${W.groups[v.C]} are ${W.groups[v.B]}.`,allAre(v.C,v.B)],[`So all ${W.groups[v.A]} are ${W.groups[v.C]}.`,allAre(v.A,v.C)]]},
 {id:'f5',name:'No A are B. x is A. So x is not B.',vars:'ABx',valid:true,lines:v=>[[`No ${W.groups[v.A]} are ${W.groups[v.B]}.`,noneAre(v.A,v.B)],[`${v.x[0]} is one of the ${W.groups[v.A]}.`,has(v.x,v.A)],[`So ${v.x[0]} is not one of the ${W.groups[v.B]}.`,!has(v.x,v.B)]]},
 {id:'f6',name:'All A are B. x is not A. So x is not B.',vars:'ABx',valid:false,lines:v=>[[`All ${W.groups[v.A]} are ${W.groups[v.B]}.`,allAre(v.A,v.B)],[`${v.x[0]} is not one of the ${W.groups[v.A]}.`,!has(v.x,v.A)],[`So ${v.x[0]} is not one of the ${W.groups[v.B]}.`,!has(v.x,v.B)]]}];
LL.counterWorld={W,FORMS,allAre,noneAre,has};
/* where each region's dots go in a 2- or 3-circle picture */
const C2=[{cx:225,cy:175,r:130},{cx:375,cy:175,r:130}],P2={0:[40,30],1:[150,175],2:[450,175],3:[300,175]};
const C3=[{cx:235,cy:150,r:118},{cx:365,cy:150,r:118},{cx:300,cy:262,r:118}],P3={0:[40,30],1:[180,112],2:[420,112],3:[300,105],4:[300,330],5:[226,238],6:[374,238],7:[300,196]};
function worldSVG(v,three,xName){const C=three?C3:C2,P=three?P3:P2,keys=three?['A','B','C']:['A','B'],cls=['cS','cP','cM'],tc=['tS','tP','tM'];
  const H=three?400:330;const byR={};W.things.forEach(t=>{let b=0;keys.forEach((k,i)=>{if(has(t,v[k]))b|=1<<i});(byR[b]=byR[b]||[]).push(t)});
  const off=[[0,0],[-34,0],[34,0],[0,-30],[0,30],[-34,-30],[34,30],[-34,30]];
  let s=`<svg viewBox="0 0 600 ${H}" role="img" aria-label="Circles for ${keys.map(k=>W.groups[v[k]]).join(', ')} with each thing placed where it belongs">`;
  C.forEach((c,i)=>{s+=`<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" class="${cls[i]}"/>`});
  const lp=three?[[110,22,'start'],[490,22,'end'],[300,H-6,'middle']]:[[120,22,'start'],[480,22,'end']];
  keys.forEach((k,i)=>{s+=`<text x="${lp[i][0]}" y="${lp[i][1]}" text-anchor="${lp[i][2]}" class="lbl ${tc[i]}">${k} = ${esc(W.groups[v[k]])}</text>`});
  Object.entries(byR).forEach(([b,ts])=>{const [x,y]=P[b];ts.forEach((t,j)=>{const [dx,dy]=off[j%off.length];const me=xName&&t[0]===xName;
    s+=`<g><title>${esc(t[0])}, ${esc(t[1])}</title>${me?`<circle cx="${x+dx}" cy="${y+dy}" r="19" fill="none" class="rjst" stroke-width="4"/>`:''}<text x="${x+dx}" y="${y+dy+9}" text-anchor="middle" style="font-size:26px">${t[2]}</text></g>`})});
  return s+'</svg>'}
LL.tool('counter',function(host,T){let fi=0,v={A:'dogs',B:'mammals',C:'animals',x:W.things[0]},tries={},found={};
  function draw(){const F=FORMS[fi],L=F.lines(v),pt=L[0][1]&&L[1][1],ct=L[2][1],hasX=F.vars.includes('x'),three=F.vars.includes('C');
    const sel=(k)=>`<label>${k} = <select class="sel" data-v="${k}">${Object.entries(W.groups).map(([g,n])=>`<option value="${g}"${v[k]===g?' selected':''}>${n}</option>`).join('')}</select></label>`;
    const xs=`<label>x = <select class="sel" data-v="x">${W.things.map((t,i)=>`<option value="${i}"${v.x===t?' selected':''}>${t[2]} ${esc(t[0])} (${esc(t[1])})</option>`).join('')}</select></label>`;
    const k=F.id,n=tries[k]||0;
    let verdict;
    if(pt&&!ct){found[k]=1;verdict=`<p class="fb ok"><b>Counterexample found!</b> Both premises are true and the conclusion is false. That proves the form “${esc(F.name)}” is <b>invalid</b>: true premises don’t guarantee its conclusion.</p>`}
    else if(pt&&ct)verdict=`<p class="fb info">Both premises are true, and so is the conclusion. That doesn’t prove anything about the form yet. Keep hunting: change the blanks.</p>`;
    else verdict=`<p class="fb info">At least one premise is false here, so this case can’t test the form. A counterexample needs <b>true</b> premises.</p>`;
    const giveUp=F.valid&&n>=6?`<div class="lk-whycare"><b>You won’t find one.</b> This form is <b>valid</b>. ${F.id==='f1'?'If A is inside B and x is inside A, x is inside B.':F.id==='f3'?'If A is inside B and B is inside C, A is inside C.':'If A and B don’t overlap and x is in A, x can’t be in B.'} Every time you made both premises true, the conclusion came out true. That’s what a valid form does.</div>`:'';
    host.innerHTML=`<div class="qbox"><label class="k" for="fsel">Argument form</label><select id="fsel" class="sel">${FORMS.map((f,i)=>`<option value="${i}"${i===fi?' selected':''}>${i+1}. ${esc(f.name)}${found[f.id]?' (invalid ✓)':''}</option>`).join('')}</select>
      <div class="formrow">${sel('A')}${sel('B')}${three?sel('C'):''}${hasX?xs:''}</div>
      <div class="lights">${L.map((l,i)=>`<span class="light ${l[1]?'t':'f'}">${l[1]?'True':'False'}</span><span>${i===2?'<b>':''}${esc(l[0])}${i===2?'</b>':''}</span>`).join('')}</div>
      ${verdict}${giveUp}
      <div class="stage sv" style="background:var(--card2);border-radius:10px;padding:6px">${worldSVG(v,three,hasX?v.x[0]:null)}</div>
      <p class="small muted">Our little world has 8 things, and every “All” or “No” line above is also true or false in the real world. Mr. Snuggles is a teddy bear, so he has fur but isn’t an animal.</p>
      <div class="formrow">${!F.valid?`<button class="btn ghost sm" data-show>Show me one</button>`:''}<span class="small muted">Tries on this form: ${n}</span></div></div>`;
    $('#fsel',host).addEventListener('change',e=>{fi=+e.target.value;draw()});
    $$('[data-v]',host).forEach(s=>s.addEventListener('change',e=>{const k2=e.target.dataset.v;v[k2]=k2==='x'?W.things[+e.target.value]:e.target.value;tries[F.id]=(tries[F.id]||0)+1;draw()}));
    const sm=$('[data-show]',host);if(sm)sm.addEventListener('click',()=>{const c=search(F);if(c){Object.assign(v,c);tries[F.id]=(tries[F.id]||0)+1;draw()}});
    LL.say(LK.text($('.fb',host)))}
  function search(F){const G=Object.keys(W.groups);for(const A of G)for(const B of G){if(A===B)continue;const Cs=F.vars.includes('C')?G:[v.C];for(const C of Cs){const xs=F.vars.includes('x')?W.things:[v.x];for(const x of xs){const L=F.lines({A,B,C,x});if(L[0][1]&&L[1][1]&&!L[2][1]&&!(F.vars.includes('C')&&(C===A||C===B)))return {A,B,C,x}}}}return null}
  draw()});

/* ---------- grid: sort arguments into valid/invalid x premises true/false ---------- */
LL.tool('grid',function(host,T){const items=LL.shuffle(T.items);let i=0,score=0,pick=null;
  const lab=[[1,1,'Valid, all premises true (sound)'],[1,0,'Valid, a premise is false'],[0,1,'Invalid, premises true'],[0,0,'Invalid, a premise is false']];
  function draw(){if(i>=items.length){host.innerHTML=`<div class="qbox"><p class="score">You sorted ${score} of ${items.length} right on the first try.</p><div><button class="btn sm" data-again>Go again</button></div></div>`;$('[data-again]',host).addEventListener('click',()=>{i=0;score=0;pick=null;draw()});return}
    const it=items[i],ok=pick&&pick[0]===it.v&&pick[1]===it.t;
    const cell=(v,t)=>{const me=pick&&pick[0]===v&&pick[1]===t,right=v===it.v&&t===it.t;return `<button class="cell${pick?(right?' ok':(me?' no':'')):''}${v&&t?' sound':''}" data-v="${v}" data-t="${t}"${pick?' disabled':''}>${v&&t?'Sound':'Unsound'}</button>`};
    host.innerHTML=`<p class="small muted">Argument ${i+1} of ${items.length} · Score ${score}</p><div class="qbox"><p style="font-size:17px">${esc(it.a)}</p>
     <div class="grid2"><span></span><span class="h">All premises true</span><span class="h">A premise is false</span>
      <span class="rh">Valid</span>${cell(1,1)}${cell(1,0)}<span class="rh">Invalid</span>${cell(0,1)}${cell(0,0)}</div>
     ${pick?`<p class="fb ${ok?'ok':'no'}">${ok?'✓ Right. ':`Not quite. It belongs in “${lab.find(l=>l[0]===it.v&&l[1]===it.t)[2]}.” `}${esc(it.why)}</p><div><button class="btn sm" data-n>${i+1<items.length?'Next argument ›':'See my score'}</button></div>`:''}</div>`;
    $$('.cell',host).forEach(b=>b.addEventListener('click',()=>{pick=[+b.dataset.v,+b.dataset.t];if(pick[0]===it.v&&pick[1]===it.t)score++;draw();LL.say(LK.text($('.fb',host)))}));
    const n=$('[data-n]',host);if(n)n.addEventListener('click',()=>{i++;pick=null;draw()})}
  draw()});

/* ---------- ifthen: the four moves on real rules ---------- */
const MOVES=[
 {k:'mp',name:'modus ponens',valid:true,second:r=>`It’s true that ${r.p}.`,concl:r=>`So ${r.q}.`,dots:[[300,250]],why:'You know P, and P is inside Q. The dot has only one place to be: inside Q.'},
 {k:'mt',name:'modus tollens',valid:true,second:r=>`It’s not true that ${r.q}.`,concl:r=>`So it’s not true that ${r.p}.`,dots:[[548,300]],why:'You know you’re outside Q. P is inside Q, so you’re outside P too.'},
 {k:'ac',name:'affirming the consequent',valid:false,second:r=>`It’s true that ${r.q}.`,concl:r=>`So ${r.p}.`,dots:[[300,250],[160,200]],why:'You know you’re inside Q, but Q has room outside P. The dot could be in either place.'},
 {k:'da',name:'denying the antecedent',valid:false,second:r=>`It’s not true that ${r.p}.`,concl:r=>`So it’s not true that ${r.q}.`,dots:[[160,200],[548,300]],why:'You know you’re outside P, but that could be inside Q or outside it.'}];
function ifSVG(r,dots){return `<svg viewBox="0 0 600 360" role="img" aria-label="The ${esc(r.pS)} circle inside the ${esc(r.qS)} circle, with the possible places for the case">
  <circle cx="300" cy="185" r="160" class="cP"/><text x="300" y="20" text-anchor="middle" class="lbl tP">Q: ${esc(r.qS)}</text>
  <circle cx="300" cy="225" r="78" class="cS"/><text x="300" y="220" text-anchor="middle" class="lbl-m tS" style="font-size:17px;font-weight:700">P: ${esc(r.pS)}</text>
  <text x="300" y="86" text-anchor="middle" class="lbl-s" style="font-size:15px">other ways to be in Q:</text><text x="300" y="106" text-anchor="middle" class="lbl-s" style="font-size:15px">${esc(r.other)}</text>
  ${dots?dots.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13" class="xdot"${dots.length>1?' opacity=".8"':''}/>${dots.length>1?`<text x="${x}" y="${y-20}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:var(--v-x)">?</text>`:''}`).join(''):''}</svg>`}
LL.tool('ifthen',function(host,T){
  const deck=LL.shuffle(T.rules.flatMap(r=>MOVES.map(m=>({r,m})))).filter((x,i,a)=>a.slice(0,i).filter(y=>y.m.k===x.m.k).length<2).slice(0,8);
  let i=0,score=0,pick=null;
  function draw(){if(i>=deck.length){stage2();return}const {r,m}=deck[i],ok=pick!=null&&pick===m.valid;
    host.innerHTML=`<p class="small muted">Argument ${i+1} of ${deck.length} · Score ${score}</p><div class="qbox"><span class="k">Valid or invalid?</span>
     <p style="font-size:17px">If ${esc(r.p)}, then ${esc(r.q)}.<br>${esc(m.second(r))}<br><b>${esc(m.concl(r))}</b></p>
     <div class="opts"><button class="opt${pick==null?'':(m.valid?' ok':(pick===true?' no':''))}" data-a="1"${pick!=null?' disabled':''}>Valid: the conclusion is forced</button><button class="opt${pick==null?'':(!m.valid?' ok':(pick===false?' no':''))}" data-a="0"${pick!=null?' disabled':''}>Invalid: it could be false</button></div>
     <div class="stage sv" style="background:var(--card2);border-radius:10px;padding:6px">${ifSVG(r,pick!=null?m.dots:null)}</div>
     ${pick!=null?`<p class="fb ${ok?'ok':'no'}">${ok?'✓ Right.':'Not quite.'} This move is <b>${m.name}</b> (${m.valid?'valid':'invalid'}). ${m.why}</p><div><button class="btn sm" data-n>${i+1<deck.length?'Next argument ›':'One more skill ›'}</button></div>`:''}</div>`;
    $$('[data-a]',host).forEach(b=>b.addEventListener('click',()=>{pick=b.dataset.a==='1';if(pick===m.valid)score++;draw();LL.say(LK.text($('.fb',host)))}));
    const n=$('[data-n]',host);if(n)n.addEventListener('click',()=>{i++;pick=null;draw()})}
  function stage2(){const items=T.rules.map(r=>{const ch=[`If ${r.q}, then ${r.p}.`,`If it’s not true that ${r.q}, then it’s not true that ${r.p}.`,`If it’s not true that ${r.p}, then it’s not true that ${r.q}.`];
      return {q:`Rule: “If ${esc(r.p)}, then ${esc(r.q)}.” Which one means <b>exactly the same</b> as the rule?`,choices:ch.map(esc),answer:1,why:'That’s the contrapositive (if not Q, then not P). The first is the converse and the third is the inverse; both can be false when the rule is true.'}});
    host.innerHTML=`<div class="qbox"><p class="score">You got ${score} of ${deck.length} on the first try.</p></div><p class="lead">One more skill from geometry: find the contrapositive.</p><div id="s2"></div>`;
    LL.mcRun($('#s2',host),items.map(it=>{const order=LL.shuffle([0,1,2]);return Object.assign({},it,{choices:order.map(k=>it.choices[k]),answer:order.indexOf(1)})}),{k:'Same meaning?'})}
  draw()});

/* ---------- switches: predict the light for every row of a truth table ---------- */
const EXPR=[
 {k:'and',t:'A and B',f:(a,b)=>a&&b,circ:'ser',note:'AND: true only when both are true.'},
 {k:'or',t:'A or B',f:(a,b)=>a||b,circ:'par',note:'OR: true when at least one is true (including both).'},
 {k:'nota',t:'not A',f:(a)=>!a,one:1,note:'NOT flips it: the light is on exactly when A is off.'},
 {k:'andnot',t:'A and not B',f:(a,b)=>a&&!b,note:'True only when A is on and B is off.'},
 {k:'xor',t:'A or B, but not both (exclusive or)',f:(a,b)=>a!==b,note:'Exclusive or: true when exactly one is on. The menu “or.”'},
 {k:'if',t:'If A, then B (a promise)',f:(a,b)=>!a||b,note:'A promise is only broken when A happens and B doesn’t. Example: A = “you clean your room,” B = “you get Chipotle.”'},
 {k:'dm',t:'not (A and B)',f:(a,b)=>!(a&&b),note:'Not both. This matches “(not A) or (not B)”: De Morgan’s law.'}];
function swSVG(e,a,b,lit){const lev=(x,y,on)=>`<circle cx="${x}" cy="${y}" r="6" class="inkf"/><circle cx="${x+70}" cy="${y}" r="6" class="inkf"/><line x1="${x}" y1="${y}" x2="${on?x+70:x+62}" y2="${on?y:y-34}" class="ink" stroke-width="6" stroke-linecap="round"/>`;
  const w='class="ink" stroke-width="4" fill="none"';let s=`<svg viewBox="0 0 600 300" role="img" aria-label="Switch A is ${a?'on':'off'}${e.one?'':`, switch B is ${b?'on':'off'}`}; the light is ${lit==null?'hidden until you predict':lit?'on':'off'}">`;
  s+=`<rect x="34" y="130" width="42" height="74" rx="6" class="box" style="stroke-width:3"/><text x="55" y="160" text-anchor="middle" class="lbl">+</text><text x="55" y="192" text-anchor="middle" class="lbl">−</text>`;
  s+=`<circle cx="520" cy="168" r="56" style="fill:var(--hl)" opacity="${lit?0.55:0}"/><circle cx="520" cy="168" r="30" class="box" style="stroke-width:3"/>${lit==null?'<text x="520" y="176" text-anchor="middle" class="lbl">?</text>':''}`;
  s+=`<path d="M55 204 V270 H520 V198" ${w}/>`;
  if(e.circ==='ser')s+=`<path d="M55 130 V80 H170 M240 80 H330 M400 80 H520 V138" ${w}/>${lev(170,80,a)}${lev(330,80,b)}<text x="205" y="122" text-anchor="middle" class="lbl tS">A</text><text x="365" y="122" text-anchor="middle" class="lbl tP">B</text>`;
  else if(e.circ==='par')s+=`<path d="M55 130 V80 H170 M120 80 V190 H170 M240 80 H300 M240 190 H300 V80 M300 80 H520 V138" ${w}/>${lev(170,80,a)}${lev(170,190,b)}<text x="205" y="122" text-anchor="middle" class="lbl tS">A</text><text x="205" y="232" text-anchor="middle" class="lbl tP">B</text>`;
  else s+=`<path d="M55 130 V80 H520 V138" ${w}/><rect x="170" y="44" width="250" height="72" rx="10" class="box"/><text x="295" y="74" text-anchor="middle" class="lbl-m" style="font-weight:700">${esc(e.t.length>22?'the rule':e.t)}</text><text x="295" y="100" text-anchor="middle" class="lbl-s" style="font-size:15px">A ${a?'ON':'OFF'}${e.one?'':` · B ${b?'ON':'OFF'}`}</text>`;
  return s+'</svg>'}
LL.tool('switches',function(host){let ei=0,pred={},cur=0;
  function draw(){const e=EXPR[ei],rows=e.one?[[1],[0]]:[[1,1],[1,0],[0,1],[0,0]],r=rows[cur]||rows[0],done=rows.every((_,i)=>pred[ei+'-'+i]!=null),right=rows.filter((x,i)=>pred[ei+'-'+i]===!!e.f(x[0],x[1])).length;
    const pk=pred[ei+'-'+cur];
    host.innerHTML=`<div class="qbox"><label class="k" for="esel">Statement</label><select id="esel" class="sel">${EXPR.map((x,i)=>`<option value="${i}"${i===ei?' selected':''}>${esc(x.t)}</option>`).join('')}</select>
     <div class="stage sv" style="background:var(--card2);border-radius:10px;padding:6px">${swSVG(e,r[0],r[1],pk==null?null:!!e.f(r[0],r[1]))}</div>
     <table class="tt"><thead><tr><th>A</th>${e.one?'':'<th>B</th>'}<th>Your prediction</th><th>Light</th></tr></thead><tbody>${rows.map((x,i)=>{const p=pred[ei+'-'+i],v=!!e.f(x[0],x[1]);return `<tr class="${i===cur?'now':''}"><td class="${x[0]?'T':'F'}">${x[0]?'T':'F'}</td>${e.one?'':`<td class="${x[1]?'T':'F'}">${x[1]?'T':'F'}</td>`}<td>${p==null?(i===cur?`<button class="opt" data-p="1" style="min-height:34px;padding:4px 10px">ON</button> <button class="opt" data-p="0" style="min-height:34px;padding:4px 10px">OFF</button>`:`<button class="opt" data-row="${i}" style="min-height:34px;padding:4px 10px">Go to row</button>`):(p?'ON':'OFF')+(p===v?' ✓':' ✗')}</td><td class="${p==null?'':(v?'T':'F')}">${p==null?'':(v?'ON':'OFF')}</td></tr>`}).join('')}</tbody></table>
     ${pk!=null?`<p class="fb ${pk===!!e.f(r[0],r[1])?'ok':'no'}">${pk===!!e.f(r[0],r[1])?'✓ Right.':'Not quite.'} ${esc(e.note)}</p>${!done?'<div><button class="btn sm" data-nextrow>Next row ›</button></div>':''}`:''}
     ${done?`<p class="score">${right} of ${rows.length} predicted right. Try another statement.</p>`:''}</div>`;
    $('#esel',host).addEventListener('change',ev=>{ei=+ev.target.value;cur=0;draw()});
    $$('[data-p]',host).forEach(b=>b.addEventListener('click',()=>{pred[ei+'-'+cur]=b.dataset.p==='1';draw();LL.say(LK.text($('.fb',host)))}));
    const nb=$('[data-nextrow]',host);if(nb)nb.addEventListener('click',()=>{const nx=rows.findIndex((_,i)=>pred[ei+'-'+i]==null);if(nx>=0){cur=nx;draw()}});
    $$('[data-row]',host).forEach(b=>b.addEventListener('click',()=>{cur=+b.dataset.row;draw()}))}
  draw()});

/* ---------- Venn diagrams (2 or 3 circles) ---------- */
const VG={2:{view:[600,390],c:[[225,190,135],[375,190,135]],lab:[[150,36,'middle'],[450,36,'middle']],ctr:{0:[40,370],1:[160,190],2:[440,190],3:[300,190]}},
 3:{view:[600,425],c:[[235,165,118],[365,165,118],[300,277,118]],lab:[[110,28,'middle'],[490,28,'middle'],[300,418,'middle']],ctr:{0:[40,40],1:[180,127],2:[420,127],3:[300,120],4:[300,345],5:[226,253],6:[374,253],7:[300,211]}}};
LL.VG=VG;
/* Where an X goes: one region = its center; two regions = on the line between them. */
LL.vennPos=(n,cands)=>{const C=VG[n].ctr;if(cands.length===1)return C[cands[0]];const p=cands.map(b=>C[b]);return [p.reduce((a,q)=>a+q[0],0)/p.length,p.reduce((a,q)=>a+q[1],0)/p.length]};
LL.xMark=(id,x,y,on)=>`<g id="${id}"${on?'':' opacity="0"'}><line x1="${x-14}" y1="${y-14}" x2="${x+14}" y2="${y+14}" class="xmark"/><line x1="${x-14}" y1="${y+14}" x2="${x+14}" y2="${y-14}" class="xmark"/></g>`;
LL.vennSVG=function(o){const n=o.n,G=VG[n],p=o.id||'v',cls=['cS','cP','cM'],tc=['tS','tP','tM'];const [W,H]=G.view;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.aria||'Venn diagram')}"><defs>`;
  G.c.forEach((c,i)=>{s+=`<clipPath id="${p}c${i}"><circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}"/></clipPath>`});
  for(let b=1;b<(1<<n);b++){s+=`<mask id="${p}m${b}"><rect width="${W}" height="${H}" fill="#fff"/>${G.c.map((c,i)=>(b>>i)&1?'':`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#000"/>`).join('')}</mask>`}
  s+='</defs>';
  G.c.forEach((c,i)=>{s+=`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" class="${cls[i]}"/>`});
  for(let b=1;b<(1<<n);b++){let inner=`<rect width="${W}" height="${H}" class="shade" mask="url(#${p}m${b})"/>`;for(let i=0;i<n;i++)if((b>>i)&1)inner=`<g clip-path="url(#${p}c${i})">${inner}</g>`;
    s+=`<g id="${p}r${b}" opacity="${o.shaded&&o.shaded.includes(b)?0.85:0}">${inner}</g>`}
  G.c.forEach((c,i)=>{s+=`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="none" stroke="${['var(--v-s)','var(--v-p)','var(--v-m)'][i]}" stroke-width="3"/>`});
  (o.labels||[]).forEach((l,i)=>{const q=G.lab[i];s+=`<text id="${p}L${i}" x="${q[0]}" y="${q[1]}" text-anchor="${q[2]}" class="lbl ${tc[i]}">${esc(l)}</text>`});
  return s+(o.extra||'')+'</svg>'};
/* which region bits a point (svg coords) is in */
LL.vennHit=(n,x,y)=>{let b=0;VG[n].c.forEach((c,i)=>{if((x-c[0])**2+(y-c[1])**2<=c[2]**2)b|=1<<i});return b};
LL.svgPoint=(svg,ev)=>{const pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;const m=svg.getScreenCTM();return m?pt.matrixTransform(m.inverse()):{x:0,y:0}};

/* ---------- shader: draw A, E, I, O statements on two circles ---------- */
const PAIRS=[['RJ seniors','drivers'],['dogs','good swimmers'],['Broncos fans','Coloradans'],['pizzas','vegetarian foods'],['phones','waterproof things'],['saints','teenagers'],['songs on my playlist','country songs'],['planets','things with moons']];
const AEIO={A:{t:(s,p)=>`All ${s} are ${p}.`,sh:[1],x:[]},E:{t:(s,p)=>`No ${s} are ${p}.`,sh:[3],x:[]},I:{t:(s,p)=>`Some ${s} are ${p}.`,sh:[],x:[3]},O:{t:(s,p)=>`Some ${s} are not ${p}.`,sh:[],x:[1]}};
LL.AEIO=AEIO;
LL.tool('shader',function(host,T){const tasks=LL.shuffle(['A','E','I','O','A','E','I','O']).map((k,i)=>({k,pr:PAIRS[i%PAIRS.length]}));let ti=0,st={},checked=false,score=0;
  const RN={1:'left only',3:'the middle (both)',2:'right only'};
  function draw(){if(ti>=tasks.length){host.innerHTML=`<div class="qbox"><p class="score">You drew ${score} of ${tasks.length} right on the first check.</p><div><button class="btn sm" data-again>Go again</button></div></div>`;$('[data-again]',host).addEventListener('click',()=>{ti=0;score=0;st={};checked=false;draw()});return}
    const tk=tasks[ti],A=AEIO[tk.k],want=b=>A.sh.includes(b)?'s':A.x.includes(b)?'x':'',ok=[1,2,3].every(b=>(st[b]||'')===want(b));
    const extra=[1,2,3].map(b=>st[b]==='x'?LL.xMark('xx'+b,...VG[2].ctr[b],true):'').join('');
    host.innerHTML=`<p class="small muted">Statement ${ti+1} of ${tasks.length} · Score ${score}</p><div class="qbox"><span class="k">Draw it</span><p style="font-size:20px"><b>${esc(A.t(tk.pr[0],tk.pr[1]))}</b></p>
     <p class="small muted">Tap a region to change it: blank → <b>shaded</b> (nothing there) → <b>X</b> (at least one there) → blank.</p>
     <div class="stage sv" style="background:var(--card2);border-radius:10px;padding:6px;cursor:pointer">${LL.vennSVG({n:2,id:'sh',labels:tk.pr,shaded:[1,2,3].filter(b=>st[b]==='s'),extra,aria:'Two circles: '+tk.pr.join(' and ')})}</div>
     <div class="formrow">${[1,3,2].map(b=>`<button class="opt" data-r="${b}" style="min-height:36px">${RN[b]}: ${st[b]==='s'?'shaded':st[b]==='x'?'X':'blank'}</button>`).join('')}</div>
     ${checked?`<p class="fb ${ok?'ok':'no'}">${ok?'✓ Right. ':'Not yet. '}${ok?({A:'“All” leaves nothing in the left-only part, so it’s shaded.',E:'“No” means nothing is in both, so the middle is shaded.',I:'“Some” puts an X where at least one thing is in both.',O:'“Some … are not” puts an X in the left-only part.'})[tk.k]:'Hint: “All” and “No” shade (they say a region is empty). “Some” draws an X (it says at least one thing is there). Which region does the sentence talk about?'}</p>`:''}
     <div class="formrow">${checked&&ok?`<button class="btn" data-n>Next ›</button>`:`<button class="btn" data-check>Check</button>`}</div></div>`;
    const svg=$('svg',host);svg.addEventListener('click',ev=>{const q=LL.svgPoint(svg,ev),b=LL.vennHit(2,q.x,q.y);if(b)cyc(b)});
    $$('[data-r]',host).forEach(x=>x.addEventListener('click',()=>cyc(+x.dataset.r)));
    const c=$('[data-check]',host);if(c)c.addEventListener('click',()=>{if(!tk.tried&&ok)score++;checked=true;tk.tried=1;draw();LL.say(LK.text($('.fb',host)))});
    const n=$('[data-n]',host);if(n)n.addEventListener('click',()=>{ti++;st={};checked=false;draw()})}
  function cyc(b){st[b]=({'':'s',s:'x',x:''})[st[b]||''];checked=false;draw()}
  draw()});

/* ---------- square: set one corner true or false, see what follows (traditional square, group not empty) ---------- */
const SQ={A:{T:{E:'F',I:'T',O:'F'},F:{O:'T',E:'?',I:'?'}},E:{T:{A:'F',I:'F',O:'T'},F:{I:'T',A:'?',O:'?'}},I:{T:{E:'F',A:'?',O:'?'},F:{E:'T',A:'F',O:'T'}},O:{T:{A:'F',E:'?',I:'?'},F:{A:'T',E:'F',I:'T'}}};
LL.SQ=SQ;
const SQS={A:'All of the players are seniors.',E:'None of the players are seniors.',I:'Some of the players are seniors.',O:'Some of the players are not seniors.'};
const SQWHY={A:{T:'If all are seniors: “none” is false (contraries can’t both be true), “some are” is true, and “some aren’t” is false (its contradictory).',F:'If not all are seniors, then some aren’t (the contradictory). “None” and “some are” could go either way.'},
 E:{T:'If none are seniors: “all” is false, “some are” is false (its contradictory), and “some aren’t” is true.',F:'If it’s false that none are, then some are (the contradictory). “All” and “some aren’t” could go either way.'},
 I:{T:'If some are seniors, then “none are” is false (the contradictory). “All” and “some aren’t” could go either way.',F:'If not even one is a senior, then none are, all is false, and some aren’t is true.'},
 O:{T:'If some aren’t seniors, then “all are” is false (the contradictory). “None” and “some are” could go either way.',F:'If it’s false that some aren’t, then all are: so none is false and some are is true.'}};
LL.tool('square',function(host,T){let set=null;
  function corner(k){const v=set?(set[0]===k?set[1]:SQ[set[0]][set[1]][k]):null;return `<button class="cell${v==='T'?' ok':v==='F'?' no':''}" data-k="${k}" style="text-align:left"><b style="color:var(--rj);font-size:20px">${k}</b> ${esc(SQS[k])}<br><span class="light ${v==='T'?'t':v==='F'?'f':'u'}" style="margin-top:6px">${v==null?'tap to set':v==='T'?'True':v==='F'?'False':'Unknown'}</span>${set&&set[0]===k?' <span class="small">(you set this)</span>':''}</button>`}
  function draw(){box.innerHTML=`<div class="qbox"><span class="k">The square</span><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${corner('A')}${corner('E')}${corner('I')}${corner('O')}</div>
    ${set?`<p class="fb info">${esc(SQWHY[set[0]][set[1]])}</p>`:'<p class="small muted">Tap a corner. Each tap switches it between True and False.</p>'}</div>`;
    $$('[data-k]',box).forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.k;set=set&&set[0]===k?[k,set[1]==='T'?'F':'T']:[k,'T'];draw();LL.say(LK.text($('.fb',box)))}));
  }
  host.innerHTML='<div id="sqc"></div><h4 style="margin-top:8px">Now without the square</h4><div id="sqq"></div>';const box=$('#sqc',host);
    LL.mcRun($('#sqq',host),[
     {q:'“All of our fries are gluten-free” is <b>false</b>. Which must be true?',choices:['None of the fries are gluten-free','Some of the fries are not gluten-free','Some of the fries are gluten-free','All of the fries contain gluten'],answer:1,why:'A false means its contradictory, O, is true. The others could go either way.'},
     {q:'“Some teachers here are runners” is <b>false</b>. Which must be true?',choices:['All teachers here are runners','No teachers here are runners','Some teachers here are not runners and some are','Nothing follows'],answer:1,why:'If not even one is a runner, then none are (E). It also follows that some aren’t (O).'},
     {q:'“No song on this playlist is under 2 minutes” is <b>true</b>. What about “Some songs on it are under 2 minutes”?',choices:['True','False','Unknown'],answer:1,why:'E and I are contradictories: one true means the other is false.'},
     {q:'“Some of my friends are left-handed” is <b>true</b>. What about “All of my friends are left-handed”?',choices:['True','False','Unknown'],answer:2,why:'Knowing some are tells you nothing about whether all are.'}],{k:'What follows?',shuffle:false});
  draw()});

/* ---------- syllogisms: Venn test on three circles (S=1, P=2, M=4) ---------- */
const TB={S:1,P:2,M:4};
const regs=(f)=>[1,2,3,4,5,6,7].filter(f);
LL.syl=function(prems,concl){const shaded=new Set(),xs=[],steps=[];const ord=prems.map((p,i)=>[p,i]).sort((a,b)=>('AE'.includes(a[0][0])?0:1)-('AE'.includes(b[0][0])?0:1));
  ord.forEach(([[t,x,y],i])=>{const X=TB[x],Y=TB[y];
    if(t==='A'){const r=regs(b=>(b&X)&&!(b&Y));r.forEach(b=>shaded.add(b));steps.push({i,shade:r})}
    else if(t==='E'){const r=regs(b=>(b&X)&&(b&Y));r.forEach(b=>shaded.add(b));steps.push({i,shade:r})}
    else{const r=regs(b=>(b&X)&&(t==='I'?(b&Y):!(b&Y))&&!shaded.has(b));xs.push(r);steps.push({i,x:r})}});
  const [t,x,y]=concl,X=TB[x],Y=TB[y];let valid;
  if(t==='A')valid=regs(b=>(b&X)&&!(b&Y)).every(b=>shaded.has(b));
  else if(t==='E')valid=regs(b=>(b&X)&&(b&Y)).every(b=>shaded.has(b));
  else{const need=new Set(regs(b=>(b&X)&&(t==='I'?(b&Y):!(b&Y))));valid=xs.some(c=>c.length&&c.every(b=>need.has(b)))}
  return {shaded,xs,steps,valid}};
const SENT={A:(a,b)=>`All ${a} are ${b}.`,E:(a,b)=>`No ${a} are ${b}.`,I:(a,b)=>`Some ${a} are ${b}.`,O:(a,b)=>`Some ${a} are not ${b}.`};
LL.SENT=SENT;
const SYL=[
 {T:{S:'whales',P:'air-breathers',M:'mammals'},p:[['A','M','P'],['A','S','M']],c:['A','S','P'],name:'Barbara',say:['All mammals breathe air.','All whales are mammals.','So all whales breathe air.']},
 {T:{S:'snakes',P:'furry things',M:'reptiles'},p:[['E','M','P'],['A','S','M']],c:['E','S','P'],name:'Celarent',say:['No reptiles have fur.','All snakes are reptiles.','So no snakes have fur.']},
 {T:{S:'RJ seniors',P:'people who did a service project',M:'Eagle Scouts'},p:[['A','M','P'],['I','S','M']],c:['I','S','P'],name:'Darii',say:['All Eagle Scouts have done a service project.','Some RJ seniors are Eagle Scouts.','So some RJ seniors have done a service project.']},
 {T:{S:'athletes',P:'cheese eaters',M:'vegans'},p:[['E','M','P'],['I','S','M']],c:['O','S','P'],name:'Ferio',say:['No vegans eat cheese.','Some athletes are vegans.','So some athletes don’t eat cheese.']},
 {T:{S:'whales',P:'fish',M:'things with gills'},p:[['A','P','M'],['E','S','M']],c:['E','S','P'],name:'Camestres',say:['All fish have gills.','No whales have gills.','So no whales are fish.']},
 {T:{S:'dogs',P:'cats',M:'mammals'},p:[['A','S','M'],['A','P','M']],c:['A','S','P'],say:['All dogs are mammals.','All cats are mammals.','So all dogs are cats.'],flaw:'The middle term (mammals) never covers all of its group. Dogs and cats are each inside mammals, but nothing links them to each other.'},
 {T:{S:'teachers',P:'Broncos fans',M:'humans'},p:[['A','S','M'],['I','M','P']],c:['I','S','P'],say:['All teachers are humans.','Some humans are Broncos fans.','So some teachers are Broncos fans.'],flaw:'The X for “some humans are Broncos fans” could be among the teachers or not. So the conclusion isn’t forced, even though it happens to be true.'},
 {T:{S:'cats',P:'animals',M:'dogs'},p:[['A','M','P'],['E','S','M']],c:['E','S','P'],say:['All dogs are animals.','No cats are dogs.','So no cats are animals.'],flaw:'Being outside the dogs circle doesn’t keep cats out of the animals circle. The part of “animals” outside “dogs” is left open.'},
 {T:{S:'RJ students',P:'Olympians',M:'runners'},p:[['I','S','M'],['I','M','P']],c:['I','S','P'],say:['Some RJ students are runners.','Some runners are Olympians.','So some RJ students are Olympians.'],flaw:'Two “some” premises never force anything: each X can sit on a line, so no region is guaranteed to have anyone in it.'}];
LL.SYLBANK=SYL;
function sylSVG(sy,show){const V=LL.VG[3].ctr;let extra='';(show.x||[]).forEach((c,k)=>{if(c.length){const [x,y]=LL.vennPos(3,c);extra+=LL.xMark('sx'+k,x,y,true)}});
  return LL.vennSVG({n:3,id:'sy',labels:[sy.T.S,sy.T.P,sy.T.M],shaded:[...(show.shaded||[])],extra,aria:'Three circles: '+sy.T.S+', '+sy.T.P+' and '+sy.T.M})}
LL.tool('syllogism',function(host,T){const order=LL.shuffle(SYL);let k=0,stage=0,pick=null,score=0;
  function draw(){if(k>=order.length){host.innerHTML=`<div class="qbox"><p class="score">You judged ${score} of ${order.length} right.</p><div><button class="btn sm" data-again>Go again</button></div></div>`;$('[data-again]',host).addEventListener('click',()=>{k=0;stage=0;pick=null;score=0;draw()});return}
    const sy=order[k],R=LL.syl(sy.p,sy.c);const sh=new Set(),xs=[];R.steps.slice(0,stage).forEach(s=>{(s.shade||[]).forEach(b=>sh.add(b));if(s.x)xs.push(s.x)});
    const nextStep=R.steps[stage];
    host.innerHTML=`<p class="small muted">Syllogism ${k+1} of ${order.length} · Score ${score}</p><div class="qbox">
     <p style="font-size:17px">${sy.say.map((s,i)=>`<span style="${i===2?'font-weight:700':''}${nextStep&&nextStep.i===i?';background:var(--accent-soft)':''}">${i+1<3?'Premise '+(i+1)+': ':'Conclusion: '}${esc(s)}</span>`).join('<br>')}</p>
     <div class="stage sv" style="background:var(--card2);border-radius:10px;padding:6px">${sylSVG(sy,{shaded:sh,x:xs})}</div>
     ${stage<R.steps.length?`<p class="small muted">${stage===0&&R.steps[0].i===1?'Draw premise 2 first: an “all” or “no” premise (shading) always goes before a “some” premise (X).':''}</p><div><button class="btn" data-draw>Draw premise ${nextStep.i+1} ›</button></div>`
     :pick==null?`<p><b>Both premises are drawn. Is the conclusion already in the picture?</b></p><div class="opts"><button class="opt" data-v="1">Yes: valid</button><button class="opt" data-v="0">No: invalid</button></div>`
     :`<p class="fb ${pick===R.valid?'ok':'no'}">${pick===R.valid?'✓ Right. ':'Not quite. '}${R.valid?`It’s <b>valid</b>: drawing the premises already drew the conclusion.${sy.name?` Medieval students called this form <b>${sy.name}</b>.`:''}`:`It’s <b>invalid</b>. ${esc(sy.flaw)}`}</p><div><button class="btn sm" data-n>${k+1<order.length?'Next syllogism ›':'See my score'}</button></div>`}</div>`;
    const d=$('[data-draw]',host);if(d)d.addEventListener('click',()=>{stage++;draw()});
    $$('[data-v]',host).forEach(b=>b.addEventListener('click',()=>{pick=b.dataset.v==='1';if(pick===R.valid)score++;draw();LL.say(LK.text($('.fb',host)))}));
    const n=$('[data-n]',host);if(n)n.addEventListener('click',()=>{k++;stage=0;pick=null;draw()})}
  draw()});

/* ---------- a pretend school of 1,600 students (sampling) ---------- */
LL.rng=seed=>{let s=seed>>>0||1;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}};
LL.school=function(){if(LL._school)return LL._school;const r=LL.rng(20261119),N=1600,cols=40,st=[];
  for(let i=0;i<N;i++){const c=i%cols,rw=Math.floor(i/cols);st.push({i,c,r:rw,lax:c<6&&rw<10,lib:c>=32&&rw>=30,yes:false})}
  const lax=st.filter(s=>s.lax),lib=st.filter(s=>s.lib),rest=st.filter(s=>!s.lax&&!s.lib);
  LL.shuffle(lax,11).slice(0,57).forEach(s=>s.yes=true);LL.shuffle(lib,12).slice(0,6).forEach(s=>s.yes=true);LL.shuffle(rest,13).slice(0,497).forEach(s=>s.yes=true);
  LL._school={st,N,cols,yes:560,lax,lib,rest};return LL._school};
LL.schoolSVG=function(o){const S=LL.school(),g=9,x0=18,y0=44;let s=`<svg viewBox="0 0 600 420" role="img" aria-label="${esc(o.aria||'1,600 dots, one for each student in a pretend school')}">`;
  s+=`<rect x="${x0-6}" y="${y0-6}" width="${S.cols*g+3}" height="${S.cols*g+3}" rx="6" class="bgc" style="stroke:var(--line)"/>`;
  s+=`<g id="${o.id||'sc'}dots">`+S.st.map(p=>`<circle cx="${x0+p.c*g+4}" cy="${y0+p.r*g+4}" r="3.2" class="${o.hide?'shade':p.yes?'tS':'tP'}" style="fill:${o.hide?'var(--v-shade)':p.yes?'var(--v-s)':'var(--v-p)'}"/>`).join('')+'</g>';
  s+=`<rect x="${x0-3}" y="${y0-3}" width="${6*g}" height="${10*g}" fill="none" class="rjst" stroke-width="2" stroke-dasharray="4 3"/><text x="${x0}" y="${y0-12}" style="font-size:14px;font-weight:700;fill:var(--rj)">lacrosse team</text>`;
  s+=`<rect x="${x0+32*g-3}" y="${y0+30*g-3}" width="${8*g}" height="${10*g}" fill="none" class="rjst" stroke-width="2" stroke-dasharray="4 3"/><text x="${x0+40*g+8}" y="${y0+34*g}" style="font-size:14px;font-weight:700;fill:var(--rj)">library</text><text x="${x0+40*g+8}" y="${y0+34*g+17}" style="font-size:14px;font-weight:700;fill:var(--rj)">regulars</text>`;
  (o.rings||[]).forEach((set,k)=>{s+=`<g id="${(o.id||'sc')}ring${k}"${o.ringOn&&o.ringOn[k]?'':' opacity="0"'}>`+set.map(i=>{const p=S.st[i];return `<circle cx="${x0+p.c*g+4}" cy="${y0+p.r*g+4}" r="5.6" fill="none" style="stroke:var(--v-ink)" stroke-width="2"/>`}).join('')+'</g>'});
  return s+(o.extra||'')+'</svg>'};
LL.tool('sample',function(host,T){const S=LL.school();let method='random',n=25,hist=[],reveal=false,last=null;
  const M={random:['Random students from the whole school',()=>S.st],lax:['Ask at lacrosse practice',()=>S.lax],lib:['Ask in the library after school',()=>S.lib]};
  function survey(){const pool=M[method][1](),take=LL.shuffle(pool).slice(0,Math.min(n,pool.length)),yes=take.filter(p=>p.yes).length;last={ids:take.map(p=>p.i),est:100*yes/take.length,n:take.length,method};hist.push(last);draw()}
  function strip(){const W=560;let s=`<svg viewBox="0 0 600 120" role="img" aria-label="Your survey results on a line from 0 to 100 percent"><line x1="20" y1="60" x2="${20+W}" y2="60" class="ink" stroke-width="2"/>`;
    for(let v=0;v<=100;v+=25)s+=`<line x1="${20+W*v/100}" y1="54" x2="${20+W*v/100}" y2="66" class="ink" stroke-width="2"/><text x="${20+W*v/100}" y="88" text-anchor="middle" style="font-size:15px">${v}%</text>`;
    hist.forEach((h,k)=>{const x=20+W*h.est/100,c=h.method==='random'?'var(--v-s)':'var(--rj)';s+=`<circle cx="${x}" cy="${44-((k%4)*8)}" r="6" style="fill:${c}" opacity="${h===last?1:.55}"/>`});
    if(reveal)s+=`<line x1="${20+W*.35}" y1="20" x2="${20+W*.35}" y2="72" style="stroke:var(--good)" stroke-width="4"/><text x="${20+W*.35}" y="112" text-anchor="middle" style="font-size:15px;font-weight:700;fill:var(--good)">truth: 35%</text>`;
    return s+'</svg>'}
  function draw(){const moe=method==='random'&&last?Math.round(100/Math.sqrt(last.n)):null;
    host.innerHTML=`<div class="qbox"><span class="k">Should the school spend $20,000 on new lacrosse turf? Survey students to find out what percent say yes.</span>
     <div class="formrow"><label>How: <select class="sel" id="sm">${Object.entries(M).map(([k,v])=>`<option value="${k}"${k===method?' selected':''}>${v[0]}</option>`).join('')}</select></label>
      <label>How many: <select class="sel" id="sn">${[5,25,100,400].map(v=>`<option${v===n?' selected':''}>${v}</option>`).join('')}</select></label>
      <button class="btn" id="go">Take the survey</button></div>
     ${method!=='random'&&n>(method==='lax'?60:80)?`<p class="small muted">Only ${method==='lax'?60:80} students are there, so you can ask at most that many.</p>`:''}
     <div class="stage sv" style="background:var(--card2);border-radius:10px;padding:6px">${LL.schoolSVG({id:'tool',hide:!reveal,rings:last?[last.ids]:[],ringOn:[1],aria:'1,600 dots for the pretend school; circled dots are the students you asked'})}</div>
     ${last?`<p class="fb info" style="font-size:17px">You asked <b>${last.n}</b> students. <b>${last.est.toFixed(0)}%</b> said yes.${moe?` A random survey this size is usually within about <b>±${moe} points</b> of the truth (the margin of error is roughly 100 ÷ √${last.n}).`:' This group isn’t random, so no margin of error applies: it can be off by any amount.'}</p>`:'<p class="small muted">Each dot is one student. Their answers are hidden, just like in real life. Take a survey to find out.</p>'}
     <h4>Your surveys so far</h4><div class="stage sv">${strip()}</div><p class="small muted">Blue dots: random surveys. Red dots: lacrosse practice or the library.</p>
     <div class="formrow"><button class="btn ghost sm" id="rv">${reveal?'Hide the truth':'Reveal the whole school'}</button><button class="btn ghost sm" id="clr">Clear my surveys</button></div>
     ${reveal?`<p class="fb ok">The truth in this pretend school: <b>560 of 1,600 (35%)</b> say yes. ${hist.length?`Your random surveys landed ${hist.filter(h=>h.method==='random').map(h=>h.est.toFixed(0)+'%').join(', ')||'(none yet)'}. Your other surveys landed ${hist.filter(h=>h.method!=='random').map(h=>h.est.toFixed(0)+'%').join(', ')||'(none yet)'}.`:''} Bigger random samples land closer. A biased sample stays off no matter how big.</p>`:''}</div>`;
    $('#sm',host).addEventListener('change',e=>{method=e.target.value;draw()});$('#sn',host).addEventListener('change',e=>{n=+e.target.value;draw()});
    $('#go',host).addEventListener('click',survey);$('#rv',host).addEventListener('click',()=>{reveal=!reveal;draw()});$('#clr',host).addEventListener('click',()=>{hist=[];last=null;draw()})}
  draw()});

/* ---------- rule: the 2-4-6 game (Wason, 1960) ---------- */
const RULES=[
 {f:(a,b,c)=>a<b&&b<c,ok:'Any three numbers going up',opts:['Even numbers going up by 2','Numbers going up by the same amount','Any three numbers going up','The middle number is the average of the other two']},
 {f:(a,b,c)=>a!==b&&b!==c&&a!==c,ok:'Any three different numbers',opts:['Even numbers going up by 2','Any three different numbers','Numbers going up','Numbers under 10']},
 {f:(a,b,c)=>c>a&&c>b,ok:'The last number is the biggest',opts:['Numbers going up','The last number is the biggest','Even numbers','Each number is 2 more than the last']},
 {f:(a,b,c)=>a+b+c>10,ok:'The three numbers add up to more than 10',opts:['Even numbers going up','The three numbers add up to more than 10','Numbers going up by 2','The middle number is the average']}];
LL.tool('rule',function(host){let ri=Math.floor(Math.random()*RULES.length),log=[],guess=null,pred=null,seen=new Set([ri]);
  function draw(){const R=RULES[ri],brk=log.filter(l=>l.pred===false).length;
    const order=R.opts;host.innerHTML=`<div class="qbox"><span class="k">I have a secret rule for sets of three numbers.</span><p style="font-size:20px"><b>2, 4, 6</b> fits my rule.</p>
     <p>Test your own sets of three numbers to figure out the rule. Before each test, say whether you think it will fit.</p>
     <div class="formrow"><input class="lk-num" id="n1" ${LK.numAttrs} aria-label="first number"><input class="lk-num" id="n2" ${LK.numAttrs} aria-label="second number"><input class="lk-num" id="n3" ${LK.numAttrs} aria-label="third number"></div>
     <div class="formrow"><span>I think it will…</span><button class="opt" data-p="1" aria-pressed="${pred===true}">fit</button><button class="opt" data-p="0" aria-pressed="${pred===false}">not fit</button><button class="btn" id="tst">Test it</button></div>
     <p class="fb info" id="msg" hidden></p>
     ${log.length?`<table class="tt"><thead><tr><th>Your numbers</th><th>You expected</th><th>My rule says</th></tr></thead><tbody>${log.map(l=>`<tr><td>${l.n.join(', ')}</td><td>${l.pred?'fit':'not fit'}</td><td class="${l.fits?'T':'F'}">${l.fits?'✓ fits':'✗ doesn’t fit'}</td></tr>`).join('')}</tbody></table>`:''}
     ${log.length>=3&&guess==null?`<p><b>Ready? What’s my rule?</b></p><div class="opts">${order.map((o,i)=>`<button class="opt" data-g="${i}">${esc(o)}</button>`).join('')}</div>`:log.length<3?'<p class="small muted">Test at least 3 sets before you guess.</p>':''}
     ${guess!=null?`<p class="fb ${order[guess]===R.ok?'ok':'no'}">${order[guess]===R.ok?'✓ You got it.':'Not quite. The rule was: <b>'+esc(R.ok)+'</b>.'} You tested ${log.length} sets, and <b>${brk}</b> time${brk===1?'':'s'} you tried a set you expected to break your idea. ${brk<2?'Most people test only sets they expect to fit, so they never find out their idea is too narrow. Next time, hunt for the black swan.':'That’s the move: try to break your own idea.'}</p><div><button class="btn sm" id="again">New secret rule ›</button></div>`:''}</div>`;
    $$('[data-p]',host).forEach(b=>b.addEventListener('click',()=>{pred=b.dataset.p==='1';draw()}));
    $('#tst',host).addEventListener('click',()=>{const v=['n1','n2','n3'].map(id=>LK.num($('#'+id,host).value)),m=$('#msg',host);
      if(v.some(x=>!isFinite(x))){m.hidden=false;m.textContent='Type three numbers first.';return}if(pred==null){m.hidden=false;m.textContent='First, say whether you think it will fit.';return}
      log.push({n:v,pred,fits:!!R.f(...v)});pred=null;draw();const last=log[log.length-1];LL.say((last.fits?'Fits. ':'Does not fit. '))});
    $$('[data-g]',host).forEach(b=>b.addEventListener('click',()=>{guess=+b.dataset.g;draw();LL.say(LK.text($('.fb.ok,.fb.no',host)))}));
    const a=$('#again',host);if(a)a.addEventListener('click',()=>{let n;do{n=Math.floor(Math.random()*RULES.length)}while(seen.has(n)&&seen.size<RULES.length);ri=n;seen.add(n);log=[];guess=null;pred=null;draw()})}
  draw()});

/* ---------- mystery: clues arrive one at a time; cross out what each clue rules out ---------- */
LL.tool('mystery',function(host,T){let mi=0,ci=0,out=new Set(),marked=new Set(),checked=false,best=null;
  function draw(){const M=T.mysteries[mi],C=M.clues[ci],done=ci>=M.clues.length;
    const should=C?new Set(C.kills):null,ok=checked&&should&&[...M.ex.keys()].filter(i=>!out.has(i)).every(i=>should.has(i)===marked.has(i));
    host.innerHTML=`<div class="qbox"><span class="k">Mystery ${mi+1} of ${T.mysteries.length}: ${esc(M.t)}</span><p>${M.setup}</p>
     <h4>Possible explanations</h4><div class="sents">${M.ex.map((e,i)=>`<button class="sent${out.has(i)?' n':marked.has(i)?' wrong':''}" data-x="${i}"${out.has(i)||done||checked?' disabled':''} style="${out.has(i)?'text-decoration:line-through;opacity:.55':''}"><span class="tag">${out.has(i)?'ruled out':marked.has(i)?'rule out?':'possible'}</span>${esc(e)}</button>`).join('')}</div>
     <h4>Clues so far</h4><ol>${M.clues.slice(0,Math.min(ci+1,M.clues.length)).map((c,k)=>`<li${k===ci?' style="font-weight:700"':''}>${esc(c.t)}</li>`).join('')}</ol>
     ${!done?(checked?`<p class="fb ${ok?'ok':'no'}">${ok?'✓ Right. ':'Here’s the answer. '}${esc(C.why)}</p><div><button class="btn sm" data-next>${ci+1<M.clues.length?'Next clue ›':'Decide ›'}</button></div>`:`<p class="small muted">Tap each explanation this clue rules out (it can’t be true if the clue is true). Leave the rest. Then check.</p><div><button class="btn" data-check>Check</button></div>`)
      :best==null?`<p><b>Which explanation is best, and why?</b></p><div class="opts">${M.ex.map((e,i)=>out.has(i)?'':`<button class="opt" data-b="${i}">${esc(e)}</button>`).join('')}</div>`
      :`<p class="fb ${best===M.best?'ok':'no'}">${best===M.best?'✓ ':'The best explanation is: <b>'+esc(M.ex[M.best])+'</b>. '}${M.end}</p>${mi+1<T.mysteries.length?'<div><button class="btn sm" data-nm>Next mystery ›</button></div>':''}`}</div>`;
    $$('[data-x]',host).forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.x;marked.has(i)?marked.delete(i):marked.add(i);draw()}));
    const c=$('[data-check]',host);if(c)c.addEventListener('click',()=>{checked=true;draw();LL.say(LK.text($('.fb',host)))});
    const n=$('[data-next]',host);if(n)n.addEventListener('click',()=>{should.forEach(i=>out.add(i));marked=new Set();checked=false;ci++;draw()});
    $$('[data-b]',host).forEach(b=>b.addEventListener('click',()=>{best=+b.dataset.b;draw();LL.say(LK.text($('.fb',host)))}));
    const nm=$('[data-nm]',host);if(nm)nm.addEventListener('click',()=>{mi++;ci=0;out=new Set();marked=new Set();checked=false;best=null;draw()})}
  draw()});

/* ---------- detective: which fallacy is it? (lessons 14, 15 and the Fallacy Detective page) ---------- */
LL.chat=c=>`<div class="chat"><span class="ctx">${esc(c.ctx)}</span>${c.m.map((x,k)=>`<div class="m${k%2?' me':''}"><span class="nm">${esc(x[0])}</span>${esc(x[1])}</div>`).join('')}</div>`;
LL.fdChoices=function(c,pool){const F=LL.FAL,others=LL.shuffle(pool.filter(k=>k!==c.f&&k!=='none')).slice(0,c.f==='none'?3:(Math.random()<.4?2:3));
  let ch=[c.f,...others];if(c.f!=='none'&&ch.length<4)ch.push('none');return LL.shuffle(ch)};
LL.tool('detective',function(host,T){const F=LL.FAL;const keys=Object.keys(F).filter(k=>F[k].g===T.group);
  const cases=LL.CASES.filter(c=>keys.includes(c.f)||(T.withNone&&c.f==='none'));
  host.innerHTML=`<details class="deep"><summary>The ${keys.length} fallacies in this lesson (open anytime)</summary><div class="terms" style="margin-top:8px">${keys.map(k=>`<div><span class="ficon">${F[k].i}</span><b>${F[k].n}</b>: ${esc(F[k].d)}</div>`).join('')}</div></details><div id="fdr"></div>`;
  const items=LL.shuffle(cases).slice(0,T.count||10).map(c=>{const ch=LL.fdChoices(c,keys);return {pre:LL.chat(c),q:'Which fallacy is this?',choices:ch.map(k=>`<span class="ficon">${F[k].i}</span>${esc(F[k].n)}`),answer:ch.indexOf(c.f),why:esc(c.why)+(c.f!=='none'?` <b>How to answer it:</b> ${esc(F[c.f].ans)}`:'')}});
  LL.mcRun($('#fdr',host),items,{k:'Spot the fallacy',shuffle:false,end:'<p>Want more? <a href="detective.html">Play Fallacy Detective</a> with every fallacy, including arguments that only look like fallacies.</p>'})});

/* ---------- steelman: pick the steelman, then write an Aquinas-style article ---------- */
LL.tool('steelman',function(host,T){host.innerHTML=`<div id="smq"></div><div id="smw" hidden></div>`;
  LL.mcRun($('#smq',host),T.items,{k:'Which is the steelman?',shuffle:false,end:'<div><button class="btn sm" data-w>Now write your own ›</button></div>'});
  host.addEventListener('click',e=>{if(e.target.closest('[data-w]'))write()});
  function write(){const S=LK.state();S.summa=S.summa||{};const F=[['q','The question','Example: Should RJ ban phones during class?'],['obj','Objection 1: the other side at its strongest (a steelman)','State it so well they would agree.'],['contra','On the contrary','One reason for your answer (a fact, an authority, an example).'],['ans','I answer that','Your argument: your conclusion and the premises holding it up.'],['rep','Reply to Objection 1','Answer the steelman directly: deny a premise, or show the conclusion doesn’t follow.']];
    const w=$('#smw',host);w.hidden=false;
    w.innerHTML=`<div class="qbox"><span class="k">Write like Aquinas</span><p>Pick a question you care about. Fill in each part in a sentence or two. It’s saved on this device.</p>${F.map(([k,l,p])=>`<label style="font-weight:700">${l}<textarea class="ta" data-f="${k}" placeholder="${esc(p)}">${esc(S.summa[k]||'')}</textarea></label>`).join('')}
     <div class="formrow"><label>Your name <input class="lk-name sel" id="smn" autocomplete="name"></label></div>
     <div class="formrow"><button class="btn" id="smc">Copy for Canvas</button></div><p class="small" id="smm" role="status"></p><textarea class="ta" id="smo" hidden rows="8" readonly></textarea></div>`;
    let nm='';try{nm=localStorage.getItem('raider-labs-name')||''}catch(x){}$('#smn',w).value=nm;
    $('#smn',w).addEventListener('input',e=>{try{localStorage.setItem('raider-labs-name',e.target.value)}catch(x){}});
    $$('[data-f]',w).forEach(a=>a.addEventListener('input',()=>{S.summa[a.dataset.f]=a.value;LK.save()}));
    $('#smc',w).addEventListener('click',()=>{const txt=['Raider LogicLab: Steelman (write like Aquinas)','Name: '+($('#smn',w).value.trim()||'(add your name)'),'Date: '+new Date().toLocaleString(),''].concat(F.map(([k,l])=>l.split(':')[0]+': '+(S.summa[k]||'').trim())).join('\n');
      const m=$('#smm',w),o=$('#smo',w);const fb=()=>{o.value=txt;o.hidden=false;o.focus();o.select();m.textContent='It’s in the box below and selected: press Ctrl+C, then paste into Canvas.'};
      try{navigator.clipboard.writeText(txt).then(()=>{m.textContent='Copied! In Canvas, click the answer box and press Ctrl+V.'},fb)}catch(x){fb()}});
    w.scrollIntoView({block:'start'})}});

})();
