/* Lesson 1: What an argument is */
LL.add({id:'argument',unit:'arg',n:1,minutes:12,
title:'An argument is a claim with reasons',
teaser:'That’s not an argument. That’s a sentence.',
card:'Find the conclusion and the reasons holding it up, in texts, debates and your own essays.',
goal:'You will be able to find the conclusion of an argument and the premises (reasons) that hold it up, and tell an argument from an explanation.',
hook:'Every essay you write, every “can I go?” you ask at home and every ad you scroll past is an argument. If you can see its parts, you can make yours stronger and spot the weak ones aimed at you.',
real:{t:'California’s school start time law',h:'<p>In 2019 California became the first state to set a latest-start rule for schools: under Senate Bill 328, high schools may not start before 8:30 a.m. (from the 2022–23 school year). The debate was a row of pillars on each side.</p><p><b>Conclusion:</b> high schools should start at 8:30 or later. <b>Premises for it:</b> pediatricians recommend it; teens’ body clocks run later; tired students learn less. <b>Premises against it:</b> higher bus costs, sports and after-school jobs, and districts losing control of their own schedules. Lawmakers weren’t choosing between people. They were testing which pillars held up.</p>',src:'CBS News Sacramento and EdSource, Oct. 2019'},
joke:{title:'Start with a joke',cast:['Theo','Mom'],lines:[
 {w:'Theo',s:'Mom, I need a new phone.'},
 {w:'Mom',r:1,s:'That’s not an argument. That’s a sentence.'},
 {w:'Theo',s:'Fine. My battery dies by second block. All my homework is on Canvas. So I need a new phone.'},
 {w:'Mom',r:1,s:'Now it’s an argument.'},
 {w:'Theo',s:'So I win?'},
 {w:'Mom',r:1,s:'No. Now I can see exactly where it’s weak. Ever heard of a charger?'}],
 point:'<p>In logic, an <b>argument</b> isn’t a fight. It’s a <b>claim plus the reasons</b> given for it. Theo’s first line is only a claim. His second try adds reasons, so it becomes an argument.</p><p>Mom is right twice. Giving reasons is what makes it an argument. And once the reasons are out in the open, you can check whether they really hold the claim up. (A dying battery is a reason for a charger, not a phone.)</p>'},
learn:{intro:'Picture an argument as a building. The claim is the roof. The reasons are the pillars holding it up.',
 svg:`<svg viewBox="0 0 600 410" role="img" aria-label="An argument drawn as a building: the conclusion is the roof and the premises are the pillars.">
  <text id="sent" x="300" y="30" text-anchor="middle" class="lbl-s">Theo: “I need a new phone.”</text>
  <rect x="40" y="308" width="520" height="12" rx="3" class="inkf" opacity=".25"/>
  <g id="pills">
   <rect id="p1" x="105" y="308" width="170" height="0" rx="6" class="box"/>
   <rect id="p2" x="325" y="308" width="170" height="0" rx="6" class="box"/>
   <path id="crack" d="M122 146 l12 30 l-10 24 l14 30 l-8 30" class="ink" stroke-width="3" opacity="0"/>
   <g id="ptx" opacity="0">
    <text id="p1tag" x="190" y="168" text-anchor="middle" class="tag tS">PREMISE</text>
    <text id="p1a" x="190" y="205" text-anchor="middle" class="lbl-m">My battery</text>
    <text id="p1b" x="190" y="230" text-anchor="middle" class="lbl-m">dies by</text>
    <text id="p1c" x="190" y="255" text-anchor="middle" class="lbl-m">2nd block.</text>
    <text id="p2tag" x="410" y="168" text-anchor="middle" class="tag tS">PREMISE</text>
    <text id="p2a" x="410" y="205" text-anchor="middle" class="lbl-m">My homework</text>
    <text id="p2b" x="410" y="230" text-anchor="middle" class="lbl-m">is all on</text>
    <text id="p2c" x="410" y="255" text-anchor="middle" class="lbl-m">Canvas.</text>
   </g>
  </g>
  <g id="roofG">
   <rect id="roof" x="70" y="60" width="460" height="70" rx="10" class="boxhl"/>
   <text id="roofTag" x="300" y="84" text-anchor="middle" class="tag" style="fill:var(--rj)">CONCLUSION</text>
   <text id="roofT" x="300" y="115" text-anchor="middle" class="lbl">I need a new phone.</text>
  </g>
  <g id="ind" opacity="0">
   <text x="300" y="356" text-anchor="middle" class="lbl-m"><tspan font-weight="700" style="fill:var(--rj)">Conclusion words:</tspan> so, therefore, that’s why</text>
   <text x="300" y="390" text-anchor="middle" class="lbl-m"><tspan font-weight="700" class="tS">Premise words:</tspan> because, since, given that</text>
  </g>
 </svg>`,
 steps:[
  {title:'A claim on its own',see:'Just a roof, sitting on the ground. Theo’s claim, “I need a new phone,” with nothing under it.',why:'A claim with no reasons gives you nothing to check. You can only agree or disagree with it.',set:{roofG:{ty:178},p1:{y:308,height:0},p2:{y:308,height:0},ptx:{opacity:0},ind:{opacity:0},crack:{opacity:0},p2tag:{opacity:1},roofTag:{text:'CONCLUSION'},p1tag:{text:'PREMISE'}},focus:['roof'],alt:'Think of a friend who just says “That movie was bad” and stops. You can’t check that. You can only shrug.'},
  {title:'Reasons hold it up',see:'Two pillars rise and lift the roof: “My battery dies by 2nd block” and “My homework is all on Canvas.”',why:'The reasons are called <b>premises</b>. The claim they hold up is the <b>conclusion</b>. Premises plus a conclusion make an argument.',term:'<b>Premise</b>: a reason given for a claim. <b>Conclusion</b>: the claim the reasons are meant to support. The word “premise” comes from Latin for “put in front.” Premises come first in the reasoning, even when they don’t come first in the sentence.',set:{roofG:{ty:0},p1:{y:140,height:168},p2:{y:140,height:168},ptx:{opacity:1}},focus:['p1','p2'],alt:'Ask “Why should I believe that?” Whatever answers it is a premise. The thing you’re asked to believe is the conclusion.'},
  {title:'Signal words point the way',see:'Two lists appear under the building: words that come before a conclusion, and words that come before a premise.',why:'“So” and “therefore” point up to the roof. “Because” and “since” point down to a pillar. They’re the fastest way to find the parts.',set:{ind:{opacity:1}},focus:['ind'],alt:'Swap in the word “so” and see if the sentence still makes sense: “Battery dies, homework’s online, SO I need a phone.” What comes after “so” is the conclusion.'},
  {title:'Order in the sentence doesn’t matter',see:'The top line now reads “I need a new phone because my battery dies.” The conclusion comes first, but it’s still on the roof.',why:'People often say the conclusion first. Find it by what it does, not where it is: it’s the claim the others are there to support.',set:{sent:{text:'“I need a new phone because my battery dies.”'}},focus:['roof','sent'],alt:'Cover the word “because.” What’s left on the left is the claim; what’s on the right is the reason for it.'},
  {title:'Not every “because” is an argument',see:'The roof now says “The game was postponed.” The pillar says “The field was flooded.”',why:'Nobody is trying to convince you the game was postponed. You already know. The “because” explains <b>why it happened</b>. That’s an <b>explanation</b>, not an argument.',term:'Test: is the top something people already accept? Then it’s an explanation. Is it something you are being asked to believe? Then it’s an argument.',set:{sent:{text:'“The game was postponed because the field was flooded.”'},roofT:{text:'The game was postponed.'},p1a:{text:'The field'},p1b:{text:'was'},p1c:{text:'flooded.'},p2:{opacity:0},p2tag:{opacity:0},roofTag:{text:'WHAT HAPPENED'},p1tag:{text:'WHY IT HAPPENED'},p2a:{text:''},p2b:{text:''},p2c:{text:''}},focus:['roof'],alt:'An argument answers “Why should I believe it?” An explanation answers “Why did it happen?”'},
  {title:'Next question: does it really hold?',see:'Back to Theo. A crack runs down the battery pillar.',why:'Finding the parts is step one. Step two is asking if each pillar is true and if together they really hold the roof up. A dead battery calls for a charger, not a new phone.',set:{sent:{text:'Mom: “Ever heard of a charger?”'},roofT:{text:'I need a new phone.'},p1a:{text:'My battery'},p1b:{text:'dies by'},p1c:{text:'2nd block.'},p2:{opacity:1},p2tag:{opacity:1},roofTag:{text:'CONCLUSION'},p1tag:{text:'PREMISE'},p2a:{text:'My homework'},p2b:{text:'is all on'},p2c:{text:'Canvas.'},crack:{opacity:1}},focus:['crack'],alt:'Even if both reasons are true, do they lead to “new phone”? Or do they lead somewhere else, like “charge it at lunch”?'}
 ],
 deep:[{t:'Go deeper: hidden premises',h:'<p>Many arguments skip a premise everyone is supposed to assume. Theo’s argument needs a hidden one: “If my phone dies during the day, I need a new phone.” Saying the hidden premise out loud is often the quickest way to see where an argument is weak. Logicians call an argument with an unstated premise an <b>enthymeme</b> (EN-thih-meem), Aristotle’s word for it.</p>'}]},
tryit:{kind:'sorter',title:'Try it: take arguments apart',intro:'Tap each sentence until it shows the right label: <b>Conclusion</b>, <b>Premise</b> or <b>Neither</b> (just background). Then check.',
 passages:[
  {t:'A later start',s:[
   {x:'RJ should start school at 8:30 or later.',r:'c',why:'This is the claim the other sentences are there to support.'},
   {x:'The American Academy of Pediatrics recommends that high schools start at 8:30 a.m. or later.',r:'p',why:'A reason to accept the claim: doctors who study teen health recommend it.'},
   {x:'Teens’ body clocks shift later during puberty, so they get sleepy later at night.',r:'p',why:'A reason: an early start fights students’ biology.'},
   {x:'The bell schedule was printed in August.',r:'n',why:'True, maybe, but it gives no reason to start later. It’s background.'}]},
  {t:'Picking a captain',s:[
   {x:'Jordan hasn’t missed a single practice all season.',r:'p',why:'A reason to make her captain.'},
   {x:'Practice starts at 3:15 in the main gym.',r:'n',why:'Background. It doesn’t support any claim here.'},
   {x:'Everyone on the team trusts her to be fair.',r:'p',why:'Another reason to make her captain.'},
   {x:'That’s why Jordan should be captain.',r:'c',why:'“That’s why” points to the conclusion.'}]},
  {t:'The concession stand',s:[
   {x:'We should sell hot chocolate, not lemonade, at the December home game.',r:'c',why:'The conclusion comes first here. The rest are the reasons for it.'},
   {x:'The forecast says it will be about 25°F at kickoff.',r:'p',why:'A reason: cold weather favors hot drinks.'},
   {x:'Last December the hot chocolate sold out in under an hour.',r:'p',why:'A reason: evidence it sells.'},
   {x:'Lemonade sells best on hot days.',r:'p',why:'A reason not to pick lemonade.'}]}
 ],
 stage2:{intro:'One more skill: is it an <b>argument</b> (trying to convince you) or an <b>explanation</b> (telling you why something happened)?',items:[
  {q:'“The Wi-Fi went down because the router overheated.”',choices:['Argument','Explanation'],answer:1,why:'Nobody is arguing the Wi-Fi went down. The sentence explains why it happened.'},
  {q:'“You should back up your essay, because laptops crash at the worst time.”',choices:['Argument','Explanation'],answer:0,why:'It’s trying to get you to do something (back up your essay) and gives a reason.'},
  {q:'“The bread rose because the yeast made carbon dioxide.”',choices:['Argument','Explanation'],answer:1,why:'It explains how the bread rose. No one doubts that it did.'},
  {q:'“Since the bus is always late on Mondays, we should leave early tomorrow.”',choices:['Argument','Explanation'],answer:0,why:'“We should leave early” is a claim being supported by a reason.'}]}},
why:{care:'Teachers grade essays on this. A thesis is a conclusion; your body paragraphs are its premises. If a reader can’t point to your pillars, the essay feels like a claim sitting on the ground.',
 meet:[{i:'✍️',t:'Essays',h:'Your thesis is the roof. Each paragraph should be a pillar you could name in one sentence.'},
  {i:'📱',t:'Posts and ads',h:'Many posts are a roof with no pillars (“This is the best phone ever”). Ask: what’s holding that up?'},
  {i:'🏠',t:'At home',h:'“Can I go?” gets a better answer with reasons: who’s driving, when you’ll be back, that your homework is done.'}],
 border:{t:'Why give reasons at all?',h:'Aristotle called humans the “rational animal”: we can give and ask for reasons. Catholic thinkers from Augustine to Aquinas held that faith and reason work together, so Aquinas filled his books with arguments, not just claims. Giving reasons treats the other person as someone who can think, not just someone to push.'}},
terms:[{t:'Argument',d:'a conclusion plus the premises given to support it'},{t:'Premise',d:'a reason offered to support a claim'},{t:'Conclusion',d:'the claim the premises are meant to support'},{t:'Explanation',d:'says why something we already accept happened'}],
test:[
 {q:'Which one is an argument?',choices:['Pineapple on pizza is gross, and it always has been, honestly.','Pineapple on pizza is gross, so I’m ordering pepperoni.','I ordered pepperoni with extra cheese tonight.','Is pineapple on pizza gross, or just different?'],answer:1,hint:'An argument needs a claim and at least one reason for something.',why:'It gives a reason (pineapple is gross) for a conclusion (I’m ordering pepperoni).',alt:'Look for a “so” or a “because” connecting two ideas.'},
 {q:'“Since the library closes at 4, we should study at my house.” What is the conclusion?',choices:['The library closes at 4.','We should study at my house.','Since the library closes early.','There is no conclusion here.'],answer:1,hint:'“Since” comes before a premise. What is the other part?',why:'“Since” marks the premise, so the other part, “we should study at my house,” is the conclusion.'},
 {q:'“We should leave now. Traffic gets bad after 5. The movie starts at 5:30.” How many premises?',choices:['None','One','Two','Three'],answer:2,hint:'Find the claim first. Everything that supports it is a premise.',why:'The conclusion is “We should leave now.” The other two sentences are reasons for it.'},
 {q:'“The power went out because a tree fell on the line.” This is…',choices:['an argument, because it uses the word “because” to give a reason','an explanation: it tells why something we already know happened','neither: it has no premise and no conclusion at all','an argument with a hidden premise about the weather'],answer:1,hint:'Is anyone trying to convince you the power went out?',why:'Everyone already knows the power went out. The sentence explains why.'},
 {q:'Your friend says, “That show is the best show ever.” What would turn it into an argument?',choices:['Saying it louder and more often','Adding a reason, like “the writing keeps surprising me”','Adding “totally” and “literally” before “best”','Posting it on three apps so a lot more people will see it'],answer:1,hint:'What does a roof need to stand up?',why:'An argument needs premises. A reason turns a bare claim into an argument you can check.'},
 {q:'An argument has true premises. Does that mean it’s a good argument?',choices:['Yes: true premises always make an argument good','No: the premises also have to support the conclusion','Yes, as long as there are at least two of them','No: good arguments don’t need any premises at all'],answer:1,hint:'Remember Theo’s battery and the charger.',why:'True reasons can still fail to hold up the claim. A dying battery is true, but it supports “get a charger,” not “get a new phone.”'}
]});
