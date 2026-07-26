/* ============================================================
   CUMBRE — Dudas y matices : mini-cours de points précis
   Les confusions classiques (surtout pour un francophone).
   { id, title, tag, clave, cuerpo:[{t, ej:[[es,fr]]}], error, check:[[stem,opts,idx,expl]] }
   Consultable sans quiz ; le « check » est un auto-test optionnel de 1-2 questions.
   ============================================================ */
window.DUDAS = [

  { id:"negacion", title:"nada · nadie · ningún · nunca", tag:"A2-B1 · Négation",
    clave:"Si le mot négatif est APRÈS le verbe, il faut « no » devant : « No veo nada ». S'il est AVANT, pas de « no » : « Nada me gusta ».",
    cuerpo:[
      { t:"La double négation n'est pas une faute en espagnol, elle est <b>obligatoire</b> : « No hay nadie » (litt. il n'y a personne). Une seule négation quand le mot négatif passe devant le verbe.", ej:[["No he comido nada.","Je n'ai rien mangé."],["Nunca voy al gimnasio. = No voy nunca al gimnasio.","Je ne vais jamais à la salle."]] },
      { t:"<b>nada</b> = rien (chose) · <b>nadie</b> = personne (gens) · <b>nunca / jamás</b> = jamais · <b>tampoco</b> = non plus.", ej:[["No lo sabe nadie.","Personne ne le sait."],["— No me gusta. — A mí tampoco.","— Je n'aime pas. — Moi non plus."]] },
      { t:"<b>ningún / ninguno / ninguna</b> = aucun. « ninguno » s'apocope en « ningún » devant un nom masculin. Il s'emploie presque toujours au <b>singulier</b>.", ej:[["No tengo ningún problema.","Je n'ai aucun problème."],["Ninguna de las opciones me convence.","Aucune des options ne me convainc."]] }
    ],
    error:"Ne dis jamais « veo nada » : sans un mot négatif devant le verbe, il FAUT « no ». Et « ningún » reste au singulier (« ningún amigo », pas « ningunos amigos »).",
    check:[
      ["______ me ha llamado hoy.", ["Nadie","No nadie","Ninguno no","Nada"], 0, "« Nadie » devant le verbe → pas de « no » : Nadie me ha llamado."],
      ["No queda ______ pan.", ["ningún","ninguno","nada","ningunos"], 0, "Devant un nom masculin singulier → apocope : ningún pan."]
    ] },

  { id:"apocope", title:"gran/grande, buen/bueno, primer/primero", tag:"A2 · Apocope",
    clave:"Certains adjectifs perdent leur fin devant un nom masculin singulier : « un buen día », « el primer piso ». « grande » → « gran » devant TOUT nom singulier.",
    cuerpo:[
      { t:"<b>bueno → buen</b> et <b>malo → mal</b> devant un nom masculin singulier. Au féminin ou au pluriel, pas de changement.", ej:[["un buen amigo / una buena amiga","un bon ami / une bonne amie"],["hace mal tiempo","il fait mauvais"]] },
      { t:"<b>primero → primer</b>, <b>tercero → tercer</b> devant un nom masculin singulier.", ej:[["el primer día","le premier jour"],["el tercer piso","le troisième étage"]] },
      { t:"<b>grande → gran</b> devant un nom singulier des DEUX genres — et le sens change ! « gran » (avant) = grand au sens de remarquable ; « grande » (après) = grand par la taille.", ej:[["un gran hombre","un grand homme (remarquable)"],["un hombre grande","un homme grand (de taille)"],["una gran ciudad","une grande ville"]] }
    ],
    error:"« un grande problema » est faux → « un gran problema ». Et attention au sens : « una mujer grande » (grande de taille) ≠ « una gran mujer » (une femme formidable).",
    check:[
      ["Fue un ______ momento para todos.", ["gran","grande","buen","primer"], 0, "« gran » devant un nom singulier = remarquable : un gran momento."],
      ["Vivo en el ______ piso.", ["primer","primero","gran","buen"], 0, "Devant nom masculin singulier : primer piso."]
    ] },

  { id:"muymucho", title:"muy vs mucho", tag:"A2 · Quantité",
    clave:"« muy » modifie un adjectif ou un adverbe (invariable). « mucho » modifie un nom (et s'accorde) ou un verbe.",
    cuerpo:[
      { t:"<b>muy</b> + adjectif / adverbe. Toujours invariable.", ej:[["Estoy muy cansado.","Je suis très fatigué."],["Hablas muy bien.","Tu parles très bien."]] },
      { t:"<b>mucho</b> + nom → s'accorde (mucho/mucha/muchos/muchas). <b>mucho</b> après un verbe → invariable = beaucoup.", ej:[["Tengo mucha hambre.","J'ai très faim (litt. beaucoup de faim)."],["Hay muchos coches.","Il y a beaucoup de voitures."],["Trabaja mucho.","Il travaille beaucoup."]] },
      { t:"Exception utile : devant <b>mejor, peor, mayor, menor</b> on dit <b>mucho</b>, pas « muy ».", ej:[["Es mucho mejor así.","C'est bien mieux ainsi."]] }
    ],
    error:"« Estoy mucho cansado » est faux → « muy cansado ». Et « tengo muy hambre » est faux → « mucha hambre » (hambre est un nom).",
    check:[
      ["Este restaurante es ______ bueno.", ["muy","mucho","mucha","muchos"], 0, "Devant l'adjectif « bueno » → muy."],
      ["No tengo ______ tiempo.", ["mucho","muy","mucha","muy mucho"], 0, "Devant le nom masculin « tiempo » → mucho (accord)."]
    ] },

  { id:"porque", title:"porque · por qué · porqué · por que", tag:"B1 · Orthographe",
    clave:"« ¿Por qué? » = pourquoi (question). « porque » = parce que (réponse). « el porqué » = la raison (nom).",
    cuerpo:[
      { t:"<b>¿por qué?</b> (deux mots, accent) : la question. Aussi dans les interrogatives indirectes.", ej:[["¿Por qué no vienes?","Pourquoi tu ne viens pas ?"],["No sé por qué lo hizo.","Je ne sais pas pourquoi il l'a fait."]] },
      { t:"<b>porque</b> (un mot, sans accent) : la cause, la réponse.", ej:[["No voy porque estoy cansado.","Je n'y vais pas parce que je suis fatigué."]] },
      { t:"<b>el porqué</b> (un mot, accent, avec article) : un nom = la raison. Plus rare : <b>por que</b> = « pour lequel / par lequel ».", ej:[["No entiendo el porqué de su enfado.","Je ne comprends pas la raison de sa colère."]] }
    ],
    error:"En français « pourquoi » et « parce que » sont très différents ; en espagnol la seule chose à retenir, c'est : question = deux mots + accent, réponse = un mot sans accent.",
    check:[
      ["¿______ no me lo dijiste antes?", ["Por qué","Porque","Porqué","Por que"], 0, "Question directe → por qué (deux mots, accent)."],
      ["Me quedé en casa ______ llovía.", ["porque","por qué","porqué","por que"], 0, "Cause (réponse) → porque."]
    ] },

  { id:"sercambio", title:"Adjectifs qui changent avec ser / estar", tag:"B1-B2 · Ser/Estar",
    clave:"Certains adjectifs ont deux sens : un avec « ser » (trait), un avec « estar » (état). La règle ser/estar de base ne suffit pas — il faut les connaître.",
    cuerpo:[
      { t:"Les plus fréquents :", ej:[["ser listo = malin / estar listo = prêt","« Es muy listo » ≠ « Ya estoy listo »"],["ser rico = riche / estar rico = délicieux","« Es rico » ≠ « ¡Está riquísimo! »"],["ser aburrido = ennuyeux / estar aburrido = qui s'ennuie","« La peli es aburrida » ≠ « Estoy aburrido »"]] },
      { t:"Encore :", ej:[["ser bueno = bon (qualité) / estar bueno = bon au goût (ou en forme)","—"],["ser verde = vert (couleur) / estar verde = pas mûr / débutant","—"],["ser malo = méchant / estar malo = malade","—"]] }
    ],
    error:"« Estoy aburrido » (je m'ennuie) et « Soy aburrido » (je suis ennuyeux) : ne confonds pas, c'est presque une insulte à soi-même.",
    check:[
      ["Tu hermano ______ muy listo, aprende rapidísimo.", ["es","está","son","están"], 0, "Trait de caractère (malin) → ser : es listo."],
      ["¡Prueba esto, ______ buenísimo!", ["está","es","son","eres"], 0, "Bon au goût → estar : está bueno."]
    ] },

  { id:"saberconocer", title:"saber vs conocer", tag:"A2-B1 · Verbes",
    clave:"« saber » = savoir une information ou savoir FAIRE quelque chose. « conocer » = connaître quelqu'un, un lieu, être familier de.",
    cuerpo:[
      { t:"<b>saber</b> + information / + infinitif (savoir faire).", ej:[["No sé su número.","Je ne connais pas son numéro."],["¿Sabes nadar?","Tu sais nager ?"]] },
      { t:"<b>conocer</b> + personne / lieu / œuvre. « conocer a alguien » avec le « a » personnel.", ej:[["Conozco a María desde hace años.","Je connais María depuis des années."],["No conozco Sevilla.","Je ne connais pas Séville."]] },
      { t:"Nuance de temps : au passé simple, <b>conocí</b> = j'ai fait la connaissance / rencontré ; <b>supe</b> = j'ai appris (l'info).", ej:[["Conocí a mi mujer en Madrid.","J'ai rencontré ma femme à Madrid."],["Supe la verdad ayer.","J'ai appris la vérité hier."]] }
    ],
    error:"« Conozco nadar » est faux → « Sé nadar ». Savoir-FAIRE, c'est toujours « saber ».",
    check:[
      ["¿______ dónde está la estación?", ["Sabes","Conoces","Sabe","Conmoces"], 0, "Information → saber : ¿Sabes dónde…?"],
      ["Quiero ______ a tus padres.", ["conocer","saber","conozco","sé"], 0, "Faire la connaissance de personnes → conocer."]
    ] },

  { id:"pedirpreguntar", title:"pedir vs preguntar", tag:"B1 · Verbes",
    clave:"« pedir » = demander (réclamer) quelque chose. « preguntar » = demander (poser une question) / se renseigner.",
    cuerpo:[
      { t:"<b>pedir</b> = demander/commander une chose, un service.", ej:[["Pedí un café.","J'ai commandé un café."],["Me pidió ayuda.","Il m'a demandé de l'aide."]] },
      { t:"<b>preguntar</b> = poser une question. <b>preguntar por</b> = demander des nouvelles de / après quelqu'un.", ej:[["Me preguntó la hora.","Il m'a demandé l'heure."],["Preguntó por ti.","Il a demandé de tes nouvelles."]] }
    ],
    error:"En français « demander » couvre les deux. Réflexe : réclamer une CHOSE → pedir ; poser une QUESTION → preguntar.",
    check:[
      ["El camarero nos ______ qué queríamos beber.", ["preguntó","pidió","pedió","preguntas"], 0, "Poser une question → preguntar : preguntó."],
      ["Voy a ______ la cuenta.", ["pedir","preguntar","pregunto","pido"], 0, "Réclamer une chose → pedir la cuenta."]
    ] },

  { id:"quedar", title:"quedar vs quedarse", tag:"B1-B2 · Verbes",
    clave:"« quedar » (sans pronom) a plein de sens : se donner rendez-vous, rester (il reste), aller (vêtement), être situé. « quedarse » (pronominal) = rester quelque part.",
    cuerpo:[
      { t:"<b>quedar con alguien</b> = prendre rendez-vous ; <b>quedar</b> (type gustar) = il reste ; <b>quedar bien/mal</b> = aller (vêtement) ou faire bonne/mauvaise impression.", ej:[["He quedado con Ana a las ocho.","J'ai rendez-vous avec Ana à 20 h."],["Solo quedan dos entradas.","Il ne reste que deux billets."],["Esa camisa te queda muy bien.","Cette chemise te va très bien."]] },
      { t:"<b>quedarse</b> = rester (dans un lieu, un état).", ej:[["Me quedé en casa todo el día.","Je suis resté à la maison toute la journée."],["Se quedó sorprendido.","Il est resté surpris."]] }
    ],
    error:"« Quedar » = se donner rendez-vous (pas « rester ») ! « Quedo en casa » sonne bizarre — pour « je reste à la maison », c'est « me quedo en casa ».",
    check:[
      ["¿______ el sábado para tomar algo?", ["Quedamos","Nos quedamos","Quedémonos","Quedáis"], 0, "Prendre rendez-vous → quedar : ¿Quedamos?"],
      ["Hace frío, mejor ______ en casa.", ["nos quedamos","quedamos","quedar","quedo"], 0, "Rester dans un lieu → quedarse : nos quedamos."]
    ] },

  { id:"traerllevar", title:"traer/llevar & ir/venir (la déixis)", tag:"B1-B2 · Mouvement",
    clave:"Le point de vue est celui de CELUI QUI PARLE. Vers moi = venir / traer. Loin de moi = ir / llevar. C'est souvent l'inverse du français.",
    cuerpo:[
      { t:"<b>venir</b> = venir vers l'endroit où JE suis. <b>ir</b> = aller vers un autre endroit. En espagnol, « je viens » vers toi se dit « voy » (je vais), pas « vengo ».", ej:[["— ¿Vienes a mi casa? — Sí, ahora voy.","— Tu viens chez moi ? — Oui, j'arrive."],["Voy contigo.","Je viens avec toi."]] },
      { t:"<b>traer</b> = apporter vers moi. <b>llevar</b> = emporter loin de moi.", ej:[["Tráeme un vaso de agua.","Apporte-moi un verre d'eau."],["Llévate el paraguas.","Emporte le parapluie."]] }
    ],
    error:"Au téléphone, quand on t'appelle et que tu réponds « j'arrive », c'est « ¡Voy! », jamais « ¡Vengo! ». Piège francophone classique.",
    check:[
      ["— ¿Vienes a la fiesta? — Sí, ahora mismo ______.", ["voy","vengo","iré","vamos"], 0, "Vers l'interlocuteur → ir : « voy » (jamais vengo)."],
      ["¿Me puedes ______ el libro que te presté?", ["traer","llevar","venir","ir"], 0, "Apporter VERS moi → traer."]
    ] },

  { id:"elagua", title:"el agua, el águila… (le « el » féminin)", tag:"B1 · Genre",
    clave:"Un nom féminin qui commence par un a- (ou ha-) TONIQUE prend « el » au singulier, pour l'euphonie. Il reste féminin : les adjectifs s'accordent au féminin.",
    cuerpo:[
      { t:"On dit <b>el agua</b>, <b>el águila</b>, <b>el hambre</b>, <b>el aula</b>, <b>el arma</b> — mais le nom est féminin. Au pluriel, retour à « las ».", ej:[["el agua fría","l'eau froide (fría au féminin !)"],["las aguas","les eaux"],["un aula moderna","une salle de classe moderne"]] },
      { t:"Attention : ça ne marche QUE si le a- est accentué. « la amiga », « la abeja » gardent « la » (a- non tonique).", ej:[["mucha hambre","très faim (mucha au féminin)"],["el arma peligrosa","l'arme dangereuse"]] }
    ],
    error:"« el agua frío » est faux → « el agua fría ». Le « el » est cosmétique : le mot reste féminin.",
    check:[
      ["Bebe ______ agua, hace calor.", ["mucha","mucho","muchos","muy"], 0, "« agua » reste féminin → mucha agua."],
      ["El águila es un animal ______.", ["majestuosa","majestuoso","majestuosos","muy"], 0, "« águila » est féminin → majestuosa."]
    ] },

  { id:"tambientampoco", title:"también / tampoco · sí / no", tag:"A2-B1 · Accords",
    clave:"« también » = aussi (phrase positive). « tampoco » = non plus (phrase négative). Pour renchérir sur soi : « a mí también / a mí tampoco ».",
    cuerpo:[
      { t:"Renchérir sur une phrase <b>positive</b> → también ; sur une phrase <b>négative</b> → tampoco. Avec un pronom tonique : « a mí, a ti, a él… ».", ej:[["— Me gusta el jazz. — A mí también.","— J'aime le jazz. — Moi aussi."],["— No como carne. — Yo tampoco.","— Je ne mange pas de viande. — Moi non plus."]] },
      { t:"Pour contredire : à une phrase négative on répond « sí » ; à une positive, « no ».", ej:[["— No vienes, ¿verdad? — ¡Sí! (voy)","— Tu ne viens pas ? — Si ! (je viens)"]] }
    ],
    error:"« A mí también » à une phrase négative est faux → « a mí tampoco ». Le « non plus » se dit tampoco, jamais también.",
    check:[
      ["— No he dormido bien. — Yo ______.", ["tampoco","también","sí","no"], 0, "Renchérir sur une négation → tampoco."],
      ["— Me encanta viajar. — A mí ______.", ["también","tampoco","sí","no"], 0, "Renchérir sur du positif → también."]
    ] },

  { id:"desdehace", title:"desde · desde hace · hace… que", tag:"B1 · Temps",
    clave:"« desde » + point de départ (une date). « desde hace » + durée. « hace… que » = il y a… que, en tête de phrase.",
    cuerpo:[
      { t:"<b>desde</b> + moment précis (depuis quand).", ej:[["Vivo aquí desde 2020.","J'habite ici depuis 2020."],["Trabajo desde las nueve.","Je travaille depuis 9 h."]] },
      { t:"<b>desde hace</b> + durée (depuis combien de temps). Équivalent : <b>hace + durée + que</b>.", ej:[["Estudio español desde hace dos años.","J'étudie l'espagnol depuis deux ans."],["Hace dos años que estudio español.","Ça fait deux ans que j'étudie l'espagnol."]] }
    ],
    error:"« desde dos años » est faux → « desde hace dos años » (durée) ou « desde 2022 » (date). Le « hace » est obligatoire devant une durée.",
    check:[
      ["No lo veo ______ el verano.", ["desde","desde hace","hace","por"], 0, "Point de départ (le been) → desde el verano."],
      ["Lo conozco ______ muchos años.", ["desde hace","desde","hace que","por"], 0, "Durée → desde hace muchos años."]
    ] },

  { id:"aunsino", title:"aún / aun · sino / si no", tag:"B2-C1 · Pièges d'accent",
    clave:"« aún » (accent) = encore/todavía. « aun » (sans accent) = même/incluso. « sino » = mais (correction). « si no » = si… ne… pas.",
    cuerpo:[
      { t:"<b>aún</b> = todavía (encore). <b>aun</b> = incluso (même), et « aun así » = malgré tout.", ej:[["Aún no ha llegado.","Il n'est pas encore arrivé."],["Aun sabiéndolo, no dijo nada.","Même en le sachant, il n'a rien dit."]] },
      { t:"<b>sino</b> (un mot) corrige une négation = « mais (au contraire) ». <b>si no</b> (deux mots) = « sinon / si… ne… pas ».", ej:[["No es rojo, sino naranja.","Ce n'est pas rouge, mais orange."],["Date prisa, si no, llegaremos tarde.","Dépêche-toi, sinon on sera en retard."]] }
    ],
    error:"« No quiero café si no té » est faux → « …sino té » (correction d'une négation). « si no » ne s'utilise que pour une condition.",
    check:[
      ["No fue Ana ______ su hermana.", ["sino","si no","aún","aun"], 0, "Correction après négation → sino."],
      ["______ no te apuras, perderás el tren.", ["Si","Sino","Aún","Aun"], 0, "Condition (si… ne… pas) → Si no."]
    ] },

  { id:"deberde", title:"deber vs deber de · hay que · tener que", tag:"B2 · Obligation",
    clave:"« deber + inf » = obligation morale. « deber de + inf » = probabilité (supposition). « tener que » = obligation forte. « hay que » = obligation impersonnelle.",
    cuerpo:[
      { t:"<b>deber + infinitif</b> = devoir (obligation). <b>deber DE + infinitif</b> = « devoir » au sens de « il doit sûrement… » (probabilité).", ej:[["Debes estudiar más.","Tu dois étudier davantage."],["Debe de estar en casa.","Il doit être chez lui (sans doute)."]] },
      { t:"<b>tener que</b> + inf = obligation concrète et forte. <b>hay que</b> + inf = il faut (général, sans sujet précis).", ej:[["Tengo que irme ya.","Je dois y aller maintenant."],["Hay que reservar con antelación.","Il faut réserver à l'avance."]] }
    ],
    error:"À l'oral, beaucoup d'Espagnols confondent aussi les deux « deber », mais pour le DELE : obligation = deber (sans « de »), probabilité = deber de.",
    check:[
      ["Son las tres, el banco ya ______ estar cerrado.", ["debe de","debe","tiene que","hay que"], 0, "Probabilité → deber de : debe de estar cerrado."],
      ["Para aprobar ______ trabajar más.", ["hay que","debe de","tienes de","hay de"], 0, "Obligation impersonnelle → hay que + infinitif."]
    ] },

  { id:"loneutro", title:"le « lo » neutre : lo bueno, lo que…", tag:"B2-C1 · Le neutre",
    clave:"« lo » + adjectif masculin = la chose/le côté… (abstrait). « lo que » = ce que/ce qui. Ça n'existe pas en français d'un seul mot.",
    cuerpo:[
      { t:"<b>lo + adjectif</b> = le côté / ce qui est… (notion abstraite).", ej:[["Lo bueno es que tenemos tiempo.","Le bon côté, c'est qu'on a le temps."],["No sabes lo difícil que es.","Tu ne sais pas à quel point c'est difficile."]] },
      { t:"<b>lo que</b> = ce que / ce qui (relatif neutre, sans antécédent précis).", ej:[["Haz lo que quieras.","Fais ce que tu veux."],["Lo que me molesta es su tono.","Ce qui me gêne, c'est son ton."]] }
    ],
    error:"« el bueno es que… » est faux quand tu veux dire « le bon côté » → « lo bueno ». « lo » ne renvoie pas à un nom, mais à une idée.",
    check:[
      ["______ importante es participar.", ["Lo","El","La","Le"], 0, "Notion abstraite → lo + adjectif : Lo importante."],
      ["No entendí ______ dijiste.", ["lo que","el que","lo","que lo"], 0, "Ce que (relatif neutre) → lo que."]
    ] }

];
