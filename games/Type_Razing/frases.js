const frasesLocales = [
  "El mundo es un lugar peligroso, no por aquellos que hacen el mal, sino por los que miran y no hacen nada.",
  "El mayor enemigo del conocimiento no es la ignorancia, sino la ilusión del conocimiento.",
  "No hay secretos para el éxito. Este se alcanza preparándose, trabajando duro y aprendiendo del fracaso.",
  "Todo parece imposible hasta que se hace.",
  "No esperes por el momento perfecto, toma el momento y hazlo perfecto.",
  "La creatividad es la inteligencia divirtiéndose, como decía Einstein.",
  "No cuentes los días, haz que los días cuenten.",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "Una mente que se abre a una nueva idea jamás volverá a su tamaño original.",
  "El futuro pertenece a quienes creen en la belleza de sus sueños.",
  "No hay atajos para llegar a cualquier lugar que valga la pena.",
  "La vida es como montar en bicicleta: para mantener el equilibrio, debes seguir moviéndote.",
  "Aprende como si fueras a vivir para siempre, vive como si fueras a morir mañana.",
  "La mejor forma de predecir el futuro es inventarlo.",
  "El que tiene un porqué para vivir puede soportar casi cualquier cómo.",
  "Haz lo que puedas, con lo que tengas, donde estés.",
  "No mires el reloj; haz lo que él hace: sigue adelante.",
  "Aunque la vida no resulte ser la fiesta que esperabas, nunca dejes de bailar.",
  "Si buscas resultados distintos, no hagas siempre lo mismo.",
  "La única forma de hacer un gran trabajo es amar lo que haces.",
  "La paciencia es amarga, pero su fruto es dulce.",
  "Quien en la vida ha perdido una batalla, no ha perdido la guerra.",
  "No se trata de cuántas veces caes, sino de cuántas te levantas.",
  "El conocimiento habla, pero la sabiduría escucha.",
  "Un viaje de mil millas comienza con un solo paso.",
  "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
  "El hombre que mueve montañas comienza apartando pequeñas piedras.",
  "La suerte favorece solo a las mentes preparadas.",
  "La acción es la llave fundamental de todo éxito.",
  "Nunca sabrás de lo que eres capaz hasta que lo intentes.",
  "La mente es como un paracaídas, solo funciona si se abre.",
  "No puedes cruzar el mar simplemente mirando el agua.",
  "El trabajo duro vence al talento cuando el talento no trabaja duro.",
  "Más vale una verdad que duela que una mentira que ilusione.",
  "Donde hay voluntad, hay un camino.",
  "No importa lo lento que vayas, siempre y cuando no te detengas.",
  "El entusiasmo mueve el mundo.",
  "La libertad no tiene precio, pero sí responsabilidad.",
  "Nada grande se ha logrado sin entusiasmo.",
  "Los grandes espíritus siempre han encontrado la violenta oposición de las mentes mediocres.",
  "El aprendizaje no es un producto, sino un proceso.",
  "La honestidad es el primer capítulo del libro de la sabiduría.",
  "La lógica te llevará del punto A al punto B. La imaginación te llevará a todas partes.",
  "Todo lo que puedas imaginar es real.",
  "Hay una grieta en todo, así es como entra la luz.",
  "La felicidad no es algo hecho. Proviene de tus propias acciones.",
  "El fracaso es simplemente la oportunidad de comenzar de nuevo, esta vez de forma más inteligente.",
  "Solo aquellos que se atreven a tener grandes fracasos terminan logrando grandes éxitos.",
  "Cree en ti y todo será posible.",
  "Nunca es demasiado tarde para ser lo que podrías haber sido.",
  "No temas renunciar a lo bueno para ir por lo grandioso.",
  "Sigue tus sueños, ellos saben el camino.",
  "Prefiero morir de pie que vivir siempre arrodillado.",
  "Una sonrisa es una curva que lo endereza todo.",
  "No hay viento favorable para el que no sabe a qué puerto se dirige.",
  "Una persona que nunca cometió un error jamás intentó algo nuevo.",
  "Los sueños no funcionan a menos que tú trabajes por ellos.",
  "No hay sustituto para el trabajo duro.",
  "Lo que haces hoy puede mejorar todos tus mañanas.",
  "El carácter es la verdadera medida de un hombre.",
  "Tu actitud, no tu aptitud, determinará tu altitud.",
  "El conocimiento es poder, pero la sabiduría es saber usarlo.",
  "La disciplina tarde o temprano vencerá a la inteligencia.",
  "La mejor manera de predecir tu futuro es crearlo tú mismo.",
  "El pasado no se puede cambiar, pero el futuro está aún en tus manos.",
  "La humildad es el verdadero signo de grandeza.",
  "Los obstáculos son esas cosas espantosas que ves cuando apartas los ojos de tu meta.",
  "Las oportunidades no pasan, las creas.",
  "El talento gana juegos, pero el trabajo en equipo y la inteligencia ganan campeonatos.",
  "La valentía no es la ausencia de miedo, sino la decisión de que algo es más importante que el miedo.",
  "No existe la casualidad, solo lo inevitable.",
  "Tener éxito no es aleatorio, es una variable dependiente del esfuerzo.",
  "Nadie puede hacerte sentir inferior sin tu consentimiento.",
  "La diferencia entre lo ordinario y lo extraordinario es ese pequeño extra.",
  "La gente olvidará lo que dijiste, olvidará lo que hiciste, pero nunca olvidará cómo la hiciste sentir.",
  "No se trata de tener tiempo, se trata de hacer tiempo.",
  "Las mejores ideas vienen después del mayor esfuerzo.",
  "No hay camino para la verdad, la verdad es el camino.",
  "El hombre nunca sabe de lo que es capaz hasta que lo intenta.",
  "El único límite a nuestros logros del mañana son nuestras dudas de hoy.",
  "Cambia tus pensamientos y cambiarás tu mundo.",
  "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
  "Cuanto más trabajas, más suerte tienes.",
  "No importa lo que decidas, lo importante es que lo decidas con el corazón.",
  "El esfuerzo de hoy será tu recompensa de mañana.",
  "No dejes que el miedo decida por ti.",
  "Las grandes obras son hechas no con fuerza, sino con perseverancia.",
  "Nunca es tarde para comenzar algo nuevo.",
  "Hazlo con pasión o no lo hagas en absoluto.",
  "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
  "Una meta sin un plan es solo un deseo.",
  "El trabajo en equipo divide el trabajo y multiplica los resultados.",
  "Si puedes soñarlo, puedes lograrlo.",
  "Las acciones dicen más que las palabras.",
  "Quien quiere hacer algo encuentra un medio, quien no quiere hacer nada encuentra una excusa.",
  "No puedes cambiar el pasado, pero sí influir en tu futuro.",
  "El tiempo es limitado, no lo malgastes viviendo la vida de otro.",
  "Vive como si fueras a morir mañana. Aprende como si fueras a vivir siempre.",
  "La inspiración existe, pero tiene que encontrarte trabajando.",
  "La vida no se trata de encontrarte a ti mismo, sino de crearte a ti mismo.",
];
