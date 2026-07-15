/* ============================================================
   CUMBRE — ESPAGNOL SOUTENU : du neutre vers le formel (ES → ES)
   r = { plain, elevated, alt:[...], cat, note, level }
   ============================================================ */
window.REGISTER = [

  /* --- Courtoisie (tú → usted, politesse) --- */
  { plain: "Hola, ¿qué tal?", elevated: "Buenos días, ¿cómo está usted?", alt: ["Buenas, ¿cómo se encuentra?"], cat: "Cortesía", note: "Passage au vouvoiement : « tú » → « usted » + « ¿cómo está? ». Registre poli/professionnel.", level: "A2" },
  { plain: "¿Me puedes ayudar?", elevated: "¿Podría ayudarme, por favor?", alt: ["¿Sería tan amable de ayudarme?"], cat: "Cortesía", note: "Conditionnel de politesse « podría » + « usted ». « ¿Sería tan amable de...? » très courtois.", level: "B1" },
  { plain: "Quiero información sobre el curso.", elevated: "Quisiera solicitar información sobre el curso.", alt: ["Me gustaría solicitar información sobre el curso."], cat: "Cortesía", note: "« quiero » → « quisiera » (subj. imparfait de politesse) ; « pedir » → « solicitar » (soutenu).", level: "B1" },
  { plain: "Necesito que me ayudes.", elevated: "Le agradecería que me ayudara.", alt: ["Le estaría muy agradecido si me ayudara."], cat: "Cortesía", note: "Demande polie : « agradecería que + subjonctif imparfait (ayudara) ». Très fréquent à l'écrit formel.", level: "B2" },

  /* --- Courrier / e-mail formel --- */
  { plain: "Hola Juan, te escribo para preguntarte una cosa.", elevated: "Estimado Sr. García: me dirijo a usted para consultarle una cuestión.", alt: ["Estimado Sr. García: le escribo para consultarle un asunto."], cat: "Correo formal", note: "Ouverture formelle : « Estimado Sr. + nom: » ; « me dirijo a usted para... » ; « cosa » → « cuestión / asunto ».", level: "B1" },
  { plain: "Gracias por tu correo.", elevated: "Le agradezco su correo.", alt: ["Muchas gracias por su mensaje."], cat: "Correo formal", note: "« gracias por » → « le agradezco » (+ « su », vouvoiement).", level: "A2" },
  { plain: "Perdón por la tardanza.", elevated: "Le pido disculpas por la demora.", alt: ["Disculpe la demora en responder."], cat: "Correo formal", note: "« perdón » → « le pido disculpas » ; « tardanza » → « demora » (soutenu).", level: "B1" },
  { plain: "Un saludo.", elevated: "Reciba un cordial saludo.", alt: ["Atentamente,", "Un cordial saludo."], cat: "Correo formal", note: "Clôture formelle : « Reciba un cordial saludo » / « Atentamente ».", level: "A2" },
  { plain: "Avísame si tienes preguntas.", elevated: "No dude en contactarme si tiene alguna pregunta.", alt: ["Quedo a su disposición para cualquier consulta."], cat: "Correo formal", note: "« No dude en... » + « usted ». « Quedo a su disposición » = formule finale très soignée.", level: "B2" },

  /* --- Connecteurs & style soutenu --- */
  { plain: "Es caro, pero merece la pena.", elevated: "Es caro; no obstante, merece la pena.", alt: ["Es caro; sin embargo, merece la pena."], cat: "Conectores", note: "« pero » → « no obstante / sin embargo » (contraste soutenu).", level: "B1" },
  { plain: "Llueve, por eso no salimos.", elevated: "Llueve; por consiguiente, no saldremos.", alt: ["Llueve; por lo tanto, no saldremos."], cat: "Conectores", note: "« por eso » → « por consiguiente / por lo tanto » (conséquence formelle).", level: "B1" },
  { plain: "Al final, aceptaron la propuesta.", elevated: "En definitiva, aceptaron la propuesta.", alt: ["Finalmente, aceptaron la propuesta."], cat: "Conectores", note: "« al final » → « en definitiva / finalmente » (conclusion soutenue).", level: "B1" },
  { plain: "Creo que es un buen plan.", elevated: "Considero que se trata de un buen plan.", alt: ["Cabe señalar que es un buen plan."], cat: "Conectores", note: "« creo que » → « considero que » ; « es » → « se trata de » (registre soutenu).", level: "B2" },
  { plain: "Esto es muy importante.", elevated: "Esto reviste una gran importancia.", alt: ["Esto es de suma importancia."], cat: "Conectores", note: "« muy importante » → « reviste una gran importancia » / « de suma importancia » (emphase formelle).", level: "C1" }

];
