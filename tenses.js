/* ============================================================
   CUMBRE — Les temps : référence de conjugaison (module)
   Chaque temps : quand l'utiliser, formation, verbes modèles,
   irréguliers clés, exemples complets traduits.
   Légende des formes : yo · tú · él/ella · nosotros · vosotros · ellos
   ============================================================ */
window.TENSES = [
  {
    id: 'subjpres', name: 'Presente de subjuntivo', tag: 'B1 · subjonctif présent',
    when: "Après un verbe de <b>volonté, souhait, émotion, doute</b> ou une tournure impersonnelle (<i>es necesario que…</i>), quand le sujet change. Aussi après <b>cuando, para que, aunque, ojalá</b> pour un fait non encore réalisé.",
    formation: "On part du radical de la 1<sup>re</sup> personne du présent (<b>yo</b>) sans le <b>-o</b>, puis terminaisons <b>inversées</b> : <b>-ar → e</b>, <b>-er/-ir → a</b>.",
    models: [
      ['hablar', 'hable · hables · hable · hablemos · habléis · hablen'],
      ['comer', 'coma · comas · coma · comamos · comáis · coman'],
      ['vivir', 'viva · vivas · viva · vivamos · viváis · vivan'],
    ],
    irregulars: "tener → <b>tenga</b> · hacer → <b>haga</b> · poner → <b>ponga</b> · salir → <b>salga</b> · decir → <b>diga</b> · venir → <b>venga</b> · ser → <b>sea</b> · ir → <b>vaya</b> · haber → <b>haya</b> · saber → <b>sepa</b> · estar → <b>esté</b> · dar → <b>dé</b> · ver → <b>vea</b>",
    examples: [
      ['Quiero que vengas conmigo.', 'Je veux que tu viennes avec moi.'],
      ['Es importante que estudies más.', 'Il est important que tu étudies plus.'],
      ['No creo que sea verdad.', 'Je ne crois pas que ce soit vrai.'],
      ['Cuando llegues, llámame.', 'Quand tu arriveras, appelle-moi.'],
      ['Te lo digo para que lo sepas.', 'Je te le dis pour que tu le saches.'],
    ],
  },
  {
    id: 'subjimp', name: 'Imperfecto de subjuntivo', tag: 'B2 · subjonctif imparfait',
    when: "Concordance des temps : verbe principal au <b>passé</b> ou au <b>conditionnel</b> → subjonctif imparfait. Et surtout l'<b>hypothèse irréelle</b> : <i>Si + subj. imparfait → conditionnel</i>. Aussi après <b>como si</b>.",
    formation: "On part de la 3<sup>e</sup> pers. du pluriel de l'<b>indefinido</b> (ellos) sans <b>-ron</b>, + <b>-ra, -ras, -ra, -´ramos, -rais, -ran</b> (variante <b>-se</b> équivalente).",
    models: [
      ['hablar', 'hablara · hablaras · hablara · habláramos · hablarais · hablaran'],
      ['comer', 'comiera · comieras · comiera · comiéramos · comierais · comieran'],
      ['vivir', 'viviera · vivieras · viviera · viviéramos · vivierais · vivieran'],
    ],
    irregulars: "Ils suivent l'indefinido : tener (tuvieron) → <b>tuviera</b> · hacer (hicieron) → <b>hiciera</b> · poder (pudieron) → <b>pudiera</b> · ser/ir (fueron) → <b>fuera</b> · estar (estuvieron) → <b>estuviera</b> · decir (dijeron) → <b>dijera</b> · haber (hubieron) → <b>hubiera</b>",
    examples: [
      ['Si tuviera dinero, viajaría por el mundo.', "Si j'avais de l'argent, je voyagerais dans le monde."],
      ['Quería que vinieras a la fiesta.', 'Je voulais que tu viennes à la fête.'],
      ['Habla como si lo supiera todo.', "Il parle comme s'il savait tout."],
      ['Me pidió que fuera puntual.', "Il m'a demandé d'être ponctuel."],
    ],
  },
  {
    id: 'imperativo', name: 'Imperativo', tag: 'B1 · impératif',
    when: "Donner un <b>ordre</b>, une consigne, un conseil. Attention : le <b>négatif</b> et le vouvoiement (usted/ustedes) passent au <b>subjonctif présent</b>.",
    formation: "Affirmatif <b>tú</b> = 3<sup>e</sup> pers. du présent. <b>Négatif</b> et <b>usted/ustedes</b> = subjonctif présent. <b>vosotros</b> affirmatif = infinitif, <b>-r → -d</b>.",
    extra:
      "<div class=\"th\">📋 Paradigme (hablar · comer · vivir)</div>" +
      "<div class=\"cv\"><b>tú (+)</b><span>habla · come · vive</span></div>" +
      "<div class=\"cv\"><b>tú (−)</b><span>no hables · no comas · no vivas</span></div>" +
      "<div class=\"cv\"><b>usted</b><span>hable · coma · viva</span></div>" +
      "<div class=\"cv\"><b>vosotros (+)</b><span>hablad · comed · vivid</span></div>" +
      "<div class=\"cv\"><b>vosotros (−)</b><span>no habléis · no comáis · no viváis</span></div>" +
      "<div class=\"cv\"><b>ustedes</b><span>hablen · coman · vivan</span></div>",
    irregulars: "<b>tú</b> affirmatif irréguliers : tener → <b>ten</b> · venir → <b>ven</b> · poner → <b>pon</b> · hacer → <b>haz</b> · decir → <b>di</b> · salir → <b>sal</b> · ser → <b>sé</b> · ir → <b>ve</b>. Les pronoms se collent à l'affirmatif (<i>dímelo</i>) et se placent avant au négatif (<i>no me lo digas</i>).",
    examples: [
      ['¡Habla más despacio, por favor!', "Parle plus lentement, s'il te plaît !"],
      ['No hables tan rápido.', 'Ne parle pas si vite.'],
      ['Póngase el cinturón.', 'Mettez votre ceinture.'],
      ['Dímelo todo.', 'Dis-moi tout.'],
    ],
  },
  {
    id: 'condicional', name: 'Condicional simple', tag: 'B1 · conditionnel',
    when: "<b>Politesse</b> (Me gustaría…), <b>hypothèse</b> (si + subj. imparfait → conditionnel), <b>conseil</b> (Yo que tú…), et le « <b>futur du passé</b> » (Dijo que vendría).",
    formation: "<b>Infinitif entier</b> + <b>-ía, -ías, -ía, -íamos, -íais, -ían</b>. Mêmes radicaux irréguliers que le futur.",
    models: [
      ['hablar', 'hablaría · hablarías · hablaría · hablaríamos · hablaríais · hablarían'],
      ['comer', 'comería · comerías · comería · comeríamos · comeríais · comerían'],
      ['vivir', 'viviría · vivirías · viviría · viviríamos · viviríais · vivirían'],
    ],
    irregulars: "Radical modifié (comme au futur) : tener → <b>tendría</b> · hacer → <b>haría</b> · poder → <b>podría</b> · poner → <b>pondría</b> · salir → <b>saldría</b> · venir → <b>vendría</b> · decir → <b>diría</b> · querer → <b>querría</b> · saber → <b>sabría</b> · haber → <b>habría</b>",
    examples: [
      ['Me gustaría un café, por favor.', 'Je voudrais un café, sil vous plaît.'],
      ['Yo que tú, no iría.', "À ta place, je n'irais pas."],
      ['¿Podrías ayudarme?', 'Pourrais-tu m’aider ?'],
      ['Dijo que llegaría tarde.', "Il a dit qu'il arriverait en retard."],
    ],
  },
  {
    id: 'futuro', name: 'Futuro simple', tag: 'B1 · futur',
    when: "Actions <b>futures</b>. Aussi la <b>probabilité au présent</b> : « Serán las tres » = il doit être trois heures.",
    formation: "<b>Infinitif entier</b> + <b>-é, -ás, -á, -emos, -éis, -án</b>.",
    models: [
      ['hablar', 'hablaré · hablarás · hablará · hablaremos · hablaréis · hablarán'],
      ['comer', 'comeré · comerás · comerá · comeremos · comeréis · comerán'],
      ['vivir', 'viviré · vivirás · vivirá · viviremos · viviréis · vivirán'],
    ],
    irregulars: "tener → <b>tendré</b> · hacer → <b>haré</b> · poder → <b>podré</b> · poner → <b>pondré</b> · salir → <b>saldré</b> · venir → <b>vendré</b> · decir → <b>diré</b> · querer → <b>querré</b> · saber → <b>sabré</b> · haber → <b>habré</b>",
    examples: [
      ['Mañana iré al médico.', "Demain j'irai chez le médecin."],
      ['¿Dónde estará ahora?', 'Où peut-il bien être maintenant ?'],
      ['Te lo diré cuando lo sepa.', 'Je te le dirai quand je le saurai.'],
    ],
  },
  {
    id: 'pasados', name: 'Indefinido vs Imperfecto', tag: 'A2-B1 · les deux passés',
    when: "<b>Indefinido</b> = action ponctuelle, achevée, qui fait avancer le récit (<i>ayer, el lunes, de repente</i>). <b>Imperfecto</b> = décor, habitude, description, action en cours (<i>antes, siempre, mientras</i>).",
    formation: "Indefinido : <b>-é/-aste/-ó/-amos/-asteis/-aron</b> (-ar), <b>-í/-iste/-ió/-imos/-isteis/-ieron</b> (-er/-ir). Imperfecto : <b>-aba…</b> (-ar), <b>-ía…</b> (-er/-ir), presque sans exception.",
    extra:
      "<div class=\"th\">📋 Indefinido</div>" +
      "<div class=\"cv\"><b>hablar</b><span>hablé · hablaste · habló · hablamos · hablasteis · hablaron</span></div>" +
      "<div class=\"cv\"><b>comer</b><span>comí · comiste · comió · comimos · comisteis · comieron</span></div>" +
      "<div class=\"cv\"><b>vivir</b><span>viví · viviste · vivió · vivimos · vivisteis · vivieron</span></div>" +
      "<div class=\"th\" style=\"margin-top:14px\">📋 Imperfecto</div>" +
      "<div class=\"cv\"><b>hablar</b><span>hablaba · hablabas · hablaba · hablábamos · hablabais · hablaban</span></div>" +
      "<div class=\"cv\"><b>comer</b><span>comía · comías · comía · comíamos · comíais · comían</span></div>" +
      "<div class=\"cv\"><b>vivir</b><span>vivía · vivías · vivía · vivíamos · vivíais · vivían</span></div>",
    irregulars: "Indefinido très irréguliers : ser/ir → <b>fui, fuiste, fue…</b> · tener → <b>tuve</b> · hacer → <b>hice / hizo</b> · estar → <b>estuve</b> · poder → <b>pude</b> · decir → <b>dije</b> · venir → <b>vine</b>. Imperfecto : seulement 3 irréguliers — ser → <b>era</b> · ir → <b>iba</b> · ver → <b>veía</b>.",
    examples: [
      ['Cuando era niño, vivía en Madrid.', "Quand j'étais enfant, je vivais à Madrid. (décor)"],
      ['Ayer fui al cine y vi una película.', 'Hier je suis allé au cinéma et jai vu un film. (faits)'],
      ['Mientras cocinaba, sonó el teléfono.', 'Pendant que je cuisinais, le téléphone a sonné. (les deux)'],
    ],
  },
  {
    id: 'perfecto', name: 'Pretérito perfecto', tag: 'A2-B1 · passé composé',
    when: "Passé <b>lié au présent</b> ou à une période non close : <i>hoy, esta semana, este año, ya, todavía no, alguna vez</i>.",
    formation: "Présent de <b>haber</b> + <b>participe passé</b> (-ado pour -ar, -ido pour -er/-ir).",
    models: [
      ['haber', 'he · has · ha · hemos · habéis · han'],
      ['+ participe', 'hablado · comido · vivido'],
    ],
    irregulars: "Participes irréguliers : hacer → <b>hecho</b> · decir → <b>dicho</b> · ver → <b>visto</b> · escribir → <b>escrito</b> · poner → <b>puesto</b> · volver → <b>vuelto</b> · abrir → <b>abierto</b> · romper → <b>roto</b> · morir → <b>muerto</b> · cubrir → <b>cubierto</b>",
    examples: [
      ['Hoy he comido paella.', "Aujourd'hui j'ai mangé de la paella."],
      ['¿Ya has terminado los deberes?', 'Tu as déjà fini tes devoirs ?'],
      ['Nunca he estado en Perú.', 'Je ne suis jamais allé au Pérou.'],
    ],
  },
  {
    id: 'plusc', name: 'Pluscuamperfecto', tag: 'B1-B2 · plus-que-parfait',
    when: "Un passé <b>antérieur</b> à un autre passé : « quand X est arrivé, Y avait déjà eu lieu ».",
    formation: "Imparfait de <b>haber</b> (había, habías…) + <b>participe passé</b>.",
    models: [
      ['haber', 'había · habías · había · habíamos · habíais · habían'],
      ['+ participe', 'hablado · comido · vivido'],
    ],
    irregulars: "Mêmes participes irréguliers que le perfecto (hecho, dicho, visto, escrito, puesto, vuelto, abierto…).",
    examples: [
      ['Cuando llegué, ya se había ido.', 'Quand je suis arrivé, il était déjà parti.'],
      ['No sabía que habías vuelto.', 'Je ne savais pas que tu étais revenu.'],
    ],
  },
  {
    id: 'subjcomp', name: 'Hypothèse irréelle du passé', tag: 'C1 · si + hubiera',
    when: "Le <b>regret</b> et l'hypothèse dans le passé : « Si j'avais su… ». La structure reine du C1.",
    formation: "<b>Si + hubiera/hubiese + participe</b> (plus-que-parfait du subjonctif) → <b>habría + participe</b> (conditionnel composé).",
    models: [
      ['hubiera', 'hubiera · hubieras · hubiera · hubiéramos · hubierais · hubieran'],
      ['habría', 'habría · habrías · habría · habríamos · habríais · habrían'],
    ],
    irregulars: "Le participe suit les mêmes irréguliers (sabido, hecho, visto, vuelto…). Variante littéraire : <i>hubiese</i> = <i>hubiera</i>.",
    examples: [
      ['Si hubiera sabido, habría venido.', "Si j'avais su, je serais venu."],
      ['Si hubieras estudiado, habrías aprobado.', 'Si tu avais étudié, tu aurais réussi.'],
      ['Ojalá hubiera llamado antes.', "Si seulement j'avais appelé plus tôt."],
    ],
  },
];
