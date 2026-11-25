/* Animations ajoutées pour le renfo du coach : ajoutées à la fin de anim.js à chaque build (extract.py) */
Object.assign(ANIM,{
 sideAbd:{an:'hip',k:[
  {x:-10,y:10,t:90,L0:[-90,-90,-140],L1:[-90,-90,-140],A0:[-95,-95],A1:[90,90],d:900,lab:'Allongé sur le côté, jambe du dessus tendue'},
  {L0:[-124,-124,-160],d:900,lab:'Monte la jambe, pied neutre'},
  {d:900,lab:'Tiens 2 s en haut'},
  {L0:[-92,-92,-140],d:1100,lab:'Redescends lentement sans poser'},
  {d:0}]},
 crab:{an:'hip',props:[{t:'band'}],k:[
  {x:-48,t:0,L0:[24,12,90],L1:[-24,-12,-90],A0:[25,10],A1:[-25,-10],d:450,lab:'Demi-squat, genoux poussés vers l\'extérieur'},
  {x:-24,L0:[44,24,90],d:450,lab:'Grand pas de côté, l\'élastique reste tendu'},
  {x:0,L0:[24,12,90],d:450,lab:'Ramène l\'autre pied sans relâcher'},
  {x:48,L0:[44,24,90],d:450,lab:'Bassin à hauteur constante'},
  {x:48,L0:[24,12,90],d:450,lab:'10 pas, puis repars dans l\'autre sens'},
  {x:48,L0:[24,12,90],L1:[-44,-24,-90],d:450},
  {x:0,L1:[-24,-12,-90],d:450},
  {x:-24,L1:[-44,-24,-90],d:450},
  {x:-48,L1:[-24,-12,-90],d:0}]},
 latHop:{an:'hip',k:[
  {x:-30,y:85,t:-4,L1:[10,-6,-90],L0:[32,-38,90],A0:[40,25],A1:[-40,-25],d:900,lab:'Réception sur une jambe, tiens 2 s'},
  {d:260,lab:'Genou dans l\'axe du 2e orteil, bassin horizontal'},
  {x:0,y:102,t:0,L1:[-18,-8,-90],L0:[18,8,90],A0:[60,40],A1:[-60,-40],d:260,lab:'Saute sur le côté'},
  {x:30,y:85,t:4,L0:[-10,6,90],L1:[-32,38,-90],A0:[40,25],A1:[-40,-25],d:900,lab:'Réception sur l\'autre jambe, tiens 2 s'},
  {d:260,lab:'Genou dans l\'axe du 2e orteil, bassin horizontal'},
  {x:0,y:102,t:0,L1:[-18,-8,-90],L0:[18,8,90],A0:[60,40],A1:[-60,-40],d:260,lab:'Saute sur le côté'}]},
 latHopGo:{an:'hip',k:[
  {x:-30,y:85,t:-4,L1:[10,-6,-90],L0:[32,-38,90],A0:[40,25],A1:[-40,-25],d:280,lab:'Enchaîne sans tenue'},
  {x:0,y:102,t:0,L1:[-18,-8,-90],L0:[18,8,90],A0:[60,40],A1:[-60,-40],d:280,lab:'Genou dans l\'axe à chaque réception'},
  {x:30,y:85,t:4,L0:[-10,6,90],L1:[-32,38,-90],A0:[40,25],A1:[-40,-25],d:280,lab:'Enchaîne sans tenue'},
  {x:0,y:102,t:0,L1:[-18,-8,-90],L0:[18,8,90],A0:[60,40],A1:[-60,-40],d:280,lab:'Genou dans l\'axe à chaque réception'}]},
 pogo:{an:'toe0',k:[
  {x:12,y:0,t:0,L0:[0,0,42],L1:[0,0,42],A0:[25,70],A1:[15,60],d:170,lab:'Genoux presque tendus, ça part des chevilles'},
  {y:12,L0:[0,0,25],L1:[0,0,25],d:170,lab:'Contacts les plus courts possible : « sol brûlant »'}]},
 pogo1:{an:'toe0',k:[
  {x:12,y:0,t:0,L0:[0,0,42],L1:[25,-85,-20],A0:[25,70],A1:[15,60],d:170,lab:'Sur un pied, genou presque tendu'},
  {y:11,L0:[0,0,25],d:170,lab:'Contact court sur l\'avant-pied'}]},
 dropJump:{an:'a0',props:[BOX(-78,58,40)],k:[
  {x:-42,y:40,t:3,L0:[0,0,90],L1:[30,-10,100],A0:[20,20],A1:[20,20],d:450,lab:'Laisse-toi tomber de la box'},
  {x:-5,y:22,t:5,L0:[10,-5,110],L1:[15,-5,110],A0:[60,60],A1:[60,60],d:220,lab:''},
  {x:10,y:0,t:16,L0:[32,-16,60],L1:[32,-16,60],A0:[-30,-20],A1:[-30,-20],d:170,lab:'Contact le plus court possible'},
  {x:22,y:46,t:4,L0:[0,0,25],L1:[0,0,25],A0:[170,170],A1:[165,165],d:380,lab:'Rebondis tout de suite'},
  {x:32,y:0,t:28,L0:[55,-30,90],L1:[55,-30,90],A0:[70,70],A1:[70,70],d:700,lab:'Réception souple'},
  {d:0}]},
 deepSquat:{props:[{t:'kb',at:'h0',dy:-6}],k:[
  {t:6,L0:[0,0,90],A0:[25,165],d:1500,lab:'Descente en 3 s, kettlebell contre la poitrine'},
  {t:30,L0:[108,-40,90],A0:[40,175],d:1500,lab:'Tiens 3 s en bas : genoux écartés contre l\'élastique'},
  {d:900,lab:'Pieds ancrés au sol'},
  {d:900,lab:'Remonte'},
  {t:6,L0:[0,0,90],A0:[25,165],d:500}]},
 hipAirplane:{an:'a0',k:[
  {x:0,t:82,L0:[12,-6,90],L1:[-98,-98,-170],A0:[5,5],A1:[5,5],d:1100,lab:'Sur une jambe, buste à 90°'},
  {L1:[-102,-102,-150],A1:[178,178],t:78,d:900,lab:'Ouvre le bassin vers l\'extérieur'},
  {d:900,lab:'Tiens 2 s en ouverture'},
  {L1:[-98,-98,-170],A1:[5,5],t:82,d:700,lab:'Referme le bassin'}]},
 backExt:{an:'hip',props:[BOX(-12,26,62)],k:[
  {x:0,y:68,t:45,L0:[-45,-45,45],A0:[45,-45],d:1300,lab:'Corps aligné, fessiers serrés'},
  {t:135,A0:[-45,-135],d:500,lab:'Descends en pliant les hanches, dos neutre'},
  {d:1400,lab:'Remonte en serrant les fessiers, pas les lombaires'},
  {t:45,A0:[45,-45],d:500}]}
});
