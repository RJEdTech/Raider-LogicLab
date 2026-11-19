/* Lesson 12: The limits of induction (the turkey and the black swan) */
(function(){
const X=d=>70+d/1001*490,Y=c=>330-c/100*260;
let pts=[];for(let d=1;d<=1000;d+=9)pts.push([X(d),Y(100*(1-Math.exp(-d/170)))]);pts.push([X(1000),Y(99.7)]);
const line=pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
const swans=[...Array(24)].map((_,k)=>`<text x="${110+(k%8)*52}" y="${130+Math.floor(k/8)*60}" text-anchor="middle" style="font-size:34px">🦢</text>`).join('');
LL.add({id:'blackswan',unit:'ind',n:12,minutes:14,
title:'The turkey and the black swan: when evidence fools you',
teaser:'Day 1,000: best day ever. Day 1,001: the Wednesday before Thanksgiving.',
card:'A thousand good days can’t prove tomorrow. One counterexample can sink a rule. Learn to hunt for what would prove you wrong.',
goal:'You will be able to explain why no amount of confirming evidence proves a general rule, why one counterexample can disprove it, and how to test your own ideas by trying to break them.',
hook:'The habit this lesson teaches, asking “what would prove me wrong?”, protects you from scams, bad bets, overconfidence and getting stuck in your own feed.',
real:{t:'Two seawalls in 2011',h:'<p>On March 11, 2011, a magnitude 9.0 earthquake sent a tsunami about 13 meters high into Japan’s coast. At the Fukushima Daiichi nuclear plant, the seawall had been built for about 5.7 meters, the kind of wave the recent record suggested. The plant flooded and three reactors melted down.</p><p>The Onagawa plant was even closer to the earthquake. Decades earlier, engineer Yanosuke Hirai studied the long history of tsunamis on that coast and insisted the plant sit 14.8 meters above the sea, while colleagues thought 12 was enough. Onagawa shut down safely and sheltered hundreds of neighbors whose homes were lost. Hirai planned for the wave that recent experience didn’t show.</p>',src:'Bulletin of the Atomic Scientists, “Onagawa: the Japanese nuclear power plant that didn’t melt down on 3/11” (2014); Mainichi Shimbun profile of Yanosuke Hirai (2011)'},
joke:{cast:['Turkey','Narrator'],lines:[
 {w:'Turkey',s:'Day 1: The farmer fed me. Nice guy.'},
 {w:'Turkey',s:'Day 100: Fed again. Every day. He clearly loves me.'},
 {w:'Turkey',s:'Day 1,000: A thousand days of data. I have never been more sure.'},
 {narr:'Day 1,001 is the Wednesday before Thanksgiving.'},
 {w:'Turkey',s:'I’d like to file a complaint about induction.'}],
 point:'<p>The turkey’s reasoning is careful <b>induction</b>: the same thing happened 1,000 times, so it will happen again. Its confidence was highest on the day it was most wrong.</p><p>The story comes from Bertrand Russell (who used a chicken, in 1912) and Nassim Nicholas Taleb (who made it a turkey, in <i>The Black Swan</i>, 2007). The lesson: past cases can’t show you what the past never included.</p>'},
learn:{intro:'The turkey’s confidence that the farmer is its friend, day by day.',
 svg:`<svg viewBox="0 0 600 410" role="img" aria-label="A graph of the turkey’s confidence rising for 1,000 days, then crashing on day 1,001">
  <defs><clipPath id="tkc"><rect id="tkr" x="60" y="40" width="12" height="320"/></clipPath></defs>
  <g id="chart">
   <line x1="70" y1="330" x2="565" y2="330" class="ink" stroke-width="2"/><line x1="70" y1="60" x2="70" y2="330" class="ink" stroke-width="2"/>
   ${[0,250,500,750,1000].map(d=>`<text x="${X(d)}" y="352" text-anchor="middle" style="font-size:15px">${d.toLocaleString()}</text>`).join('')}<text x="315" y="378" text-anchor="middle" style="font-size:16px;font-weight:700">Day</text>
   <text x="22" y="195" text-anchor="middle" transform="rotate(-90 22 195)" style="font-size:16px;font-weight:700">Turkey’s confidence</text>
   <polyline points="${line}" fill="none" style="stroke:var(--v-s)" stroke-width="5" clip-path="url(#tkc)"/>
   <line id="crash" x1="${X(1000)}" y1="${Y(99.7)}" x2="${X(1001)+4}" y2="${Y(0)}" style="stroke:var(--bad)" stroke-width="5" opacity="0"/>
   <text id="tkn" x="${X(500)}" y="40" text-anchor="middle" class="lbl"></text>
  </g>
  <g id="sw" opacity="0"><rect x="40" y="70" width="520" height="290" rx="12" class="box"/>${swans}<text id="bsw" x="300" y="320" text-anchor="middle" style="font-size:44px;filter:brightness(0)" opacity="0">🦢</text></g>
  <g id="asym" opacity="0"><rect x="40" y="70" width="520" height="290" rx="12" class="box" style="stroke:var(--rj);stroke-width:2"/>
   <text x="300" y="122" text-anchor="middle" class="lbl">“All swans are white.”</text>
   <text x="300" y="180" text-anchor="middle" class="lbl-m">1,000,000 white swans: still not proven ✗</text>
   <text x="300" y="230" text-anchor="middle" class="lbl-m">1 black swan: proven false ✓</text>
   <text x="300" y="300" text-anchor="middle" class="lbl" style="fill:var(--rj)">Ask: what would prove me wrong?</text></g>
 </svg>`,
 steps:[
  {title:'Day 1',see:'A graph just starting: the turkey’s confidence is low on day 1.',why:'One good day is a tiny sample. The turkey makes no big conclusion yet.',set:{tkr:{width:12},crash:{opacity:0},tkn:{text:'Day 1'},chart:{opacity:1},sw:{opacity:0},asym:{opacity:0}},focus:['tkr']},
  {title:'Day 100',see:'The line has climbed steeply. Confidence is high.',why:'A hundred days in a row feels like proof. Each new day is the same kind of evidence, so it seems to confirm the rule “the farmer feeds me.”',set:{tkr:{width:58},tkn:{text:'Day 100'}},focus:['tkr']},
  {title:'Day 1,000',see:'The line is almost at the top. The turkey has never been more sure.',why:'By normal induction rules, this is a <b>strong</b> argument: lots of evidence, no exceptions. That’s the trap. The evidence never included what the farmer was planning.',set:{tkr:{width:500},tkn:{text:'Day 1,000: most confident ever'}},focus:['tkr']},
  {title:'Day 1,001',see:'A red line drops straight to the bottom.',why:'The surprise wasn’t in the data because it had never happened before. <b>The past can only tell you about the kinds of things that already happened.</b>',set:{crash:{opacity:1},tkn:{text:'Day 1,001: Thanksgiving week',class:'lbl not'}},focus:['crash'],alt:'Every day the farmer fed the turkey for a reason the turkey couldn’t see: to fatten it up.'},
  {title:'The black swan',see:'Rows of white swans. Then one black swan appears.',why:'For centuries Europeans had only seen white swans, and used “black swan” to mean something impossible. In 1697 Dutch explorer Willem de Vlamingh’s crew saw black swans in Western Australia. One sighting ended the rule.',set:{chart:{opacity:0},sw:{opacity:1},bsw:{opacity:1}},focus:['bsw']},
  {title:'The big imbalance',see:'A card: a million white swans can’t prove “all swans are white.” One black swan proves it false.',why:'Confirming cases can’t prove an “all” rule; one counterexample can disprove it (the square from lesson 8). So the best test of an idea is to <b>look for what would break it</b>.',term:'The philosopher Karl Popper (1934) made this the mark of science: a good scientific claim says what result would prove it wrong, and scientists go looking for that result.',set:{sw:{opacity:0},asym:{opacity:1}},focus:['asym']}
 ]},
tryit:{kind:'rule',title:'Try it: the 2-4-6 game',intro:'In 1960 psychologist Peter Wason gave people this puzzle. Most guessed wrong, not because they were bad at math, but because they only tested numbers they expected to fit. Can you do better?',
 help:{ask:'Find the secret rule by testing your own sets of three numbers.',another:'If your idea is “goes up by 2,” don’t only try 8, 10, 12. Try something your idea says should NOT fit, like 1, 2, 3 or 5, 10, 100. If it fits anyway, your idea was too narrow.',start:'Try 1, 2, 3. Then try 3, 2, 1. Then 1, 20, 300.'}},
why:{care:'When you’re sure about something, ask what would change your mind, then go look for it. It feels worse than collecting agreement, and it works much better.',
 meet:[{i:'📱',t:'Your feed',h:'An algorithm shows you more of what you already liked. It’s a machine for confirming, never for testing.'},
  {i:'💸',t:'“It’s always gone up”',h:'Scams and bad investments often point to a long record of gains. The turkey had a long record too.'},
  {i:'🔬',t:'Science fair',h:'A good experiment can come out against your hypothesis. If no result could prove you wrong, it isn’t a test.'}],
 good:'Hunting for the black swan is how safety improves. Airlines and hospitals now use “premortems” (imagine the plan already failed; why?) and “near-miss” reporting, which collects the almost-disasters the record of safe days would hide. U.S. airline flying went from several fatal crashes a year in the 1970s to many recent years with none at all.',goodSrc:'NTSB accident data; Gary Klein, “Performing a Project Premortem,” Harvard Business Review (2007)',
 border:{t:'Certainty and humility',h:'Faith traditions have long distinguished the certainty of faith from the confidence of ordinary judgments about the world. Catholic teaching holds that faith and reason don’t contradict each other, and the Church has revised its scientific judgments when evidence demanded it; in 1992 Pope John Paul II formally acknowledged the errors in the Galileo case. Being willing to be wrong about the world is part of seeking truth.'}},
terms:[{t:'Confirmation bias',d:'looking for evidence that agrees with what you already think'},{t:'Black swan',d:'a rare, surprising event outside past experience'},{t:'Falsify',d:'show a claim is false with a counterexample'},{t:'Falsifiable',d:'a claim that says what would prove it wrong'}],
test:[
 {q:'Why can’t 1,000 confirming cases prove “all swans are white”?',choices:['1,000 is too few; 1,000,000 would do it','No number of cases rules out an unseen one','Swans can change color as they grow up','It can be proven with enough photos'],answer:1,hint:'What did the turkey not see in 1,000 days?',why:'Any finite pile of cases leaves room for one you haven’t seen.'},
 {q:'Your idea is “the rule is numbers going up by 2.” Which test is the most useful?',choices:['8, 10, 12','20, 22, 24','1, 2, 3','100, 102, 104'],answer:2,hint:'Which test could prove your idea wrong?',why:'If 1, 2, 3 fits, your idea (“by 2”) is too narrow. The others can only agree with you.'},
 {q:'What is confirmation bias?',choices:['Checking your answer twice before you hand it in','Looking only for evidence that agrees with you','Asking for confirmation by email or text','A sample that leans one way because of who’s asked'],answer:1,hint:'The 2-4-6 game.',why:'It’s the habit of testing only what we expect to come out our way.'},
 {q:'A stock has gone up every month for three years. A friend says it’s a sure thing. Best reply?',choices:['“Three straight years of gains proves it.”','“What would make it drop, and could it happen?”','“Stocks basically never go down for long.”','“Your friend is always wrong about money.”'],answer:1,hint:'Think like the engineer who built the higher seawall.',why:'Ask what the record leaves out instead of trusting the streak.'},
 {q:'Which claim is falsifiable (could be shown false)?',choices:['“Everything happens for a reason that we can never detect.”','“This fertilizer makes tomato plants grow taller.”','“Some day, something big will happen.”','“Everything is exactly as it should be.”'],answer:1,hint:'Which one says what result would prove it wrong?',why:'You could grow plants with and without fertilizer and measure. The others can’t fail any test.'},
 {q:'What made the Onagawa plant different from Fukushima Daiichi?',choices:['It was much farther away from where the earthquake hit','It was built for a bigger wave than recent records','It had no reactors running that day','It was pure luck that the wave missed'],answer:1,hint:'Remember the real case.',why:'Yanosuke Hirai studied the long history and insisted on 14.8 meters, higher than the recent record suggested.'}
]});
})();
