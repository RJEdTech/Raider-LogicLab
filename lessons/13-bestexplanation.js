/* Lesson 13: Inference to the best explanation */
(function(){
const card=(id,x,y,txt,cls)=>`<g id="${id}"><rect x="${x}" y="${y}" width="250" height="60" rx="10" class="${cls||'box'}" style="stroke-width:2.5"/>${txt.map((t,k)=>`<text x="${x+125}" y="${y+(txt.length===1?37:26+k*21)}" text-anchor="middle" style="font-size:16px${k===0&&txt.length>1?';font-weight:700':''}">${t}</text>`).join('')}</g>`;
const ln=(id,y1,y2,cls)=>`<line id="${id}" x1="270" y1="${y1}" x2="330" y2="${y2}" style="stroke:${cls}" stroke-width="4" opacity="0"/>`;
const ey=[62,134,206,278],xy=[62,134,206,278];
LL.add({id:'bestexplanation',unit:'ind',n:13,minutes:14,
title:'Best explanation: thinking like a detective',
teaser:'The cushion could have exploded on its own, your honor.',
card:'Detectives, doctors and scientists choose the explanation that best fits all the evidence. Learn the rules for “best,” and why it’s still not proof.',
goal:'You will be able to compare explanations by whether they fit all the evidence, fit what we already know, and are simplest, and explain why the best explanation can still be overturned by new evidence.',
hook:'Most of your daily reasoning is this kind: why is my friend not texting back? Why did the experiment fail? Why is the car making that noise? Doing it well is a skill.',
real:{t:'Semmelweis and the handwashing mystery',h:'<p>In the 1840s, at Vienna’s General Hospital, mothers in the clinic run by doctors died of childbed fever far more often than mothers in the clinic run by midwives (about 10% vs. 4%). Dr. Ignaz Semmelweis tested explanations one by one. Overcrowding? The midwives’ clinic was more crowded. A priest ringing a bell as he walked through the doctors’ ward to bring last rites, terrifying patients? Semmelweis had him take another route. Nothing changed.</p><p>In 1847 a colleague cut his finger during an autopsy and died with the same symptoms. Semmelweis’s best explanation: doctors were carrying “cadaverous particles” from autopsies to mothers. He required washing hands in chlorinated lime, and deaths fell to about 1–2%. Many doctors rejected the idea for years. Germ theory later explained why he was right.</p>',src:'Encyclopaedia Britannica, “Ignaz Semmelweis”; Carl Hempel, Philosophy of Natural Science (1966), ch. 2'},
joke:{cast:['Owner','Dog’s lawyer'],lines:[
 {narr:'You come home. A couch cushion is torn open. Fluff everywhere. Your dog sits next to it, fluff on his nose, wagging.'},
 {w:'Owner',s:'Buster.'},
 {w:'Dog’s lawyer',r:1,s:'Objection. My client is a good boy. The cushion could have exploded on its own.'},
 {w:'Owner',s:'Cushions don’t explode.'},
 {w:'Dog’s lawyer',r:1,s:'Then a burglar broke in, tore one cushion, put fluff on my client’s nose, and left.'},
 {w:'Owner',s:'The door was locked and nothing’s missing.'},
 {w:'Dog’s lawyer',r:1,s:'…The defense would like a treat.'}],
 point:'<p>The lawyer’s explanations are <b>possible</b>. They’re just terrible. The owner is doing <b>inference to the best explanation</b>: picking the explanation that accounts for all the evidence, fits what we know about the world, and doesn’t need extra unseen events.</p><p>Notice it’s still not a deduction. If a video showed the neighbor’s dog sneaking in, the best explanation would change.</p>'},
learn:{intro:'Evidence on the left, possible explanations on the right.',
 svg:`<svg viewBox="0 0 600 420" role="img" aria-label="Four pieces of evidence on the left and four possible explanations on the right, with lines showing which explanations fit">
  <text x="145" y="40" text-anchor="middle" class="tag">EVIDENCE</text><text x="455" y="40" text-anchor="middle" class="tag">EXPLANATIONS</text>
  ${card('e1',20,ey[0],['Cushion torn open'])}${card('e2',20,ey[1],['Fluff on the','dog’s nose'])}${card('e3',20,ey[2],['Doors locked,','nothing missing'])}${card('e4',20,ey[3],['You have','no cat'])}
  ${card('x1',330,xy[0],['Buster did it'])}${card('x2',330,xy[1],['The cushion','exploded by itself'])}${card('x3',330,xy[2],['A burglar did it'])}${card('x4',330,xy[3],['Your cat did it'])}
  ${ln('l11',92,92,'var(--good)')}${ln('l21',164,96,'var(--good)')}${ln('l31',236,100,'var(--good)')}${ln('l41',308,104,'var(--good)')}
  ${ln('l33',236,236,'var(--bad)')}${ln('l44',308,308,'var(--bad)')}
  <g id="strike3" opacity="0"><line x1="340" y1="236" x2="570" y2="236" style="stroke:var(--bad)" stroke-width="4"/></g><g id="strike4" opacity="0"><line x1="340" y1="308" x2="570" y2="308" style="stroke:var(--bad)" stroke-width="4"/></g>
  <g id="strike2" opacity="0"><line x1="340" y1="164" x2="570" y2="164" style="stroke:var(--bad)" stroke-width="4"/></g>
  ${card('e5',20,354,['New: a video shows the','neighbor’s dog sneaking in'],'boxhl')}
  <text id="q1" x="560" y="98" text-anchor="end" style="font-size:28px;font-weight:700;fill:var(--rj)" opacity="0">?</text>
  <g id="crit" opacity="0"><rect x="20" y="50" width="560" height="360" rx="12" class="box" style="stroke:var(--rj);stroke-width:2"/>
   <text x="300" y="96" text-anchor="middle" class="lbl">The best explanation…</text>
   <text x="60" y="150" class="lbl-m">1. accounts for <tspan font-weight="700">all</tspan> the evidence</text>
   <text x="60" y="200" class="lbl-m">2. fits what we already know</text>
   <text x="60" y="250" class="lbl-m">3. is the <tspan font-weight="700">simplest</tspan> (adds no extra events)</text>
   <text x="60" y="300" class="lbl-m">4. makes a prediction you can check</text>
   <text x="300" y="370" text-anchor="middle" class="lbl-s">…and can still change with new evidence.</text></g>
 </svg>`,
 steps:[
  {title:'Gather the evidence',see:'Four evidence cards: cushion torn, fluff on the dog’s nose, doors locked with nothing missing, and you have no cat.',why:'Start with what you actually observed, not with a favorite explanation. Every good explanation has to fit all of it.',set:{e5:{opacity:0},crit:{opacity:0},x1:{opacity:.25},x2:{opacity:.25},x3:{opacity:.25},x4:{opacity:.25},l11:{opacity:0},l21:{opacity:0},l31:{opacity:0},l41:{opacity:0},l33:{opacity:0},l44:{opacity:0},strike2:{opacity:0},strike3:{opacity:0},strike4:{opacity:0},q1:{opacity:0}},focus:['e1','e2','e3','e4']},
  {title:'List the possible explanations',see:'Four explanation cards appear: Buster, a self-exploding cushion, a burglar, the cat.',why:'Thinking of several explanations first keeps you from locking onto the first one. Detectives and doctors call this a <b>differential</b>: the list of what it could be.',set:{x1:{opacity:1},x2:{opacity:1},x3:{opacity:1},x4:{opacity:1}},focus:['x1','x2','x3','x4']},
  {title:'Which fit all the evidence?',see:'Green lines join every evidence card to “Buster did it.” Red lines cross out the burglar (doors locked) and the cat (there is no cat).',why:'An explanation that <b>contradicts</b> a piece of evidence is out. Buster fits all four.',set:{l11:{opacity:1},l21:{opacity:1},l31:{opacity:1},l41:{opacity:1},l33:{opacity:1},l44:{opacity:1},strike3:{opacity:1},strike4:{opacity:1},x3:{opacity:.4},x4:{opacity:.4}},focus:['x1','strike3','strike4']},
  {title:'Simpler wins',see:'The exploding-cushion card is crossed out too. Only Buster is left.',why:'An exploding cushion doesn’t contradict the evidence, but it needs something we’ve never seen happen. When two explanations fit, prefer the one that adds the fewest new events. That rule is called <b>Ockham’s razor</b>.',term:'Named for William of Ockham, a 14th-century Franciscan friar and philosopher: don’t multiply causes beyond what’s needed.',set:{strike2:{opacity:1},x2:{opacity:.4}},focus:['strike2','x1']},
  {title:'Still not proof',see:'A new card at the bottom: a video shows the neighbor’s dog sneaking in. A question mark appears by Buster.',why:'The best explanation is the best <b>so far</b>. New evidence can change it. That’s the difference from deduction, and why detectives keep looking after they have a suspect.',set:{e5:{opacity:1},q1:{opacity:1}},focus:['e5','q1'],alt:'A jury convicts “beyond a reasonable doubt,” not beyond all possible doubt. That is inference to the best explanation.'},
  {title:'The four tests',see:'A card lists the four tests for the best explanation.',why:'Fits <b>all</b> the evidence; fits what we already know; simplest; checkable. And stays open to new evidence. Scientists, doctors and detectives use exactly these.',set:{crit:{opacity:1}},focus:['crit']}
 ]},
tryit:{kind:'mystery',title:'Try it: solve two mysteries',intro:'Clues arrive one at a time. After each clue, cross out every explanation it rules out. At the end, pick the best explanation.',
 mysteries:[
  {t:'The missing pizza',setup:'The varsity team ordered pizza for after practice. When they came back to the locker room, one of the three boxes was empty.',
   ex:['The JV team, who practiced next door, ate it','Coach ate it','The delivery came one pizza short','A raccoon got in'],
   clues:[{t:'The empty box was on the bench with its lid neatly closed.',kills:[3],why:'Raccoons don’t close lids neatly. The others are still possible.'},
    {t:'The receipt shows three pizzas paid for, and the driver says he left three.',kills:[2],why:'Three pizzas arrived, so it wasn’t a short delivery.'},
    {t:'Coach was signed in at an off-campus meeting during the whole practice.',kills:[1],why:'Coach wasn’t there.'},
    {t:'A JV player posted in the team group chat: “thx varsity 🍕🍕”.',kills:[],why:'This doesn’t rule anything out, but it strongly supports the JV explanation.'}],
   best:0,end:'The JV team fits every clue, needs no extra events, and even left a confession in the chat. Still, it’s not proof. If the post turned out to be a joke, you’d keep investigating.'},
  {t:'The wilting plant',setup:'In the biology lab, one bean plant on the windowsill is wilting and yellow. The others are fine.',
   ex:['Too little water','Too much water','Not enough light','Too cold'],
   clues:[{t:'The soil in its pot is soggy, and the others are just damp.',kills:[0],why:'Soggy soil rules out too little water.'},
    {t:'It sits on the same sunny windowsill as the healthy plants.',kills:[2],why:'Same light as the healthy plants, so light isn’t the difference.'},
    {t:'The room stays at about 70°F, and the healthy plants share the same air.',kills:[3],why:'Same temperature as the healthy ones.'},
    {t:'Its pot has no drainage hole. The others do.',kills:[],why:'Not a rule-out, but it explains the soggy soil.'}],
   best:1,end:'Too much water explains the soggy soil and the missing drainage hole, and it’s the only difference between this plant and the healthy ones. A prediction to check: repot it with drainage and it should recover.'}]},
why:{care:'When something goes wrong, people grab the first explanation that comes to mind, often the most dramatic. Listing the options and checking each against all the evidence is calmer and far more often right.',
 meet:[{i:'🩺',t:'Doctors',h:'A diagnosis is the best explanation of the symptoms, and doctors keep testing because it can change.'},
  {i:'🔧',t:'Fixing things',h:'Wi-Fi down? List the causes (router, laptop, outage), then test the simplest first.'},
  {i:'🔬',t:'Labs',h:'Results not what you expected? Before blaming the theory, check the simpler explanations: measurement, contamination, a typo.'}],
 border:{t:'Reasoning to the best explanation about big questions',h:'Philosophers and theologians argue about whether this kind of reasoning reaches the biggest questions: why there is a universe at all, or why it is orderly and understandable. Some argue God is the best explanation; others argue for different explanations or say the question can’t be settled this way. Either way, the same four tests apply, and honest thinkers on every side use them.'}},
terms:[{t:'Inference to the best explanation',d:'choosing the explanation that best accounts for the evidence (also called abduction)'},{t:'Differential',d:'the list of possible explanations you check one by one'},{t:'Ockham’s razor',d:'prefer the explanation that adds the fewest new causes or events'}],
test:[
 {q:'Your friend didn’t text back for three hours. Which is the best explanation, if you know her phone was dying at lunch?',choices:['She’s mad at you','Her phone died','She moved to Canada','Aliens'],answer:1,hint:'Which explanation fits the evidence you have and needs nothing extra?',why:'It fits the known fact (dying phone) and needs no new events.'},
 {q:'What does Ockham’s razor say?',choices:['The most dramatic explanation is usually the best','If they fit equally, pick the one with fewer extras','Shave every day so you look sharp for class','Always trust whichever expert spoke last'],answer:1,hint:'Named for a Franciscan friar.',why:'Don’t multiply causes beyond what’s needed.'},
 {q:'An explanation fits all the evidence but would require a law of physics to break. What should you do?',choices:['Accept it, since it fits all the evidence','Prefer one that fits what we already know','Ignore the evidence that seems strange','Flip a coin between the explanations'],answer:1,hint:'Second test.',why:'Explanations should fit what we already know, unless the evidence forces a change.'},
 {q:'How is inference to the best explanation different from deduction?',choices:['It isn’t different; both are guaranteed','New evidence can overturn it; deduction can’t','It uses no evidence, only imagination','It’s always wrong, so it shouldn’t be used'],answer:1,hint:'The video of the neighbor’s dog.',why:'Best explanations are the best so far; a valid deduction from true premises stays proven.'},
 {q:'What made Semmelweis’s explanation better than “the priest’s bell scares patients”?',choices:['It was more famous in Vienna at the time','It passed a test: handwashing cut deaths','It was simpler to say to the hospital','The priest agreed with it right away'],answer:1,hint:'Fourth test: a prediction you can check.',why:'His explanation made a prediction that came true. The bell explanation failed its test.'},
 {q:'A detective has one suspect who fits all the clues. What should she still do?',choices:['Stop investigating and close the case right away','Stay open to new evidence that points elsewhere','Arrest everyone who was nearby','Ignore new clues that don’t fit'],answer:1,hint:'Best explanation so far.',why:'New evidence can change the best explanation.'}
]});
})();
