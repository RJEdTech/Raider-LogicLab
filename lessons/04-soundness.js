/* Lesson 4: Soundness */
LL.add({id:'soundness',unit:'ded',n:4,minutes:12,
title:'Sound: valid AND true',
teaser:'Your logic is perfect. Where’s my unicorn?',
card:'Only a sound argument proves its conclusion. Learn the two (and only two) ways to take a deductive argument down.',
goal:'You will be able to decide whether a deductive argument is sound (valid with all true premises), and attack an argument the right way: by challenging a premise or by showing the conclusion doesn’t follow.',
hook:'When you disagree with someone, you have exactly two moves against a deductive argument: deny a premise, or show the conclusion doesn’t follow. Knowing which one you’re making keeps an argument from turning into a shouting match.',
real:{t:'A spacecraft lost to one false premise',h:'<p>In 1999 NASA’s Mars Climate Orbiter, built by Lockheed Martin here in Colorado, flew too low into Mars’s atmosphere and was lost. The navigation math was done correctly. The problem was an input: one team’s software reported thruster force in pound-force seconds, and the navigation team’s software assumed newton-seconds. One pound-force is about 4.45 newtons.</p><p>Every calculation after that was valid, and the conclusion (the spacecraft’s path) was still wrong, because a premise was false. The $125 million orbiter is the most expensive lesson in why valid isn’t enough: an argument has to be <b>sound</b>.</p>',src:'NASA Mars Climate Orbiter Mishap Investigation Board, Phase I Report (Nov. 10, 1999); Los Angeles Times, Oct. 1, 1999'},
joke:{cast:['Salesman','Customer'],lines:[
 {w:'Salesman',s:'Every phone sold at my store comes with a free unicorn. You bought a phone at my store. So you have a free unicorn.'},
 {w:'Customer',r:1,s:'Your logic is perfect.'},
 {w:'Salesman',s:'Thank you.'},
 {w:'Customer',r:1,s:'Where’s my unicorn?'}],
 point:'<p>The salesman’s argument is <b>valid</b>: if every phone came with a unicorn, and you bought a phone there, you’d have a unicorn. The customer admits that. But the first premise is false, so the argument isn’t <b>sound</b>, and the conclusion isn’t proven.</p><p>A <b>sound</b> argument is valid <i>and</i> has only true premises. Only a sound argument guarantees a true conclusion. The customer’s question attacks the right thing: a premise.</p>'},
learn:{intro:'Back to the building. True premises are solid pillars. A valid link is the beams joining pillars to roof.',
 svg:`<svg viewBox="0 0 600 420" role="img" aria-label="A building: pillars are premises, beams are the logical link, the roof is the conclusion.">
  <text id="verd" x="300" y="30" text-anchor="middle" class="lbl" style="fill:var(--good)">SOUND</text>
  <g id="bld">
   <g id="roofG"><rect x="100" y="58" width="400" height="60" rx="10" class="boxhl"/><text id="roofT" x="300" y="96" text-anchor="middle" class="lbl-m" style="font-weight:700">So whales breathe air.</text></g>
   <text id="gapq" x="300" y="127" text-anchor="middle" class="lbl" style="fill:var(--bad);font-size:30px" opacity="0">? ? ?</text>
   <rect id="b1" x="186" y="116" width="48" height="16" class="inkf"/><rect id="b2" x="366" y="116" width="48" height="16" class="inkf"/>
   <rect id="p1" x="150" y="132" width="120" height="150" rx="6" class="box" style="stroke-width:3"/>
   <rect id="p2" x="330" y="132" width="120" height="150" rx="6" class="box" style="stroke-width:3"/>
   <text id="p1t" x="210" y="214" text-anchor="middle" class="lbl okt">TRUE</text>
   <text id="p2t" x="390" y="214" text-anchor="middle" class="lbl okt">TRUE</text>
   <rect x="80" y="282" width="440" height="12" rx="3" class="inkf" opacity=".25"/>
   <g id="atk" opacity="0">
    <path d="M60 230 L140 210" class="ink" stroke-width="4" style="stroke:var(--rj)"/><path d="M132 200 L148 208 L136 222 Z" class="rj"/>
    <text x="16" y="256" class="lbl-m" style="fill:var(--rj);font-weight:700">Attack 1:</text><text x="16" y="278" class="lbl-s" style="font-size:16px">a premise</text>
    <path d="M560 150 L470 140" class="ink" stroke-width="4" style="stroke:var(--rj)"/><path d="M478 130 L462 139 L476 151 Z" class="rj"/>
    <text x="586" y="176" text-anchor="end" class="lbl-m" style="fill:var(--rj);font-weight:700">Attack 2:</text><text x="586" y="198" text-anchor="end" class="lbl-s" style="font-size:16px">the link</text>
   </g>
  </g>
  <g id="grid" opacity="0">
   <rect x="150" y="60" width="210" height="100" rx="8" class="box" style="stroke:var(--good);stroke-width:4"/><rect x="370" y="60" width="210" height="100" rx="8" class="box"/>
   <rect x="150" y="170" width="210" height="100" rx="8" class="box"/><rect x="370" y="170" width="210" height="100" rx="8" class="box"/>
   <text x="255" y="52" text-anchor="middle" class="tag">ALL PREMISES TRUE</text><text x="475" y="52" text-anchor="middle" class="tag">A PREMISE FALSE</text>
   <text x="140" y="115" text-anchor="end" class="tag">VALID</text><text x="140" y="225" text-anchor="end" class="tag">INVALID</text>
   <text x="255" y="105" text-anchor="middle" class="lbl okt">SOUND</text><text x="255" y="133" text-anchor="middle" class="lbl-s" style="font-size:15px">conclusion must be true</text>
   <text x="475" y="105" text-anchor="middle" class="lbl-m">unsound</text><text x="475" y="133" text-anchor="middle" class="lbl-s" style="font-size:15px">the unicorn store</text>
   <text x="255" y="215" text-anchor="middle" class="lbl-m">unsound</text><text x="255" y="243" text-anchor="middle" class="lbl-s" style="font-size:15px">true parts, no link</text>
   <text x="475" y="215" text-anchor="middle" class="lbl-m">unsound</text><text x="475" y="243" text-anchor="middle" class="lbl-s" style="font-size:15px">nothing holds</text>
  </g>
  <text id="l1" x="300" y="330" text-anchor="middle" class="lbl-m" style="font-size:17px">All mammals breathe air.</text>
  <text id="l2" x="300" y="356" text-anchor="middle" class="lbl-m" style="font-size:17px">All whales are mammals.</text>
  <text id="l3" x="300" y="382" text-anchor="middle" class="lbl-m" style="font-size:17px;font-weight:700">So all whales breathe air.</text>
 </svg>`,
 steps:[
  {title:'Sound: solid pillars, joined',see:'Both pillars say TRUE and the beams join them to the roof. Above: SOUND.',why:'The argument is <b>valid</b> (the beams) and its premises are <b>true</b> (the pillars). That’s a <b>sound</b> argument, and its conclusion must be true.',term:'<b>Sound</b> = valid + all premises true. Only a sound argument proves its conclusion.',set:{verd:{text:'SOUND',class:'lbl okt'},bld:{opacity:1},grid:{opacity:0},atk:{opacity:0},p1:{class:'box'},p2:{class:'box'},p1t:{text:'TRUE',class:'lbl okt'},p2t:{text:'TRUE',class:'lbl okt'},b1:{opacity:1},b2:{opacity:1},roofG:{ty:0},gapq:{opacity:0},roofT:{text:'So all whales breathe air.'},l1:{text:'All mammals breathe air.'},l2:{text:'All whales are mammals.'},l3:{text:'So all whales breathe air.'}},focus:['p1','p2','b1','b2']},
  {title:'Valid, but a hollow pillar',see:'The salesman’s argument. The left pillar turns dashed and says FALSE. The beams are still there.',why:'It’s still <b>valid</b>: the link holds. But a false premise means the roof isn’t really supported. Valid but <b>unsound</b>.',set:{verd:{text:'VALID, NOT SOUND',class:'lbl not'},p1:{class:'soft'},p1t:{text:'FALSE',class:'lbl not'},roofT:{text:'So you have a free unicorn.'},l1:{text:'Every phone from my store comes with a unicorn.'},l2:{text:'You bought a phone at my store.'},l3:{text:'So you have a free unicorn.'}},focus:['p1'],alt:'Picture a perfect recipe made with a spoiled ingredient. The steps were right; the result is still bad.'},
  {title:'True pillars, no link',see:'Both pillars TRUE again, but the beams vanish and the roof floats up with question marks under it.',why:'“All squares are shapes. All circles are shapes. So all squares are circles.” True premises, but the conclusion doesn’t follow. <b>Invalid</b>, so unsound.',set:{verd:{text:'INVALID',class:'lbl not'},p1:{class:'box'},p1t:{text:'TRUE',class:'lbl okt'},b1:{opacity:0},b2:{opacity:0},roofG:{ty:-16},gapq:{opacity:1},roofT:{text:'So all squares are circles.'},l1:{text:'All squares are shapes.'},l2:{text:'All circles are shapes.'},l3:{text:'So all squares are circles.'}},focus:['gapq'],alt:'Being in the same big group (shapes) doesn’t put two things in each other’s group.'},
  {title:'True by luck isn’t proven',see:'Same floating roof. Now the conclusion is true: “So the Broncos play in Denver.”',why:'“Denver is in Colorado. Colorado is in the U.S. So the Broncos play in Denver.” Everything is true, but the premises don’t support the conclusion. It’s <b>true by luck</b>, not proven.',set:{verd:{text:'INVALID (TRUE BY LUCK)',class:'lbl not'},roofT:{text:'So the Broncos play in Denver.'},l1:{text:'Denver is in Colorado.'},l2:{text:'Colorado is in the United States.'},l3:{text:'So the Broncos play in Denver.'}},focus:['roofG'],alt:'Would the premises still be true if the Broncos moved to Las Vegas? Yes. So they can’t be what makes the conclusion true.'},
  {title:'All four cases',see:'A 2-by-2 grid. Only one box, valid with all true premises, is outlined in green: SOUND.',why:'Three of the four combinations fail. Only <b>sound</b> arguments guarantee a true conclusion.',set:{bld:{opacity:0},grid:{opacity:1},verd:{text:'ONLY ONE BOX PROVES ANYTHING',class:'lbl'},l1:{text:''},l2:{text:''},l3:{text:''}},focus:['grid']},
  {title:'Two ways to attack',see:'The building is back with two red arrows: one at a pillar (“a premise”), one at the beams (“the link”).',why:'To take down a deductive argument you must show <b>a premise is false</b> or <b>the conclusion doesn’t follow</b>. Anything else, like attacking the speaker, misses.',set:{bld:{opacity:1},grid:{opacity:0},atk:{opacity:1},verd:{text:'HOW TO DISAGREE WELL',class:'lbl'},b1:{opacity:1},b2:{opacity:1},roofG:{ty:0},gapq:{opacity:0},p1:{class:'box'},p1t:{text:'?',class:'lbl'},p2t:{text:'?',class:'lbl'},roofT:{text:'Their conclusion'},l1:{text:'“Which premise is false?”  or  “How does that follow?”'}},focus:['atk']}
 ]},
tryit:{kind:'grid',title:'Try it: sort the arguments',intro:'For each argument, tap the box where it belongs. Ask two questions: <b>Would the conclusion have to follow?</b> (valid) <b>Are all the premises actually true?</b>',
 items:[
  {a:'Every U.S. president was at least 35 when taking office. Abraham Lincoln was a U.S. president. So Lincoln was at least 35 when he took office.',v:1,t:1,why:'Valid, and both premises are true (the Constitution requires it). Sound.'},
  {a:'All birds can fly. Penguins are birds. So penguins can fly.',v:1,t:0,why:'Valid form, but “all birds can fly” is false. Penguins prove it.'},
  {a:'All dogs are mammals. All cats are mammals. So all dogs are cats.',v:0,t:1,why:'True premises, but being mammals doesn’t make dogs cats. Invalid.'},
  {a:'Water boils at 100°C at sea level. Denver is above sea level. So the Broncos have a home stadium.',v:0,t:1,why:'Everything is true, including the conclusion, but the premises have nothing to do with it. Invalid.'},
  {a:'Every RJ freshman takes Algebra 3. Theo is an RJ freshman. So Theo takes Algebra 3.',v:1,t:0,why:'Valid form, but freshmen don’t all take “Algebra 3.” A false premise makes it unsound.'},
  {a:'If it rains, the game is canceled. The game was canceled. So it rained. (Suppose both premises are true.)',v:0,t:1,why:'Even if both premises are true, the game could have been canceled for lightning or a flooded field. Invalid (lesson 5 names this mistake).'},
  {a:'No reptiles have feathers. All snakes are reptiles. So no snakes have feathers.',v:1,t:1,why:'Valid and both premises are true. Sound.'},
  {a:'Some teenagers drive. All drivers are over 21. So some teenagers are over 21.',v:1,t:0,why:'The form is valid, but “all drivers are over 21” is false.'}]},
why:{care:'Most real arguments people have are about premises, not logic. Once you agree an argument is valid, the only thing left to argue about is whether the premises are true. That saves a lot of time.',
 meet:[{i:'🗣️',t:'Debate',h:'Judges reward a response that names which premise is false and why, or exactly where the link fails.'},
  {i:'🔬',t:'Lab reports',h:'Perfect calculations from a mis-measured number give a wrong answer. Check your inputs (premises) as well as your math (validity).'},
  {i:'📰',t:'The news',h:'Many misleading stories use valid logic on a false or exaggerated premise. Check the starting facts.'}],
 border:{t:'Sound arguments about God?',h:'Aquinas’s “Five Ways” are arguments for the existence of God. Philosophers, believers and skeptics alike, mostly agree on their logical form and argue about their premises, such as “nothing can cause itself.” That is exactly the move this lesson teaches: if it’s valid, the question becomes whether the premises are true.'}},
terms:[{t:'Sound',d:'valid, with all premises true'},{t:'Unsound',d:'invalid, or valid with at least one false premise'},{t:'True by luck',d:'a true conclusion the premises don’t actually support'}],
test:[
 {q:'What does it take for an argument to be sound?',choices:['Its conclusion is true in the real world','It is valid and all of its premises are true','Most people who hear it agree with it','None of its words are false or misleading'],answer:1,hint:'Two things: the beams and the pillars.',why:'Sound means valid plus all true premises.'},
 {q:'“All planets orbit the Sun. The Moon is a planet. So the Moon orbits the Sun.” This argument is…',choices:['sound','valid but unsound','invalid but sound','invalid with true premises'],answer:1,hint:'Is the Moon a planet?',why:'The form is valid, but “The Moon is a planet” is false, so it’s unsound.'},
 {q:'An argument has a true conclusion. Must it be sound?',choices:['Yes: a true conclusion makes it sound','No: it could be invalid, or have a false premise','Only if the argument is short and simple','Yes, as long as the argument is deductive'],answer:1,hint:'Remember the Broncos argument.',why:'A conclusion can be true by luck. Soundness is about the support, not just the conclusion.'},
 {q:'Your friend’s argument is valid, and you think its conclusion is false. What should you do?',choices:['Say it’s invalid, since the conclusion is false','Find the premise you think is false and say why','Point out your friend’s bad grades in logic','Repeat your own opinion louder and longer'],answer:1,hint:'If the link holds, where else can the problem be?',why:'If it’s valid, a false conclusion means a false premise. Find it.'},
 {q:'Which argument is sound?',choices:['All fish live in water. Sharks are fish. So sharks live in water.','All fish can climb trees. Sharks are fish. So sharks can climb trees.','All sharks are fish. All tuna are fish. So all sharks are tuna.','Some fish are pets. Sharks are fish. So sharks are pets.'],answer:0,hint:'Check both the link and each premise.',why:'The first is valid and its premises are true. The others have a false premise or don’t follow.'},
 {q:'“All RJ students wear uniforms on Mondays. Today is Monday. So every student in this hallway is wearing a uniform.” Which attack fits best?',choices:['“You’re wrong, and also, you’re a freshman.”','“Not everyone in this hallway is an RJ student.”','“That’s just your opinion, so it doesn’t count.”','“Valid arguments are always sound, so fine.”'],answer:1,hint:'The two good moves: a false premise, or a broken link.',why:'It points to the gap between “RJ students” and “everyone in this hallway.” That attacks the link.'}
]});
