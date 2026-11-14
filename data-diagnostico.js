/* ============================================================
   CUMBRE — EL DIAGNÓSTICO
   Banque du test de diagnostic unique. 2026-11-14.
   ------------------------------------------------------------
   POURQUOI UN AUTRE TEST QUE L'ÉVALUATION.
   L'évaluation (data-evaluacion.js) est un THERMOMÈTRE : 40 items, tous
   en QCM à 4 options, repassés tous les deux mois pour voir si la courbe
   monte. Elle répond à « est-ce que je progresse ».
   Le diagnostic répond à une autre question : « QUOI régler dans l'app ».
   Il se passe UNE FOIS, il est long, il n'a pas d'audio, et surtout :
     · il mesure le RAPPEL (réponse tapée, zéro option) autant que la
       RECONNAISSANCE (QCM). L'écart entre les deux est l'information la
       plus utile du test : reconnaître « tenga » parmi quatre formes et
       savoir la produire dans le vide sont deux compétences différentes,
       et seule la seconde sert à parler.
     · il est étiqueté item par item (tag de compétence + niveau CEFR),
       donc il sort un PROFIL par compétence, pas un score global. Un
       score global ne dit pas quoi changer.
     · il garde les réponses tapées TELLES QUELLES, pour qu'elles soient
       relues à la main : une correction automatique de production écrite
       se trompe, et une mesure fausse vaut moins que pas de mesure.
   ------------------------------------------------------------
   RÈGLES DE CETTE BANQUE :
   1. Rien de ce fichier n'est proposé en entraînement. Jamais.
   2. Les erreurs du diagnostic ne partent pas dans « Revoir mes erreurs ».
   3. Le test est FIXE (pas de tirage aléatoire) : deux passages doivent
      être comparables, et un diagnostic ne se repasse pas tous les mois.
   4. Aucun item d'écoute. Il travaille souvent sans son.
   ------------------------------------------------------------
   NIVEAUX : 2 = A2 · 3 = B1 · 4 = B2 · 5 = C1
   TAGS : modo (indicatif/subjonctif) · tiempos (temps, concordance)
          serestar · prep (prépositions, régimes) · relativos
          pron (pronoms, se, datifs) · perifrasis · conectores
          morfo (morphologie, accords) · lexico · idiom · calco (français)
          registro · lectura
   FORMATS :
     qcm    {t,lvl,tag,q,o[],c,e}             — une bonne réponse sur 4
     libre  {t,lvl,tag,q,a[],e}               — réponse TAPÉE, a[] = formes acceptées
     error  {t,lvl,tag,w[],c,fix,e}           — repérer le mot fautif (c = index dans w[])
     trad   {t,lvl,tag,fr,a[],must[],e}       — thème FR→ES, relu à la main
     lectura {id,lvl,title,text,qs:[{q,o[],c,tag,e}]}
   ============================================================ */

/* ---------- SECTION 1 — GRAMMAIRE EN RECONNAISSANCE (QCM) ---------- */
window.DIAG_QCM = [
  /* A2 — le plancher. S'il y a des trous ici, tout le reste est à relire. */
  { t:'qcm', lvl:2, tag:'serestar', q:'Hoy ______ muy cansado, no he dormido nada.', o:['soy','estoy','tengo','hago'], c:1, e:'État passager → estar. « Soy cansado » dirait un trait de caractère (quelqu\'un de fatigant).' },
  { t:'qcm', lvl:2, tag:'pron', q:'A mis padres ______ el flamenco.', o:['le gusta','les gusta','les gustan','gustan'], c:1, e:'gustar s\'accorde avec la CHOSE aimée (el flamenco, singulier) ; « a mis padres » est un datif pluriel → les.' },
  { t:'qcm', lvl:2, tag:'tiempos', q:'Ayer ______ al cine con Ana.', o:['voy','fui','iba','he ido'], c:1, e:'« ayer » est un repère de temps clos → prétérit. « He ido » est impossible avec ayer en espagnol d\'Espagne.' },
  { t:'qcm', lvl:2, tag:'morfo', q:'En mi barrio ______ tres panaderías.', o:['son','están','hay','tienen'], c:2, e:'Existence → hay (invariable). estar situe quelque chose de déjà identifié : « la panadería está en la esquina ».' },
  { t:'qcm', lvl:2, tag:'morfo', q:'Habla español ______ bien.', o:['mucho','muy','tan','tanto'], c:1, e:'muy devant un adverbe ou un adjectif ; mucho modifie un verbe ou un nom.' },
  { t:'qcm', lvl:2, tag:'perifrasis', q:'______ estudiar más si quiero aprobar.', o:['Debo de','Tengo que','Hay de','Soy de'], c:1, e:'tener que + infinitif = obligation. « deber de » exprime la supposition, pas l\'obligation.' },
  { t:'qcm', lvl:2, tag:'prep', q:'Me levanto ______ las siete todos los días.', o:['a','en','por','de'], c:0, e:'Heure précise → a las siete.' },

  /* B1 */
  { t:'qcm', lvl:3, tag:'tiempos', q:'Mientras ______ la cena, llamaron a la puerta.', o:['preparé','preparaba','he preparado','prepararía'], c:1, e:'Cadre en cours (imparfait) interrompu par un événement ponctuel (prétérit). C\'est le couple de base du récit espagnol.' },
  { t:'qcm', lvl:3, tag:'modo', q:'Quiero que me ______ la verdad.', o:['dices','digas','dirás','dijeras'], c:1, e:'Volonté + que + sujet différent → subjonctif présent.' },
  { t:'qcm', lvl:3, tag:'serestar', q:'El concierto ______ en el teatro Real.', o:['es','está','hay','queda'], c:0, e:'Un ÉVÉNEMENT se localise avec ser : « la reunión es en la sala 2 ». estar localiserait un objet ou une personne.' },
  { t:'qcm', lvl:3, tag:'prep', q:'Gracias ______ todo lo que has hecho.', o:['por','para','de','en'], c:0, e:'por = cause, motif du remerciement.' },
  { t:'qcm', lvl:3, tag:'morfo', q:'No ______ eso delante de ella, por favor.', o:['dices','di','digas','dirás'], c:2, e:'Impératif NÉGATIF = subjonctif présent. « No di » n\'existe pas comme ordre.' },
  { t:'qcm', lvl:3, tag:'relativos', q:'El libro ______ compré ayer está malísimo.', o:['que','el que','cual','quien'], c:0, e:'Relatif sans préposition, antécédent chose → que, tout simplement.' },
  { t:'qcm', lvl:3, tag:'pron', q:'¿El informe? Ya ______ he enviado al jefe.', o:['le lo','se lo','lo le','se le'], c:1, e:'le + lo devient obligatoirement se lo. « Le lo » est impossible en espagnol.' },
  { t:'qcm', lvl:3, tag:'perifrasis', q:'______ dos años estudiando español.', o:['Hago','Llevo','Tengo','Soy'], c:1, e:'llevar + gérondif = durée depuis. « Hace dos años que estudio » est l\'autre tournure.' },
  { t:'qcm', lvl:3, tag:'tiempos', q:'Esta semana ______ tres libros.', o:['leí','he leído','leía','había leído'], c:1, e:'Période non close (esta semana) → passé composé.' },
  { t:'qcm', lvl:3, tag:'conectores', q:'Estaba lloviendo, ______ cogimos un taxi.', o:['aunque','así que','sin embargo','en cambio'], c:1, e:'así que = conséquence. Les trois autres opposent.' },
  { t:'qcm', lvl:3, tag:'prep', q:'No lo veo ______ marzo.', o:['desde','desde hace','hace','por'], c:0, e:'desde + point de départ daté (marzo). desde hace + durée (desde hace tres meses).' },
  { t:'qcm', lvl:3, tag:'serestar', q:'La puerta ______ cerrada con llave, no pudimos entrar.', o:['era','estaba','había','tenía'], c:1, e:'Résultat d\'une action → estar + participe. « Era cerrada » serait un passif d\'action, inusité ici.' },
  { t:'qcm', lvl:3, tag:'perifrasis', q:'Mira esas nubes: mañana ______ llover.', o:['va','va a','irá','está'], c:1, e:'ir A + infinitif. La préposition n\'est pas optionnelle.' },

  /* B2 */
  { t:'qcm', lvl:4, tag:'modo', q:'Hazlo como ______, a mí me da igual.', o:['quieres','quieras','querrás','querías'], c:1, e:'Manière non déterminée → subjonctif. « Como quieres » renverrait à une manière déjà connue.' },
  { t:'qcm', lvl:4, tag:'modo', q:'Me pidió que ______ más despacio.', o:['hablo','hable','hablara','hablaría'], c:2, e:'Concordance : verbe principal au passé → subjonctif imparfait.' },
  { t:'qcm', lvl:4, tag:'prep', q:'Me alegro ______ hayas venido.', o:['que','de que','a que','en que'], c:1, e:'alegrarse DE algo → alegrarse de que. L\'omettre est du queísmo.' },
  { t:'qcm', lvl:4, tag:'relativos', q:'Ese es el motivo ______ renunció.', o:['que','por el que','el cual','porque'], c:1, e:'Le relatif reprend une cause → préposition + article + que : por el que.' },
  { t:'qcm', lvl:4, tag:'pron', q:'A Juan se le ______ los platos al suelo.', o:['cayó','cayeron','cayeran','caía'], c:1, e:'Tournure d\'accident : le sujet grammatical est « los platos » → pluriel. « Juan » n\'est qu\'un datif.' },
  { t:'qcm', lvl:4, tag:'serestar', q:'Mi tío ______ muy orgulloso: nunca pide ayuda a nadie.', o:['es','está','tiene','hace'], c:0, e:'Trait de caractère → ser. « Está orgulloso » = il est fier de quelque chose de précis, ponctuellement.' },
  { t:'qcm', lvl:4, tag:'perifrasis', q:'No ______ a llamarme a estas horas.', o:['vuelves','vuelvas','volverás','volvieras'], c:1, e:'volver a + infinitif = refaire. Ici à l\'impératif négatif → subjonctif.' },
  { t:'qcm', lvl:4, tag:'conectores', q:'Es carísimo; ______, la calidad lo justifica.', o:['por lo tanto','no obstante','así pues','de ahí'], c:1, e:'Concession → no obstante. Les trois autres introduisent une conséquence.' },
  { t:'qcm', lvl:4, tag:'tiempos', q:'No contesta al teléfono: ______ durmiendo.', o:['está','estará','esté','estaría'], c:1, e:'Futur de probabilité : « estará » = « il doit être en train de dormir ». Usage très courant, rarement produit par un francophone.' },
  { t:'qcm', lvl:4, tag:'modo', q:'Si ______ más tiempo, aprendería japonés.', o:['tengo','tenga','tuviera','tendría'], c:2, e:'Condition irréelle du présent : si + subjonctif imparfait → conditionnel. Jamais « si tendría ».' },
  { t:'qcm', lvl:4, tag:'morfo', q:'No sabes ______ difícil que es trabajar con él.', o:['el','lo','cuan','que'], c:1, e:'lo + adjectif + que = exclamation indirecte sur le degré.' },
  { t:'qcm', lvl:4, tag:'prep', q:'Se empeñó ______ hacerlo todo solo.', o:['de','en','a','por'], c:1, e:'empeñarse EN. Régime à apprendre comme un bloc.' },
  { t:'qcm', lvl:4, tag:'prep', q:'Se negó ______ firmar el contrato.', o:['a','de','en','por'], c:0, e:'negarse A. Le français « refuser de » pousse vers « de » : c\'est le piège.' },
  { t:'qcm', lvl:4, tag:'pron', q:'A los invitados ______ sirvieron primero.', o:['le','les','los','se'], c:1, e:'servir algo A alguien → datif pluriel les. « Los sirvieron » ferait des invités le plat servi.' },
  { t:'qcm', lvl:4, tag:'morfo', q:'Nunca había visto ______ gente en esta plaza.', o:['tan','tanto','tanta','tantas'], c:2, e:'tanto s\'accorde avec le nom : gente est féminin singulier → tanta.' },
  { t:'qcm', lvl:4, tag:'relativos', q:'______ avisa no es traidor.', o:['Quien','El cual','Que','Cuyo'], c:0, e:'Relatif sans antécédent exprimé → quien (ou « el que »). « El cual » exige un antécédent.' },

  /* C1 */
  { t:'qcm', lvl:5, tag:'tiempos', q:'Para cuando llegues, ya ______ todo.', o:['termino','terminaré','habré terminado','habría terminado'], c:2, e:'Antériorité dans le futur → futur antérieur. Temps presque jamais produit spontanément par un francophone.' },
  { t:'qcm', lvl:5, tag:'modo', q:'Me habló como si no me ______ de nada.', o:['conoce','conozca','conociera','conocería'], c:2, e:'como si + subjonctif imparfait, toujours. Jamais d\'indicatif après como si.' },
  { t:'qcm', lvl:5, tag:'conectores', q:'Iré a la reunión, ______ que surja algo urgente.', o:['salvo','pese a','dado','conforme'], c:0, e:'salvo que + subjonctif = à moins que. « pese a que » concède, « dado que » cause.' },
  { t:'qcm', lvl:5, tag:'idiom', q:'¡______ fueras tú el que manda aquí!', o:['Como que','Ni que','Si que','Aun que'], c:1, e:'ni que + subjonctif imparfait = « on dirait que », ironique. Tournure orale très idiomatique.' },
  { t:'qcm', lvl:5, tag:'relativos', q:'Fue entonces ______ me di cuenta del error.', o:['que','cuando','donde','el que'], c:1, e:'Mise en relief d\'un temps → cuando. « Fue entonces que » est un calque du français, critiqué en norme soutenue.' },
  { t:'qcm', lvl:5, tag:'tiempos', q:'Son las tres: ya ______ de estar en casa.', o:['debe','tiene','puede','va'], c:0, e:'deber DE + infinitif = supposition (« il doit être rentré »). À ne pas confondre avec deber sans de = obligation.' },
  { t:'qcm', lvl:5, tag:'relativos', q:'Un autor ______ obra desconocía por completo.', o:['cuyo','cuya','cuyos','del que'], c:1, e:'cuyo s\'accorde avec le nom qui SUIT (obra, féminin), pas avec le possesseur.' },
  { t:'qcm', lvl:5, tag:'prep', q:'Te apuesto ______ que no viene.', o:['a','de','en','por'], c:0, e:'apostar A que. Régime fixe.' },
  { t:'qcm', lvl:5, tag:'lexico', q:'No me saludó; ni ______ me miró.', o:['siquiera','tampoco','apenas','aun'], c:0, e:'ni siquiera = pas même. « ni tampoco » existe mais ne gradue pas.' },
  { t:'qcm', lvl:5, tag:'morfo', q:'De haberlo ______ antes, no habría venido.', o:['saber','sabido','sabiendo','supiera'], c:1, e:'de + infinitif composé = condition irréelle du passé (« si je l\'avais su »). Registre soutenu, très économique.' },
  { t:'qcm', lvl:5, tag:'modo', q:'Lejos de que el problema ______, ha empeorado.', o:['se resuelve','se resolvió','se haya resuelto','se resolverá'], c:2, e:'lejos de que + subjonctif. La locution nie le fait : le subjonctif est obligatoire.' },
  { t:'qcm', lvl:5, tag:'conectores', q:'No contestó. ______, su silencio ya era una respuesta.', o:['Es decir','Con todo','Si bien','En efecto'], c:1, e:'con todo = « malgré tout », articule une concession suivie d\'une reprise. « En efecto » confirmerait au lieu d\'opposer.' }
];

/* ---------- SECTION 2 — GRAMMAIRE EN RAPPEL (réponse tapée) ----------
   Le cœur du diagnostic. Mêmes tags que la section 1, zéro option : la
   forme doit sortir de la tête. On compare ensuite tag par tag le score
   QCM et le score tapé — l'écart est la mesure de ce qui est « reconnu
   mais pas disponible », donc inutilisable à l'oral.
   a[] liste toutes les formes acceptées (variantes -ra/-se incluses).
   La comparaison est tolérante à l'accent, mais l'accent manquant est
   COMPTÉ À PART : un accent est une information, pas du bruit. */
window.DIAG_LIBRE = [
  /* B1 */
  { t:'libre', lvl:3, tag:'tiempos', q:'Ayer ______ a llover justo cuando salíamos. (empezar)', a:['empezó'], e:'Prétérit, 3ᵉ personne : empezó (avec accent).' },
  { t:'libre', lvl:3, tag:'tiempos', q:'Cuando era pequeño, ______ en la calle todos los días. (jugar)', a:['jugaba'], e:'Habitude dans le passé → imparfait.' },
  { t:'libre', lvl:3, tag:'tiempos', q:'No ______ nadie en la oficina cuando llegué. (haber)', a:['había'], e:'había, invariable, même devant un pluriel.' },
  { t:'libre', lvl:3, tag:'morfo', q:'Mañana te ______ lo que ha pasado. (decir, yo)', a:['diré'], e:'Futur irrégulier : dir- + é.' },
  { t:'libre', lvl:3, tag:'modo', q:'Ojalá ______ a la fiesta de mañana. (venir, él)', a:['venga'], e:'ojalá + subjonctif présent pour un souhait réalisable.' },
  { t:'libre', lvl:3, tag:'tiempos', q:'Me dijo que no ______ ayudarme ese día. (poder, él)', a:['podía','pudo'], e:'Discours rapporté : le présent devient imparfait (podía).' },
  { t:'libre', lvl:3, tag:'morfo', q:'No ______ por eso, ya está resuelto. (preocuparse, tú)', a:['te preocupes'], e:'Impératif négatif pronominal : le pronom reste DEVANT le verbe.' },
  { t:'libre', lvl:3, tag:'morfo', q:'______ lo que quieras, pero no me pidas ayuda. (hacer, tú — impératif)', a:['haz'], e:'Impératif irrégulier : haz (pas « hace », pas « haga » pour le tutoiement).' },
  { t:'libre', lvl:3, tag:'prep', q:'Me di cuenta ______ mi error demasiado tarde.', a:['de'], e:'darse cuenta DE. L\'omettre est l\'erreur la plus fréquente des francophones avancés.' },
  { t:'libre', lvl:3, tag:'prep', q:'Cuanto ______ lo pienso, menos lo entiendo.', a:['más'], e:'Corrélation cuanto más… menos…' },

  /* B2 */
  { t:'libre', lvl:4, tag:'modo', q:'Nos pidieron que ______ el informe firmado. (traer, nosotros)', a:['trajéramos','trajésemos'], e:'Subjonctif imparfait sur radical de prétérit : traj- → trajéramos.' },
  { t:'libre', lvl:4, tag:'modo', q:'En cuanto ______ algo, te aviso. (saber, yo)', a:['sepa'], e:'Conjonction temporelle tournée vers le futur → subjonctif présent. Jamais de futur après en cuanto.' },
  { t:'libre', lvl:4, tag:'modo', q:'No conozco a nadie que ______ chino aquí. (saber)', a:['sepa'], e:'Antécédent nié → relative au subjonctif.' },
  { t:'libre', lvl:4, tag:'modo', q:'Aunque ______ difícil, lo voy a intentar. (ser)', a:['sea'], e:'aunque + subjonctif = hypothèse concédée (« même si »).' },
  { t:'libre', lvl:4, tag:'modo', q:'Lo hizo para que no ______ sus padres. (enterarse)', a:['se enteraran','se enterasen'], e:'para que + subjonctif, concordance au passé.' },
  { t:'libre', lvl:4, tag:'modo', q:'Me extraña que todavía no ______ . (llamar, él)', a:['haya llamado'], e:'Fait passé vu depuis le présent → subjonctif passé composé.' },
  { t:'libre', lvl:4, tag:'tiempos', q:'Para cuando llegamos, ya ______ todos. (irse)', a:['se habían ido','se habian ido'], e:'Antériorité dans le passé → plus-que-parfait, pronom devant l\'auxiliaire.' },
  { t:'libre', lvl:4, tag:'tiempos', q:'Si hubiera salido antes, no ______ el tren. (perder, yo)', a:['habría perdido','hubiera perdido','hubiese perdido'], e:'Apodose irréelle du passé : conditionnel composé (ou hubiera perdido, également admis).' },
  { t:'libre', lvl:4, tag:'perifrasis', q:'Llevo tres horas ______ aquí sin noticias. (esperar)', a:['esperando'], e:'llevar + gérondif.' },
  { t:'libre', lvl:4, tag:'morfo', q:'Al ______ la factura, se quedó pálido. (ver)', a:['ver'], e:'al + INFINITIF (pas de gérondif) = au moment où.' },
  { t:'libre', lvl:4, tag:'prep', q:'Insisto ______ que vengas con nosotros.', a:['en'], e:'insistir EN que.' },
  { t:'libre', lvl:4, tag:'prep', q:'Soñé ______ que volvía a mi pueblo.', a:['con'], e:'soñar CON.' },
  { t:'libre', lvl:4, tag:'prep', q:'Se empeña ______ llevar siempre la razón.', a:['en'], e:'empeñarse EN.' },
  { t:'libre', lvl:4, tag:'prep', q:'Confío ______ que todo salga bien.', a:['en'], e:'confiar EN que.' },
  { t:'libre', lvl:4, tag:'conectores', q:'No vino, ______ que tuvimos que empezar sin él.', a:['así','asi'], e:'así que = conséquence.' },

  /* C1 */
  { t:'libre', lvl:5, tag:'modo', q:'Quisiera que me ______ un momento, por favor. (escuchar, tú)', a:['escucharas','escuchases'], e:'Verbe de volonté au conditionnel de politesse → subjonctif imparfait.' },
  { t:'libre', lvl:5, tag:'modo', q:'Habría preferido que no ______ nada. (decir, tú)', a:['hubieras dicho','hubieses dicho','dijeras','dijeses'], e:'Regret sur un fait accompli → subjonctif plus-que-parfait.' },
  { t:'libre', lvl:5, tag:'modo', q:'Sea lo que ______, hay que decidirse hoy. (ser)', a:['sea'], e:'Structure redoublée sea lo que sea : concessive totale.' },
  { t:'libre', lvl:5, tag:'modo', q:'Como si no ______ bastante con sus problemas… (tener, él)', a:['tuviera','tuviese'], e:'como si + subjonctif imparfait, sans exception.' },
  { t:'libre', lvl:5, tag:'idiom', q:'Dio ______ hecho que vendríamos sin preguntarnos.', a:['por'], e:'dar POR hecho / dar por sentado = tenir pour acquis.' },
  { t:'libre', lvl:5, tag:'idiom', q:'A ______ por su cara, no le gustó nada. (juzgar)', a:['juzgar'], e:'a juzgar por = à en juger par. Locution figée à l\'infinitif.' }
];

/* ---------- SECTION 3 — DÉTECTION D'ERREURS ----------
   Une phrase, UN mot fautif, à toucher. Format choisi exprès : un QCM
   donne la bonne forme à côté des mauvaises, donc il souffle la réponse.
   Ici rien n'est soufflé, et surtout on mesure autre chose — la capacité
   à ENTENDRE qu'une phrase sonne faux, qui est ce qui manque quand une
   faute est fossilisée. Presque tous les items visent une interférence
   du français : si cette section s'effondre, le problème n'est pas le
   niveau, c'est le français qui parle par-dessus. */
window.DIAG_ERROR = [
  { t:'error', lvl:3, tag:'calco', w:['Pienso','de','que','no','vendrá'], c:1, fix:'Pienso que no vendrá', e:'pensar QUE, sans préposition. « Penser de » n\'existe pas en espagnol.' },
  { t:'error', lvl:3, tag:'calco', w:['Soy','de','acuerdo','contigo'], c:0, fix:'Estoy de acuerdo contigo', e:'ESTAR de acuerdo. « Être d\'accord » pousse vers ser : c\'est le calque.' },
  { t:'error', lvl:3, tag:'calco', w:['Necesito','de','tu','ayuda'], c:1, fix:'Necesito tu ayuda', e:'necesitar est transitif direct. Pas de « de ».' },
  { t:'error', lvl:3, tag:'calco', w:['El','problema','es','que','no','tengo','el','tiempo'], c:6, fix:'…no tengo tiempo', e:'Pas d\'article devant un nom massif indéterminé. « No tengo el tiempo » sous-entend un temps précis déjà mentionné.' },
  { t:'error', lvl:3, tag:'morfo', w:['Todo','el','mundo','saben','lo','que','pasó'], c:3, fix:'Todo el mundo sabe…', e:'todo el mundo est grammaticalement singulier.' },
  { t:'error', lvl:3, tag:'prep', w:['Es','la','primera','vez','que','voy','en','España'], c:6, fix:'…que voy a España', e:'Déplacement → a. « en » pour un pays ne marque que la situation (vivo en España).' },
  { t:'error', lvl:3, tag:'tiempos', w:['Ayer','he','visto','a','tu','hermano'], c:1, fix:'Ayer vi a tu hermano', e:'ayer ferme la période → prétérit.' },
  { t:'error', lvl:3, tag:'tiempos', w:['Cuando','era','joven','he','vivido','en','Madrid'], c:3, fix:'…viví en Madrid', e:'Période close et révolue → prétérit (ou imparfait si on décrit l\'habitude), jamais le passé composé.' },
  { t:'error', lvl:3, tag:'modo', w:['Es','posible','que','tiene','razón'], c:3, fix:'Es posible que tenga razón', e:'Expression de possibilité + que → subjonctif.' },
  { t:'error', lvl:3, tag:'morfo', w:['Este','problema','es','muy','complicada'], c:4, fix:'…muy complicado', e:'problema est masculin malgré le -a final. L\'accord suit le genre, pas la terminaison.' },
  { t:'error', lvl:4, tag:'prep', w:['Me','acordé','que','había','una','reunión'], c:2, fix:'Me acordé DE que…', e:'acordarse DE que. Supprimer le « de » est du queísmo.' },
  { t:'error', lvl:4, tag:'prep', w:['Depende','si','quieres','venir','o','no'], c:1, fix:'Depende DE si…', e:'depender DE, y compris devant « si ».' },
  { t:'error', lvl:4, tag:'morfo', w:['Hay','mucha','gente','que','no','están','de','acuerdo'], c:5, fix:'…que no está de acuerdo', e:'gente est un singulier collectif. L\'accord au pluriel est un calque du français « les gens ».' },
  { t:'error', lvl:4, tag:'calco', w:['Me','pidió','de','venir','antes'], c:2, fix:'Me pidió que viniera antes', e:'pedir que + subjonctif. « Pedir de + infinitif » n\'existe pas.' },
  { t:'error', lvl:4, tag:'pron', w:['Le','dije','a','mis','padres','la','verdad'], c:0, fix:'LES dije a mis padres…', e:'Datif pluriel → les. Le singulier « le » devant un pluriel est une faute courante, même chez les natifs, mais fautive.' },
  { t:'error', lvl:4, tag:'prep', w:['Estudio','español','desde','tres','años'], c:2, fix:'…desde hace tres años', e:'desde + date, desde hace + durée. « Desde tres años » mélange les deux.' },
  { t:'error', lvl:4, tag:'conectores', w:['A','pesar','de','que','era','tarde','pero','salimos'], c:6, fix:'A pesar de que era tarde, salimos', e:'Un seul articulateur suffit : « pero » double la concession déjà portée par a pesar de que.' },
  { t:'error', lvl:4, tag:'lexico', w:['Realicé','que','me','había','equivocado'], c:0, fix:'Me di cuenta de que…', e:'Faux ami : realizar = réaliser au sens de mener à bien, jamais « se rendre compte ».' },
  { t:'error', lvl:4, tag:'prep', w:['Asistí','el','concierto','de','ayer'], c:1, fix:'Asistí AL concierto', e:'asistir A. Sans la préposition, la phrase n\'a pas de structure.' },
  { t:'error', lvl:4, tag:'calco', w:['Me','recuerdo','de','su','cara'], c:0, fix:'Me acuerdo de su cara / Recuerdo su cara', e:'Deux verbes distincts : recordar algo (transitif) ou acordarse de algo. « Me recuerdo de » mélange les deux constructions.' }
];

/* ---------- SECTION 4 — LEXIQUE, COLLOCATIONS, REGISTRE ----------
   Ce que la grammaire ne mesure pas. À partir de B2, ce qui sépare un
   locuteur d'un autre n'est plus le subjonctif : c'est le verbe qui va
   avec le nom (tomar una decisión, pas « hacer »), la locution figée, et
   le registre. Les distracteurs sont des quasi-synonymes : on mesure la
   précision, pas la compréhension globale. */
window.DIAG_LEXICO = [
  { t:'qcm', lvl:2, tag:'lexico', q:'Mi casa está ______ del centro, a diez minutos andando.', o:['cerca','cercana','próxima','junto'], c:0, e:'cerca de = adverbe de lieu. « cercana » est un adjectif, il lui faudrait un nom.' },
  { t:'qcm', lvl:3, tag:'lexico', q:'Tengo que ______ una decisión antes del viernes.', o:['hacer','tomar','dar','poner'], c:1, e:'tomar una decisión. « Hacer una decisión » est un calque de l\'anglais.' },
  { t:'qcm', lvl:3, tag:'lexico', q:'¿Me puedes ______ un favor?', o:['hacer','dar','tomar','poner'], c:0, e:'hacer un favor. Collocation fixe.' },
  { t:'qcm', lvl:3, tag:'idiom', q:'______ mucho de menos a mi familia.', o:['Tengo','Echo','Hago','Falto'], c:1, e:'echar de menos = manquer à quelqu\'un. Sans équivalent littéral en français.' },
  { t:'qcm', lvl:3, tag:'idiom', q:'Eso no tiene nada que ______ con lo que te dije.', o:['ver','hacer','decir','saber'], c:0, e:'no tener nada que ver con = n\'avoir rien à voir avec.' },
  { t:'qcm', lvl:3, tag:'conectores', q:'A ______ de que insistió mucho, no lo consiguió.', o:['pesar','fin','causa','falta'], c:0, e:'a pesar de que = bien que. « a causa de » exprimerait la cause, pas l\'opposition.' },
  { t:'qcm', lvl:4, tag:'lexico', q:'Me ______ la atención que no dijera nada.', o:['llamó','dio','hizo','puso'], c:0, e:'llamar la atención = frapper, intriguer.' },
  { t:'qcm', lvl:4, tag:'lexico', q:'Le ______ una multa por aparcar en doble fila.', o:['dieron','pusieron','hicieron','echaron'], c:1, e:'poner una multa. En français on « met » une amende aussi, mais l\'espagnol ne tolère pas « dar ».' },
  { t:'qcm', lvl:4, tag:'idiom', q:'Se quedó ______ piedra cuando se lo conté.', o:['de','en','a','por'], c:0, e:'quedarse de piedra = rester sidéré.' },
  { t:'qcm', lvl:4, tag:'idiom', q:'Aprobó el examen ______ los pelos.', o:['por','de','a','en'], c:0, e:'por los pelos = de justesse.' },
  { t:'qcm', lvl:4, tag:'lexico', q:'Trabaja ______ cuenta propia desde hace dos años.', o:['por','a','de','en'], c:0, e:'por cuenta propia = à son compte, en indépendant.' },
  { t:'qcm', lvl:4, tag:'registro', q:'Dans un courriel formel, la formule de clôture adéquate est :', o:['Un abrazo muy fuerte','Le saluda atentamente','Hasta luego, gracias','Saludos, tío'], c:1, e:'« Le saluda atentamente » est la clôture standard du registre formel écrit. « Un abrazo » est réservé au familier.' },
  { t:'qcm', lvl:4, tag:'registro', q:'« Le agradecería que me ______ la documentación a la mayor brevedad. »', o:['manda','mande','mandara','mandará'], c:2, e:'Le agradecería que + subjonctif IMPARFAIT : la concordance avec le conditionnel de courtoisie est la marque du registre soutenu.' },
  { t:'qcm', lvl:5, tag:'lexico', q:'Lo contó con toda la ______ del mundo, como si fuera normal.', o:['naturaleza','naturalidad','natural','nada'], c:1, e:'naturalidad = le naturel, l\'aisance. naturaleza = la nature. Paire que les francophones confondent.' },
  { t:'qcm', lvl:5, tag:'lexico', q:'Un informe ______ : dos páginas, ni una cifra de más.', o:['escueto','escaso','estrecho','esquivo'], c:0, e:'escueto = concis, dépouillé. escaso = insuffisant en quantité : ce n\'est pas un compliment.' },
  { t:'qcm', lvl:5, tag:'idiom', q:'Su argumento no ______ en pie.', o:['se tiene','está','queda','pone'], c:0, e:'no tenerse en pie = ne pas tenir debout, en parlant d\'un raisonnement.' },
  { t:'qcm', lvl:5, tag:'idiom', q:'Hicieron ______ omiso de todas las advertencias.', o:['caso','oído','cuenta','ojos'], c:0, e:'hacer caso omiso de = ignorer délibérément. Locution figée du registre soutenu.' },
  { t:'qcm', lvl:5, tag:'idiom', q:'No da ______ brazo a torcer jamás.', o:['su','el','un','al'], c:0, e:'no dar su brazo a torcer = ne pas céder d\'un pouce.' },
  { t:'qcm', lvl:5, tag:'lexico', q:'Los dos ministros firmaron ______ documentos.', o:['ambos','sendos','varios','cada'], c:1, e:'sendos = un chacun. Ni « les deux » (ambos), ni « plusieurs ». Mot C1 presque toujours mal employé.' },
  { t:'qcm', lvl:5, tag:'lexico', q:'La medida ______ en vigor el próximo lunes.', o:['entrará','pondrá','saldrá','hará'], c:0, e:'entrar en vigor. Collocation administrative fixe.' }
];

/* ---------- SECTION 5 — LECTURE ----------
   Quatre textes de difficulté croissante, écrits pour ce test.
   Aucune question ne se résout en retrouvant une phrase recopiée : elles
   portent sur l'INFÉRENCE (ce que le texte implique sans le dire), le
   RÉFÉRENT (à quoi renvoie ce « lo », ce « esta »), l'INTENTION (ironie,
   concession, réserve) et le SENS EN CONTEXTE d'un mot. C'est la seule
   façon de distinguer un B2 d'un C1 : un B2 comprend ce qui est écrit,
   un C1 comprend ce que l'auteur fait avec ce qu'il écrit. */
window.DIAG_LECTURA = [
  { id:'dl1', lvl:2, title:'Un mensaje de Marta',
    text:'Hola, Javi:\n\nTe escribo porque mañana no voy a poder ir a ver el piso contigo. Me han cambiado el turno en la tienda y salgo a las ocho. Lo siento de verdad, porque era el que más me gustaba de los tres.\n\nSi puedes, ve tú solo y hazme fotos de la cocina y del baño. De la habitación grande ya tengo. Y pregúntale a la dueña si la calefacción está incluida, que en el anuncio no lo pone y el año pasado pagamos una fortuna.\n\nSi te parece muy pequeño, ni te molestes en discutir el precio. Seguimos buscando y ya está.\n\nUn beso,\nMarta',
    qs:[
      { q:'¿Por qué no va Marta a la visita?', o:['Ya no le interesa el piso','Tiene que trabajar a esa hora','El piso le parece pequeño','La dueña ha cancelado la cita'], c:1, tag:'lectura', e:'« Me han cambiado el turno… salgo a las ocho » : c\'est une contrainte de travail, et elle précise que ce logement était son préféré.' },
      { q:'¿Qué fotos NO necesita Marta?', o:['Las de la cocina','Las del baño','Las de la habitación grande','Las de la calefacción'], c:2, tag:'lectura', e:'« De la habitación grande ya tengo » : elle les a déjà.' },
      { q:'Marta quiere saber si la calefacción está incluida porque…', o:['no le gusta el frío','el anuncio no lo dice y el año pasado les costó mucho','la dueña se lo ha pedido','quiere pagar menos de alquiler'], c:1, tag:'lectura', e:'Deux raisons données côte à côte : le silence de l\'annonce et la facture de l\'année passée.' },
      { q:'« Ni te molestes en discutir el precio » significa que…', o:['debe negociar con firmeza','no vale la pena negociar en ese caso','la dueña se va a molestar','el precio ya está decidido'], c:1, tag:'lectura', e:'no molestarse en + infinitif = ne pas prendre la peine de. Sens conditionnel : si le logement est trop petit, laisser tomber.' }
    ] },

  { id:'dl2', lvl:3, title:'Trabajar desde casa',
    text:'Cuando mi empresa anunció que podíamos trabajar desde casa tres días por semana, lo celebré como una victoria. Se acababan las dos horas diarias de metro y los bocadillos tristes de la máquina del pasillo.\n\nSeis meses después, no estoy tan seguro. Es verdad que duermo más y que como mejor. Pero también he descubierto que mi salón nunca termina de ser una oficina y que mi oficina nunca termina de ser un salón. A las once de la noche sigo contestando correos, cosa que en la oficina no hacía nunca, porque allí había una puerta por la que salir.\n\nMis compañeros con hijos lo viven de otra manera: para ellos, poder recoger a los niños del colegio sin pedir permiso vale más que cualquier inconveniente. Y entiendo que tengan razón.\n\nYo, de momento, he puesto una regla: el portátil se queda en un cajón a partir de las ocho. Funciona casi siempre.',
    qs:[
      { q:'¿Cuál es la postura del autor al final del texto?', o:['Prefiere volver a la oficina a tiempo completo','Está satisfecho sin reservas','Ve ventajas e inconvenientes y busca un arreglo','Cree que el teletrabajo solo sirve a los padres'], c:2, tag:'lectura', e:'Il reconnaît les gains (sommeil, repas), nomme le coût (frontière effacée) et termine sur une règle personnelle : un compromis, pas un verdict.' },
      { q:'« Allí había una puerta por la que salir » quiere decir que la oficina…', o:['era más cómoda','tenía una separación clara entre trabajo y vida','estaba mejor ventilada','cerraba a una hora fija'], c:1, tag:'lectura', e:'La porte est une image de la frontière physique entre les deux espaces, qui disparaît à la maison.' },
      { q:'Sobre sus compañeros con hijos, el autor…', o:['piensa que se equivocan','admite que su situación justifica otra conclusión','no sabe lo que opinan','cree que tienen más trabajo'], c:1, tag:'lectura', e:'« Y entiendo que tengan razón » : concession explicite, sans ironie.' },
      { q:'« Funciona casi siempre » añade al texto un matiz de…', o:['entusiasmo total','honestidad sobre los límites de su solución','queja contra la empresa','duda sobre el futuro del teletrabajo'], c:1, tag:'lectura', e:'« Casi » admet les exceptions : l\'auteur ne vend pas sa règle comme infaillible. C\'est une réserve, pas une plainte.' }
    ] },

  { id:'dl3', lvl:4, title:'El centro como escaparate',
    text:'Hay una manera cómoda de hablar del turismo en nuestras ciudades, y consiste en contar visitantes. Tantos millones el año pasado, tantos más este, un récord. El dato tranquiliza porque parece neutro: nadie discute una cifra.\n\nLo que la cifra no cuenta es qué ha pasado en los portales de esas calles. En mi barrio, la panadería de la esquina cerró en marzo; en su lugar hay ahora una tienda que vende abanicos pintados y camisetas con el nombre de la ciudad. Nadie obligó al panadero a irse: simplemente, el alquiler que un negocio de barrio puede pagar y el que puede pagar una tienda de recuerdos dejaron de parecerse.\n\nConviene no exagerar. El turismo paga nóminas, y en una ciudad donde el paro juvenil no baja del veinte por ciento, eso no es un detalle menor. Quien defienda que lo mejor sería cerrar la puerta debería explicar antes de qué iban a vivir los camareros de la plaza.\n\nPero decir que el turismo da trabajo no responde a la pregunta de quién puede seguir viviendo en el centro. Un barrio no es solo un conjunto de empleos: es también la posibilidad de comprar el pan abajo. Cuando esa posibilidad desaparece, la ciudad sigue llena de gente y, sin embargo, se vacía.',
    qs:[
      { q:'¿Qué critica el autor en el primer párrafo?', o:['Que haya demasiados turistas','Que se mida el fenómeno solo con cifras de visitantes','Que las cifras sean falsas','Que nadie estudie el turismo'], c:1, tag:'lectura', e:'Ce n\'est pas le chiffre qui est accusé d\'être faux, c\'est son usage : il « tranquilise » parce qu\'il paraît neutre, et masque le reste.' },
      { q:'El caso de la panadería sirve para mostrar que…', o:['los panaderos ganan poco','el cambio se produce sin que nadie lo imponga, por el precio del alquiler','las tiendas de recuerdos son de mala calidad','el barrio ha perdido población'], c:1, tag:'lectura', e:'« Nadie obligó al panadero a irse » : l\'auteur insiste sur un mécanisme économique, pas sur une décision ni une faute morale.' },
      { q:'El tercer párrafo (« Conviene no exagerar… ») cumple la función de…', o:['abandonar la tesis inicial','reconocer la fuerza del argumento contrario antes de responderle','cambiar de tema','repetir el primer párrafo con otras palabras'], c:1, tag:'lectura', e:'Mouvement concessif classique : il donne au camp adverse son meilleur argument (l\'emploi, le chômage des jeunes) pour pouvoir ensuite le dépasser.' },
      { q:'« La ciudad sigue llena de gente y, sin embargo, se vacía » se entiende como…', o:['una contradicción del autor','una paradoja: llena de visitantes, vacía de vecinos','un error de cifras','una predicción sobre la despoblación rural'], c:1, tag:'lectura', e:'Les deux « vides » ne portent pas sur la même chose : la foule est touristique, le vide est résidentiel. C\'est la clé de la dernière phrase.' }
    ] },

  { id:'dl4', lvl:5, title:'Los que empezamos tarde',
    text:'Existe un género literario menor, pero muy abundante, que podríamos llamar el testimonio del políglota precoz. Su autor aprendió cuatro idiomas antes de los doce años, ninguno con esfuerzo, y escribe para contárnoslo. De tales libros se sale con la convicción, poco útil, de que lo decisivo ya ocurrió o ya no ocurrió, y que uno llega siempre con quince años de retraso.\n\nConviene desconfiar de ese relato, no porque sea falso, sino porque mide la cosa equivocada. Lo que el niño tiene no es una facultad misteriosa: es una cantidad de horas de inmersión que ningún adulto con un trabajo podrá igualar, y, sobre todo, una indiferencia absoluta al ridículo. Nadie se ríe de un niño que dice mal una palabra; el niño tampoco se ríe de sí mismo. El adulto, en cambio, lleva encima un prestigio que proteger, y protegerlo consiste casi siempre en callarse.\n\nDe ahí que el consejo técnico —más vocabulario, más gramática, más horas— acierte en el objeto y falle en el orden. No es que esas horas no sirvan; es que el adulto que no se ha resignado a sonar torpe las invertirá en lo que no le expone: leerá, subrayará, hará ejercicios de huecos impecables y seguirá sin poder pedir un café sin ensayarlo por dentro. Hay quien lleva así una década, con una competencia pasiva de lector culto y una lengua hablada de turista.\n\nNo pretendo que baste con atreverse; eso sería otra forma de la misma mentira, y las lenguas no se aprenden por fuerza de voluntad. Pretendo algo más modesto: que el orden importa, y que conviene gastar lo mejor de las propias horas en aquello que todavía no se sabe hacer, y no en lo que ya se hace bien y tranquiliza.',
    qs:[
      { q:'¿Con qué intención menciona el autor el « testimonio del políglota precoz »?', o:['Para recomendarlo como lectura','Para desmontar la conclusión desalentadora que produce','Para demostrar que los niños aprenden mejor','Para criticar su calidad literaria'], c:1, tag:'lectura', e:'Il nomme le genre pour s\'en prendre à son effet : la conviction « poco útil » que tout est déjà joué. « Género literario menor » est ironique, mais ce n\'est pas l\'objet du texte.' },
      { q:'Según el texto, la ventaja decisiva del niño es…', o:['una facultad cerebral que el adulto ha perdido','el número de horas y la ausencia de miedo al ridículo','tener mejores profesores','no tener que trabajar'], c:1, tag:'lectura', e:'« No es una facultad misteriosa » écarte explicitement l\'explication neurologique au profit de deux causes : les heures d\'immersion et l\'indifférence au ridicule.' },
      { q:'« Acierte en el objeto y falle en el orden » significa que el consejo técnico…', o:['señala cosas inútiles','nombra lo necesario pero se equivoca en las prioridades','es demasiado difícil de seguir','solo vale para los niños'], c:1, tag:'lectura', e:'« No es que esas horas no sirvan » confirme la lecture : le contenu du conseil est juste, c\'est la hiérarchie des efforts qui est fausse.' },
      { q:'¿Qué reproche concreto hace el autor al adulto que « no se ha resignado a sonar torpe »?', o:['Que estudia demasiado poco','Que dedica sus horas a lo que no lo expone','Que no lee lo suficiente','Que confía solo en su fuerza de voluntad'], c:1, tag:'lectura', e:'« Las invertirá en lo que no le expone : leerá, subrayará, hará ejercicios de huecos impecables ». Le reproche porte sur l\'évitement, pas sur la quantité.' },
      { q:'En el último párrafo, « eso sería otra forma de la misma mentira » se refiere a la idea de que…', o:['hay que estudiar más gramática','basta con atreverse a hablar','los niños aprenden sin esfuerzo','las lenguas se aprenden por fuerza de voluntad'], c:1, tag:'lectura', e:'« No pretendo que baste con atreverse; eso sería… » : le « eso » reprend la proposition immédiatement antérieure. L\'auteur refuse donc les DEUX recettes, la technique seule et l\'audace seule.' },
      { q:'La tesis final del autor se resume mejor así:', o:['Empezar tarde condena a un nivel pasivo','Hay que dejar de leer para hablar más','Conviene invertir el mejor esfuerzo en lo que aún no se sabe hacer','La fuerza de voluntad lo decide todo'], c:2, tag:'lectura', e:'Dernière phrase, et elle est doublement bornée : ni le découragement du début, ni l\'audace magique. La thèse est une règle d\'allocation de l\'effort.' }
    ] }
];

/* ---------- SECTION 6 — THÈME FR→ES (production libre) ----------
   Douze phrases courtes, chacune construite autour d'UNE structure qui
   ne se calque pas depuis le français. C'est la section la plus dure et
   la plus informative : on ne choisit rien, on ne complète rien, il faut
   fabriquer la phrase.
   ATTENTION À SA LECTURE. La correction automatique ci-dessous vérifie
   la présence des éléments décisifs (must[], regex sur la réponse mise
   à plat : minuscules, sans accent), ce qui laisse passer des fautes et
   peut refuser une bonne traduction tournée autrement. Le score de cette
   section est donc marqué INDICATIF, et les réponses sont conservées
   TELLES QUELLES dans le profil exporté, pour relecture à la main. */
window.DIAG_TRAD = [
  { t:'trad', lvl:3, tag:'perifrasis', fr:'Je viens de finir.', a:['Acabo de terminar.'],
    must:['acab\\w* de (terminar|acabar|finalizar)'], e:'acabar de + infinitif. Le français « venir de » n\'a pas de calque.' },
  { t:'trad', lvl:3, tag:'tiempos', fr:'Ça fait trois ans que je ne l\'ai pas vu.', a:['Hace tres años que no lo veo.','No lo veo desde hace tres años.'],
    must:['(hace tres anos|desde hace tres anos)','no (lo|le) (veo|he visto|vi)'], e:'Hace + durée + que + PRÉSENT. L\'espagnol reste au présent là où le français passe au passé composé.' },
  { t:'trad', lvl:4, tag:'modo', fr:'Il faudrait qu\'on parte avant la nuit.', a:['Habría que irnos antes de que anochezca.','Tendríamos que irnos antes de que se haga de noche.'],
    must:['(habria que|tendriamos que|habriamos de|hay que)','(irnos|salir|marcharnos|irse)'], e:'habría que + infinitif, ou tener que. Et « avant que » impose le subjonctif : antes de que anochezca.' },
  { t:'trad', lvl:4, tag:'modo', fr:'Quoi qu\'il dise, je n\'y crois pas.', a:['Diga lo que diga, no me lo creo.'],
    must:['(diga lo que diga|diga lo que dijera|por mucho que diga|sea lo que diga)','no (me lo creo|lo creo|me lo trago)'], e:'La structure redoublée « diga lo que diga » est la traduction idiomatique de « quoi qu\'il dise ».' },
  { t:'trad', lvl:4, tag:'tiempos', fr:'Je ne savais pas qu\'il était parti.', a:['No sabía que se había ido.'],
    must:['no sabia','(se habia ido|se habia marchado|habia salido|se hubiera ido)'], e:'Verbe de connaissance à la forme négative mais au PASSÉ → indicatif (no sabía que + indicatif), et antériorité → plus-que-parfait.' },
  { t:'trad', lvl:4, tag:'modo', fr:'Dès qu\'il aura répondu, je te préviens.', a:['En cuanto conteste, te aviso.','En cuanto haya contestado, te aviso.'],
    must:['(en cuanto|tan pronto como|nada mas|cuando)','(contest|respond)','(te aviso|te lo digo|te digo|te llamo)'], e:'Pas de futur après en cuanto : subjonctif. Et la principale peut rester au présent (te aviso).' },
  { t:'trad', lvl:5, tag:'modo', fr:'Si tu me l\'avais dit, je serais venu.', a:['Si me lo hubieras dicho, habría venido.'],
    must:['(hubieras|hubieses|hubiera)','(habria|hubiera|hubiese) (venido|ido)'], e:'Irréel du passé : si + subjonctif plus-que-parfait → conditionnel composé.' },
  { t:'trad', lvl:5, tag:'modo', fr:'Il est parti sans que personne s\'en aperçoive.', a:['Se fue sin que nadie se diera cuenta.'],
    must:['sin que nadie','(se diera cuenta|se diese cuenta|se enterara|se enterase|se percatara|lo notara|se diera)'], e:'sin que + subjonctif, concordance au passé.' },
  { t:'trad', lvl:5, tag:'relativos', fr:'C\'est le livre dont je t\'avais parlé.', a:['Es el libro del que te había hablado.'],
    must:['(del que|del cual|de que)','(te habia hablado|te hable|hable)'], e:'hablar DE algo → relatif prépositionnel del que. Le français « dont » cache la préposition : c\'est le piège.' },
  { t:'trad', lvl:5, tag:'conectores', fr:'Plus il insiste, moins j\'ai envie d\'accepter.', a:['Cuanto más insiste, menos ganas tengo de aceptar.'],
    must:['cuanto mas insist','menos'], e:'cuanto más… menos… Le « plus… moins… » français se rend par cuanto, pas par más… menos… seuls.' },
  { t:'trad', lvl:4, tag:'pron', fr:'On m\'a volé mon portefeuille dans le métro.', a:['Me robaron la cartera en el metro.'],
    must:['me (robaron|han robado|robo|ha robado)','(cartera|billetera|monedero)'], e:'« On » indéfini → 3ᵉ personne du pluriel, et le possessif français devient un article : me robaron LA cartera.' },
  { t:'trad', lvl:5, tag:'idiom', fr:'Il aurait mieux valu ne rien dire.', a:['Habría sido mejor no decir nada.','Más habría valido callarse.'],
    must:['(habria sido mejor|mejor habria sido|mas habria valido|mas valia|habria valido mas|hubiera sido mejor|mejor hubiera sido)','(no decir nada|no haber dicho nada|callarse|no abrir la boca)'], e:'Tournure impersonnelle au conditionnel passé. C\'est l\'une des plus difficiles à produire à chaud.' }
];
