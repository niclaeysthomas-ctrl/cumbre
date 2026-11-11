/* ============================================================
   CUMBRE — Vocabulaire lot 16 : CONVERSACIÓN (tenir une discussion)
   [ES, FR, exemple ES, thème, note]
   2026-11-11. Le lot 15 a apporté les mots qu'on montre du doigt. Celui-ci
   apporte l'autre moitié du même trou : non pas ce dont on parle, mais ce
   qui fait TENIR une conversation — réagir, donner raison, nuancer,
   reprendre la parole, s'expliquer, adoucir, conclure.
   Ces tournures ne s'apprennent pas davantage dans la presse : un article
   n'a besoin ni de « ¡venga ya! » ni de « a lo que iba ». Elles s'entendent,
   et c'est précisément ce qui manque à qui apprend par le texte. Sans elles
   on parle juste mais on ne discute pas : on livre des phrases correctes,
   sans pouvoir couper, relancer ou reculer poliment.
   149 candidats contrôlés contre les 2235 entrées du deck : 47 y étaient
   déjà (a ver, mira, oye, o sea, en plan, por cierto, ya te digo…). Restent
   90 cartes, rangées par ce qu'elles permettent de FAIRE.
   Un repère de registre dans chaque note : ce qui se dit entre amis et ce
   qui passe en entretien ne sont pas les mêmes mots, et se tromper de
   registre coûte plus cher qu'un mot manquant.
   Chargé APRÈS vocab-es15.js → append en fin. VOCAB_PRIO : ces cartes
   passent en tête des nouvelles.
   ============================================================ */
(function () {
  const start = window.VOCAB.length;
  window.VOCAB = window.VOCAB.concat([

/* ---------- REACCIONAR ---------- */
["¡venga ya!","allons bon !, n'importe quoi !","—Dice que no lo sabía. —¡Venga ya, si estaba delante!","Conversación","Incrédulité agacée : on ne te croit pas. Familier. ⚠️ venga tout seul = allez, vas-y (encouragement) — c'est ya qui retourne le sens."],
["¡no me digas!","sans blague !, ça alors !","—Se van a vivir a Sevilla. —¡No me digas!","Conversación","Surprise, pas forcément ironique. Le ton décide. Variante soutenue : ¿de verdad? Et ¡no me digas que…! = ne me dis pas que… (crainte)."],
["¡toma ya!","et toc !, ouais !","Metió el gol en el último minuto. ¡Toma ya!","Conversación","Triomphe, satisfaction. Très familier, Espagne. Entre amis et au stade, jamais au bureau."],
["¡qué morro!","quel culot !","Se coló el primero. ¡Qué morro tiene!","Conversación","el morro = le museau. tener morro / tener mucho morro = avoir du culot. Voisin : qué cara (más dura)."],
["¡menuda faena!","quelle tuile !, quel sale coup !","Le han cambiado el turno otra vez. ¡Menuda faena!","Conversación","menudo/menuda devant un nom = « quel… » ironique : menudo lío, menuda suerte, menudo día. Attention : menudo veut dire « menu, petit » — le sens est inversé à l'exclamation."],
["¡qué rabia!","c'est rageant !, quelle poisse !","Perdí el tren por un minuto. ¡Qué rabia!","Conversación","la rabia = la rage. dar rabia = énerver, faire râler : me da rabia que llegue tarde."],
["¡qué pena!","quel dommage !, c'est triste","No has podido venir, ¡qué pena!","Conversación","Pour la déception comme pour la tristesse. ⚠️ Plus fort qu'un simple « dommage » : si c'est léger, dis ¡vaya! ou ¡qué lástima!"],
["¡qué rollo!","quelle galère !, c'est chiant !","Otra reunión a las ocho, ¡qué rollo!","Conversación","el rollo = le rouleau → la corvée. Familier. Aussi : un rollo = une histoire sans lendemain ; buen rollo = bonne ambiance."],
["no veas","tu peux pas savoir, c'était quelque chose","No veas cómo llovía ayer.","Conversación","Intensificateur familier, très espagnol. Se place devant : no veas qué frío, no veas lo que costó."],
["imagínate","imagine un peu, tu te rends compte","Llegó sin avisar, con tres amigos. Imagínate.","Conversación","Impératif de imaginarse. Sert à faire valider l'énormité de ce qu'on raconte. Soutenu : figúrate (vous : figúrese)."],
["me hace gracia","ça me fait rire, je trouve ça drôle","Me hace gracia cómo lo cuenta.","Conversación","⚠️ Faux ami à l'envers : rien à voir avec « grâce ». no me hace ninguna gracia = ça ne m'amuse pas du tout (= ça m'embête)."],
["me da rabia","ça m'énerve, ça me met en rogne","Me da rabia no haberlo dicho antes.","Conversación","Même construction que gustar : me/te/le da rabia. Famille utile : me da pena, me da vergüenza, me da igual, me da miedo."],

/* ---------- DAR LA RAZÓN ---------- */
["desde luego","bien sûr, évidemment","—¿Vendrás? —Desde luego.","Conversación","Accord ferme, tous registres — l'un des rares qui passe en entretien comme entre amis. Aussi en incise : es, desde luego, el mejor."],
["por supuesto","bien entendu, évidemment","Por supuesto que puedes contar conmigo.","Conversación","Plus soutenu que claro. por supuesto que sí / que no renforce. supuesto = supposé : « cela va de soi »."],
["claro que sí","mais bien sûr que si","—¿Te acuerdas de mí? —¡Claro que sí!","Conversación","Le sí répond à une question, ou contredit une négation. claro que no pour l'inverse. Seul, claro = « je vois, d'accord » — pas forcément un accord."],
["y tanto","et comment !, ça oui","—Fue duro. —Y tanto.","Conversación","Accord appuyé sur ce que l'autre vient de dire. Variante : ya lo creo. Oral uniquement."],
["tal cual","exactement ça, tel quel","—Entonces se fue sin pagar. —Tal cual.","Conversación","Confirme que la reformulation de l'autre est exacte. Aussi : déjalo tal cual = laisse-le tel quel."],
["estoy contigo","je suis d'accord avec toi","En eso estoy contigo.","Conversación","Accord sur une opinion, pas une position physique. Variante : te sigo (je te suis), estoy con ella en eso."],
["darle la razón a alguien","donner raison à quelqu'un","Al final tuve que darle la razón.","Conversación","la razón = la raison. tener razón = avoir raison ; quitar la razón = donner tort. ⚠️ On ne dit pas « estar razón »."],
["no te falta razón","tu n'as pas tort","No te falta razón, pero hay otro problema.","Conversación","Accord partiel, très utile pour nuancer sans se coucher. Encore plus prudent : en parte tienes razón."],
["eso sí","ça par contre, cela dit","Es caro. Eso sí, dura años.","Conversación","Introduit la réserve ou la concession après une affirmation. Soutenu équivalent : eso sí que es cierto / ahora bien."],

/* ---------- MATIZAR Y DISCREPAR ---------- */
["no estoy tan seguro","je n'en suis pas si sûr","No estoy tan seguro de que sea buena idea.","Conversación","Le désaccord poli standard. ⚠️ no estar seguro de QUE + subjonctif. Accorde-toi : no estoy tan segura."],
["ahí discrepo","là je ne suis pas d'accord","Ahí discrepo: el problema no es el precio.","Conversación","discrepar (de) = diverger d'opinion. Registre soutenu et courtois — parfait en entretien ou en réunion."],
["no es para tanto","il n'y a pas de quoi en faire un drame","Tranquilo, no es para tanto.","Conversación","Relativise la réaction de l'autre. ⚠️ Peut vexer : dit sèchement, c'est « tu exagères »."],
["ni mucho menos","loin de là, bien au contraire","No es el peor, ni mucho menos.","Conversación","Se place après une négation pour la renforcer. Soutenu et très fréquent à l'écrit de presse aussi."],
["¿qué dices?","qu'est-ce que tu racontes ?","—Te odia. —¿Qué dices? Si te adora.","Conversación","Désaccord vif, familier. Selon le ton : surprise amusée ou franche contradiction. Plus dur : ¿pero qué dices?"],
["poner un pero","émettre une objection","Siempre le pone un pero a todo.","Conversación","el pero = le « mais » devenu nom : les objections. sin peros = sans discuter."],
["llevarle la contraria a alguien","contredire quelqu'un systématiquement","No le lleves la contraria, que se enfada.","Conversación","Ce n'est pas un désaccord ponctuel mais une habitude de contredire. Voisin : contradecir (contradigo, contradijo)."],
["dejar claro","mettre au clair, préciser bien","Quiero dejar claro que no fue idea mía.","Conversación","dejar claro QUE + indicatif (on affirme). Variante : que quede claro = que ce soit bien clair."],
["dejar caer","glisser (une remarque), sous-entendre","Dejó caer que se iba de la empresa.","Conversación","Littéralement « laisser tomber » un mot dans la conversation. Insinuation discrète — voisin de insinuar, déjà dans tes cartes."],
["que conste","qu'on soit bien d'accord, je précise","Que conste que yo avisé.","Conversación","constar = figurer, être établi. Sert à se couvrir avant qu'on vous reproche quelque chose. Soutenu : que conste en acta."],

/* ---------- TOMAR LA PALABRA, ORGANISER ---------- */
["verás","tu vois, écoute","Verás, es que no me lo esperaba.","Conversación","Futur de ver employé pour préparer l'autre à une explication — souvent une mauvaise nouvelle ou une excuse. Vous : verá."],
["lo que pasa es que","ce qui se passe, c'est que","Lo que pasa es que no me avisaron.","Conversación","La formule d'excuse ou d'explication la plus courante de l'oral. Plus court : es que (mais es que seul sonne enfantin si on en abuse)."],
["el caso es que","le fait est que, toujours est-il que","El caso es que al final no vino nadie.","Conversación","Ramène au fait principal après une digression. Soutenu, s'écrit aussi."],
["a propósito","à propos, au fait","A propósito, ¿hablaste con ella?","Conversación","⚠️ Deux sens opposés : a propósito = au fait (transition) ET exprès, délibérément (lo hizo a propósito). Le contexte tranche."],
["cambiando de tema","pour changer de sujet","Cambiando de tema: ¿qué haces el sábado?","Conversación","Transition assumée. Plus abrupt : por cambiar de tema. Pour revenir : volviendo a lo de antes."],
["volviendo a lo de antes","pour en revenir à ce qu'on disait","Volviendo a lo de antes, ¿cuánto costaría?","Conversación","Récupère le fil perdu. Variante : retomando lo que decías (soutenu)."],
["a lo que iba","pour en revenir à mon propos","…bueno, a lo que iba: necesito tu respuesta hoy.","Conversación","Se dit à soi-même après sa PROPRE digression. Très oral et très utile : personne ne parle en ligne droite."],
["como te decía","comme je te disais","Como te decía, no es tan sencillo.","Conversación","Imparfait obligatoire (decía, pas dije). Vous : como le decía."],
["meter baza","placer un mot, intervenir","No me dejó meter baza en toda la cena.","Conversación","la baza = le pli, aux cartes. S'emploie surtout au négatif : no poder meter baza = ne pas arriver à en placer une."],
["quitarle la palabra a alguien","couper la parole à quelqu'un","Me quitó la palabra a mitad de frase.","Conversación","Variante : cortar a alguien. Pour s'excuser de le faire : perdona que te interrumpa."],
["perdona que te interrumpa","pardon de te couper","Perdona que te interrumpa, pero es importante.","Conversación","Vous : perdone que le interrumpa. ⚠️ perdona que + SUBJONCTIF (interrumpa, pas interrumpo)."],
["déjame terminar","laisse-moi finir","Déjame terminar y luego me dices.","Conversación","Impératif + pronom soudé. Plus doux : déjame acabar la idea. Vous : déjeme terminar."],
["ir al grano","aller droit au but","Vamos al grano: ¿cuánto quieres?","Conversación","el grano = le grain. Le contraire est déjà dans tes cartes : irse por las ramas (partir dans les branches)."],
["andarse con rodeos","tourner autour du pot","No te andes con rodeos y dilo.","Conversación","el rodeo = le détour. Souvent au négatif, à l'impératif. Synonyme de irse por las ramas, côté personne."],

/* ---------- EXPLICARSE ---------- */
["más o menos","plus ou moins, à peu près","—¿Lo entendiste? —Más o menos.","Conversación","Réponse mitigée extrêmement fréquente. À l'oral, souvent réduit à « masomenos »."],
["por así decirlo","pour ainsi dire","Es, por así decirlo, el cerebro del grupo.","Conversación","Signale qu'on prend une image. Variante : por decirlo de algún modo."],
["digamos","disons","Es, digamos, una solución provisional.","Conversación","Subjonctif de decir employé en incise. Même fonction que « disons » : on choisit un mot approximatif en l'annonçant."],
["no sé si me explico","je ne sais pas si je suis clair","Es complicado… no sé si me explico.","Conversación","Vérifie qu'on a été compris sans accuser l'autre de ne pas suivre. Plus direct : ¿me explico? / ¿me sigues?"],
["¿sabes?","tu vois ?, tu sais ?","Es que no me apetecía, ¿sabes?","Conversación","Ponctuation orale en fin de phrase, cherche l'adhésion. En abuser fait bavard — comme « tu vois » en français. Vous : ¿sabe?"],
["resumiendo","en résumé, bref","Resumiendo: nadie quiere hacerlo.","Conversación","Gérondif employé comme connecteur. Voisins : en resumen (soutenu), total (familier)."],
["si no me equivoco","si je ne me trompe pas","Si no me equivoco, fue en 2019.","Conversación","equivocarse = se tromper (me equivoco, me equivoqué). Prudence utile avant un chiffre ou une date."],
["si te soy sincero","si je dois être honnête","Si te soy sincero, no me convenció.","Conversación","Vous : si le soy sincero. Variantes : para serte sincero, la verdad sea dicha, siendo honesto."],
["entre tú y yo","entre nous","Entre tú y yo, creo que se va.","Conversación","⚠️ Après entre, l'espagnol garde tú et yo (pas ti/mí) : entre tú y yo. Exception célèbre de la grammaire."],

/* ---------- DAR SU OPINIÓN ---------- */
["me da la sensación de que","j'ai l'impression que","Me da la sensación de que no le interesa.","Conversación","+ indicatif à l'affirmatif. Plus prudent que creo que : on avance une impression, pas une thèse."],
["tengo la impresión de que","j'ai le sentiment que","Tengo la impresión de que ya lo sabía.","Conversación","⚠️ de que, jamais « que » seul (le fameux queísmo). Même piège : estoy seguro DE que, me alegro DE que."],
["yo diría que","je dirais que","Yo diría que son unos treinta.","Conversación","Conditionnel d'atténuation. Parfait pour estimer un chiffre ou donner un avis sans l'imposer."],
["¿cómo lo ves?","tu en penses quoi ?","Yo lo haría así. ¿Cómo lo ves?","Conversación","Rend la parole en demandant un avis. Variantes : ¿qué te parece?, ¿tú qué opinas?, ¿cómo lo verías?"],
["¿qué opinas?","qu'est-ce que tu en penses ?","¿Y tú qué opinas de todo esto?","Conversación","la opinión = l'avis. Registre neutre, passe partout — y compris en réunion."],
["¿a ti qué te parece?","et toi, ça te dit quoi ?","A mí me gusta. ¿A ti qué te parece?","Conversación","parecer se construit comme gustar : me parece, te parece. Le a ti initial insiste sur le changement d'interlocuteur."],
["¿y si…?","et si… ?","¿Y si lo dejamos para mañana?","Conversación","Proposition. ⚠️ Avec l'INDICATIF pour proposer (¿y si vamos?), avec l'imparfait du subjonctif pour l'hypothèse lointaine (¿y si fuera verdad?)."],
["¿qué tal si…?","et si on… ?","¿Qué tal si quedamos a las siete?","Conversación","Suivi de l'indicatif. Plus engageant que ¿y si…? — on propose vraiment quelque chose."],
["no me acaba de convencer","ça ne me convainc pas totalement","La idea no me acaba de convencer.","Conversación","acabar de + infinitif au négatif = « ne pas finir de », donc « pas tout à fait ». Formule d'objection douce très utile."],
["qué sé yo","est-ce que je sais, va savoir","Pues no sé… un mes, qué sé yo.","Conversación","Marque l'approximation ou le renoncement à préciser. Familier. Voisin : yo qué sé (plus excédé)."],

/* ---------- SUAVIZAR ---------- */
["no te lo tomes a mal","ne le prends pas mal","No te lo tomes a mal, pero no te queda bien.","Conversación","tomarse algo a mal / a bien. Prépare une critique. Vous : no se lo tome a mal."],
["con todo el respeto","avec tout le respect que je vous dois","Con todo el respeto, creo que se equivoca.","Conversación","Soutenu, poli — et comme en français, annonce presque toujours une contradiction."],
["sin ánimo de ofender","sans vouloir vexer","Sin ánimo de ofender, no está a la altura.","Conversación","el ánimo = l'intention, l'humeur. Variante : sin querer ofender."],
["no es por nada","c'est pas pour dire, sans vouloir t'embêter","No es por nada, pero te lo avisé.","Conversación","Familier, souvent ironique : annonce exactement « c'est un peu pour dire ». Le ton fait tout."],
["qué le vamos a hacer","que veux-tu, on n'y peut rien","Es injusto, pero qué le vamos a hacer.","Conversación","Résignation. Variante : qué se le va a hacer. Voisin très espagnol : es lo que hay."],
["es lo que hay","c'est comme ça, on fait avec","No es mucho, pero es lo que hay.","Conversación","Résignation sèche, omniprésente en Espagne. Familier, légèrement fataliste."],

/* ---------- CERRAR, TRANCHER ---------- */
["y punto","un point c'est tout","No vas y punto.","Conversación","Clôt la discussion. Variante plus dure : y se acabó. Familier et autoritaire — à manier avec soin."],
["ni más ni menos","ni plus ni moins, exactement","—¿Entonces lo hizo por dinero? —Ni más ni menos.","Conversación","Confirme la formulation de l'autre, avec un soupçon de solennité."],
["así que nada","du coup voilà, bref","Nadie contestó, así que nada, me fui.","Conversación","Transition résignée très orale, pour conclure une anecdote. Familier."],
["ya veremos","on verra bien","—¿Te darán el puesto? —Ya veremos.","Conversación","Futur + ya d'attente. Souvent sceptique : « ça reste à voir »."],
["ya te contaré","je te raconterai","Ahora no puedo, ya te contaré.","Conversación","Promesse de reprendre plus tard. Le ya marque « en temps voulu », pas « déjà »."],
["lo dicho","comme convenu, voilà","Lo dicho: nos vemos el jueves.","Conversación","Participe de decir employé comme nom. Sert à clore en rappelant l'accord pris."],
["nada más","c'est tout, rien de plus","Quería avisarte, nada más.","Conversación","Minimise ce qu'on vient de dire. ⚠️ En Amérique, nada más = seulement (nada más llegué = à peine arrivé)."],
["ni hablar","pas question","—¿Me lo dejas? —Ni hablar.","Conversación","Refus net. Voisins : ni de broma, ni loco, de eso nada."],
["para nada","pas du tout","—¿Te molesta? —Para nada.","Conversación","Négation renforcée. ⚠️ En Amérique, para nada peut sonner sec ; en Espagne c'est le standard."],
["allá tú","c'est ton problème, à toi de voir","Si no quieres venir, allá tú.","Conversación","Se conjugue : allá él, allá ellos, allá vosotros. Désengagement un peu piqué."],
["tú mismo","comme tu veux, à ta guise","—Lo hago a mi manera. —Tú mismo.","Conversación","Accorde-toi : tú misma. Souvent une acceptation réticente, pas un encouragement."],
["como quieras","comme tu voudras","Como quieras, a mí me da igual.","Conversación","⚠️ Subjonctif après como quand il porte sur l'avenir : como quieras, no como quieres."],

/* ---------- PARLER DE LA CONVERSATION ELLE-MÊME ---------- */
["venir a cuento","venir à propos, avoir un rapport","Eso no viene a cuento ahora.","Conversación","Surtout au négatif : no venir a cuento = n'avoir aucun rapport. Variante : no venir al caso."],
["no venir al caso","être hors sujet","Tu opinión sobre él no viene al caso.","Conversación","el caso = l'affaire en question. Plus neutre que no viene a cuento."],
["darle vueltas a algo","ressasser, tourner et retourner","Llevo toda la semana dándole vueltas.","Conversación","dar vueltas = tourner. Avec le pronom le, c'est ruminer une idée. Voisin : comerse la cabeza."],
["soltar un rollo","faire un laïus, tenir la jambe","Nos soltó un rollo de media hora.","Conversación","Familier. Aussi : cortar el rollo = couper court, casser l'ambiance."],
["cortar el rollo","couper court, casser l'ambiance","Siento cortar el rollo, pero me voy.","Conversación","Familier. ⚠️ Deux usages : interrompre un bavardage, ou gâcher la bonne humeur du groupe."],
["estar de acuerdo en líneas generales","être d'accord dans les grandes lignes","En líneas generales estoy de acuerdo contigo.","Conversación","en líneas generales s'utilise seul aussi. Soutenu, très utile en réunion pour accepter sans tout accepter."],
["por otro lado","d'un autre côté, par ailleurs","Es caro; por otro lado, no hay alternativa.","Conversación","Couple : por un lado… por otro lado. Soutenu et écrit aussi. Voisin : por otra parte."],
["de todos modos","de toute façon, quoi qu'il en soit","De todos modos, ya es tarde para cambiarlo.","Conversación","Synonymes : de todas formas, de todas maneras, en cualquier caso. Les quatre s'emploient indifféremment."],
["para colmo","pour couronner le tout","Llegué tarde y, para colmo, sin el informe.","Conversación","el colmo = le comble. Variante : encima (déjà dans tes cartes), para colmo de males."],
["menos mal que","heureusement que","Menos mal que lo comprobaste.","Conversación","+ INDICATIF, jamais subjonctif. Seul, menos mal = ouf. Voisin : suerte que."],
["suerte que","une chance que","Suerte que no había nadie dentro.","Conversación","+ indicatif. Plus familier que menos mal que. Aussi : por suerte (heureusement)."],
["cuidado con","attention à","Cuidado con lo que dices delante de él.","Conversación","+ nom ou + infinitif. ⚠️ cuidado con + que + subjonctif = menace légère : cuidado con que te pille."],
["vale ya","ça suffit maintenant","Vale ya, que no tiene gracia.","Conversación","Espagne, familier. vale seul = d'accord ; c'est ya qui en fait un « stop »."]

  ]);
  window.VOCAB_PRIO = (window.VOCAB_PRIO || []).concat(
    [...Array(window.VOCAB.length - start).keys()].map(k => start + k));
})();
