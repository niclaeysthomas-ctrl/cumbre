/* ============================================================
   CUMBRE — Module « Traduire » : version FR → ES
   t = { fr, en, alt:[...], cat, point, note, level }
   (« en » = la traduction espagnole modèle, pour réutiliser le moteur)
   ============================================================ */
window.TRANSLATIONS = [

  /* --- Ser / Estar --- */
  { fr:"Ma sœur est médecin à Barcelone.", en:"Mi hermana es médica en Barcelona.", alt:["Mi hermana trabaja de médica en Barcelona."], cat:"Ser/Estar", point:"ser (profession)", note:"Profession → ser : « es médica ». Attention : « médica » s'accorde au féminin.", level:"A2" },
  { fr:"Je suis très fatigué aujourd'hui.", en:"Hoy estoy muy cansado.", alt:["Estoy muy cansado hoy."], cat:"Ser/Estar", point:"estar (état passager)", note:"État passager → estar : « estoy cansado ». Jamais « soy cansado ».", level:"A2" },
  { fr:"La banque est fermée le dimanche.", en:"El banco está cerrado los domingos.", alt:["Los domingos el banco está cerrado."], cat:"Ser/Estar", point:"estar + participe (état)", note:"« estar cerrado » = état résultant. « los domingos » = tous les dimanches.", level:"B1" },

  /* --- Gustar & pronoms --- */
  { fr:"J'aime beaucoup voyager en train.", en:"Me gusta mucho viajar en tren.", alt:["Me encanta viajar en tren."], cat:"Gustar & pronoms", point:"gustar + infinitif", note:"« me gusta + infinitif » (sujet = l'action). « encantar » = adorer, encore plus fort.", level:"A2" },
  { fr:"À mes parents, la maison plaît beaucoup.", en:"A mis padres les gusta mucho la casa.", alt:["La casa les gusta mucho a mis padres."], cat:"Gustar & pronoms", point:"gustar + « les » redondant", note:"« A mis padres » exige le pronom « les » ; le verbe s'accorde à « la casa » (sing.) → gusta.", level:"B1" },
  { fr:"Le livre ? Je te le donne demain.", en:"¿El libro? Te lo doy mañana.", alt:["Te lo doy mañana, el libro."], cat:"Gustar & pronoms", point:"pronoms COI + COD", note:"Ordre COI + COD avant le verbe : « te lo doy ». « te » (à toi) + « lo » (le livre).", level:"B1" },

  /* --- Le passé --- */
  { fr:"Hier, j'ai mangé dans un très bon restaurant.", en:"Ayer comí en un restaurante muy bueno.", alt:["Ayer comí en un restaurante buenísimo."], cat:"Passé", point:"pretérito indefinido", note:"Action ponctuelle datée (« ayer ») → indefinido : « comí ».", level:"B1" },
  { fr:"Quand j'étais petit, je jouais au foot tous les jours.", en:"Cuando era pequeño, jugaba al fútbol todos los días.", alt:["De pequeño, jugaba al fútbol cada día."], cat:"Passé", point:"imperfecto (habitude)", note:"Description + habitude → imperfecto : « era », « jugaba ». « jugar A + sport ».", level:"B1" },
  { fr:"Il faisait froid quand nous sommes sortis.", en:"Hacía frío cuando salimos.", alt:["Cuando salimos, hacía frío."], cat:"Passé", point:"imperfecto (cadre) + indefinido", note:"Cadre → imperfecto « hacía » ; action ponctuelle → indefinido « salimos ».", level:"B1" },

  /* --- Por / Para --- */
  { fr:"J'étudie l'espagnol pour travailler en Amérique latine.", en:"Estudio español para trabajar en América Latina.", alt:[], cat:"Por/Para", point:"para (but)", note:"But → para + infinitif : « para trabajar ».", level:"B1" },
  { fr:"Merci pour ton aide, elle m'a été très utile.", en:"Gracias por tu ayuda, me ha sido muy útil.", alt:["Gracias por tu ayuda, me fue muy útil."], cat:"Por/Para", point:"por (cause/motif)", note:"Motif → por : « gracias por ». « me ha sido útil » = elle m'a été utile.", level:"B1" },
  { fr:"Nous devons finir le projet pour vendredi.", en:"Tenemos que terminar el proyecto para el viernes.", alt:["Hay que terminar el proyecto para el viernes."], cat:"Por/Para", point:"para (échéance)", note:"Échéance → para : « para el viernes ». « tener que + inf. » = devoir.", level:"B1" },

  /* --- Futur / Conditionnel --- */
  { fr:"Demain je saurai le résultat de l'examen.", en:"Mañana sabré el resultado del examen.", alt:[], cat:"Futur/Conditionnel", point:"futur irrégulier (saber)", note:"Futur irrégulier : saber → « sabré ». Radical spécial + terminaisons du futur.", level:"B1" },
  { fr:"Pourrais-tu m'aider, s'il te plaît ?", en:"¿Podrías ayudarme, por favor?", alt:["¿Me podrías ayudar, por favor?"], cat:"Futur/Conditionnel", point:"conditionnel de politesse", note:"Politesse → conditionnel : « podrías ». Pronom collé : « ayudarme ».", level:"B1" },
  { fr:"Il a dit qu'il viendrait à la fête.", en:"Dijo que vendría a la fiesta.", alt:[], cat:"Futur/Conditionnel", point:"conditionnel (discours indirect)", note:"Futur dans le passé → conditionnel : « vendría ». (venir → vendr-).", level:"B1" },

  /* --- Subjonctif --- */
  { fr:"Je veux que tu viennes avec moi.", en:"Quiero que vengas conmigo.", alt:[], cat:"Subjonctif", point:"souhait + subjonctif", note:"« querer que » + subjonctif : « vengas ». « conmigo » = avec moi.", level:"B1" },
  { fr:"Il est important que vous étudiiez tous les jours.", en:"Es importante que estudiéis todos los días.", alt:["Es importante que estudies cada día."], cat:"Subjonctif", point:"impersonnel + subjonctif", note:"« Es importante que » + subjonctif : « estudiéis » (vosotros).", level:"B1" },
  { fr:"J'espère qu'il fera beau demain.", en:"Espero que haga buen tiempo mañana.", alt:["Ojalá haga buen tiempo mañana."], cat:"Subjonctif", point:"espérance + subjonctif", note:"« Espero que » + subjonctif : « haga ». « Ojalá + subj. » = pourvu que.", level:"B1" },
  { fr:"Je ne pense pas qu'il ait raison.", en:"No pienso que tenga razón.", alt:["No creo que tenga razón."], cat:"Subjonctif", point:"négation d'opinion + subjonctif", note:"Négation d'opinion → subjonctif : « tenga ». « tener razón » = avoir raison.", level:"B2" },
  { fr:"Je te l'explique pour que tu comprennes.", en:"Te lo explico para que entiendas.", alt:[], cat:"Subjonctif", point:"« para que » + subjonctif", note:"« para que » impose le subjonctif : « entiendas ».", level:"B2" },
  { fr:"Appelle-moi dès que tu arriveras.", en:"Llámame en cuanto llegues.", alt:["Llámame cuando llegues."], cat:"Subjonctif", point:"temporel (futur) + subjonctif", note:"Après « en cuanto / cuando » avec valeur de futur → subjonctif : « llegues ».", level:"B2" },

  /* --- Hypothèse (C1) --- */
  { fr:"Si j'avais plus de temps, j'apprendrais l'italien.", en:"Si tuviera más tiempo, aprendería italiano.", alt:["Si tuviese más tiempo, aprendería italiano."], cat:"Hypothèse C1", point:"si + subj. imparfait + conditionnel", note:"Hypothèse irréelle : « Si tuviera..., aprendería ». Variante « tuviese » aussi correcte.", level:"C1" },
  { fr:"Si j'avais su, je ne serais pas venu.", en:"Si lo hubiera sabido, no habría venido.", alt:["De haberlo sabido, no habría venido."], cat:"Hypothèse C1", point:"irréel du passé", note:"« Si hubiera + participe, habría + participe ». Tournure soutenue : « De haberlo sabido... ».", level:"C1" },
  { fr:"Il parle comme s'il savait tout.", en:"Habla como si lo supiera todo.", alt:[], cat:"Hypothèse C1", point:"« como si » + subj. imparfait", note:"« como si » exige toujours le subjonctif imparfait : « supiera ».", level:"C1" },

  /* --- Impératif & quotidien --- */
  { fr:"Assieds-toi et dis-moi tout.", en:"Siéntate y cuéntamelo todo.", alt:["Siéntate y dímelo todo."], cat:"Impératif", point:"impératif + pronoms collés", note:"Impératif affirmatif + pronoms collés : « siéntate », « cuéntamelo » (cuenta + me + lo).", level:"B1" },
  { fr:"Ne t'inquiète pas, tout ira bien.", en:"No te preocupes, todo saldrá bien.", alt:["No te preocupes, todo irá bien."], cat:"Impératif", point:"impératif négatif (subjonctif)", note:"Impératif négatif → subjonctif : « no te preocupes ». « salir bien » = bien se passer.", level:"B1" },
  { fr:"Il vient d'arriver, il est très fatigué.", en:"Acaba de llegar, está muy cansado.", alt:[], cat:"Expressions", point:"« acabar de » + infinitif", note:"« acabar de + inf. » = venir de (faire) : « acaba de llegar ».", level:"A2" },
  { fr:"Nous nous connaissons depuis deux ans.", en:"Nos conocemos desde hace dos años.", alt:["Hace dos años que nos conocemos."], cat:"Expressions", point:"« desde hace » (durée)", note:"« desde hace + durée » = depuis. Autre tournure : « Hace dos años que... ».", level:"B1" }

];
