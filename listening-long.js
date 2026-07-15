/* ============================================================
   CUMBRE — Écoute : conversations & annonces (espagnol)
   p = { type:'conv'|'talk', title, level, lines:[{spk:'M'|'W'|'N', text}], qs:[[pregunta,[opciones],bonne]] }
   ============================================================ */
window.CONVERSATIONS = [

  {
    type: "conv", title: "En el café", level: "A2",
    lines: [
      { spk: "M", text: "Hola, buenas. ¿Qué le pongo?" },
      { spk: "W", text: "Un café con leche y un croissant, por favor." },
      { spk: "M", text: "¿Algo más?" },
      { spk: "W", text: "No, nada más, gracias. ¿Cuánto es?" },
      { spk: "M", text: "Son tres euros con cincuenta." }
    ],
    qs: [
      ["¿Dónde tiene lugar la conversación?", ["En un café", "En una tienda de ropa", "En el banco", "En la estación"], 0],
      ["¿Qué pide la mujer?", ["Un té y una tostada", "Un café con leche y un croissant", "Un zumo de naranja", "Solo un café"], 1],
      ["¿Cuánto tiene que pagar?", ["Dos euros", "Tres euros con cincuenta", "Cinco euros", "Cuatro euros"], 1]
    ]
  },
  {
    type: "conv", title: "Pedir direcciones", level: "A2",
    lines: [
      { spk: "W", text: "Perdone, ¿para ir al museo del Prado?" },
      { spk: "M", text: "Siga todo recto y gire a la izquierda en el segundo semáforo. Está al lado del parque." },
      { spk: "W", text: "¿Está lejos?" },
      { spk: "M", text: "No, unos diez minutos andando." }
    ],
    qs: [
      ["¿Qué busca la mujer?", ["Una farmacia", "El museo del Prado", "La estación", "Un restaurante"], 1],
      ["¿Dónde está el museo?", ["Al lado del parque", "Detrás del banco", "En la plaza mayor", "Junto al río"], 0],
      ["¿Cuánto se tarda andando?", ["Cinco minutos", "Diez minutos", "Media hora", "Una hora"], 1]
    ]
  },
  {
    type: "conv", title: "En el trabajo", level: "B1",
    lines: [
      { spk: "M", text: "Ana, ¿has enviado ya el informe al cliente?" },
      { spk: "W", text: "Todavía no, me falta revisar los números. Lo tendré listo antes de comer." },
      { spk: "M", text: "Perfecto, porque la reunión es esta tarde." },
      { spk: "W", text: "No te preocupes, lo mando antes de las dos." }
    ],
    qs: [
      ["¿Qué tiene que hacer Ana?", ["Llamar al cliente", "Enviar el informe", "Organizar la reunión", "Corregir un correo"], 1],
      ["¿Qué le falta por hacer?", ["Imprimirlo", "Revisar los números", "Firmarlo", "Traducirlo"], 1],
      ["¿Cuándo enviará el informe?", ["Mañana", "Antes de las dos", "Esta noche", "La semana que viene"], 1]
    ]
  },
  {
    type: "conv", title: "Planes de fin de semana", level: "B1",
    lines: [
      { spk: "W", text: "¿Qué vas a hacer este fin de semana?" },
      { spk: "M", text: "Si hace buen tiempo, iré a la montaña con unos amigos." },
      { spk: "W", text: "¡Qué bien! ¿Y si llueve?" },
      { spk: "M", text: "Entonces me quedaré en casa viendo series." }
    ],
    qs: [
      ["¿Qué hará el hombre si hace buen tiempo?", ["Ir a la playa", "Ir a la montaña", "Quedarse en casa", "Trabajar"], 1],
      ["¿Con quién irá?", ["Solo", "Con unos amigos", "Con su familia", "Con su pareja"], 1],
      ["¿Qué hará si llueve?", ["Ir al cine", "Quedarse en casa viendo series", "Salir igualmente", "Estudiar"], 1]
    ]
  },
  {
    type: "conv", title: "En la tienda — una devolución", level: "B1",
    lines: [
      { spk: "M", text: "Buenas, quería devolver esta camisa. Es demasiado pequeña." },
      { spk: "W", text: "¿Tiene el tique de compra?" },
      { spk: "M", text: "Sí, aquí está. La compré el martes." },
      { spk: "W", text: "Sin problema. ¿Quiere el reembolso o cambiarla por otra talla?" },
      { spk: "M", text: "Cambiarla por una talla más grande, gracias." }
    ],
    qs: [
      ["¿Por qué va el hombre a la tienda?", ["Para comprar una camisa", "Para devolver una camisa", "Para pedir información", "Para quejarse"], 1],
      ["¿Qué pide la dependienta?", ["El DNI", "El tique de compra", "La tarjeta", "El número de teléfono"], 1],
      ["¿Qué decide hacer el hombre?", ["Pedir el reembolso", "Cambiarla por otra talla", "Quedarse la camisa", "Hablar con el jefe"], 1]
    ]
  },

  {
    type: "talk", title: "Anuncio en el aeropuerto", level: "B1",
    lines: [
      { spk: "N", text: "Atención, señores pasajeros. El vuelo IB2043 con destino a Buenos Aires embarcará por la puerta 14 a las 15:30. Rogamos tengan preparada la tarjeta de embarque y el documento de identidad. Gracias por volar con nosotros." }
    ],
    qs: [
      ["¿Adónde va el vuelo?", ["A Madrid", "A Buenos Aires", "A Barcelona", "A México"], 1],
      ["¿Por qué puerta se embarca?", ["La 4", "La 14", "La 40", "La 24"], 1],
      ["¿Qué deben preparar los pasajeros?", ["El equipaje", "La tarjeta de embarque y el DNI", "El billete de vuelta", "La reserva del hotel"], 1]
    ]
  },
  {
    type: "talk", title: "Mensaje del centro de salud", level: "B1",
    lines: [
      { spk: "N", text: "Hola, le llamamos del Centro de Salud San Juan para recordarle su cita con el doctor Gómez el miércoles a las diez y media. Si no puede acudir, por favor avísenos con al menos veinticuatro horas de antelación. Gracias." }
    ],
    qs: [
      ["¿Para qué llaman?", ["Para cancelar una cita", "Para recordar una cita", "Para vender un producto", "Para dar un resultado"], 1],
      ["¿Cuándo es la cita?", ["El martes a las diez", "El miércoles a las diez y media", "El jueves por la tarde", "El lunes"], 1],
      ["¿Con cuánta antelación hay que avisar?", ["Una hora", "Veinticuatro horas", "Una semana", "El mismo día"], 1]
    ]
  },
  {
    type: "talk", title: "El tiempo", level: "B2",
    lines: [
      { spk: "N", text: "Y ahora, el tiempo. Mañana tendremos cielos nubosos en el norte, con lluvias por la tarde. En el sur y el centro, sol y temperaturas suaves, de hasta veinticinco grados. El fin de semana el tiempo mejorará en todo el país." }
    ],
    qs: [
      ["¿Qué tiempo hará en el norte?", ["Sol", "Nublado con lluvias por la tarde", "Nieve", "Viento fuerte"], 1],
      ["¿Qué temperatura habrá en el sur?", ["Hasta 15 grados", "Hasta 25 grados", "Hasta 35 grados", "Bajo cero"], 1],
      ["¿Qué pasará el fin de semana?", ["Mejorará el tiempo", "Empeorará", "Seguirá igual", "Habrá tormentas"], 0]
    ]
  },

  {
    type: "conv", title: "En una entrevista de trabajo", level: "B2",
    lines: [
      { spk: "W", text: "Buenos días. Veo en su currículum que ha trabajado tres años en marketing." },
      { spk: "M", text: "Así es. Me encargaba de las campañas en redes sociales." },
      { spk: "W", text: "¿Y por qué le gustaría trabajar con nosotros?" },
      { spk: "M", text: "Porque es una empresa que apuesta por la innovación, y eso me motiva mucho." },
      { spk: "W", text: "Perfecto. Le llamaremos la semana que viene para darle una respuesta." }
    ],
    qs: [
      ["¿De qué se encargaba el candidato?", ["De la contabilidad", "De las campañas en redes sociales", "De las ventas", "De recursos humanos"], 1],
      ["¿Por qué quiere el puesto?", ["Por el sueldo", "Porque la empresa apuesta por la innovación", "Por el horario", "Por la ubicación"], 1],
      ["¿Cuándo le darán una respuesta?", ["Hoy mismo", "La semana que viene", "En un mes", "Nunca"], 1]
    ]
  },
  {
    type: "conv", title: "Un malentendido con una amiga", level: "B2",
    lines: [
      { spk: "W", text: "Oye, estoy un poco molesta. No me llamaste ayer como habías dicho." },
      { spk: "M", text: "¡Perdona! Se me pasó por completo, tuve un día horrible en el trabajo." },
      { spk: "W", text: "No pasa nada, pero avísame la próxima vez, ¿vale?" },
      { spk: "M", text: "Tienes toda la razón. Te lo compensaré con una cena." }
    ],
    qs: [
      ["¿Por qué está molesta la mujer?", ["Él llegó tarde", "Él no la llamó", "Él olvidó su cumpleaños", "Él no vino a la cena"], 1],
      ["¿Qué excusa da el hombre?", ["Que estaba enfermo", "Que tuvo un día horrible en el trabajo", "Que perdió el móvil", "Que estaba de viaje"], 1],
      ["¿Qué propone el hombre al final?", ["Invitarla a una cena", "Llamarla mañana", "Comprarle un regalo", "Pedirle perdón por carta"], 0]
    ]
  },
  {
    type: "talk", title: "Programa de radio — consejo cultural", level: "C1",
    lines: [
      { spk: "N", text: "Y para terminar, nuestra recomendación de la semana. Si les gusta el cine independiente, no se pierdan la nueva película del director argentino Martín Rejtman. Se estrena el viernes en salas seleccionadas. Una comedia agridulce sobre la vida en la gran ciudad que, sin duda, no les dejará indiferentes. Hasta la próxima." }
    ],
    qs: [
      ["¿Qué tipo de programa es?", ["Un boletín de noticias", "Un programa cultural", "Un programa deportivo", "Un anuncio comercial"], 1],
      ["¿Qué recomiendan?", ["Un libro", "Una película", "Un concierto", "Una exposición"], 1],
      ["¿Cómo describen la película?", ["Una comedia agridulce", "Un drama histórico", "Un documental", "Una película de terror"], 0]
    ]
  }

];
