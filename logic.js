/* Raider LogicLab engine · RJ Ed Tech (Nov 2026)
   Lessons register with LL.add({...}); see README.md for the fields.
   Built on the Raider Labs Lesson Kit (kit/lesson-kit.js): read aloud, easier reading,
   help-first "This confused me", Test yourself with Copy for Canvas.
   Everything runs in the browser. No logins, no personal data. */
(function(){
'use strict';
const LL=window.LL={lessons:[],units:[],tools:{},byId:{}};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
LL.esc=esc;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
LL.$=$;LL.$$=$$;
const RM=()=>!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
LL.RM=RM;
LL.unit=u=>{LL.units.push(u)};
LL.add=d=>{LL.lessons.push(d);LL.byId[d.id]=d};
LL.tool=(k,f)=>{LL.tools[k]=f};
const STORE='rjlogiclab';
LL.prog=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{}')||{}}catch(e){return {}}};
LL.mark=(id,k,v)=>{const p=LL.prog();p[id]=p[id]||{};p[id][k]=v;try{localStorage.setItem(STORE,JSON.stringify(p))}catch(e){}};
LL.shuffle=(a,seed)=>{a=a.slice();let s=seed||Math.floor(Math.random()*1e9);const r=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648};for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
LL.say=t=>{if(window.LK&&LK.say)LK.say(t)};
const COLORS=['#2d6bd2','#C11430','#1b8a5a','#8a4fd1','#c27a00','#0f7f8c','#5d5d63'];

/* ---------- Home ---------- */
LL.home=function(host){host=typeof host==='string'?$(host):host;const P=LL.prog();
  const ordered=LL.units.map(u=>({u,ls:LL.lessons.filter(l=>l.unit===u.id).sort((a,b)=>a.n-b.n)}));
  const first=LL.lessons.slice().sort((a,b)=>a.n-b.n).find(l=>!(P[l.id]&&P[l.id].test!=null))||LL.lessons[0];
  const courses=LL.courses||[];
  host.innerHTML=`<div class="start"><a class="btn" href="lesson.html#${first.id}">${P[LL.lessons[0].id]?'Keep going':'Start with lesson 1'}: ${esc(first.title)} ›</a><a class="btn ghost" href="detective.html">🔎 Play Fallacy Detective</a></div>
   ${courses.length?`<div class="paths" role="group" aria-label="Show the lessons for a class"><span class="labs-l" style="align-self:center">In my class</span>${courses.map(c=>`<button class="chip" data-c="${c.id}" aria-pressed="false">${esc(c.t)}</button>`).join('')}</div><p class="small muted" id="cnote" hidden></p>`:''}
   ${ordered.map(({u,ls})=>`<section class="unit"><div class="unit-h"><span class="n">Unit ${u.n}</span><h3>${esc(u.t)}</h3><p>${u.d}</p></div>
     <div class="cards">${ls.map(l=>{const pr=P[l.id]||{};return `<a class="card" href="lesson.html#${l.id}" data-id="${l.id}">${pr.test!=null?`<span class="done" title="Best Test yourself score">✓ ${pr.test}/${l.test.length}</span>`:''}<span class="k">Lesson ${l.n}</span><h4>${esc(l.title)}</h4><span class="joke">“${esc(l.teaser)}”</span><span>${l.card}</span><span class="meta">About ${l.minutes} min</span></a>`}).join('')}</div></section>`).join('')}`;
  $$('.chip',host).forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';$$('.chip',host).forEach(x=>x.setAttribute('aria-pressed','false'));const c=courses.find(x=>x.id===b.dataset.c);
    if(on)b.setAttribute('aria-pressed','true');$$('.card',host).forEach(cd=>cd.classList.toggle('dim',on&&!c.lessons.includes(cd.dataset.id)));
    const n=$('#cnote',host);n.hidden=!on;if(on)n.innerHTML=c.note}))};

/* ---------- Lesson page ---------- */
const PARTS=[['joke','Start here'],['learn','Learn it'],['try','Try it'],['why','Why it matters'],['test','Test yourself']];
LL.lesson=function(host){host=typeof host==='string'?$(host):host;
  function route(){const h=(location.hash||'').slice(1).split('@');const id=h[0]||LL.lessons[0].id;const d=LL.byId[id]||LL.lessons[0];render(d,h[1]||'joke')}
  window.addEventListener('hashchange',route);route()};

function render(d,part){const host=$('#lesson');LK.setup({site:'LogicLab',page:d.id,key:'rjlogiclab-'+d.id});
  document.title=d.title+' · Raider LogicLab';
  const all=LL.lessons.slice().sort((a,b)=>a.n-b.n),i=all.indexOf(d),prev=all[i-1],next=all[i+1];
  const u=LL.units.find(x=>x.id===d.unit)||{};
  const seen=LK.state().seen=LK.state().seen||{};
  host.innerHTML=`<div class="lhead"><a class="back" href="./">← All lessons</a><span class="eyebrow">Unit ${u.n}: ${esc(u.t)} · Lesson ${d.n}</span><h2>${esc(d.title)}</h2><p class="goal">${d.goal}</p><div class="sup" id="sup"></div></div>
    <nav class="lnav" aria-label="Lesson parts"><ol>${PARTS.map(([k,t],j)=>`<li><button data-part="${k}" class="${seen[k]?'seen':''}"${k===part?' aria-current="step"':''}>${j+1}. ${t}</button></li>`).join('')}</ol></nav>
    <div id="partHost"></div>
    <div class="partnext" id="partNext"></div>`;
  LK.supports('#sup');
  $$('.lnav button',host).forEach(b=>b.addEventListener('click',()=>go(b.dataset.part)));
  function go(k){location.hash=d.id+(k==='joke'?'':'@'+k)}
  const ph=$('#partHost'),pn=$('#partNext');
  const k=PARTS.find(p=>p[0]===part)?part:'joke';
  seen[k]=1;LK.save();
  const j=PARTS.findIndex(p=>p[0]===k);
  ({joke:joke,learn:learn,try:tryit,why:why,test:test})[k](ph,d);
  const nb=PARTS[j+1],pb=PARTS[j-1];
  pn.innerHTML=`<span>${pb?`<button class="btn ghost" data-go="${pb[0]}">‹ ${pb[1]}</button>`:(prev?`<a class="btn ghost" href="lesson.html#${prev.id}">‹ Lesson ${prev.n}</a>`:'')}</span><span>${nb?`<button class="btn" data-go="${nb[0]}">Next: ${nb[1]} ›</button>`:(next?`<a class="btn" href="lesson.html#${next.id}">Next lesson: ${esc(next.title)} ›</a>`:`<a class="btn" href="detective.html">🔎 Play Fallacy Detective ›</a>`)}</span>`;
  $$('[data-go]',pn).forEach(b=>b.addEventListener('click',()=>{go(b.dataset.go);window.scrollTo({top:0,behavior:RM()?'auto':'smooth'})}));
  const cur=$('.lnav [aria-current]',host),ol=$('.lnav ol',host);if(cur&&ol)ol.scrollLeft=Math.max(0,cur.parentNode.offsetLeft-ol.clientWidth/2+cur.offsetWidth/2);
}

/* Part 1: the joke, one line at a time */
function joke(ph,d){const J=d.joke;
  ph.innerHTML=`<div class="part"><h3>${esc(J.title||'Start with a joke')}</h3>${J.intro?`<p class="lead muted">${J.intro}</p>`:''}
    <div class="strip" id="strip">${J.lines.map((L,i)=>L.narr!=null?`<p class="narr" data-i="${i}">${L.narr}</p>`:`<div class="say${L.r?' r':''}" data-i="${i}"><span class="who" style="background:${COLORS[(J.cast||[]).indexOf(L.w)>=0?(J.cast||[]).indexOf(L.w)%COLORS.length:i%COLORS.length]}" aria-hidden="true">${esc(L.w.split(' ').map(x=>x[0]).join('').slice(0,2))}</span><div class="bub"><span class="nm">${esc(L.w)}</span>${L.s}</div></div>`).join('')}</div>
    <div class="formrow" id="jbar"><button class="btn" id="jnext">Next line ›</button><button class="btn ghost sm" id="jall">Show it all</button></div>
    <div class="gotit" id="gotit" hidden><span class="t">Why it’s funny (the logic)</span>${J.point}</div>
    ${d.real?`<div class="lk-card" id="real" hidden><div class="lk-eyebrow">The same idea, for real</div><h4>${d.real.t}</h4>${d.real.h}${d.real.src?`<p class="small muted">Sources: ${d.real.src}</p>`:''}</div>`:''}
    ${d.hook?`<div class="lk-whycare" id="hook" hidden><b>Why you should care:</b> ${d.hook}</div>`:''}</div>`;
  const items=$$('#strip>[data-i]',ph);let n=0;
  function show(k){items.slice(0,k).forEach(x=>x.classList.add('on'));n=k;
    if(n>=items.length){$('#jbar',ph).innerHTML=`<button class="btn" id="jget">Get it? See the logic, then the real case ›</button>`;$('#jget',ph).addEventListener('click',()=>{$('#gotit',ph).hidden=false;['#hook','#real'].forEach(k=>{const h=$(k,ph);if(h)h.hidden=false});$('#jbar',ph).hidden=true;LL.say(LK.text($('#gotit',ph)));$('#gotit',ph).scrollIntoView({block:'nearest'})})}
    else LL.say(LK.text(items[n-1]))}
  $('#jnext',ph).addEventListener('click',()=>show(n+1));$('#jall',ph).addEventListener('click',()=>show(items.length));
  show(RM()?items.length:1)}

/* Part 2: Learn it, a scene that changes with each step */
function learn(ph,d){const L=d.learn;
  ph.innerHTML=`<div class="part"><h3>Learn it</h3>${L.intro?`<p class="lead">${L.intro}</p>`:''}<div id="scene"></div><div id="lcf"></div>${(L.deep||[]).map(x=>`<details class="deep"><summary>${esc(x.t)}</summary>${x.h}</details>`).join('')}</div>`;
  LL.scene($('#scene',ph),{svg:typeof L.svg==='function'?L.svg():L.svg,steps:L.steps,onStep:(i,s)=>{
    LK.confused('#lcf',{where:'step'+(i+1),part:'learn',ask:s.ask||null,another:s.alt||'Look only at the part of the picture that just changed (it glows). Then read “Why” again.',start:s.start||null});
    if(i===L.steps.length-1)LL.mark(d.id,'learned',1)}})}

/* The scene stepper: Back / Next, each step sets SVG attributes; numbers animate, everything else switches. */
LL.scene=function(host,o){const steps=o.steps,D=o.duration||700;
  host.innerHTML=`<div class="scene"><div class="stage sv">${o.svg}</div><div class="cap" aria-live="polite"></div><div class="bar"><button class="btn ghost sm" data-k="back">‹ Back</button><button class="btn sm" data-k="next">Next ›</button><span class="dots" aria-hidden="true">${steps.map(()=>'<i></i>').join('')}</span></div></div>`;
  const svg=$('svg',host),cap=$('.cap',host),back=$('[data-k=back]',host),next=$('[data-k=next]',host);
  const ids=new Set();steps.forEach(s=>Object.keys(s.set||{}).forEach(k=>ids.add(k)));
  const full=[];steps.forEach((s,i)=>{const prev=i?full[i-1]:{};const cur={};ids.forEach(id=>{cur[id]=Object.assign({},prev[id]||{},(s.set||{})[id]||{})});full.push(cur)});
  const node=id=>svg.querySelector('#'+CSS.escape(id));
  const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  function apply(a,b,t){ids.forEach(id=>{const n=node(id);if(!n)return;const A=a[id]||{},B=b[id]||{},keys=new Set([...Object.keys(A),...Object.keys(B)]),tf={};
    keys.forEach(k=>{const va=A[k]??B[k],vb=B[k]??A[k],nu=typeof va==='number'&&typeof vb==='number',v=nu?va+(vb-va)*t:(t<1?va:vb);
      if(k==='tx'||k==='ty'||k==='s'){tf[k]=v;return}if(k==='text'){n.textContent=v;return}if(k==='class'){n.setAttribute('class',v);return}
      if(k==='opacity'&&nu){n.style.opacity=(+v).toFixed(3);return}n.setAttribute(k,nu?(+v).toFixed(2):v)});
    if(Object.keys(tf).length)n.setAttribute('transform',`translate(${(tf.tx||0).toFixed(2)} ${(tf.ty||0).toFixed(2)}) scale(${(tf.s??1).toFixed(3)})`)})}
  let at=0,raf=0;
  function label(i){const s=steps[i];cap.innerHTML=`<span class="stepno">Step ${i+1} of ${steps.length}</span><h4>${s.title}</h4>${s.see?`<p class="see"><b class="k">What you see</b>${s.see}</p>`:''}${s.why?`<p class="why"><b class="k">Why</b>${s.why}</p>`:''}${s.term?`<p class="term">${s.term}</p>`:''}`;
    svg.querySelectorAll('.lk-focus').forEach(x=>x.classList.remove('lk-focus'));(s.focus||[]).forEach(id=>{const n=node(id);n&&n.classList.add('lk-focus')});
    $$('.dots i',host).forEach((x,k)=>x.classList.toggle('on',k===i));
    back.disabled=i===0;next.textContent=i===steps.length-1?'Done ✓':'Next ›';next.disabled=i===steps.length-1;
    o.onStep&&o.onStep(i,s);LL.say(LK.text(cap))}
  function go(i){const from=at;at=i;label(i);if(RM()){apply(full[from],full[i],1);return}
    const t0=performance.now();cancelAnimationFrame(raf);(function f(now){const t=Math.min(1,(now-t0)/D);apply(full[from],full[i],ease(t));if(t<1)raf=requestAnimationFrame(f)})(t0)}
  back.addEventListener('click',()=>{if(at>0)go(at-1)});next.addEventListener('click',()=>{if(at<steps.length-1)go(at+1)});
  apply(full[0],full[0],1);label(0);return {go,at:()=>at}};

/* Part 3: Try it */
function tryit(ph,d){const T=d.tryit;ph.innerHTML=`<div class="part try"><h3>${esc(T.title||'Try it')}</h3>${T.intro?`<p class="lead">${T.intro}</p>`:''}<div id="tool"></div><div id="tcf"></div></div>`;
  const f=LL.tools[T.kind];if(!f){$('#tool',ph).textContent='Missing tool: '+T.kind;return}
  f($('#tool',ph),T,d);if(T.help)LK.confused('#tcf',Object.assign({where:'try',part:'try'},T.help))}

/* Part 4: Why it matters */
function why(ph,d){const W=d.why;
  ph.innerHTML=`<div class="part"><h3>Why it matters</h3>${W.care?`<div class="lk-whycare"><b>Why care?</b> ${W.care}</div>`:''}
   ${W.meet?`<h4>Where you’ll meet this</h4><div class="meets">${W.meet.map(m=>`<div class="meet"><span class="i" aria-hidden="true">${m.i}</span><h4>${m.t}</h4><p>${m.h}</p></div>`).join('')}</div>`:''}
   ${W.good?`<div class="lk-card"><div class="lk-eyebrow">Logic that made things better</div><p>${W.good}</p>${W.goodSrc?`<p class="lk-src small muted">Source: ${W.goodSrc}</p>`:''}</div>`:''}
   ${W.border?`<div class="border"><span class="t">Where logic meets philosophy and theology</span><h4>${W.border.t}</h4><p>${W.border.h}</p></div>`:''}
   ${d.terms?`<h4>Words to know</h4><div class="terms">${d.terms.map(t=>`<div><b>${t.t}</b>: ${t.d}</div>`).join('')}</div>`:''}</div>`}

/* Part 5: Test yourself (Lesson Kit) */
function test(ph,d){ph.innerHTML=`<div class="part"><h3>Test yourself</h3><p class="lead muted">${d.test.length} questions. One at a time; a hint and help come before any answer. Your best score is saved on this device.</p><div id="lt"></div></div>`;
  LK.test('#lt',{id:d.id,questions:d.test.map(q=>Object.assign(LL.shuffleQ(q),{another:q.another||q.alt})),onDone:s=>{const p=LL.prog();const b=Math.max(s,(p[d.id]&&p[d.id].test)||0);LL.mark(d.id,'test',b)}})}

/* ---------- small shared pieces for tools ---------- */
/* Shuffle the choices of a question with 4 or more choices (keeps two- and three-option sets like Valid/Invalid in order). */
LL.shuffleQ=q=>{if(!q.choices||q.choices.length<4||q.keepOrder)return Object.assign({},q);const o=LL.shuffle(q.choices.map((_,i)=>i));return Object.assign({},q,{choices:o.map(i=>q.choices[i]),answer:o.indexOf(q.answer),wrong:q.wrong?Object.fromEntries(Object.entries(q.wrong).map(([k,v])=>[o.indexOf(+k),v])):q.wrong})};
/* A multiple-choice item with one graded try, then feedback. o:{q, choices, answer, why, wrong:{index:text}, onDone(right)} */
LL.mc=function(host,o){o=LL.shuffleQ(o);let picked=null;
  function draw(){host.innerHTML=`<div class="qbox">${o.k?`<span class="k">${o.k}</span>`:''}<div>${o.q}</div><div class="opts">${o.choices.map((c,i)=>`<button class="opt${picked==null?'':(i===o.answer?' ok':(i===picked?' no':''))}" data-i="${i}"${picked!=null?' disabled':''}>${c}</button>`).join('')}</div>${picked!=null?`<p class="fb ${picked===o.answer?'ok':'no'}">${picked===o.answer?'✓ Right. ':'Not quite. '}${picked!==o.answer&&o.wrong&&o.wrong[picked]?o.wrong[picked]+' ':''}${o.why||''}</p>`:''}${picked!=null&&o.next?`<div><button class="btn sm" data-n>${o.nextLabel||'Next ›'}</button></div>`:''}</div>`;
    $$('[data-i]',host).forEach(b=>b.addEventListener('click',()=>{picked=+b.dataset.i;draw();LL.say(LK.text($('.fb',host)));o.onDone&&o.onDone(picked===o.answer)}));
    const n=$('[data-n]',host);if(n)n.addEventListener('click',o.next)}
  draw()};
/* Runs a list of mc items one after another with a running score. */
LL.mcRun=function(host,items,o={}){let i=0,score=0;const order=o.shuffle===false?items:LL.shuffle(items);
  function one(){if(i>=order.length){host.innerHTML=`<div class="qbox"><p class="score">You got ${score} of ${order.length} on the first try.</p>${o.end||''}<div><button class="btn sm" data-again>Go again</button></div></div>`;$('[data-again]',host).addEventListener('click',()=>{i=0;score=0;one()});return}
    const it=order[i];const box=document.createElement('div');host.innerHTML=`<p class="small muted">Case ${i+1} of ${order.length} · Score ${score}</p>`;host.append(box);
    if(it.pre){const p=document.createElement('div');p.innerHTML=it.pre;host.insertBefore(p,box)}
    LL.mc(box,Object.assign({},it,{k:it.k||o.k,onDone:r=>{if(r)score++},next:()=>{i++;one()},nextLabel:i+1<order.length?'Next case ›':'See my score'}))}
  one()};
})();
