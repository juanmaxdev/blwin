
const historiaInicial = [
    {
        id: 'introduccion',
        titulo: 'Introducción a CodeQuest',
        texto: '¡Bienvenido a CodeQuest! En este juego, aprenderás a programar mientras exploras un mundo lleno de aventuras. Tu misión es ayudar a los habitantes del planeta CodeLand a resolver problemas utilizando tus habilidades de programación.',
        opciones: [
        {
            texto: 'Comenzar la aventura',
            siguienteDialogo: 'misionInicial'
        }
        ]
    },
    {
        id: 'misionInicial',
        titulo: 'Tu primera misión',
        texto: 'Tu primera tarea es ayudar al robot R1-D1 a encontrar su herramienta perdida. Para hacerlo, necesitarás usar comandos básicos de programación.',
        opciones: [
        {
            texto: 'Entendido, ¡vamos a buscar la herramienta!',
            siguienteDialogo: 'buscarHerramienta'
        }
        ]
    },
    {
        id: 'buscarHerramienta',
        titulo: 'Buscando la herramienta',
        texto: 'R1-D1 te ha dado algunas pistas sobre dónde podría estar su herramienta. Usa tu conocimiento de programación para seguir las pistas y encontrarla.',
        opciones: [
        {
            texto: '¡Vamos a resolver este misterio!',
            siguienteDialogo: 'resolucionMisterio'
        }
        ]
    },
    {
        id: 'resolucionMisterio',
        titulo: 'Resolviendo el misterio',
        texto: 'Utiliza tus habilidades de programación para ayudar a R1-D1 a encontrar su herramienta. Recuerda, cada paso que tomes te acercará más a completar tu misión.',
        opciones: [
        {
            texto: 'Estoy listo para programar',
            siguienteDialogo: 'finalizarIntroduccion'
        }
        ]
    },
    {
        id: 'finalizarIntroduccion',
        titulo: 'Misión completada',
        texto: '¡Excelente trabajo! Has completado la introducción y estás listo para comenzar tu aventura en CodeQuest. ¡Buena suerte!',
        opciones: [
        {
            texto: 'Comenzar aventura',
            siguienteDialogo: null
        }
        ]
    }
]

export { historiaInicial };