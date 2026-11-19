/* Lesson 2: Deductive vs. inductive */
(function(){
const wk=[...Array(10)].map((_,k)=>`<g id="w${k+1}" opacity="0"><rect x="${338+(k%5)*46}" y="${k<5?300:340}" width="40" height="32" rx="5" class="box"/><text x="${358+(k%5)*46}" y="${k<5?322:362}" text-anchor="middle" style="font-size:14px;font-weight:700">W${k+1}✓</text></g>`).join('');
const show=n=>{const o={};for(let k=1;k<=10;k++)o['w'+k]={opacity:k<=n?1:0};return o};
LL.add({id:'dedind',unit:'arg',n:2,minutes:12,
title:'Deductive vs. inductive: guaranteed or probably',
teaser:'So either way I should study.',
card:'Learn the two ways reasons can support a claim: a guarantee, or strong evidence.',
goal:'You will be able to tell a deductive argument (the premises guarantee the conclusion) from an inductive one (the premises make it probable), and explain why even strong evidence can be wrong.',
hook:'Doctors, detectives, coaches and scientists use both kinds every day. Knowing which one you’re using tells you how sure you’re allowed to be.',
real:{t:'Finding Neptune with a pencil',h:'<p>By the 1840s astronomers saw that Uranus wandered off the path Newton’s laws predicted. Urbain Le Verrier in France assumed the laws were right and reasoned: if the laws hold, an unseen planet must be pulling on Uranus, and it must be <i>right there</i>. On September 23, 1846, Johann Galle in Berlin pointed his telescope where Le Verrier said, and found Neptune within about one degree.</p><p>Both kinds of reasoning were at work. Newton’s laws were <b>induced</b> from many observations (strong, never certain). Neptune’s position was <b>deduced</b> from them (guaranteed, <i>if</i> the laws were true).</p>',src:'Encyclopaedia Britannica, “Discovery of Neptune”; NASA Solar System Exploration'},
joke:{cast:['Ava','Mr. Diaz'],lines:[
 {w:'Ava',s:'Mr. Diaz, you’ve given a quiz every Friday for ten weeks. So there’s a quiz this Friday.'},
 {w:'Mr. Diaz',r:1,s:'That’s induction. Here’s deduction: the syllabus says every Friday has a quiz, and this is a Friday.'},
 {w:'Ava',s:'So either way I should study.'},
 {w:'Mr. Diaz',r:1,s:'That’s the first conclusion all year I’ve liked.'}],
 point:'<p>Ava and Mr. Diaz reach the same conclusion by two different roads. Ava’s road is <b>inductive</b>: ten Fridays of evidence make a quiz <i>likely</i>. Mr. Diaz’s road is <b>deductive</b>: <i>if</i> the syllabus rule is true and today is Friday, a quiz is <i>guaranteed</i>.</p><p>The test isn’t the topic or the words. It’s how strongly the reasons connect to the conclusion: a guarantee, or a good bet.</p>'},
learn:{intro:'Two roads to the same conclusion, side by side.',
 svg:`<svg viewBox="0 0 600 420" role="img" aria-label="Left: deduction, two premises guarantee the conclusion. Right: induction, ten weeks of evidence raise a likelihood meter that never reaches 100 percent.">
  <text x="150" y="30" text-anchor="middle" class="tag" style="fill:var(--v-s)">DEDUCTION</text>
  <text x="450" y="30" text-anchor="middle" class="tag" style="fill:var(--v-p)">INDUCTION</text>
  <text id="nmL" x="150" y="140" text-anchor="middle" class="lbl-s" opacity="0">valid or invalid</text>
  <text id="nmR" x="450" y="140" text-anchor="middle" class="lbl-s" opacity="0">strong or weak</text>
  <rect id="cL" x="30" y="46" width="240" height="60" rx="10" class="boxhl"/><text id="cLt" x="150" y="84" text-anchor="middle" class="lbl">Quiz this Friday.</text>
  <rect id="cR" x="330" y="46" width="240" height="60" rx="10" class="boxhl"/><text id="cRt" x="450" y="84" text-anchor="middle" class="lbl">Quiz this Friday.</text>
  <g id="dL" opacity="0">
   <line x1="150" y1="250" x2="150" y2="156" class="ink" stroke-width="4"/><path d="M138 166 L150 148 L162 166 Z" class="inkf"/>
   <circle cx="150" cy="200" r="30" class="box" style="stroke:var(--v-s);stroke-width:3"/><text x="150" y="206" text-anchor="middle" style="font-size:17px;font-weight:700">100%</text>
   <text x="225" y="196" text-anchor="middle" class="lbl-s" style="font-size:15px">if both</text><text x="225" y="214" text-anchor="middle" class="lbl-s" style="font-size:15px">are true</text>
   <rect id="pL1" x="30" y="256" width="240" height="56" rx="8" class="box" style="stroke:var(--v-s)"/><text x="150" y="281" text-anchor="middle" class="lbl-m" style="font-size:17px">Syllabus: a quiz</text><text x="150" y="302" text-anchor="middle" class="lbl-m" style="font-size:17px">every Friday.</text>
   <rect x="30" y="320" width="240" height="44" rx="8" class="box" style="stroke:var(--v-s)"/><text x="150" y="349" text-anchor="middle" class="lbl-m" style="font-size:17px">Today is Friday.</text>
   <line id="strike" x1="40" y1="284" x2="260" y2="284" class="nost" stroke-width="4" opacity="0"/>
  </g>
  <g id="mR" opacity="0">
   <rect x="340" y="186" width="220" height="24" rx="12" class="box"/>
   <rect id="mfill" x="340" y="186" width="0" height="24" rx="12" class="warnf"/>
   <line x1="560" y1="178" x2="560" y2="218" class="soft"/>
   <text id="mtx" x="450" y="240" text-anchor="middle" class="lbl-m" style="font-size:17px">How likely: 0%</text>
   <text id="c100" x="450" y="176" text-anchor="middle" class="lbl-s" style="font-size:15px" opacity="0">it never reaches 100%</text>
  </g>
  ${wk}
  <text id="ban" x="300" y="405" text-anchor="middle" class="lbl" style="fill:var(--bad)" opacity="0">Friday: Mr. Diaz is out sick. No quiz.</text>
 </svg>`,
 steps:[
  {title:'Same conclusion, two roads',see:'Two boxes say “Quiz this Friday.” Deduction on the left, induction on the right.',why:'An argument’s type isn’t about its topic. It’s about how the reasons connect to the conclusion.',set:Object.assign({dL:{opacity:0},mR:{opacity:0},mfill:{width:0},mtx:{text:'How likely: 0%'},c100:{opacity:0},ban:{opacity:0},strike:{opacity:0},nmL:{opacity:0},nmR:{opacity:0}},show(0)),focus:['cL','cR']},
  {title:'Deduction: a guarantee',see:'Two premises appear on the left: “Syllabus: a quiz every Friday” and “Today is Friday.” An arrow carries them up with a 100% badge.',why:'If both premises are true, the conclusion <b>cannot</b> be false. That’s what makes an argument <b>deductive</b>.',set:{dL:{opacity:1}},focus:['dL'],alt:'Try to imagine both premises true and no quiz Friday. You can’t without breaking the rule. That “can’t” is the guarantee.'},
  {title:'Induction: evidence piles up',see:'Three cards on the right (weeks 1, 2, 3, each with a quiz) and a meter filling to about 55%.',why:'Past cases make the conclusion <b>more likely</b>, not certain. That’s an <b>inductive</b> argument.',set:Object.assign({mR:{opacity:1},mfill:{width:121},mtx:{text:'How likely: about 55%'}},show(3)),focus:['mfill','w3'],alt:'Three Fridays in a row with a quiz is a pattern, but a short one. Would you bet your phone on it?'},
  {title:'More evidence, stronger, never certain',see:'Now ten week cards, and the meter at about 90%. A line at the end marks 100%.',why:'More good evidence makes an inductive argument <b>stronger</b>. But no pile of past cases can make the future certain.',set:Object.assign({mfill:{width:198},mtx:{text:'How likely: about 90%'},c100:{opacity:1}},show(10)),focus:['mfill','c100'],alt:'Even 1,000 sunny days in a row don’t make tomorrow’s sun certain. They make it a very good bet.'},
  {title:'Friday comes: no quiz',see:'Red banner: Mr. Diaz is out sick. On the left, the syllabus premise gets crossed out.',why:'The induction failed with <b>all its evidence true</b>: it was only probable. The deduction failed only because a premise was false: not <i>every</i> Friday has a quiz.',set:{ban:{opacity:1},strike:{opacity:1}},focus:['ban','strike'],term:'This is the big difference. A deductive argument can only let you down if a premise is false. An inductive one can let you down even when every premise is true.',alt:'Ask: “Were all the reasons true and it still went wrong?” If yes, it was induction.'},
  {title:'Each kind has its own grades',see:'Under the titles: “valid or invalid” for deduction, “strong or weak” for induction.',why:'We grade deduction by whether the guarantee holds (<b>valid</b>). We grade induction by how much the evidence raises the odds (<b>strong</b>). Lesson 3 is all about valid.',set:{nmL:{opacity:1},nmR:{opacity:1}},focus:['nmL','nmR']}
 ],
 deep:[{t:'Go deeper: the “general to specific” myth',h:'<p>Some textbooks say deduction goes from general to specific and induction goes from specific to general. That’s often true, but it isn’t the test. “Ava is taller than Ben; Ben is taller than Cal; so Ava is taller than Cal” is deductive and has no general rule in it. “Every bus this week was late, so every bus next week will be late” is inductive and ends in a general rule. The real test is always: guaranteed, or probable?</p>'}]},
tryit:{kind:'cases',stages:[
 {intro:'Is each argument <b>deductive</b> (the conclusion is guaranteed if the premises are true) or <b>inductive</b> (the premises make it probable)?',k:'Deductive or inductive?',items:[
  {q:'“Every RJ student has a student ID. Maya is an RJ student. So Maya has a student ID.”',choices:['Deductive','Inductive'],answer:0,why:'If both premises are true, Maya must have an ID. There’s no way around it.'},
  {q:'“The last 20 times I ordered from this place, the food came cold. So it will come cold tonight.”',choices:['Deductive','Inductive'],answer:1,why:'Twenty past orders make cold food likely, not certain. Tonight could be different.'},
  {q:'“Either the game is Friday or Saturday. It isn’t Friday. So it’s Saturday.”',choices:['Deductive','Inductive'],answer:0,why:'If there are only two options and one is ruled out, the other must be true.'},
  {q:'“Every fossil found in this rock layer is a sea creature. So this area was probably once under the ocean.”',choices:['Deductive','Inductive'],answer:1,why:'The fossils are strong evidence for an ocean, but they don’t guarantee it. The word “probably” is a clue too.'},
  {q:'“In 1,000 flips this coin landed heads about half the time. So the next flip has about a 50% chance of heads.”',choices:['Deductive','Inductive'],answer:1,why:'Past flips are evidence about the coin. They make the claim probable.'},
  {q:'“All squares have four sides. This shape is a square. So it has four sides.”',choices:['Deductive','Inductive'],answer:0,why:'The conclusion follows with certainty from the premises.'}]},
 {title:'strong or weak?',intro:'Now just inductive arguments. Is each one <b>strong</b> (the evidence really raises the odds) or <b>weak</b>?',k:'Strong or weak?',items:[
  {q:'“I asked three friends and they loved the movie. So most people will love it.”',choices:['Strong','Weak'],answer:1,why:'Three friends, who probably like what you like, tell you little about “most people.”'},
  {q:'“A Pew Research Center survey of about 1,400 randomly chosen U.S. teens (2024) found 46% say they’re online almost constantly. So roughly 4 or 5 in 10 U.S. teens are.”',choices:['Strong','Weak'],answer:0,why:'A large random sample is good evidence about the whole group. (Lesson 10 shows why.)'},
  {q:'“It snowed on Halloween last year. So it will snow on Halloween this year.”',choices:['Strong','Weak'],answer:1,why:'One past case is very little evidence about weather.'},
  {q:'“The bridge has carried trucks heavier than mine every day for 40 years, and it was inspected last month. So it will hold my truck.”',choices:['Strong','Weak'],answer:0,why:'Lots of relevant evidence, plus a recent check. Not certain, but strong.'}]}]},
why:{care:'When someone says “trust me, it always works,” they’re making an inductive claim. Ask how much evidence, and what kind. When someone says “it has to be true,” they’re claiming a deduction. Ask whether the premises are true.',
 meet:[{i:'🩺',t:'Medicine',h:'Clinical trials are induction: thousands of patients make a treatment’s benefit probable. Applying a dosing rule to one patient is deduction.'},
  {i:'📐',t:'Math class',h:'A geometry proof is deduction: each step is guaranteed. Noticing a pattern in examples is induction; proving it is deduction.'},
  {i:'🌦️',t:'Weather',h:'“70% chance of rain” is an inductive conclusion from past days that looked like today.'}],
 border:{t:'Can we be certain of anything?',h:'Philosophers have argued about this for centuries. David Hume (1748) asked how we know the future will be like the past at all; it seems we can only answer with more induction. Thomas Aquinas, centuries earlier, held that some truths are known by reasoning to a guarantee and others are held with a moral certainty strong enough to live by. Both agree on the lesson here: know which kind of certainty you have.'}},
terms:[{t:'Deductive',d:'the premises, if true, guarantee the conclusion'},{t:'Inductive',d:'the premises, if true, make the conclusion probable'},{t:'Valid',d:'a deductive argument whose guarantee really holds'},{t:'Strong',d:'an inductive argument whose evidence really raises the odds'}],
test:[
 {q:'What makes an argument deductive?',choices:['It starts with a general rule and ends with a case','If the premises are true, the conclusion must be true','It has more than two premises and a conclusion','It uses words like “therefore” or “so”'],answer:1,hint:'Think about the 100% badge.',why:'Deduction is about a guarantee: true premises make a false conclusion impossible.',alt:'Ignore the topic and the words. Ask: could the premises be true and the conclusion still be false?'},
 {q:'“My sister has loved every Pixar movie. So she’ll love the next one.” This argument is…',choices:['deductive and valid','inductive','deductive and invalid','not an argument'],answer:1,hint:'Is the conclusion guaranteed, or just likely?',why:'Past movies make it likely she’ll like the next one, but don’t guarantee it.'},
 {q:'An inductive argument has all true premises, and its conclusion turns out false. What does that show?',choices:['The argument must have been deductive after all','One of its premises must have been false','Nothing strange: induction only makes it probable','Logic doesn’t work on things about the future'],answer:2,hint:'Remember the Friday with no quiz.',why:'Inductive arguments can fail even when every premise is true. That’s what “probable” means.'},
 {q:'Which change makes this inductive argument stronger? “Two classmates said the new lunch is good, so it’s probably good.”',choices:['Asking two more of your friends at lunch','Saying it louder so more people hear it','Checking reviews from 200 students who tried it','Adding the word “definitely” to the conclusion'],answer:2,hint:'Stronger evidence means more, and more varied, evidence.',why:'A large, varied group of students who tried it is much better evidence than two classmates.'},
 {q:'“If it’s a Monday, the library opens at 7. It’s Monday. So the library opens at 7.” This is…',choices:['inductive, because it’s about a schedule','deductive','inductive, because it could be wrong','neither'],answer:1,hint:'If both premises are true, could the library open at another time?',why:'If both premises are true, the conclusion must be true. That’s deduction.'},
 {q:'A deductive argument’s conclusion is false. What must be true?',choices:['A premise is false, or the argument isn’t valid','The argument was inductive, not deductive','All of the premises must be false','Nothing: deductions can just be wrong'],answer:0,hint:'A valid deduction with true premises can’t have a false conclusion.',why:'If the guarantee holds, a false conclusion means a premise was false. Otherwise the guarantee didn’t hold.'}
]});
})();
