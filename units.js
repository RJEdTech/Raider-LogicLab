/* Raider LogicLab: units and class paths */
LL.unit({id:'arg',n:1,t:'What is an argument?',d:'An argument is a claim with reasons, not a fight. Find the parts, then learn the two ways reasons can support a claim.'});
LL.unit({id:'ded',n:2,t:'Deduction: valid and sound',d:'When the reasons guarantee the conclusion. Learn why “valid” and “true” are different, and the four if-then moves.'});
LL.unit({id:'ari',n:3,t:'Aristotle’s logic',d:'The logic of “all,” “no” and “some,” drawn as circles. Aristotle worked it out about 2,350 years ago, and it still sorts good arguments from bad ones.'});
LL.unit({id:'ind',n:4,t:'Induction: reasoning from evidence',d:'Most real thinking works from evidence to “probably.” Learn how to do it well, and how even good evidence can fool you.'});
LL.unit({id:'fal',n:5,t:'Fallacies: arguments that cheat',d:'Ad hominem, straw man, slippery slope and the rest: what each one does, why it works on people, and how to answer it.'});
LL.unit({id:'well',n:6,t:'Arguing well',d:'Logic is not only for winning. Argue with the best version of the other side, the way Ignatius and Aquinas did.'});

/* "In my class" buttons on the home page. Suggested paths, not taken from Canvas. */
LL.courses=[
 {id:'theo',t:'Theology',lessons:['argument','dedind','validity','soundness','syllogism','bestexplanation','relevance','evidence','steelman'],note:'For theology: what an argument is, valid vs. sound (the shape behind Aquinas’s arguments), best explanation, the fallacies, and arguing charitably.'},
 {id:'eng',t:'English / AP Lang',lessons:['argument','dedind','soundness','sample','cause','relevance','evidence','steelman'],note:'For argument writing and rhetorical analysis: claims and reasons, evidence that holds up, the fallacies, and answering the other side’s best case.'},
 {id:'geo',t:'Geometry',lessons:['argument','validity','ifthen','connectives','categorical','square'],note:'For proofs: valid forms, if-then statements with the converse, inverse and contrapositive, and “and, or, not.”'},
 {id:'sci',t:'Science',lessons:['dedind','sample','cause','blackswan','bestexplanation','evidence'],note:'For lab work: samples, correlation vs. cause, why one result can overturn a rule, and choosing the best explanation.'},
 {id:'cs',t:'Computer science',lessons:['connectives','ifthen','validity'],note:'For coding: and, or, not and if-then are how every program makes decisions.'},
 {id:'deb',t:'Speech and debate',lessons:['argument','soundness','ifthen','cause','relevance','evidence','steelman'],note:'For debate: how to attack an argument (a premise or the link), cause claims, the fallacies, and steelmanning.'}
];
