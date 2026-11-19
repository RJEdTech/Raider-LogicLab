/* Lesson 7: Aristotle's four statements (A, E, I, O) */
(function(){
const V=LL.VG[2].ctr;
const extra=`<g id="rl"><text x="${V[1][0]-10}" y="${V[1][1]}" text-anchor="middle" class="lbl-s" style="font-size:16px">bowls</text><text x="${V[1][0]-10}" y="${V[1][1]+20}" text-anchor="middle" class="lbl-s" style="font-size:16px">without rice</text>
 <text x="${V[3][0]}" y="${V[3][1]+52}" text-anchor="middle" class="lbl-s" style="font-size:16px">bowls</text><text x="${V[3][0]}" y="${V[3][1]+72}" text-anchor="middle" class="lbl-s" style="font-size:16px">with rice</text>
 <text x="${V[2][0]+10}" y="${V[2][1]}" text-anchor="middle" class="lbl-s" style="font-size:16px">rice, but</text><text x="${V[2][0]+10}" y="${V[2][1]+20}" text-anchor="middle" class="lbl-s" style="font-size:16px">not a bowl</text></g>
 ${LL.xMark('x3',V[3][0],V[3][1])}${LL.xMark('x1',V[1][0],V[1][1])}
 <text id="big" x="300" y="372" text-anchor="middle" class="lbl" style="font-size:24px"></text>`;
LL.add({id:'categorical',unit:'ari',n:7,minutes:14,
title:'All, no, some: Aristotle’s four sentences',
teaser:'In logic, “some” means “at least one.” Sir, there’s a line.',
card:'Draw “all,” “no,” “some” and “some… not” as circles, and learn why logicians call them A, E, I and O.',
goal:'You will be able to draw the four kinds of categorical statements (A, E, I, O) on two circles, and read a diagram back as a sentence.',
hook:'“All,” “no” and “some” are the words people stretch most in arguments: “All politicians lie,” “No one reads anymore,” “Some studies show…” Drawing them shows exactly what each one claims, and what it doesn’t.',
real:{t:'“Some patients” on a medicine label',h:'<p>Drug labels in the U.S. list side effects with careful words. “Some patients experienced headaches” is an I statement: at least one did. It does <b>not</b> say most did, and it doesn’t say all. That’s why the FDA-approved label also gives the numbers, like “headache: 12% of patients on the drug vs. 10% on a placebo.”</p><p>Turning “some” into “most” or “all” is one of the most common ways headlines mislead. The circles in this lesson make the difference visible: an X in one region is all “some” gives you.</p>',src:'U.S. FDA, “Prescription Drug Labeling Resources” (Adverse Reactions section format)'},
joke:{cast:['Aristotle','Chipotle worker'],lines:[
 {w:'Chipotle worker',r:1,s:'Heads up: all our bowls come with rice.'},
 {w:'Aristotle',s:'Then no bowl here is rice-free.'},
 {w:'Chipotle worker',r:1,s:'Right.'},
 {w:'Aristotle',s:'And some bowls have rice.'},
 {w:'Chipotle worker',r:1,s:'Every bowl. I just said that.'},
 {w:'Aristotle',s:'Yes, but I’m allowed to say “some.” In logic, “some” means “at least one.”'},
 {w:'Chipotle worker',r:1,s:'Sir, there’s a line.'}],
 point:'<p>Aristotle is being annoying, but he’s right three times. “All bowls have rice” means the same as “No bowl is rice-free.” And if all bowls have rice, it’s true that <b>some</b> do, because in logic “some” only means “at least one.”</p><p>Everyday speech uses “some” to hint “not all.” Logic doesn’t. That gap is where many arguments go wrong.</p>'},
learn:{intro:'Aristotle found that most claims about groups take one of four shapes. Two circles can draw every one.',
 svg:LL.vennSVG({n:2,id:'c7',labels:['Bowls','Things with rice'],extra,aria:'Two overlapping circles: bowls, and things with rice'}),
 steps:[
  {title:'Two circles, three regions',see:'Two overlapping circles: Bowls and Things with rice. Each part is labeled: bowls without rice, bowls with rice, rice that’s not a bowl.',why:'Every thing in the world lands in exactly one part (or outside both). A statement about groups is a claim about which parts have something in them.',set:{rl:{opacity:1},c7r1:{opacity:0},c7r3:{opacity:0},x1:{opacity:0},x3:{opacity:0},big:{text:''}},focus:['rl']},
  {title:'Shading and X',see:'The labels fade and the middle part turns gray. The key below says what gray and X mean.',why:'<b>Shaded</b> means “nothing is here.” <b>X</b> means “at least one thing is here.” That’s the whole drawing language.',set:{rl:{opacity:0},c7r3:{opacity:.85},big:{text:'gray = empty   X = at least one'}},focus:['c7r3'],alt:'Shading is like an empty parking spot painted gray. An X is a car in the spot.'},
  {title:'A: “All bowls have rice”',see:'The bowls-without-rice part is shaded. Below: “A: All S are P.”',why:'“All” says there are no bowls outside the rice circle. So that part is <b>empty</b>, and we shade it.',term:'Logicians call this an <b>A</b> statement, from the Latin <i>Affirmo</i> (“I affirm”). The first vowel, A, marks the universal yes.',set:{c7r3:{opacity:0},c7r1:{opacity:.85},big:{text:'A:  All S are P'}},focus:['c7r1']},
  {title:'E: “No bowls have rice”',see:'Now the middle (bowls with rice) is shaded instead.',why:'“No” says nothing is in both circles. So the overlap is <b>empty</b>.',term:'An <b>E</b> statement, from <i>nEgo</i> (“I deny”): the universal no.',set:{c7r1:{opacity:0},c7r3:{opacity:.85},big:{text:'E:  No S are P'}},focus:['c7r3']},
  {title:'I: “Some bowls have rice”',see:'No shading. An X sits in the middle.',why:'“Some” says <b>at least one</b> bowl is in the rice circle. So we put an X in the overlap. It says nothing about the other parts.',term:'An <b>I</b> statement, the second vowel of <i>affIrmo</i>: the particular yes.',set:{c7r3:{opacity:0},x3:{opacity:1},big:{text:'I:  Some S are P'}},focus:['x3']},
  {title:'O: “Some bowls don’t have rice”',see:'The X moves to the bowls-without-rice part.',why:'At least one bowl is outside the rice circle. The X goes there.',term:'An <b>O</b> statement, the second vowel of <i>negO</i>: the particular no.',set:{x3:{opacity:0},x1:{opacity:1},big:{text:'O:  Some S are not P'}},focus:['x1']},
  {title:'“Some” never means “not all”',see:'The X is back in the middle. The left part is blank, not shaded.',why:'“Some bowls have rice” leaves the left part <b>unknown</b>. Maybe there are bowls without rice, maybe not. Hearing “some” as “not all” adds a claim nobody made.',set:{x1:{opacity:0},x3:{opacity:1},big:{text:'Some = at least one (maybe all)'}},focus:['c7r1','x3'],alt:'If a coach says “some of you played well,” logically that’s still true if everyone did. The coach is hinting, not saying.'}
 ]},
tryit:{kind:'shader',title:'Try it: draw the sentence',intro:'Draw each statement on the two circles. The left circle is the first group (S), the right circle is the second (P).',
 help:{ask:'Which part of the picture is the sentence about, and does it say that part is empty or that something is there?',another:'“All S are P” and “No S are P” say a part is EMPTY: shade it. “Some S are P” and “Some S are not P” say a part HAS something: put an X.',start:'“All S are P”: shade the part of S that is outside P. “No”: shade the middle.'}},
why:{care:'Most big claims you hear are A or E statements (“all,” “no,” “never,” “always”). They’re strong and easy to break: one counterexample does it. “Some” claims are weak and hard to break. Watch which one someone actually proved.',
 meet:[{i:'📰',t:'Headlines',h:'“Teens are quitting social media” could mean some, most or all. Ask which, and how many.'},
  {i:'🧪',t:'Science',h:'“Some bacteria survive this antibiotic” is an I statement, and a warning about resistance.'},
  {i:'🗳️',t:'Surveys',h:'“Some voters support it” tells you almost nothing until you know how many.'}],
 border:{t:'A logic that lasted 2,000 years',h:'Aristotle’s logic of “all, no, some” (about 350 BC) was taught almost unchanged in schools from Athens to medieval universities to early Jesuit colleges. The Ratio Studiorum, the Jesuits’ 1599 plan of studies, opened its philosophy course with a full year of logic. You are learning the same four sentences, with circles John Venn added in 1880.'}},
terms:[{t:'A statement',d:'All S are P (shade S outside P)'},{t:'E statement',d:'No S are P (shade the overlap)'},{t:'I statement',d:'Some S are P (X in the overlap)'},{t:'O statement',d:'Some S are not P (X in S outside P)'},{t:'Some',d:'in logic, at least one; it may be all'}],
test:[
 {q:'Which part do you shade for “All dogs are mammals”?',choices:['The middle','Dogs outside the mammals circle','Mammals outside the dogs circle','Nothing; put an X'],answer:1,hint:'“All” says one part is empty. Which part can’t have any dogs?',why:'No dog is outside the mammal circle, so that part is shaded.'},
 {q:'An X sits in the overlap of “Teachers” and “Runners.” What does the diagram say?',choices:['All teachers are runners','No teachers are runners','Some teachers are runners','Some teachers are not runners'],answer:2,hint:'X = at least one thing is there.',why:'At least one thing is both a teacher and a runner: “Some teachers are runners.”'},
 {q:'Your friend says “Some of the cookies are gone.” Logically, could all of them be gone?',choices:['No: “some” in logic means “not all”','Yes: “some” only means at least one','Only if there were a lot of cookies','Only if someone actually counted them'],answer:1,hint:'What does “some” mean in logic?',why:'In logic, “some” is at least one. It doesn’t rule out all.'},
 {q:'Which letter is “No cats are reptiles”?',choices:['A','E','I','O'],answer:1,hint:'A universal “no.”',why:'E statements are “No S are P” (from nEgo, I deny).'},
 {q:'“Some songs on my playlist are not country songs.” Where does the X go?',choices:['In the middle, where the two circles overlap','In the playlist circle, outside “country songs”','In the country circle, outside the playlist','Outside both circles, in the corner'],answer:1,hint:'The X goes where those songs are: on the playlist, but not country.',why:'An O statement puts the X in S outside P.'},
 {q:'Why does “All S are P” use shading, not an X?',choices:['Because “all” statements are longer','It says a region is empty, not that something is there','Because an X can only be used for numbers','Because shading is easier to see than an X on a small diagram'],answer:1,hint:'What does “all S are P” say about S things outside P?',why:'“All” claims there are no S things outside P: an empty region.'}
]});
})();
