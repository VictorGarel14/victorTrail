/* animations des exercices (carnet) */
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const BOX=(x,w,h)=>({t:'box',x,w,h});
const ANIM={
 squat:{props:[{t:'plate',at:'sh',dx:-5,dy:1}],k:[
  {t:6,L0:[0,0,90],A0:[-35,155],d:1200,lab:'Descente contrôlée'},
  {t:40,L0:[85,-33,90],A0:[0,190],d:300,lab:'Cuisses parallèles, dos neutre'},
  {d:900,lab:'Remontée en poussant le sol'},
  {t:6,L0:[0,0,90],A0:[-35,155],d:500}]},
 tempoSquat:{props:[{t:'plate',at:'sh',dx:-5,dy:1}],k:[
  {t:6,L0:[0,0,90],A0:[-35,155],d:4000,lab:'Descente 4 secondes'},
  {t:40,L0:[85,-33,90],A0:[0,190],d:900,lab:'Remontée dynamique'},
  {t:6,L0:[0,0,90],A0:[-35,155],d:600}]},
 speedSquat:{props:[{t:'plate',at:'sh',dx:-5,dy:1}],k:[
  {t:6,L0:[0,0,90],A0:[-35,155],d:1000,lab:'Descente contrôlée'},
  {t:40,L0:[85,-33,90],A0:[0,190],d:420,lab:'Remontée la plus rapide possible'},
  {t:6,L0:[0,0,90],A0:[-35,155],d:700}]},
 rdl:{props:[{t:'plate',at:'h0',dy:-2}],k:[
  {t:2,L0:[0,0,90],A0:[0,0],d:1500,lab:'Hanches vers l\'arrière, dos plat'},
  {t:75,L0:[18,-8,90],A0:[0,0],d:300,lab:'Étirement des ischios'},
  {d:1000,lab:'Remontée en poussant les hanches'},
  {t:2,L0:[0,0,90],A0:[0,0],d:500}]},
 stepup:{an:'a0',props:[BOX(20,70,30),{t:'db',at:'h0'}],k:[
  {x:45,y:30,t:15,L0:[70,-5,90],L1:[-15,-15,90],A0:[5,5],d:1100,lab:'Pousse sur le talon du pied haut'},
  {t:3,L0:[0,0,90],L1:[60,-30,90],A0:[0,0],d:400,lab:'Genou opposé monté'},
  {d:1200,lab:'Redescente contrôlée'},
  {t:15,L0:[70,-5,90],L1:[-15,-15,90],A0:[5,5],d:300}]},
 stepupExpl:{an:'a0',props:[BOX(20,70,30),{t:'db',at:'h0'}],k:[
  {x:45,y:30,t:15,L0:[70,-5,90],L1:[-15,-15,90],A0:[5,5],d:480,lab:'Montée explosive'},
  {t:3,L0:[0,0,90],L1:[70,-30,90],A0:[0,0],d:500,lab:'Genou opposé haut'},
  {d:1000,lab:'Redescente contrôlée'},
  {t:15,L0:[70,-5,90],L1:[-15,-15,90],A0:[5,5],d:400}]},
 calfStand:{an:'toe0',props:[{t:'plate',at:'sh',dx:-5,dy:1}],k:[
  {x:14,t:2,L0:[0,0,90],A0:[-35,155],d:900,lab:'Monte haut sur la pointe'},
  {L0:[0,0,35],d:300,lab:'Tiens 1 s'},
  {d:1100,lab:'Descente lente'},
  {L0:[0,0,90],d:300}]},
 calfSeat:{an:'toe0',props:[BOX(-58,46,34),{t:'plate',at:'k0',dy:7}],k:[
  {x:30,y:0,t:0,L0:[90,0,90],A0:[35,70],d:800,lab:'Pousse sur l\'avant du pied'},
  {L0:[103,0,40],d:300,lab:'Tiens 1 s'},
  {d:1100,lab:'Descente lente'},
  {L0:[90,0,90],d:300}]},
 pallof:{props:[{t:'cable',from:'h0',to:[-115,96]}],k:[
  {t:3,L0:[15,-15,90],A0:[20,150],d:900,lab:'Mains contre la poitrine'},
  {A0:[90,90],d:2000,lab:'Bras tendus : 2 s sans laisser tourner le buste'},
  {d:900,lab:'Retour contrôlé'},
  {A0:[20,150],d:400}]},
 copenhagen:{an:'e0',props:[BOX(-140,62,36)],k:[
  {x:40,y:4,t:95,L0:[-93,-93,-160],L1:[-85,-60,-120],A0:[0,90],A1:[-95,-95],d:1500,lab:'Gainage : épaule, hanche et pied alignés'},
  {t:99,L0:[-90,-90,-160],d:1500,lab:'Hanches hautes, respire'}]},
 splitSquat:{props:[BOX(-92,44,40),{t:'db',at:'h0'}],k:[
  {t:10,L0:[10,-10,90],L1:[-25,-95,-100],A0:[0,0],d:1300,lab:'Descente sur la jambe avant'},
  {t:20,L0:[80,-15,90],L1:[-10,-158,-100],d:300,lab:'Genou arrière vers le sol'},
  {d:1000,lab:'Pousse dans le talon avant'},
  {t:10,L0:[10,-10,90],L1:[-25,-95,-100],d:300}]},
 hipThrust:{an:'sh',props:[BOX(-78,58,36),{t:'plate',at:'hip',dy:9}],k:[
  {x:-20,y:40,t:-50,L0:[134,28,90],A0:[50,50],d:900,lab:'Pousse dans les talons'},
  {t:-90,L0:[90,0,90],A0:[90,90],d:1000,lab:'Fessiers serrés 1 s, bassin rétroversé'},
  {d:900,lab:'Descente contrôlée'},
  {t:-50,L0:[134,28,90],A0:[50,50],d:300}]},
 pistolBox:{props:[BOX(-50,36,32)],k:[
  {t:5,L0:[0,0,90],L1:[45,40,100],A0:[80,80],d:1600,lab:'Descente lente sur une jambe'},
  {t:35,L0:[88,-30,90],L1:[85,85,110],A0:[90,90],d:400,lab:'Effleure la box sans t\'asseoir'},
  {d:1000,lab:'Remontée, genou dans l\'axe'},
  {t:5,L0:[0,0,90],L1:[45,40,100],A0:[80,80],d:400}]},
 nordic:{an:'k0',props:[{t:'pad',at:'a0'}],k:[
  {x:0,y:6,t:0,L0:[0,-90,-90],A0:[20,160],d:3200,lab:'Descente la plus lente possible'},
  {t:68,L0:[-68,-90,-90],A0:[60,60],d:400,lab:'Rattrape-toi avec les mains'},
  {t:76,L0:[-76,-90,-90],A0:[35,35],d:1300,lab:'Pousse avec les mains pour remonter'},
  {t:0,L0:[0,-90,-90],A0:[20,160],d:500}]},
 tibialRaise:{props:[{t:'wall',x:-8}],k:[
  {x:30,t:-12,L0:[12,12,102],A0:[-10,-10],d:600,lab:'Dos au mur, relève les orteils'},
  {L0:[12,12,135],d:400,lab:'Tiens en haut'},
  {d:700,lab:'Redescends'},
  {L0:[12,12,102],d:200}]},
 sidePlankAbd:{an:'e0',k:[
  {x:60,y:4,t:79,L0:[-79,-79,-170],L1:[-79,-79,-170],A0:[0,90],A1:[180,180],d:900,lab:'Monte la jambe du dessus'},
  {L0:[-118,-118,-170],d:400,lab:'Bassin haut et immobile'},
  {d:900,lab:'Redescends sans poser'},
  {L0:[-79,-79,-170],d:300}]},
 sidePlank:{an:'e0',k:[
  {x:60,y:4,t:79,L0:[-79,-79,-170],L1:[-79,-79,-170],A0:[0,90],A1:[180,180],d:1800,lab:'Corps aligné de la tête aux pieds'},
  {t:80,L0:[-80,-80,-170],L1:[-80,-80,-170],d:1800,lab:'Bassin haut, respire'}]},
 stepDown:{an:'a0',props:[BOX(-30,52,30)],k:[
  {x:0,y:30,t:3,L0:[0,0,90],L1:[20,10,100],A0:[50,50],d:2600,lab:'Descente 3 s sur la jambe d\'appui'},
  {t:20,L0:[70,-25,90],L1:[25,25,110],A0:[70,70],d:300,lab:'Le talon effleure le sol'},
  {d:1000,lab:'Remontée, genou dans l\'axe'},
  {t:3,L0:[0,0,90],L1:[20,10,100],A0:[50,50],d:300}]},
 revLunge:{an:'a0',props:[BOX(-15,40,12),{t:'db',at:'h0'}],k:[
  {x:0,y:12,t:3,L0:[0,0,90],L1:[0,0,90],A0:[0,0],d:1200,lab:'Recule une jambe et descends'},
  {t:12,L0:[70,-20,90],L1:[-10,-75,0],d:300,lab:'Genou arrière près du sol'},
  {d:1000,lab:'Remonte en poussant sur le pied avant'},
  {t:3,L0:[0,0,90],L1:[0,0,90],d:300}]},
 legExt:{an:'hip',props:[BOX(-58,62,44),{t:'pad',at:'a0'}],k:[
  {x:-20,y:52,t:-10,L0:[90,-5,90],L1:[90,-5,90],A0:[10,40],d:900,lab:'Monte avec les deux jambes'},
  {L0:[90,90,150],L1:[90,90,150],d:300,lab:''},
  {L0:[90,-5,90],L1:[90,90,150],d:3000,lab:'Redescends avec une seule jambe en 3 s'},
  {L1:[90,-5,90],d:700,lab:''}]},
 dropLanding:{an:'a0',props:[BOX(-78,58,40)],k:[
  {x:-42,y:40,t:3,L0:[0,0,90],L1:[30,-10,100],A0:[20,20],d:500,lab:'Fais un pas dans le vide'},
  {x:-5,y:22,t:5,L0:[10,-5,110],L1:[20,0,110],A0:[60,60],d:250,lab:''},
  {x:12,y:0,t:35,L0:[70,-38,90],L1:[70,-38,90],A0:[70,70],d:900,lab:'Réception amortie, genoux dans l\'axe, sans bruit'},
  {d:0}]},
 calfEcc:{an:'toe0',props:[BOX(-40,52,22)],k:[
  {x:14,y:22,t:2,L0:[0,0,115],A0:[0,0],d:900,lab:'Monte sur les deux pieds'},
  {L0:[0,0,40],d:300,lab:''},
  {L0:[0,0,115],d:3000,lab:'Descends sur un seul pied en 3 s'},
  {d:300,lab:''}]},
 boxJump:{an:'a0',props:[BOX(45,70,45)],k:[
  {x:0,y:0,t:35,L0:[70,-35,90],A0:[-50,-30],d:350,lab:'Charge les bras'},
  {x:32,y:62,t:20,L0:[100,-30,60],A0:[160,160],d:300,lab:'Saute, genoux montés'},
  {x:72,y:45,t:35,L0:[75,-35,90],A0:[70,70],d:500,lab:'Réception douce'},
  {t:4,L0:[0,0,90],A0:[0,0],d:700,lab:'Redescends en marchant'},
  {d:0}]},
 squatJump:{an:'a0',k:[
  {x:0,y:0,t:38,L0:[85,-35,90],A0:[-40,-20],d:300,lab:'Squat, bras en arrière'},
  {y:30,t:5,L0:[0,0,30],A0:[170,170],d:280,lab:'Extension complète'},
  {y:0,t:20,L0:[45,-25,90],A0:[60,60],d:450,lab:'Réception souple, enchaîne'},
  {t:38,L0:[85,-35,90],A0:[-40,-20],d:300}]},
 bounds:{an:'hip',k:[
  {x:0,y:84,t:12,L0:[-35,-25,40],L1:[75,-25,100],A0:[60,100],A1:[-50,-20],d:350,lab:'Poussée longue, genou haut'},
  {y:98,L0:[-10,-40,60],L1:[50,10,100],d:350,lab:'Phase de vol'},
  {y:84,L0:[75,-25,100],L1:[-35,-25,40],A0:[-50,-20],A1:[60,100],d:350,lab:'Change de jambe'},
  {y:98,L0:[50,10,100],L1:[-10,-40,60],d:350,lab:''}]},
 hops:{an:'a0',k:[
  {x:-25,y:0,t:15,L0:[45,-25,90],L1:[10,-95,-60],A0:[30,60],d:300,lab:'Sur une jambe'},
  {x:0,y:20,t:10,L0:[5,0,40],d:300,lab:'Saut'},
  {x:25,y:0,t:15,L0:[45,-25,90],d:800,lab:'Réception stable 1 s'},
  {d:0}]},
 kbSwing:{props:[{t:'kb',at:'h0'}],k:[
  {t:65,L0:[30,-10,90],A0:[-25,-25],d:500,lab:'Charnière de hanche, dos plat'},
  {t:-3,L0:[0,0,90],A0:[95,95],d:500,lab:'Extension explosive des hanches'}]},
 jumpRope:{an:'toe0',props:[{t:'rope'}],k:[
  {x:12,y:0,t:0,L0:[0,0,40],A0:[20,80],d:180,lab:'Petits rebonds sur l\'avant du pied'},
  {y:9,L0:[0,0,30],d:180,lab:''}]},
 balance:{k:[
  {t:2,L0:[0,0,90],L1:[75,-60,60],A0:[70,70],A1:[60,60],d:1400,lab:'Pied court : voûte plantaire active'},
  {t:-2,L1:[70,-65,60],A0:[80,80],d:1400,lab:'Yeux fermés, corrige avec la cheville'}]},
 clamshell:{an:'hip',noGround:true,props:[{t:'mat'},{t:'band'}],k:[
  {x:0,y:100,t:-90,L0:[45,135,170],L1:[45,135,170],A0:[-90,-170],A1:[20,70],d:800,lab:'Allongé sur le côté, pieds collés'},
  {L0:[105,60,170],d:500,lab:'Ouvre le genou du dessus contre l\'élastique'},
  {L0:[45,135,170],d:900,lab:'Referme lentement'}]},
 deadBug:{an:'hip',k:[
  {x:0,y:12,t:-90,L0:[180,90,150],L1:[180,90,150],A0:[180,180],A1:[180,180],d:1200,lab:'Bas du dos plaqué au sol'},
  {L0:[97,97,100],A1:[-97,-97],d:400,lab:'Bras et jambe opposés s\'allongent'},
  {L0:[180,90,150],A1:[180,180],d:1200,lab:''},
  {L1:[97,97,100],A0:[-97,-97],d:400,lab:'Change de côté'},
  {L1:[180,90,150],A0:[180,180],d:900,lab:''}]},
 birdDog:{an:'k0',k:[
  {x:0,t:75,L0:[0,-90,-90],L1:[0,-90,-90],A0:[0,0],A1:[0,0],d:1100,lab:'À quatre pattes, dos plat'},
  {A0:[100,100],L1:[-95,-95,-95],d:1500,lab:'Bras et jambe opposés à l\'horizontale'},
  {A0:[0,0],L1:[0,-90,-90],d:800,lab:'Retour sans bouger le bassin'}]},
 hangingKnee:{an:'h0',props:[{t:'bar',x1:-60,x2:60,y:214}],k:[
  {x:0,y:214,t:0,L0:[3,0,20],A0:[180,180],d:900,lab:'Monte les genoux vers la poitrine'},
  {t:-12,L0:[105,10,60],d:300,lab:'Enroule le bassin'},
  {d:1100,lab:'Descente contrôlée, sans balancer'},
  {t:0,L0:[3,0,20],d:300}]},
 ankleWall:{props:[{t:'wall',x:34}],k:[
  {x:0,t:5,L0:[90,0,90],L1:[-5,-90,-90],A0:[80,80],d:1000,lab:'Genou vers le mur, talon collé au sol'},
  {t:10,L0:[72,-35,90],L1:[-5,-90,-90],d:700,lab:'Tiens 2 s'},
  {t:5,L0:[90,0,90],d:900,lab:''}]},
 plank:{an:'e0',k:[
  {x:60,t:82,L0:[-82,-82,10],A0:[0,90],d:1800,lab:'Corps aligné, abdos et fessiers serrés'},
  {t:83,L0:[-83,-83,10],d:1800,lab:'Respire sans relâcher'}]},
 pullup:{an:'h0',props:[{t:'bar',x1:-60,x2:60,y:214}],k:[
  {x:0,y:214,t:0,L0:[10,-30,10],A0:[180,180],d:1000,lab:'Tire les coudes vers les hanches'},
  {t:-10,A0:[40,175],d:400,lab:'Menton au-dessus de la barre'},
  {d:1300,lab:'Descente contrôlée, bras tendus'},
  {t:0,A0:[180,180],d:300}]},
 pullover:{props:[{t:'cable',from:'h0',to:[150,205]}],k:[
  {t:25,L0:[12,-12,90],A0:[150,150],d:1000,lab:'Bras tendus, tire jusqu\'aux cuisses'},
  {A0:[15,15],d:300,lab:'Dorsaux engagés, buste gainé'},
  {d:1200,lab:'Remontée contrôlée'},
  {A0:[150,150],d:300}]},
 triceps:{props:[{t:'cable',from:'h0',to:[70,205]}],k:[
  {t:8,L0:[8,-8,90],A0:[8,165],d:700,lab:'Coudes collés au corps'},
  {A0:[8,10],d:300,lab:'Bras tendus'},
  {d:1200,lab:'Remontée contrôlée'},
  {A0:[8,165],d:300}]},
 dbRow:{props:[BOX(-55,110,36),{t:'db',at:'h0'}],k:[
  {t:80,L0:[10,-5,90],L1:[0,-90,-90],A0:[0,0],A1:[0,0],d:800,lab:'Tire le coude vers la hanche'},
  {A0:[-115,0],d:300,lab:'Omoplate serrée'},
  {d:1100,lab:'Descente bras tendu'},
  {A0:[0,0],d:300}]},
 farmer:{an:'hip',props:[{t:'db',at:'h0'},{t:'db',at:'h1'}],k:[
  {x:0,t:0,L0:[25,-5,95],L1:[-20,-35,60],A0:[0,0],A1:[0,0],d:450,lab:'Marche gainé, épaules basses'},
  {L0:[-20,-35,60],L1:[25,-5,95],d:450,lab:'Charges lourdes, pas courts'}]},
 abWheel:{an:'k0',props:[{t:'wheel',at:'h0'}],k:[
  {x:0,t:55,L0:[0,-90,-90],A0:[15,15],d:1500,lab:'Roule vers l\'avant, dos plat'},
  {t:82,L0:[-55,-90,-90],A0:[72,72],d:400,lab:'Va aussi loin que tu restes gainé'},
  {t:55,L0:[0,-90,-90],A0:[15,15],d:1200,lab:'Reviens en contractant les abdos'}]}
};
const EX={
 g1a:['squat',['Pieds largeur d\'épaules, pointes légèrement ouvertes.','Genoux dans l\'axe des pieds, poitrine fière.','Descends au moins cuisses parallèles si la mobilité le permet.']],
 g1b:['rdl',['Genoux légèrement fléchis et fixes.','La barre glisse le long des cuisses.','Arrête la descente quand le dos commence à s\'arrondir.']],
 g1c:['stepup',['Box à hauteur de genou.','Toute la poussée vient de la jambe haute, pas d\'impulsion du pied au sol.','Redescends lentement.']],
 g1d:['calfStand',['Jambes tendues : cible les gastrocnémiens.','Amplitude complète, pause 1 s en haut.']],
 g1e:['calfSeat',['Genoux à 90° : cible le soléaire, clé en ultra.','Charge lourde, descente lente.']],
 g1f:['pallof',['Câble à hauteur de poitrine, sur le côté.','Le buste ne doit pas tourner : c\'est de l\'anti-rotation.']],
 g1g:['copenhagen',['Pied ou genou du dessus sur le banc.','Bassin aligné, adducteurs gainés.','Commence genou posé si c\'est trop dur.']],
 g2a:['splitSquat',['Pied arrière sur un banc, lacets posés.','70 % du poids sur la jambe avant.','Buste légèrement penché.']],
 g2b:['hipThrust',['Haut du dos sur le banc, menton rentré.','Tibias verticaux en haut du mouvement.','Serre les fessiers 1 s, ne cambre pas.']],
 g2c:['pistolBox',['Box basse derrière toi.','Effleure sans t\'asseoir, genou dans l\'axe.','Bras devant pour l\'équilibre.']],
 g2d:['nordic',['Chevilles bloquées par un partenaire ou un rouleau.','Corps gainé de la tête aux genoux.','Résiste le plus longtemps possible.']],
 g2e:['tibialRaise',['Dos au mur, talons à 30 cm du mur.','Relève les orteils au maximum.','Protège des périostites et améliore la descente.']],
 g2f:['sidePlankAbd',['Coude sous l\'épaule.','Monte la jambe du dessus sans basculer le bassin.']],
 g3a:['tempoSquat',['4 secondes de descente, sans pause en bas.','Remontée dynamique.','Charge plus légère qu\'en force max.']],
 g3b:['stepDown',['Debout sur une box, une jambe dans le vide.','Le talon libre effleure le sol en 3 s.','Genou d\'appui dans l\'axe du pied.']],
 g3c:['revLunge',['Pied avant sur une marche de 10–15 cm.','Le genou arrière descend près du sol.','Amplitude supplémentaire pour les quadriceps.']],
 g3d:['legExt',['Monte avec deux jambes, redescends avec une seule.','3 secondes de descente.']],
 g3e:['dropLanding',['Box de 30–40 cm.','Réception sur l\'avant du pied, absorbe avec hanches et genoux.','Le moins de bruit possible.']],
 g3f:['calfEcc',['Avant du pied sur une marche.','Monte à deux pieds, descends sur un seul, en 3 s.','Protège le tendon d\'Achille.']],
 g4a:['boxJump',['Box modérée : on cherche la vitesse, pas la hauteur.','Réception douce et stable.','Redescends en marchant, jamais en sautant.']],
 g4b:['squatJump',['Charge légère (20–30 % du squat) ou poids du corps.','Extension complète, réception souple.']],
 g4c:['bounds',['Sur une pente de 5–10 %.','Foulées longues et puissantes, genou haut.','Récupère en marchant.']],
 g4d:['hops',['Avant, puis latéral.','Stabilise la réception 1 s avant le saut suivant.']],
 g4e:['kbSwing',['Mouvement de hanche, pas de squat.','Les bras guident, ce sont les hanches qui propulsent.','Kettlebell à hauteur de poitrine.']],
 g4f:['jumpRope',['Rebonds courts sur l\'avant du pied.','Chevilles réactives, genoux souples.']],
 g5a:['balance',['Pied court : rapproche le gros orteil du talon sans plier les orteils.','Yeux fermés pour corser.']],
 g5b:['clamshell',['Allongé sur le côté, hanches et genoux fléchis à 45°.','Élastique autour des genoux, pieds collés.','Le bassin ne bascule pas en arrière.']],
 g5c:['deadBug',['Bas du dos plaqué au sol en permanence.','Expire en allongeant bras et jambe.']],
 g5d:['birdDog',['Mains sous les épaules, genoux sous les hanches.','Le bassin reste immobile, comme si un verre d\'eau était posé dessus.']],
 g5e:['hangingKnee',['Pas d\'élan.','Enroule le bassin en haut.','Version facile : genoux fléchis ; difficile : jambes tendues.']],
 g5f:['ankleWall',['Pied à 10 cm du mur, talon collé au sol.','Amène le genou au mur ; recule le pied quand c\'est facile.','Complète avec la posture 90/90 au sol pour les hanches.']],
 g5g:['plank',['Coudes sous les épaules.','Ligne droite des épaules aux talons, sans creuser.']],
 g6a:['speedSquat',['Charge de ton 5RM, seulement 3 répétitions.','Remontée explosive, arrête-toi bien avant la fatigue.']],
 g6b:['stepupExpl',['Charge modérée.','Montée la plus rapide possible, genou opposé haut.']],
 g6c:['rdl',['Volume faible, charge élevée.','Dos plat, hanches vers l\'arrière.']],
 g6d:['calfStand',['Entretien : 3 séries de 10.','Pause en haut.']],
 g6e:['sidePlank',['Corps aligné.','Bassin haut, respiration calme.']],
 g7a:['pullup',['Prise un peu plus large que les épaules.','Tire les coudes vers les hanches.','Élastique d\'assistance si besoin.']],
 g7b:['pullover',['Poulie haute, bras tendus.','Ramène les mains jusqu\'aux cuisses, dos gainé : dorsaux utiles pour se hisser dans les passages rocheux.']],
 g7c:['triceps',['Coudes fixes contre le corps.','Extension complète en bas.']],
 g7d:['dbRow',['Une main et un genou sur le banc, dos plat.','Tire le coude vers la hanche.']],
 g7e:['farmer',['Charges lourdes dans chaque main.','Marche gainé, épaules basses, pas courts.']],
 g7f:['abWheel',['À genoux, dos plat.','Va seulement aussi loin que tu peux sans creuser le dos.']]
};
/* ---- moteur d'animation ---- */
const SEG={T:52,TH:44,SH:42,FT:13,UA:30,FA:28};
const dD=a=>{const r=a*Math.PI/180;return[Math.sin(r),-Math.cos(r)]};
const dT=a=>{const r=a*Math.PI/180;return[Math.sin(r),Math.cos(r)]};
const POSE0={t:0,L0:[0,0,90],A0:[0,0]};
function normAnim(a){
  if(a._k)return a;const anyL1=a.k.some(k=>k.L1),anyA1=a.k.some(k=>k.A1);let prev=null;
  a._k=a.k.map(k=>{const p=Object.assign({},prev||POSE0,k);if(!anyL1||!p.L1)p.L1=p.L0;if(!anyA1||!p.A1)p.A1=p.A0;p.lab=k.lab||'';p.d=k.d==null?600:k.d;prev=p;return p});
  a._T=a._k.reduce((s,p)=>s+p.d,0);return a;
}
function fk(p){
  const P={};const add=(a,b,l,d)=>[a[0]+l*d[0],a[1]+l*d[1]];
  P.hip=[0,0];P.sh=add(P.hip,0,SEG.T,dT(p.t));P.head=add(P.sh,0,20,dT(p.t));
  [[p.L0,0],[p.L1,1]].forEach(([L,i])=>{P['k'+i]=add(P.hip,0,SEG.TH,dD(L[0]));P['a'+i]=add(P['k'+i],0,SEG.SH,dD(L[1]));P['toe'+i]=add(P['a'+i],0,SEG.FT,dD(L[2]))});
  [[p.A0,0],[p.A1,1]].forEach(([A,i])=>{P['e'+i]=add(P.sh,0,SEG.UA,dD(A[0]));P['h'+i]=add(P['e'+i],0,SEG.FA,dD(A[1]))});
  return P;
}
function placePose(p,an){
  const P=fk(p);const ref=P[an]||P.a0;const dx=(p.x||0)-ref[0];let dy;
  if(p.y!=null)dy=p.y-ref[1];
  else{let m=Infinity;['toe0','toe1','a0','a1','k0','k1','hip','sh','e0','e1','h0','h1'].forEach(k=>m=Math.min(m,P[k][1]));m=Math.min(m,P.head[1]-9);dy=-m}
  Object.keys(P).forEach(k=>P[k]=[P[k][0]+dx,P[k][1]+dy]);return P;
}
const lerpN=(a,b,u)=>a+(b-a)*u;
function lerpPose(a,b,u){const o={};for(const k of ['t','x','y']){if(a[k]!=null&&b[k]!=null)o[k]=lerpN(a[k],b[k],u);else if(a[k]!=null)o[k]=a[k]}
  for(const k of ['L0','L1','A0','A1'])o[k]=a[k].map((v,i)=>lerpN(v,b[k][i],u));return o}
function poseAt(a,ms){
  const K=a._k;let t=a._T?ms%a._T:0;
  for(let i=0;i<K.length;i++){const p=K[i];if(t<p.d||i===K.length-1){const n=K[(i+1)%K.length];const u=p.d?clamp(t/p.d,0,1):1;const e=(1-Math.cos(Math.PI*u))/2;return{pose:p.d?lerpPose(p,n,e):p,lab:p.lab,i}}t-=p.d}
  return{pose:K[0],lab:K[0].lab,i:0};
}
function drawAnim(cv,a,ms,C){
  const ctx=cv.getContext('2d');const W=340,H=240;const s=cv.width/W;ctx.setTransform(s,0,0,s,0,0);ctx.clearRect(0,0,W,H);
  const an=a.an||'a0';const {pose,lab}=poseAt(a,ms);const P=placePose(Object.assign({x:a._k[0].x,y:a._k[0].y},pose),an);
  const ox=a.ox||150,gy=226,X=x=>ox+x,Y=y=>gy-y;
  ctx.lineCap='round';ctx.lineJoin='round';
  if(!a.noGround){ctx.strokeStyle=C.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,Y(0)+1);ctx.lineTo(W,Y(0)+1);ctx.stroke();
    ctx.lineWidth=1;for(let x=4;x<W;x+=10){ctx.beginPath();ctx.moveTo(x,Y(0)+2);ctx.lineTo(x-6,Y(0)+8);ctx.stroke()}}
  const props=a.props||[];
  const at=(pr)=>{const q=P[pr.at]||P.h0;return[X(q[0]+(pr.dx||0)),Y(q[1]+(pr.dy||0))]};
  props.forEach(pr=>{
    if(pr.t==='box'){ctx.fillStyle=C.surf;ctx.strokeStyle=C.line;ctx.lineWidth=1.5;ctx.fillRect(X(pr.x),Y(pr.h),pr.w,pr.h);ctx.strokeRect(X(pr.x),Y(pr.h),pr.w,pr.h)}
    else if(pr.t==='wall'){ctx.strokeStyle=C.line;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(X(pr.x),Y(0));ctx.lineTo(X(pr.x),Y(205));ctx.stroke()}
    else if(pr.t==='bar'){ctx.strokeStyle=C.muted;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(X(pr.x1),Y(pr.y));ctx.lineTo(X(pr.x2),Y(pr.y));ctx.stroke()}
    else if(pr.t==='mat'){ctx.fillStyle=C.surf;ctx.fillRect(X(-120),Y(118),300,44)}
    else if(pr.t==='cable'){const h=at({at:pr.from});ctx.strokeStyle=C.muted;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(h[0],h[1]);ctx.lineTo(X(pr.to[0]),Y(pr.to[1]));ctx.stroke();ctx.fillStyle=C.muted;ctx.beginPath();ctx.arc(X(pr.to[0]),Y(pr.to[1]),5,0,7);ctx.fill()}
    else if(pr.t==='rope'){const cy=(P.head[1]+9-4)/2,ry=(P.head[1]+9+8)/2,cx=P.hip[0]+6;ctx.strokeStyle=C.line;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(X(cx),Y(cy),26,ry,0,0,7);ctx.stroke();const ph=(ms/360)*Math.PI*2;ctx.strokeStyle=C.acc;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(X(cx),Y(cy),26,ry,0,ph,ph+1.2);ctx.stroke()}
  });
  const seg=(a,b,w,c)=>{ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(X(a[0]),Y(a[1]));ctx.lineTo(X(b[0]),Y(b[1]));ctx.stroke()};
  const leg=(i,c,w)=>{seg(P.hip,P['k'+i],w,c);seg(P['k'+i],P['a'+i],w,c);seg(P['a'+i],P['toe'+i],w-1.5,c)};
  const arm=(i,c,w)=>{seg(P.sh,P['e'+i],w,c);seg(P['e'+i],P['h'+i],w-0.5,c)};
  leg(1,C.far,6.5);arm(1,C.far,6);
  seg(P.hip,P.sh,10,C.ink);
  ctx.fillStyle=C.ink;ctx.beginPath();ctx.arc(X(P.head[0]),Y(P.head[1]),9.5,0,7);ctx.fill();
  leg(0,C.ink,7);arm(0,C.ink,6.5);
  props.forEach(pr=>{const [x,y]=at(pr);
    if(pr.t==='plate'){ctx.fillStyle=C.muted;ctx.strokeStyle=C.ink;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,13,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=C.ink;ctx.beginPath();ctx.arc(x,y,2.5,0,7);ctx.fill()}
    else if(pr.t==='db'){ctx.fillStyle=C.muted;ctx.fillRect(x-9,y-2,18,4);ctx.fillStyle=C.ink;ctx.fillRect(x-11,y-6,5,12);ctx.fillRect(x+6,y-6,5,12)}
    else if(pr.t==='kb'){ctx.fillStyle=C.ink;ctx.beginPath();ctx.arc(x,y+9,9,0,7);ctx.fill();ctx.strokeStyle=C.ink;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(x,y+2,5,Math.PI,0);ctx.stroke()}
    else if(pr.t==='wheel'){ctx.strokeStyle=C.ink;ctx.lineWidth=3;ctx.fillStyle=C.surf;ctx.beginPath();ctx.arc(x,y+9,9,0,7);ctx.fill();ctx.stroke()}
    else if(pr.t==='pad'){ctx.fillStyle=C.muted;ctx.beginPath();ctx.ellipse(x,y+8,9,5,0,0,7);ctx.fill()}
    else if(pr.t==='band'){ctx.strokeStyle=C.acc;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(X(P.k0[0]),Y(P.k0[1]));ctx.lineTo(X(P.k1[0]),Y(P.k1[1]));ctx.stroke()}
  });
  return lab;
}
function themeColors(){const g=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();return{ink:g('--ink'),far:g('--line2'),muted:g('--muted'),line:g('--line2'),surf:g('--surface2'),acc:g('--gr')}}

