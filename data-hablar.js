/* ============================================================
   CUMBRE — HABLAR : production orale (parler d'un sujet)
   Format type DELE : une consigne, un plan (guion), des questions
   pour nourrir les idées, du lexique, une boîte à outils de
   connecteurs, et un modèle parlé pour se comparer.
   { id, level, type, theme, sec (objectif en s), prompt, guion:[],
     preguntas:[], lexico:[[es,fr]], modelo }
   Charger AVANT app.js.
   ============================================================ */

/* Boîte à outils : les formules qui donnent de la fluidité et de la structure */
window.HABLAR_KIT = [
  { fn:"Dar tu opinión", items:["En mi opinión…", "Desde mi punto de vista…", "Me parece que…", "Estoy convencido/a de que…", "Yo diría que…"] },
  { fn:"Argumentar / ejemplos", items:["Por ejemplo…", "Un buen ejemplo es…", "De hecho…", "Esto se debe a que…", "Gracias a…"] },
  { fn:"Contrastar / matizar", items:["Sin embargo…", "Por un lado… por otro lado…", "Aunque…", "A pesar de…", "En cambio…"] },
  { fn:"Ganar tiempo (fluidez)", items:["Bueno…", "A ver…", "Es decir…", "Lo que quiero decir es que…", "¿Cómo lo diría?"] },
  { fn:"Estructurar", items:["Para empezar…", "En primer lugar…", "Además…", "Por último…"] },
  { fn:"Concluir", items:["En resumen…", "En conclusión…", "Para terminar…", "Así que…"] },
];

window.HABLAR = [
  {
    id:"rutina", level:"A2", type:"Monólogo", theme:"Vida diaria", sec:60,
    prompt:"Describe un día normal de tu vida: qué haces por la mañana, por la tarde y por la noche.",
    guion:["Por la mañana (levantarse, desayunar…)","Durante el día (trabajo/estudios)","Por la tarde y la noche","Lo que más y lo que menos te gusta de tu rutina"],
    preguntas:["¿A qué hora te levantas?","¿Qué desayunas normalmente?","¿Cómo vas al trabajo o a clase?","¿Qué haces para desconectar?"],
    lexico:[["madrugar","se lever tôt"],["desayunar","prendre le petit-déjeuner"],["el rato libre","le temps libre"],["soler + inf.","avoir l'habitude de"],["desconectar","déconnecter / se détendre"]],
    modelo:"Normalmente me levanto sobre las siete y media. Primero desayuno un café con tostadas y luego voy al trabajo en metro. Por la mañana suelo estar muy concentrado, así que aprovecho para hacer lo más difícil. Al mediodía como con mis compañeros y charlamos un rato. Por la tarde, cuando salgo, me gusta pasear o hacer un poco de deporte para desconectar. Por la noche ceno pronto y leo antes de dormir. Lo que más me gusta de mi rutina es la calma de la mañana; lo que menos, madrugar."
  },
  {
    id:"ciudad", level:"B1", type:"Describir", theme:"Lugar", sec:90,
    prompt:"Habla de tu ciudad o tu barrio: cómo es, qué se puede hacer y qué cambiarías.",
    guion:["Cómo es (tamaño, ambiente)","Qué hay para hacer (ocio, cultura)","Lo bueno y lo malo","Qué te gustaría cambiar"],
    preguntas:["¿Es una ciudad grande o pequeña?","¿Qué se puede hacer un fin de semana?","¿Qué es lo que más te gusta?","¿Qué falta o qué mejorarías?"],
    lexico:[["el barrio","le quartier"],["el ambiente","l'ambiance"],["el ocio","les loisirs"],["los transportes","les transports"],["a las afueras","en périphérie"]],
    modelo:"Vivo en un barrio bastante tranquilo, a las afueras de una ciudad mediana. Lo que más me gusta es el ambiente: la gente es cercana y hay muchas terrazas para tomar algo. Se puede hacer de todo: hay cines, parques y un mercado los domingos. Por un lado, es cómodo porque todo está cerca; por otro lado, los transportes por la noche no son muy buenos. Si pudiera cambiar algo, pondría más carriles bici y más zonas verdes. En resumen, es un buen sitio para vivir, aunque siempre se puede mejorar."
  },
  {
    id:"tiempolibre", level:"A2", type:"Monólogo", theme:"Ocio", sec:60,
    prompt:"¿Qué te gusta hacer en tu tiempo libre? Habla de tus aficiones.",
    guion:["Tus aficiones principales","Con quién y cuándo","Por qué te gustan","Algo que te gustaría probar"],
    preguntas:["¿Qué haces los fines de semana?","¿Prefieres actividades solo o con amigos?","¿Desde cuándo lo haces?","¿Hay algo nuevo que quieras aprender?"],
    lexico:[["la afición","le hobby / la passion"],["quedar con","retrouver (des amis)"],["me apasiona","je suis passionné par"],["entrenar","s'entraîner"],["probar","essayer"]],
    modelo:"En mi tiempo libre me gusta sobre todo el deporte. Suelo entrenar tres veces por semana y, los fines de semana, quedo con amigos para jugar al fútbol. Me apasiona porque me ayuda a desconectar y a conocer gente. También me gusta cocinar: es una forma de relajarme. De hecho, últimamente veo muchos vídeos de recetas. Algo que me gustaría probar es la escalada, aunque me da un poco de miedo la altura."
  },
  {
    id:"ciudadcampo", level:"B1", type:"Opinión", theme:"Sociedad", sec:90,
    prompt:"¿Es mejor vivir en la ciudad o en el campo? Da tu opinión con argumentos.",
    guion:["Tu postura desde el principio","Ventajas de tu opción","Inconvenientes de la otra","Un matiz o conclusión equilibrada"],
    preguntas:["¿Qué es lo más importante para ti: el trabajo, la calma, la familia?","¿Qué se pierde viviendo en la ciudad?","¿Y en el campo?","¿Existe una solución intermedia?"],
    lexico:[["el ritmo de vida","le rythme de vie"],["la contaminación","la pollution"],["asequible","abordable"],["el aislamiento","l'isolement"],["la calidad de vida","la qualité de vie"]],
    modelo:"En mi opinión, depende mucho del momento de la vida, pero yo me quedo con la ciudad. Por un lado, ofrece más oportunidades de trabajo y una vida cultural muy rica. Por ejemplo, puedes ir al cine, a conciertos o a exposiciones sin tener que conducir una hora. Sin embargo, reconozco que el campo tiene ventajas claras: menos contaminación, más calma y una vivienda más asequible. A pesar de eso, a mí el aislamiento me pesaría. Así que, para terminar, diría que lo ideal sería vivir cerca de la ciudad, pero con naturaleza al lado."
  },
  {
    id:"redes", level:"B2", type:"Opinión", theme:"Tecnología", sec:120,
    prompt:"Las redes sociales: ¿son sobre todo una ventaja o un problema para la sociedad? Argumenta tu postura.",
    guion:["Presenta el tema y tu postura","Un argumento a favor (con ejemplo)","Un argumento en contra","Matiza y concluye"],
    preguntas:["¿Cómo han cambiado la forma de comunicarnos?","¿Qué efectos tienen en la atención o en la salud mental?","¿Quién se beneficia realmente?","¿Cómo se podría usarlas mejor?"],
    lexico:[["el bienestar","le bien-être"],["la desinformación","la désinformation"],["adictivo","addictif"],["la huella digital","l'empreinte numérique"],["a fin de cuentas","au bout du compte"]],
    modelo:"Las redes sociales son, sin duda, una de las grandes transformaciones de nuestra época, y creo que son un arma de doble filo. Por un lado, nos permiten mantener el contacto con gente lejana y acceder a información al instante; de hecho, muchos movimientos sociales no existirían sin ellas. Sin embargo, también tienen un lado oscuro: están diseñadas para ser adictivas y favorecen la desinformación. Un buen ejemplo es la rapidez con la que se difunde una noticia falsa. A fin de cuentas, no creo que el problema sea la herramienta en sí, sino el uso que hacemos de ella. En conclusión, deberíamos aprender a usarlas con más conciencia y menos automatismo."
  },
  {
    id:"antesahora", level:"B2", type:"Comparar", theme:"Sociedad", sec:120,
    prompt:"Compara cómo era la vida hace treinta años y cómo es ahora. ¿Hemos ganado o perdido?",
    guion:["Elige 2 o 3 ámbitos (comunicación, trabajo, ocio…)","Cómo era antes","Cómo es ahora","Balance: qué hemos ganado y qué hemos perdido"],
    preguntas:["¿Cómo nos comunicábamos antes?","¿Cómo ha cambiado el trabajo?","¿Somos más felices ahora?","¿Qué echas de menos de aquella época?"],
    lexico:[["antaño","autrefois"],["hoy en día","de nos jours"],["el vínculo","le lien"],["la inmediatez","l'immédiateté"],["echar de menos","regretter / manquer"]],
    modelo:"La vida ha cambiado enormemente en las últimas décadas, sobre todo en la forma de comunicarnos. Antaño, para hablar con alguien lejano había que escribir una carta o llamar por teléfono fijo; hoy en día tenemos a todo el mundo en el bolsillo. En el trabajo pasa algo parecido: antes se separaba claramente la oficina y la casa, mientras que ahora esa frontera casi ha desaparecido. Sin duda hemos ganado en comodidad y en inmediatez. Sin embargo, creo que también hemos perdido algo importante: la paciencia y ciertos vínculos más profundos. Personalmente, echo de menos el aburrimiento de antes, porque de ahí salían muchas ideas."
  },
  {
    id:"teletrabajo", level:"C1", type:"Opinión", theme:"Trabajo", sec:150,
    prompt:"¿El teletrabajo ha cambiado nuestra vida para mejor? Desarrolla una postura matizada.",
    guion:["Contextualiza (por qué es un tema actual)","Beneficios reales, con ejemplo","Costes o riesgos menos visibles","Conclusión matizada, no categórica"],
    preguntas:["¿Cómo afecta al equilibrio entre vida y trabajo?","¿Quién sale ganando y quién perdiendo?","¿Qué pasa con la relación entre compañeros?","¿Debería regularse de algún modo?"],
    lexico:[["la conciliación","l'équilibre vie pro/perso"],["desdibujarse","s'estomper / se brouiller"],["la productividad","la productivité"],["el desplazamiento","le trajet / déplacement"],["cabe señalar que","il convient de noter que"]],
    modelo:"El teletrabajo ha pasado de ser una excepción a formar parte de lo cotidiano, así que merece una reflexión seria. A primera vista, sus ventajas son evidentes: ahorramos horas de desplazamiento y ganamos flexibilidad, lo cual, en principio, mejora la conciliación. De hecho, mucha gente afirma ser más productiva en casa. Ahora bien, cabe señalar que también entraña riesgos menos visibles: la frontera entre la vida personal y la laboral tiende a desdibujarse, y el sentimiento de pertenencia a un equipo puede debilitarse. Por lo tanto, no lo plantearía en términos de bueno o malo, sino de equilibrio. En mi opinión, el modelo híbrido, bien regulado, es probablemente el que mejor combina libertad y cohesión."
  },
  {
    id:"ia", level:"C1", type:"Opinión", theme:"Tecnología", sec:150,
    prompt:"La inteligencia artificial avanza muy deprisa. ¿Deberíamos preocuparnos o entusiasmarnos? Argumenta.",
    guion:["Plantea la tensión (esperanza vs miedo)","Oportunidades concretas","Riesgos concretos","Tu posición y qué habría que hacer"],
    preguntas:["¿En qué ámbitos puede ayudar más?","¿Qué empleos o hábitos pone en cuestión?","¿Quién debería poner los límites?","¿De qué depende que sea positiva?"],
    lexico:[["el avance","l'avancée / le progrès"],["prescindir de","se passer de"],["el sesgo","le biais"],["fiscalizar","contrôler / superviser"],["a mi juicio","à mon avis"]],
    modelo:"La inteligencia artificial despierta al mismo tiempo enormes esperanzas y miedos legítimos, y creo que ambos están justificados. Por un lado, sus oportunidades son inmensas: puede acelerar la investigación médica o dar acceso al conocimiento a quien antes no lo tenía. Sin embargo, no conviene ser ingenuo. Existen riesgos serios, como los sesgos de los datos o la concentración de poder en unas pocas empresas. A mi juicio, el problema no es la tecnología en sí, sino la falta de reglas claras. Por eso, más que prohibir o idolatrar, deberíamos aprender a fiscalizarla y a decidir colectivamente para qué la queremos. En definitiva, soy prudentemente optimista: dependerá de nosotros."
  }
];
