/* Lesson 6: And, or, not */
(function(){
const lever=(id,x,y)=>`<circle cx="${x}" cy="${y}" r="6" class="inkf"/><circle cx="${x+70}" cy="${y}" r="6" class="inkf"/><line id="${id}" x1="${x}" y1="${y}" x2="${x+62}" y2="${y-34}" class="ink" stroke-width="6" stroke-linecap="round"/>`;
const wire='class="ink" stroke-width="4" fill="none"';
LL.add({id:'connectives',unit:'ded',n:6,minutes:14,
title:'And, or, not: logic you can wire',
teaser:'I came to practice! …That’s half of an “and.”',
card:'“And,” “or” and “not” as light switches, and the truth table that every computer chip runs on.',
goal:'You will be able to find when an “and,” “or” or “not” statement is true, build a truth table, and tell the logic “or” (one or both) from the menu “or” (one, not both).',
hook:'Every app you use decides things with and, or and not. So do school policies (“you can go if you have a pass and your teacher signs it”) and search engines. Misreading one word costs people games, jobs and money.',
real:{t:'A master’s thesis that built the digital world',h:'<p>In 1854 the English mathematician George Boole wrote <i>The Laws of Thought</i>, turning “and,” “or” and “not” into a kind of algebra. For 80 years it seemed like a curiosity.</p><p>Then in 1937 Claude Shannon, a 21-year-old student at MIT, showed in his master’s thesis that electrical switches wired in a row act like AND, and switches wired side by side act like OR. Every computer chip since is built from billions of tiny switches doing Boole’s logic. The picture in this lesson is, almost exactly, Shannon’s idea.</p>',src:'Encyclopaedia Britannica, “George Boole” and “Claude Shannon”; MIT News'},
joke:{cast:['Coach','Liam'],lines:[
 {w:'Coach',s:'You play Friday only if you finish your missing work and you come to every practice this week.'},
 {narr:'Thursday.'},
 {w:'Liam',r:1,s:'Coach, I came to every practice!'},
 {w:'Coach',s:'And?'},
 {w:'Liam',r:1,s:'…And that’s half of an “and.”'},
 {w:'Coach',s:'In logic, half an “and” is a “no.”'}],
 point:'<p>An “<b>and</b>” statement is true only when <b>both</b> parts are true. Liam did one part, so “missing work AND every practice” is false, and he doesn’t play.</p><p>If Coach had said “<b>or</b>,” one part would have been enough. One small word changes everything, which is why lawyers, programmers and coaches choose it carefully.</p>'},
learn:{intro:'Think of each statement as a light switch. ON means true. The light shows whether the whole statement is true.',
 svg:`<svg viewBox="0 0 600 420" role="img" aria-label="A battery, two switches A and B, and a light bulb. In the first circuit the switches are in a row; in the second they are side by side.">
  <text id="ttl" x="300" y="34" text-anchor="middle" class="lbl">AND: switches in a row</text>
  <rect x="34" y="176" width="42" height="74" rx="6" class="box" style="stroke-width:3"/><text x="55" y="206" text-anchor="middle" class="lbl">+</text><text x="55" y="238" text-anchor="middle" class="lbl">−</text>
  <circle id="glow" cx="520" cy="214" r="58" style="fill:var(--hl)" opacity="0"/>
  <circle id="bulb" cx="520" cy="214" r="30" class="box" style="stroke-width:3"/><path d="M508 222 q12 -24 24 0" class="ink" stroke-width="2.5"/>
  <path d="M55 250 V330 H520 V244" ${wire}/>
  <g id="ser">
   <path d="M55 176 V120 H170 M240 120 H330 M400 120 H520 V184" ${wire}/>
   ${lever('sA',170,120)}${lever('sB',330,120)}
   <text x="205" y="160" text-anchor="middle" class="lbl tS">A</text><text x="365" y="160" text-anchor="middle" class="lbl tP">B</text>
  </g>
  <g id="par" opacity="0">
   <path d="M55 176 V120 H170 M120 120 V240 H170 M240 120 H300 M240 240 H300 V120 M300 120 H520 V184" ${wire}/>
   ${lever('pA',170,120)}${lever('pB',170,240)}
   <text x="205" y="160" text-anchor="middle" class="lbl tS">A</text><text x="205" y="280" text-anchor="middle" class="lbl tP">B</text>
  </g>
  <g id="tbl" opacity="0">
   <rect x="20" y="56" width="560" height="356" rx="12" class="box" style="stroke:var(--rj);stroke-width:2"/>
   <text x="300" y="90" text-anchor="middle" class="lbl">The truth table: every combination</text>
   ${['A','B','A and B','A or B'].map((h,i)=>`<text x="${110+i*125}" y="130" text-anchor="middle" class="lbl-m" style="font-weight:700">${h}</text>`).join('')}
   ${[[1,1],[1,0],[0,1],[0,0]].map(([a,b],r)=>[a,b,a&&b,a||b].map((v,i)=>`<text x="${110+i*125}" y="${176+r*52}" text-anchor="middle" class="lbl ${v?'okt':'not'}">${v?'T':'F'}</text>`).join('')).join('')}
   <line x1="40" y1="144" x2="560" y2="144" class="ink" stroke-width="1.5"/>
  </g>
  <g id="nt" opacity="0">
   <rect x="20" y="56" width="560" height="356" rx="12" class="box" style="stroke:var(--rj);stroke-width:2"/>
   <text x="300" y="96" text-anchor="middle" class="lbl">NOT flips true and false</text>
   <text x="200" y="150" text-anchor="middle" class="lbl-m" style="font-weight:700">Door shut</text><text x="400" y="150" text-anchor="middle" class="lbl-m" style="font-weight:700">Fridge light</text>
   <text x="200" y="200" text-anchor="middle" class="lbl okt">T</text><text x="400" y="200" text-anchor="middle" class="lbl not">F (off)</text>
   <text x="200" y="250" text-anchor="middle" class="lbl not">F</text><text x="400" y="250" text-anchor="middle" class="lbl okt">T (on)</text>
   <text x="300" y="320" text-anchor="middle" class="lbl-m">light ON = NOT (door shut)</text>
  </g>
 </svg>`,
 steps:[
  {title:'“And”: two switches in a row',see:'A battery, switches A and B one after the other, and a dark bulb. Both switches are open (OFF).',why:'Electricity has to get through A <b>and</b> B to reach the bulb. With both open, nothing gets through.',set:{ser:{opacity:1},par:{opacity:0},tbl:{opacity:0},nt:{opacity:0},ttl:{text:'AND: switches in a row'},sA:{x2:232,y2:86},sB:{x2:392,y2:86},glow:{opacity:0}},focus:['sA','sB']},
  {title:'One switch on isn’t enough',see:'Switch A snaps shut (ON). B stays open. The bulb stays dark.',why:'“A and B” is still <b>false</b>: the path is blocked at B. That’s Liam: practice was ON, missing work was OFF.',set:{sA:{x2:240,y2:120}},focus:['sA','bulb'],alt:'Picture water in a pipe with two valves in a row. Opening one valve doesn’t help if the other is shut.'},
  {title:'Both on: light',see:'B snaps shut too. The bulb lights up.',why:'“A <b>and</b> B” is true only when <b>both</b> are true. That’s the whole definition.',set:{sB:{x2:400,y2:120},glow:{opacity:.55}},focus:['bulb'],term:'Logicians write “A and B” as <b>A ∧ B</b>. The ∧ looks like an A for “and.”'},
  {title:'“Or”: two switches side by side',see:'A new circuit: A on top, B below, side by side. Only A is ON, and the bulb is lit.',why:'Electricity can take <b>either</b> path. “A <b>or</b> B” is true when at least one is true, including when both are.',set:{ser:{opacity:0},par:{opacity:1},ttl:{text:'OR: switches side by side'},pA:{x2:240,y2:120},pB:{x2:232,y2:206},glow:{opacity:.55}},focus:['pA','bulb'],term:'In logic, “or” means one <b>or both</b> (written <b>A ∨ B</b>). The menu “or” (“soup or salad?”) means one but not both; logicians call that <b>exclusive or</b>.',alt:'Two doors into the gym. If either one is unlocked, you can get in.'},
  {title:'“Not” flips it',see:'A table: when the fridge door is shut (T), the light is off (F). When it’s not shut (F), the light is on (T).',why:'<b>NOT</b> turns true into false and false into true. A fridge light runs on “not door shut.”',set:{par:{opacity:0},nt:{opacity:1},ttl:{text:''},glow:{opacity:0}},focus:['nt']},
  {title:'The truth table',see:'A table with all four combinations of A and B, and whether “A and B” and “A or B” are true for each.',why:'Two switches have 4 combinations (2 × 2). A truth table checks every one, so nothing is left to guessing. Three switches make 8 rows.',set:{nt:{opacity:0},tbl:{opacity:1}},focus:['tbl'],alt:'Read across each row: it’s one possible situation. “And” has one T; “or” has three.'}
 ],
 deep:[{t:'Go deeper: “if-then” has a truth table too',h:'<p>“If you clean your room, I’ll take you to Chipotle” is a promise. When is it broken? Only if you clean your room and don’t get Chipotle. If you didn’t clean, the promise isn’t broken either way. So “if A then B” is false in just one row: A true, B false. Try it in the Try it tab.</p>'},{t:'Go deeper: De Morgan’s laws',h:'<p>“NOT (A and B)” means the same as “(NOT A) or (NOT B).” “NOT (A or B)” means “(NOT A) and (NOT B).” “It’s not true that I have a car and a license” means I’m missing at least one. Programmers use these every day to simplify code.</p>'}]},
tryit:{kind:'switches',title:'Try it: predict the light',intro:'Pick a statement. For each row, predict whether the light (the whole statement) is ON or OFF. The switches flip to match the row, and the light shows if you were right.',
 help:{ask:'For this row’s A and B, is the whole statement true?',another:'AND needs both. OR needs at least one. NOT flips. For “if A then B,” only A true with B false breaks the promise.',start:'Read the row: is A on? Is B on? Then apply the rule for the word.'}},
why:{care:'Rules with “and” and “or” are everywhere: eligibility for sports, scholarships, financial aid and driving permits. Reading them exactly is a life skill, not just a logic skill.',
 meet:[{i:'💻',t:'Code',h:'if (hasPass && teacherSigned) { leave() }. && is AND; || is OR; ! is NOT.'},
  {i:'🔎',t:'Searching',h:'Library databases and Google use them: “Jesuit AND education NOT college.” Quotation marks and minus signs do the same job.'},
  {i:'📄',t:'Forms and rules',h:'“Students must be 16 or older and have a permit” vs. “16 or older, or have a permit” mean very different things.'}],
 border:{t:'Logic in the mind of God?',h:'Medieval thinkers like Aquinas held that God cannot make a contradiction true (a square circle, or “A and not A”), not because God is weak but because a contradiction says nothing at all. The law of non-contradiction, which Aristotle called the firmest of all principles, is the row in every truth table where “A and NOT A” comes out false.'}},
terms:[{t:'And (∧)',d:'true only when both parts are true'},{t:'Or (∨)',d:'true when at least one part is true'},{t:'Exclusive or',d:'true when exactly one part is true'},{t:'Not (¬)',d:'flips true and false'},{t:'Truth table',d:'a list of every combination and the result for each'}],
test:[
 {q:'You tell your mom, “I finished my homework and cleaned my room.” You finished the homework but didn’t clean. Is your statement true?',choices:['Yes, mostly','No','Half true counts as true','It depends on the room'],answer:1,hint:'AND needs both parts.',why:'One part is false, so the whole AND statement is false.'},
 {q:'“You get extra credit if you come to the review session or turn in the practice test.” You did both. Do you get it?',choices:['No, you can only pick one','Yes','Only half the credit','The rule doesn’t say'],answer:1,hint:'In logic, does “or” include both?',why:'Logical “or” is true when at least one part is true, including both.'},
 {q:'How many rows does a truth table need for three statements A, B and C?',choices:['3','6','8','9'],answer:2,hint:'Each one can be true or false. 2 × 2 × 2.',why:'2 × 2 × 2 = 8 combinations.'},
 {q:'A = “It’s raining.” Which is “NOT A”?',choices:['It’s sunny','It’s not raining','It’s snowing','It will rain later'],answer:1,hint:'NOT only flips the statement. It doesn’t add new facts.',why:'“Not raining” is the exact opposite. “Sunny” is a different claim; it could be cloudy.'},
 {q:'The waiter asks, “Soup or salad?” You say, “Both, please.” Which “or” did the waiter mean?',choices:['Inclusive or (one or both)','Exclusive or (one, not both)','AND (both of them)','NOT (neither of them)'],answer:1,hint:'The waiter expects you to pick one.',why:'Menus use exclusive or: one but not both. Logic’s plain “or” allows both.'},
 {q:'“If you score 90 or above, you get an A.” Which situation breaks this rule?',choices:['You scored 85 and got an A','You scored 95 and got a B','You scored 85 and got a B','You scored 95 and got an A'],answer:1,hint:'An if-then is only broken in one row.',why:'Only “if true, then false” breaks it: 95 (the if part is true) but no A.'}
]});
})();
