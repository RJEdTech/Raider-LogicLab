/* Raider LogicLab: Fallacy Detective (every fallacy, plus fair arguments that only look like fallacies) */
(function(){
const {esc,$,$$}=LL;
LL.detective=function(host){host=$(host);LK.setup({site:'LogicLab',page:'detective',key:'rjlogiclab-detective'});document.title='Fallacy Detective · Raider LogicLab';
  const F=LL.FAL,S=LK.state();S.best=S.best||{};
  const MODES={all:['Every fallacy',k=>k!=='none'],rel:['Dodging the point (lesson 14)',k=>F[k].g==='rel'],ev:['Faking the evidence (lesson 15)',k=>F[k].g==='ev']};
  let mode='all';
  function guide(){return `<details class="deep"><summary>Case file: all ${Object.keys(F).length-1} fallacies</summary><div class="terms" style="margin-top:8px">${Object.keys(F).filter(k=>k!=='none').map(k=>`<div><span class="ficon">${F[k].i}</span><b>${F[k].n}</b>: ${esc(F[k].d)}<br><span class="small muted">Spot it: ${esc(F[k].tell)} Answer it: ${esc(F[k].ans)}</span>${F[k].why?`<br><span class="small muted">${esc(F[k].why)}</span>`:''}</div>`).join('')}<div><span class="ficon">✅</span><b>${F.none.n}</b>: ${esc(F.none.d)}</div></div></details>`}
  function start(){const keys=Object.keys(F).filter(MODES[mode][1]);const pool=LL.CASES.filter(c=>keys.includes(c.f));const fair=LL.shuffle(LL.CASES.filter(c=>c.f==='none')).slice(0,2);
    const cases=LL.shuffle(LL.shuffle(pool).slice(0,8).concat(fair));let i=0,score=0,streak=0,best=0,picked=null,res=[];
    function one(){const box=$('#fdgame',host);
      if(i>=cases.length){S.best[mode]=Math.max(S.best[mode]||0,score);LK.save();let nm='';try{nm=localStorage.getItem('raider-labs-name')||''}catch(e){}
        box.innerHTML=`<div class="qbox"><p class="score">Case closed: ${score} of ${cases.length} right. Longest streak: ${best}. Best score in this mode: ${S.best[mode]}.</p>
          <div class="formrow"><label>Your name <input class="sel" id="fdn" value="${esc(nm)}"></label><button class="btn" id="fdc">Copy for Canvas</button><button class="btn ghost" id="fda">New case file</button></div><p class="small" id="fdm" role="status"></p><textarea class="ta" id="fdo" hidden rows="8" readonly></textarea></div>`;
        $('#fdn',box).addEventListener('input',e=>{try{localStorage.setItem('raider-labs-name',e.target.value)}catch(x){}});
        $('#fda',box).addEventListener('click',start);
        $('#fdc',box).addEventListener('click',()=>{const t=['Raider LogicLab: Fallacy Detective ('+MODES[mode][0]+')','Name: '+($('#fdn',box).value.trim()||'(add your name)'),'Date: '+new Date().toLocaleString(),'','Score: '+score+' of '+cases.length+' (longest streak '+best+')'].concat(res.map((r,k)=>'  '+(r.ok?'✓':'✗')+' '+(k+1)+'. '+F[r.f].n)).join('\n');
          const m=$('#fdm',box),o=$('#fdo',box),fb=()=>{o.value=t;o.hidden=false;o.focus();o.select();m.textContent='It’s in the box below and selected: press Ctrl+C, then paste into Canvas.'};try{navigator.clipboard.writeText(t).then(()=>{m.textContent='Copied! Paste it into Canvas with Ctrl+V.'},fb)}catch(x){fb()}});return}
      const c=cases[i],ch=c._ch||(c._ch=LL.fdChoices(c,keys)),ok=picked!=null&&ch[picked]===c.f;
      box.innerHTML=`<div class="fd-top"><span class="score">Case ${i+1} of ${cases.length}</span><span class="score">Score ${score} · Streak ${streak} 🔥</span></div>${LL.chat(c)}
       <div class="qbox"><span class="k">Which is it?</span><div class="opts">${ch.map((k,j)=>`<button class="opt${picked==null?'':(k===c.f?' ok':(j===picked?' no':''))}" data-j="${j}"${picked!=null?' disabled':''}><span class="ficon">${F[k].i}</span>${esc(F[k].n)}</button>`).join('')}</div>
       ${picked!=null?`<p class="fb ${ok?'ok':'no'}">${ok?'✓ Right. ':'Not quite: it’s <b>'+esc(F[c.f].n)+'</b>. '}${esc(c.why)}${c.f!=='none'?` <b>How to answer it:</b> ${esc(F[c.f].ans)}`:''}</p><div><button class="btn sm" id="fdnx">${i+1<cases.length?'Next case ›':'Close the case file'}</button></div>`:''}</div>`;
      $$('[data-j]',box).forEach(b=>b.addEventListener('click',()=>{picked=+b.dataset.j;const good=ch[picked]===c.f;res.push({f:c.f,ok:good});if(good){score++;streak++;best=Math.max(best,streak)}else streak=0;one();LL.say(LK.text($('.fb',box)))}));
      const nx=$('#fdnx',box);if(nx)nx.addEventListener('click',()=>{i++;picked=null;one()})}
    one()}
  host.innerHTML=`<div class="lhead"><a class="back" href="./">← All lessons</a><span class="eyebrow">Practice</span><h2>🔎 Fallacy Detective</h2><p class="goal">Ten cases from group chats, ads, games and arguments. Name the fallacy, or decide it’s a fair argument that only looks like one. Then learn how to answer it.</p><div class="sup" id="sup"></div></div>
    <div class="formrow" role="group" aria-label="Which fallacies">${Object.entries(MODES).map(([k,v])=>`<button class="chip" data-m="${k}" aria-pressed="${k===mode}">${v[0]}</button>`).join('')}</div>
    ${guide()}<div id="fdgame" style="margin-top:12px"></div>`;
  LK.supports('#sup');
  $$('[data-m]',host).forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;$$('[data-m]',host).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));start()}));
  start()};
})();
