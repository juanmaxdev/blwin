export interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta_correcta: number;
}

const preguntasData: Pregunta[] = [
    {
        "pregunta": "¿Qué lenguaje de programación es conocido por su uso en desarrollo web frontend?",
        "opciones": [
            "JavaScript",
            "Python",
            "C++"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál de estas estructuras de datos sigue el principio FIFO?",
        "opciones": [
            "Cola (Queue)",
            "Pila (Stack)",
            "Árbol (Tree)"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'refactorizar' en programación?",
        "opciones": [
            "Reorganizar el código sin cambiar su comportamiento",
            "Agregar nuevas funcionalidades",
            "Eliminar código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "En Scrum, ¿quién es responsable de priorizar el Product Backlog?",
        "opciones": [
            "Product Owner",
            "Scrum Master",
            "Equipo de Desarrollo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum dura máximo 15 minutos?",
        "opciones": [
            "Daily Scrum",
            "Sprint Review",
            "Sprint Planning"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la principal ventaja de usar control de versiones?",
        "opciones": [
            "Gestionar y controlar cambios en el código",
            "Mejorar la velocidad de compilación",
            "Reducir el tamaño del archivo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una historia de usuario en Agile?",
        "opciones": [
            "Una breve descripción de una funcionalidad desde el punto de vista del usuario",
            "Un documento técnico detallado",
            "Un plan de proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un equipo sea autoorganizado en Scrum?",
        "opciones": [
            "Deciden internamente cómo realizar su trabajo",
            "Tienen un supervisor que asigna tareas",
            "No tienen roles definidos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la función principal del Scrum Master?",
        "opciones": [
            "Facilitar Scrum y eliminar impedimentos",
            "Definir requisitos del producto",
            "Escribir código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un ciclo 'for' en programación?",
        "opciones": [
            "Una estructura para repetir un bloque de código varias veces",
            "Una función matemática",
            "Un tipo de variable"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se utiliza comúnmente para aplicaciones Android?",
        "opciones": [
            "Kotlin",
            "Ruby",
            "PHP"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum se utiliza para inspeccionar el incremento y obtener feedback?",
        "opciones": [
            "Sprint Review",
            "Sprint Retrospective",
            "Daily Scrum"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio DRY en programación?",
        "opciones": [
            "Don't Repeat Yourself (No te repitas)",
            "Debugging Repeatedly Yearly",
            "Do Repeat Yourself"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Sprint' en Scrum?",
        "opciones": [
            "Un ciclo de trabajo corto y fijo para completar tareas",
            "Una fase de documentación del proyecto",
            "Una reunión de planificación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de datos permite acceso rápido en base a una clave?",
        "opciones": [
            "Hash Table",
            "Lista enlazada",
            "Árbol binario"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que una función sea recursiva?",
        "opciones": [
            "Se llama a sí misma dentro de su definición",
            "No tiene retorno",
            "No recibe parámetros"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En qué evento Scrum el equipo reflexiona sobre cómo mejorar el proceso?",
        "opciones": [
            "Sprint Retrospective",
            "Sprint Review",
            "Sprint Planning"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo principal de la programación orientada a objetos?",
        "opciones": [
            "Modelar entidades como objetos que contienen datos y comportamiento",
            "Crear código procedural",
            "Mejorar la velocidad de ejecución"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un bug en programación?",
        "opciones": [
            "Un error o defecto en el código",
            "Una nueva función",
            "Una línea de código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un Product Backlog esté priorizado?",
        "opciones": [
            "Los ítems están ordenados según valor y urgencia",
            "Los ítems están ordenados alfabéticamente",
            "No hay un orden específico"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una variable en programación?",
        "opciones": [
            "Un espacio de memoria para almacenar datos",
            "Una función matemática",
            "Un tipo de error"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para estimar esfuerzo en Scrum mediante votación?",
        "opciones": [
            "Planning Poker",
            "Burnup Chart",
            "Kanban"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito de un Daily Scrum?",
        "opciones": [
            "Sincronizar el trabajo del equipo y detectar impedimentos",
            "Planificar el Sprint",
            "Revisar el incremento entregado"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un commit en control de versiones?",
        "opciones": [
            "Guardar cambios en el repositorio",
            "Eliminar archivos",
            "Crear un nuevo proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que una función tenga un parámetro?",
        "opciones": [
            "Recibe un valor para usar dentro de la función",
            "No tiene valor de retorno",
            "Es una función sin nombre"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es Kanban en metodologías ágiles?",
        "opciones": [
            "Una metodología para gestionar trabajo visualmente usando tarjetas y columnas",
            "Un tipo de prueba automática",
            "Una técnica para estimar tiempo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una pila (stack) en programación?",
        "opciones": [
            "Estructura LIFO: último en entrar, primero en salir",
            "Estructura FIFO: primero en entrar, primero en salir",
            "Una base de datos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol en Scrum se asegura de que se entiendan los requerimientos del cliente?",
        "opciones": [
            "Product Owner",
            "Scrum Master",
            "Desarrollador"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Merge en Git?",
        "opciones": [
            "Combinar cambios de diferentes ramas",
            "Eliminar una rama",
            "Crear un nuevo repositorio"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la palabra 'bug' en programación?",
        "opciones": [
            "Un error o fallo en el software",
            "Una función exitosa",
            "Un comando en Linux"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el backlog en Scrum?",
        "opciones": [
            "Lista priorizada de tareas pendientes para el producto",
            "Informe de progreso",
            "Planificación del proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando en Git permite traer cambios remotos al repositorio local?",
        "opciones": [
            "git pull",
            "git push",
            "git commit"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa principalmente para desarrollo iOS?",
        "opciones": [
            "Swift",
            "Java",
            "C#"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo de la retrospectiva en Scrum?",
        "opciones": [
            "Mejorar procesos y colaboración del equipo",
            "Presentar el producto a los clientes",
            "Planificar la siguiente iteración"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un algoritmo?",
        "opciones": [
            "Una serie de pasos ordenados para resolver un problema",
            "Un lenguaje de programación",
            "Una función matemática"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica de estimación usa tarjetas con números para votar?",
        "opciones": [
            "Planning Poker",
            "Burn Down Chart",
            "User Stories"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio KISS en programación?",
        "opciones": [
            "Keep It Simple, Stupid (mantener las cosas simples)",
            "Knowledge Is Super Simple",
            "Keep It Secure, Strong"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la integración continua (CI)?",
        "opciones": [
            "Práctica de integrar y probar código frecuentemente",
            "Una reunión diaria",
            "Una técnica de estimación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función en programación?",
        "opciones": [
            "Un bloque de código reutilizable que realiza una tarea",
            "Una variable",
            "Un tipo de dato"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'scrum' en desarrollo ágil?",
        "opciones": [
            "Un marco de trabajo para gestionar proyectos ágiles",
            "Un lenguaje de programación",
            "Un editor de código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un test unitario?",
        "opciones": [
            "Prueba que verifica el correcto funcionamiento de una unidad pequeña de código",
            "Prueba de integración entre módulos",
            "Prueba de rendimiento"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el producto mínimo viable (MVP)?",
        "opciones": [
            "Versión básica con funcionalidades esenciales para validar hipótesis",
            "El producto final terminado",
            "Un plan de proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método se usa para ordenar datos en la mayoría de los lenguajes de programación?",
        "opciones": [
            "Algoritmos de ordenamiento (como quicksort, mergesort)",
            "Funciones matemáticas",
            "Compilación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'ágil' en desarrollo de software?",
        "opciones": [
            "Un enfoque iterativo y flexible para el desarrollo",
            "Un tipo de lenguaje de programación",
            "Un sistema operativo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito del Sprint Planning?",
        "opciones": [
            "Definir qué trabajo se realizará en el Sprint y cómo",
            "Revisar el incremento terminado",
            "Detectar impedimentos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un test de integración?",
        "opciones": [
            "Prueba que verifica la interacción entre distintos módulos o componentes",
            "Prueba individual de funciones",
            "Prueba de carga"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la palabra reservada para definir una función en Python?",
        "opciones": ["func", "def", "function"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué herramienta se usa para gestionar dependencias en proyectos JavaScript?",
        "opciones": ["npm", "pip", "gem"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "En Scrum, ¿quién elimina impedimentos para el equipo?",
        "opciones": ["Product Owner", "Scrum Master", "Stakeholder"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el resultado principal de un Sprint en Scrum?",
        "opciones": ["Incremento de producto", "Plan de proyecto", "Documento de requisitos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'merge conflict' en Git?",
        "opciones": ["Un error en la fusión de ramas", "Una función nueva", "Un commit sin cambios"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'encapsulación' en programación orientada a objetos?",
        "opciones": ["Ocultar detalles internos de un objeto", "Herencia de propiedades", "Creación de objetos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una 'epic' en Agile?",
        "opciones": ["Una gran historia de usuario dividida en varias pequeñas", "Una tarea técnica", "Una reunión diaria"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál de estos es un lenguaje de programación funcional?",
        "opciones": ["Haskell", "Java", "C++"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum se usa para planificar el trabajo del Sprint?",
        "opciones": ["Sprint Planning", "Sprint Review", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método HTTP se usa para obtener datos de un servidor?",
        "opciones": ["GET", "POST", "DELETE"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una promesa (Promise) en JavaScript?",
        "opciones": ["Objeto que representa una operación asíncrona", "Una función", "Una variable"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un equipo tenga 'velocity' en Scrum?",
        "opciones": ["Capacidad para completar trabajo en un Sprint", "Velocidad de conexión a internet", "Número de reuniones diarias"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una variable global?",
        "opciones": ["Una variable accesible desde cualquier parte del programa", "Una variable que sólo existe dentro de una función", "Una constante"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es TDD (Test-Driven Development)?",
        "opciones": ["Desarrollar escribiendo pruebas antes del código", "Desarrollar sin pruebas", "Escribir código sin documentación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la duración típica recomendada de un Sprint en Scrum?",
        "opciones": ["2 a 4 semanas", "1 día", "6 meses"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un microservicio?",
        "opciones": ["Una pequeña aplicación independiente que forma parte de un sistema más grande", "Un servidor pequeño", "Un tipo de base de datos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un commit en Git?",
        "opciones": ["Guardar cambios en el repositorio", "Eliminar archivos", "Crear una rama"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito del Sprint Review?",
        "opciones": ["Mostrar el trabajo completado y obtener feedback", "Planificar el siguiente Sprint", "Eliminar impedimentos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un algoritmo de ordenamiento eficiente para grandes datos?",
        "opciones": ["Quicksort", "Bubble Sort", "Selection Sort"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio SOLID en programación?",
        "opciones": ["Conjunto de principios para diseño de software", "Un lenguaje de programación", "Una biblioteca"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git permite crear una nueva rama?",
        "opciones": ["git branch", "git merge", "git commit"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la técnica de 'pair programming'?",
        "opciones": ["Dos desarrolladores trabajando juntos en una misma tarea", "Una reunión de equipo", "Una herramienta de diseño"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de prueba verifica que el sistema funcione bajo carga?",
        "opciones": ["Prueba de rendimiento", "Prueba unitaria", "Prueba funcional"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo de la 'Definition of Done' en Scrum?",
        "opciones": ["Asegurar que un trabajo esté completo y listo", "Definir el próximo Sprint", "Planificar el Product Backlog"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una excepción en programación?",
        "opciones": ["Un error que ocurre durante la ejecución del programa", "Un tipo de variable", "Una función especial"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la principal característica de la metodología ágil?",
        "opciones": ["Flexibilidad y adaptación continua", "Documentación exhaustiva", "Control rígido del proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un API?",
        "opciones": ["Interfaz para que diferentes sistemas interactúen", "Un tipo de base de datos", "Un lenguaje de programación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'scrum' en el contexto del desarrollo ágil?",
        "opciones": ["Un marco de trabajo para gestionar proyectos", "Un lenguaje de programación", "Un tipo de servidor"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un ciclo while en programación?",
        "opciones": ["Ejecuta un bloque mientras la condición sea verdadera", "Ejecuta solo una vez", "No existe"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la integración continua (CI)?",
        "opciones": ["Automatización de la integración de código frecuentemente", "Una reunión semanal", "Una técnica para escribir código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa un nodo en una estructura de datos tipo árbol?",
        "opciones": ["Una entidad con datos y enlaces a otros nodos", "Un archivo en el sistema", "Una variable global"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un backlog en Scrum?",
        "opciones": ["Lista priorizada de trabajo pendiente", "Informe de estado", "Plan de proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git se usa para subir cambios al repositorio remoto?",
        "opciones": ["git push", "git pull", "git fetch"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que una función sea pura en programación funcional?",
        "opciones": ["No tiene efectos secundarios y siempre retorna el mismo resultado con los mismos argumentos", "Modifica variables globales", "No retorna nada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'user story' en Agile?",
        "opciones": ["Descripción breve de una necesidad del usuario", "Un error de software", "Una reunión de equipo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método HTTP se usa para enviar datos al servidor para crear un recurso?",
        "opciones": ["POST", "GET", "PUT"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué patrón de diseño se usa para crear objetos sin exponer la lógica de creación?",
        "opciones": ["Factory", "Singleton", "Observer"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la herencia en programación orientada a objetos?",
        "opciones": ["Una clase obtiene propiedades y métodos de otra", "Una función que llama a otra", "Un tipo de variable"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un commit 'amend' en Git?",
        "opciones": ["Modificar el último commit", "Eliminar un commit", "Crear una nueva rama"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'sprint backlog'?",
        "opciones": ["Lista de tareas seleccionadas para el Sprint actual", "Todo el Product Backlog", "Planificación del proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'burn down chart'?",
        "opciones": ["Gráfico que muestra el trabajo pendiente en el Sprint", "Documento de requisitos", "Lista de tareas finalizadas"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el 'pair programming'?",
        "opciones": ["Dos programadores trabajando juntos en un mismo código", "Una reunión diaria", "Una técnica de diseño"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función anónima (lambda)?",
        "opciones": ["Función sin nombre definida para uso corto", "Función que nunca retorna", "Variable especial"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una variable local?",
        "opciones": ["Variable definida y usada dentro de una función", "Variable accesible globalmente", "Constante"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa el término 'debugging'?",
        "opciones": ["Proceso de encontrar y corregir errores en el código", "Escribir código nuevo", "Diseñar interfaces"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el 'MVP' en metodologías ágiles?",
        "opciones": ["Producto mínimo viable", "Modelo de valor principal", "Método de validación de proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio 'YAGNI' en programación ágil?",
        "opciones": ["You Aren't Gonna Need It (No vas a necesitarlo)", "You Are Great, Never Ignore", "You Are Going Nowhere"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la sigla 'JSON'?",
        "opciones": ["JavaScript Object Notation", "Java Source Open Network", "Java Standard Output Node"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito principal de un Sprint Retrospective en Scrum?",
        "opciones": ["Mejorar el proceso del equipo", "Planificar el próximo Sprint", "Revisar el producto entregado"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál de estos tipos de datos NO es primitivo en JavaScript?",
        "opciones": ["Objeto", "Número", "Booleano"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace la función 'map' en programación funcional?",
        "opciones": ["Aplica una función a cada elemento de una colección", "Filtra elementos según una condición", "Ordena una lista"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la metodología ágil para la gestión de proyectos?",
        "opciones": ["Entrega iterativa y mejora continua", "Planificación detallada al inicio", "Control estricto de costos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una rama (branch) en Git?",
        "opciones": ["Versión independiente del código para desarrollo paralelo", "Repositorio remoto", "Archivo de configuración"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol en Scrum representa a los interesados y clientes?",
        "opciones": ["Stakeholders", "Scrum Master", "Equipo de desarrollo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la recursividad en programación?",
        "opciones": ["Función que se llama a sí misma", "Función que no retorna valor", "Variable global"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo de un Daily Scrum?",
        "opciones": ["Coordinar al equipo y compartir progresos", "Revisar el producto terminado", "Planificar el proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de datos utiliza una cola (queue)?",
        "opciones": ["FIFO (First In First Out)", "LIFO (Last In First Out)", "Árbol binario"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la principal responsabilidad del Product Owner?",
        "opciones": ["Gestionar el Product Backlog y prioridades", "Eliminar impedimentos del equipo", "Escribir código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa el término 'refactorizar' en desarrollo de software?",
        "opciones": ["Mejorar el código sin cambiar su comportamiento", "Agregar nuevas funcionalidades", "Eliminar código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un lenguaje compilado?",
        "opciones": ["Lenguaje cuyo código se transforma a código máquina antes de ejecutarse", "Lenguaje interpretado en tiempo real", "Lenguaje de scripting"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'Scrum Master'?",
        "opciones": ["Facilitador del proceso Scrum", "Jefe del equipo", "Cliente final"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el comando 'git pull'?",
        "opciones": ["Descarga y fusiona cambios del repositorio remoto", "Envía cambios al repositorio remoto", "Elimina una rama local"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una variable constante en programación?",
        "opciones": ["Una variable cuyo valor no puede cambiar después de asignado", "Una variable que cambia constantemente", "Una variable global"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la diferencia principal entre una lista y un conjunto (set)?",
        "opciones": ["El conjunto no permite elementos duplicados", "La lista es más rápida", "El conjunto es ordenado"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de test verifica que cada unidad de código funcione correctamente?",
        "opciones": ["Test unitario", "Test de integración", "Test de aceptación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum permite revisar el trabajo completado y obtener feedback?",
        "opciones": ["Sprint Review", "Sprint Planning", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un iterador en programación?",
        "opciones": ["Objeto que permite recorrer una colección", "Una función recursiva", "Un tipo de variable"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la inyección de dependencias?",
        "opciones": ["Técnica para suministrar objetos a otras clases para reducir acoplamiento", "Un patrón de diseño para crear objetos", "Una forma de documentar código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de control de versiones es Git?",
        "opciones": ["Distribuido", "Centralizado", "Local"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa el acrónimo MVP en desarrollo ágil?",
        "opciones": ["Producto Mínimo Viable", "Modelo de Valor Principal", "Módulo de Validación de Producto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio KISS en desarrollo de software?",
        "opciones": ["Keep It Simple, Stupid", "Key Integrated Software System", "Kernel in System Software"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un test de aceptación?",
        "opciones": ["Prueba para validar que el producto cumple con los requisitos del cliente", "Prueba para medir rendimiento", "Prueba unitaria"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'Sprint' en Scrum?",
        "opciones": ["Período de trabajo con objetivos definidos", "Reunión diaria", "Documento de requisitos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un puntero en lenguajes como C?",
        "opciones": ["Variable que almacena la dirección de memoria", "Variable entera", "Tipo de función"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el método 'fetch' en JavaScript?",
        "opciones": ["API para hacer solicitudes HTTP", "Función para ordenar arrays", "Comando para depuración"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio DRY en programación?",
        "opciones": ["Don't Repeat Yourself", "Develop Rapidly Yourself", "Debugging Requires You"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que una función es 'asincrónica'?",
        "opciones": ["No bloquea la ejecución mientras espera resultados", "Es una función normal", "Es una función que no retorna valor"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un objeto en programación orientada a objetos?",
        "opciones": ["Instancia de una clase que contiene datos y métodos", "Una variable global", "Un archivo de código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta es comúnmente usada para la integración continua?",
        "opciones": ["Jenkins", "Photoshop", "Docker"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función recursiva?",
        "opciones": ["Función que se llama a sí misma", "Función que nunca termina", "Función sin argumentos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la planificación de capacidad en Scrum?",
        "opciones": ["Estimación del trabajo que un equipo puede completar en un Sprint", "Planificación de reuniones", "Asignación de roles"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el principal objetivo del Product Backlog?",
        "opciones": ["Lista priorizada de funcionalidades y tareas para el producto", "Documento de diseño técnico", "Informe de errores"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa MVC en desarrollo de software?",
        "opciones": ["Modelo-Vista-Controlador", "Modelo-Variable-Control", "Módulo-Visualización-Componente"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa comúnmente para desarrollo web backend?",
        "opciones": ["JavaScript (Node.js)", "HTML", "CSS"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la herencia múltiple?",
        "opciones": ["Una clase hereda de varias clases padre", "Una clase hereda solo de una clase", "Una función con varios parámetros"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento en Scrum se enfoca en identificar mejoras para el equipo?",
        "opciones": ["Sprint Retrospective", "Sprint Review", "Daily Scrum"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una excepción no controlada en programación?",
        "opciones": ["Error que no es manejado y causa que el programa falle", "Error corregido automáticamente", "Variable inválida"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué patrón de diseño garantiza una única instancia de una clase?",
        "opciones": ["Singleton", "Factory", "Observer"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un microservicio?",
        "opciones": ["Componente pequeño e independiente de una aplicación", "Un servidor", "Una base de datos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la entrega continua (CD)?",
        "opciones": ["Automatizar la entrega del software para que pueda ser lanzado en cualquier momento", "Una reunión de equipo", "Una técnica de programación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'Test Driven Development' (TDD)?",
        "opciones": ["Escribir pruebas antes de escribir el código", "Escribir código sin pruebas", "Probar la interfaz de usuario"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una API REST?",
        "opciones": ["Interfaz para comunicación basada en HTTP siguiendo principios REST", "Un lenguaje de programación", "Un tipo de base de datos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la palabra 'Scrum' fuera del desarrollo ágil?",
        "opciones": ["Formación en rugby", "Lenguaje de programación", "Framework de backend"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'callback' en JavaScript?",
        "opciones": [
            "Una función pasada como argumento a otra función",
            "Una variable global",
            "Un tipo de error"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la duración típica de un Sprint en Scrum?",
        "opciones": [
            "2 a 4 semanas",
            "1 día",
            "6 meses"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de datos utiliza el algoritmo de búsqueda binaria?",
        "opciones": [
            "Lista ordenada",
            "Lista desordenada",
            "Pila"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo principal de la planificación del Sprint?",
        "opciones": [
            "Definir qué trabajo se realizará durante el Sprint",
            "Revisar el trabajo completado",
            "Evaluar la velocidad del equipo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'deadlock' en programación concurrente?",
        "opciones": [
            "Situación donde dos procesos se bloquean esperando recursos mutuamente",
            "Error de sintaxis",
            "Exceso de memoria usada"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se utiliza comúnmente para el desarrollo de apps iOS?",
        "opciones": [
            "Swift",
            "Java",
            "Python"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace un Scrum Master en el equipo?",
        "opciones": [
            "Facilita el proceso y elimina impedimentos",
            "Escribe el código",
            "Gestiona el presupuesto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'agilidad' en el desarrollo de software?",
        "opciones": [
            "Adaptarse rápidamente a cambios y entregar valor continuo",
            "Seguir un plan rígido",
            "Entregar un producto final sin revisiones"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un array en programación?",
        "opciones": [
            "Colección ordenada de elementos del mismo tipo",
            "Variable que almacena texto",
            "Función especial"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la sigla 'CI' en desarrollo de software?",
        "opciones": [
            "Integración Continua",
            "Código Incompatible",
            "Control de Instancias"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método en JavaScript se usa para agregar un elemento al final de un array?",
        "opciones": [
            "push()",
            "pop()",
            "shift()"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Product Backlog?",
        "opciones": [
            "Lista priorizada de requisitos y tareas para el producto",
            "Documento de diseño técnico",
            "Reporte de errores"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la herencia en programación orientada a objetos?",
        "opciones": [
            "Capacidad de una clase para derivar de otra",
            "Copiar código entre funciones",
            "Asignar valores a variables"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un REST API?",
        "opciones": [
            "Interfaz que usa HTTP y principios REST para comunicación",
            "Lenguaje de programación",
            "Base de datos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el comando 'git commit'?",
        "opciones": [
            "Guarda cambios localmente con un mensaje descriptivo",
            "Envía cambios al servidor remoto",
            "Descarga cambios del repositorio remoto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa el término 'Scrum' en desarrollo ágil?",
        "opciones": [
            "Framework para gestionar proyectos de forma iterativa",
            "Lenguaje de programación",
            "Software de diseño"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un objeto en programación?",
        "opciones": [
            "Entidad que agrupa datos y comportamientos",
            "Una función matemática",
            "Un archivo de texto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un bug en programación?",
        "opciones": [
            "Error o fallo en el código",
            "Nueva funcionalidad",
            "Variable temporal"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un sprint review en Scrum?",
        "opciones": [
            "Revisión del trabajo terminado y feedback con stakeholders",
            "Planificación del próximo sprint",
            "Reunión diaria del equipo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'encapsulación' en POO?",
        "opciones": [
            "Ocultar detalles internos y exponer solo lo necesario",
            "Reutilizar código",
            "Dividir código en funciones"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un índice en bases de datos?",
        "opciones": [
            "Estructura para acelerar consultas",
            "Variable de control",
            "Error de programación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un diagrama de flujo?",
        "opciones": [
            "Representación gráfica de pasos de un proceso",
            "Código fuente",
            "Base de datos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función pura?",
        "opciones": [
            "Función cuyo resultado depende solo de sus entradas y no tiene efectos secundarios",
            "Función que modifica variables globales",
            "Función que no retorna valor"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'Scrum Master'?",
        "opciones": [
            "Facilitador del proceso Scrum",
            "Jefe del equipo",
            "Cliente"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una API?",
        "opciones": [
            "Interfaz para que software interactúe con otro",
            "Archivo de programa",
            "Base de datos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito del Daily Scrum?",
        "opciones": [
            "Coordinar al equipo y planificar el día",
            "Revisar el producto final",
            "Entregar documentación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una pila (stack) en programación?",
        "opciones": [
            "Estructura LIFO donde el último elemento agregado es el primero en salir",
            "Lista ordenada alfabéticamente",
            "Estructura FIFO"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se utiliza para dar estilo a páginas web?",
        "opciones": [
            "CSS",
            "HTML",
            "JavaScript"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'ágil' en gestión de proyectos?",
        "opciones": [
            "Metodología flexible y adaptativa",
            "Planificación rígida",
            "Desarrollo sin pruebas"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un repositorio en Git?",
        "opciones": [
            "Lugar donde se almacena el código y su historial",
            "Documento de requisitos",
            "Servidor web"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un test unitario?",
        "opciones": [
            "Prueba para verificar una unidad específica de código",
            "Prueba del sistema completo",
            "Prueba manual"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un evento Sprint Retrospective?",
        "opciones": [
            "Reunión para analizar el proceso y mejorar",
            "Presentación al cliente",
            "Revisión del código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el operador '===' en JavaScript?",
        "opciones": [
            "Compara igualdad estricta sin conversión de tipo",
            "Compara igualdad con conversión de tipo",
            "Asignación de valor"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el patrón Observer?",
        "opciones": [
            "Permite que objetos observen y reaccionen a cambios en otro objeto",
            "Creación única de objetos",
            "Separación de lógica y presentación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un sistema SCRUM?",
        "opciones": [
            "Framework para gestionar proyectos ágiles",
            "Lenguaje de programación",
            "Sistema operativo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un backlog refinado?",
        "opciones": [
            "Proceso de mejorar y detallar elementos del backlog",
            "Documento de diseño",
            "Lista de errores"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando se usa para crear una nueva rama en Git?",
        "opciones": [
            "git branch <nombre>",
            "git checkout <nombre>",
            "git commit -m"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una variable local?",
        "opciones": [
            "Variable accesible solo dentro de una función o bloque",
            "Variable global",
            "Variable constante"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la técnica Kanban?",
        "opciones": [
            "Método para visualizar y optimizar el flujo de trabajo",
            "Lenguaje de programación",
            "Patrón de diseño"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un test de integración?",
        "opciones": [
            "Prueba de interacción entre varios componentes",
            "Prueba de una sola función",
            "Prueba manual"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la función 'filter' en programación?",
        "opciones": [
            "Crea un nuevo array con elementos que cumplen una condición",
            "Ordena un array",
            "Agrega elementos a un array"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función anónima?",
        "opciones": [
            "Función sin nombre",
            "Función que siempre retorna true",
            "Función con nombre reservado"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el Manifesto Ágil?",
        "opciones": [
            "Conjunto de valores y principios para desarrollo ágil",
            "Documento legal",
            "Framework de desarrollo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Sprint Goal?",
        "opciones": [
            "Objetivo principal a lograr durante el Sprint",
            "Lista de tareas",
            "Plan de proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un commit en Git?",
        "opciones": [
            "Guardar cambios en el historial local",
            "Enviar código al repositorio remoto",
            "Eliminar código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa el término 'refactorización' en programación?",
        "opciones": [
            "Modificar código para mejorar su estructura sin cambiar su comportamiento",
            "Agregar nuevas funcionalidades",
            "Eliminar código antiguo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la función principal del Product Owner en Scrum?",
        "opciones": [
            "Gestionar el backlog y priorizar requisitos",
            "Facilitar reuniones",
            "Escribir código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un merge en Git?",
        "opciones": [
            "Combinar cambios de diferentes ramas",
            "Eliminar una rama",
            "Descartar cambios"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la ventaja de usar un framework en desarrollo de software?",
        "opciones": [
            "Proporcionar estructuras y herramientas reutilizables",
            "Escribir código desde cero",
            "Reducir la seguridad"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un daily stand-up?",
        "opciones": [
            "Reunión diaria corta para sincronizar al equipo",
            "Revisión mensual del proyecto",
            "Sesión de codificación conjunta"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio KISS en desarrollo de software?",
        "opciones": [
            "Keep It Simple, Stupid – mantener el diseño simple",
            "Mantener código complejo",
            "Agregar muchas funciones"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la diferencia entre 'var' y 'let' en JavaScript?",
        "opciones": [
            "'let' tiene alcance de bloque y 'var' alcance de función",
            "'var' es más rápido",
            "No hay diferencia"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Sprint Backlog?",
        "opciones": [
            "Lista de tareas seleccionadas para el Sprint",
            "Lista de todos los requisitos del proyecto",
            "Documento de diseño técnico"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje es principalmente utilizado para desarrollo backend?",
        "opciones": [
            "Python",
            "HTML",
            "CSS"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa un nodo en una estructura de datos tipo árbol?",
        "opciones": [
            "Elemento con conexiones a otros nodos",
            "Variable global",
            "Función"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la función 'map' en programación?",
        "opciones": [
            "Transformar cada elemento de una lista creando una nueva lista",
            "Filtrar elementos según condición",
            "Eliminar elementos duplicados"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum se realiza al final de cada Sprint?",
        "opciones": [
            "Sprint Review",
            "Sprint Planning",
            "Daily Scrum"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un array multidimensional?",
        "opciones": [
            "Array que contiene otros arrays como elementos",
            "Array con datos mezclados",
            "Variable que cambia de tipo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una excepción en programación?",
        "opciones": [
            "Evento inesperado que interrumpe el flujo normal",
            "Variable sin valor",
            "Función sin retorno"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito del manifiesto ágil?",
        "opciones": [
            "Definir valores y principios para desarrollo ágil",
            "Establecer reglas rígidas",
            "Planificar el proyecto completo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la integración continua (CI)?",
        "opciones": [
            "Práctica de integrar código frecuentemente para detectar errores temprano",
            "Diseñar interfaces",
            "Escribir documentación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función recursiva?",
        "opciones": [
            "Función que se llama a sí misma",
            "Función sin parámetros",
            "Función que retorna nada"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje de programación es más usado para inteligencia artificial?",
        "opciones": [
            "Python",
            "HTML",
            "SQL"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para el control de versiones?",
        "opciones": [
            "Git",
            "Docker",
            "Jenkins"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'impedimento' en Scrum?",
        "opciones": [
            "Obstáculo que bloquea el progreso del equipo",
            "Tarea completada",
            "Error en el código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el rol del equipo de desarrollo en Scrum?",
        "opciones": [
            "Construir el producto",
            "Definir la visión del producto",
            "Gestionar el proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un commit message?",
        "opciones": [
            "Descripción del cambio realizado en un commit",
            "Nombre de la rama",
            "Archivo de código"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el principio DRY?",
        "opciones": [
            "Don't Repeat Yourself - evitar duplicar código",
            "Depurar rápido y ya",
            "Desarrollar rápido y joven"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la 'velocidad' en Scrum?",
        "opciones": [
            "Cantidad de trabajo completado en un Sprint",
            "Velocidad del procesador",
            "Tiempo que tarda el equipo en reunirse"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa HTML?",
        "opciones": [
            "HyperText Markup Language",
            "HyperText Machine Language",
            "HighText Markup Language"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una promesa en JavaScript?",
        "opciones": [
            "Objeto que representa la eventual finalización o fracaso de una operación asíncrona",
            "Función que ejecuta código sincrónico",
            "Variable global"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la retroalimentación en Scrum?",
        "opciones": [
            "Comentarios para mejorar el producto y proceso",
            "Código nuevo",
            "Planificación de tareas"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la palabra 'Kanban'?",
        "opciones": [
            "Tarjeta visual para gestionar tareas",
            "Reunión diaria",
            "Documento de especificación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace un 'merge conflict' en Git?",
        "opciones": [
            "Conflicto al combinar cambios incompatibles",
            "Error de sintaxis",
            "Archivo borrado"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un lenguaje compilado?",
        "opciones": [
            "Lenguaje que se traduce a código máquina antes de ejecutar",
            "Lenguaje interpretado línea a línea",
            "Lenguaje no estructurado"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el objetivo de una prueba unitaria?",
        "opciones": [
            "Verificar que una unidad de código funcione correctamente",
            "Probar todo el sistema",
            "Probar la interfaz gráfica"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un microservicio?",
        "opciones": [
            "Arquitectura que divide una aplicación en servicios pequeños e independientes",
            "Aplicación monolítica",
            "Base de datos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función lambda?",
        "opciones": [
            "Función anónima de una sola expresión",
            "Función con múltiples parámetros",
            "Función recursiva"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el beneficio de usar metodologías ágiles?",
        "opciones": [
            "Mayor adaptabilidad y entrega continua de valor",
            "Planificación rígida",
            "Menor interacción con el cliente"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta es usada para automatizar despliegues?",
        "opciones": [
            "Jenkins",
            "Git",
            "Docker"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un nodo hoja en un árbol binario?",
        "opciones": [
            "Nodo sin hijos",
            "Nodo con dos hijos",
            "Nodo raíz"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un backlog en Scrum?",
        "opciones": [
            "Lista priorizada de requisitos",
            "Lista de errores",
            "Plan de proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un bug tracker?",
        "opciones": [
            "Herramienta para registrar y gestionar errores",
            "Editor de código",
            "Compilador"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa 'asíncrono' en programación?",
        "opciones": [
            "Operaciones que no bloquean el flujo principal",
            "Operaciones que bloquean el flujo principal",
            "Operaciones que no retornan valores"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un array en JavaScript?",
        "opciones": [
            "Lista ordenada de elementos",
            "Variable entera",
            "Objeto de configuración"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se usa para definir el estilo visual de una página web?",
        "opciones": [
            "CSS",
            "JavaScript",
            "HTML"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un sprint burndown chart?",
        "opciones": [
            "Gráfico que muestra el trabajo restante durante el Sprint",
            "Reporte de errores",
            "Lista de tareas futuras"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la palabra 'Scrum' en rugby?",
        "opciones": [
            "Formación para reiniciar el juego",
            "Regla del juego",
            "Técnica de pase"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una función callback?",
        "opciones": [
            "Función pasada como argumento a otra función",
            "Función sin retorno",
            "Función anónima"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la técnica TDD?",
        "opciones": [
            "Test-Driven Development - escribir pruebas antes del código",
            "Trabajo de Desarrollo Técnico",
            "Transición de Datos Dinámica"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un constructor en programación orientada a objetos?",
        "opciones": ["Método que inicializa un objeto", "Función que destruye objetos", "Variable especial"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa para estilos en páginas web?",
        "opciones": ["CSS", "JavaScript", "SQL"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace la instrucción 'continue' en un bucle?",
        "opciones": ["Saltar a la siguiente iteración", "Terminar el bucle", "Detener el programa"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un modulo en programación?",
        "opciones": ["Conjunto de funciones y variables agrupadas", "Un error", "Una variable global"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué patrón de diseño facilita la comunicación entre objetos?",
        "opciones": ["Observer", "Factory", "Singleton"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un endpoint en una API REST?",
        "opciones": ["URL para acceder a un recurso", "Variable global", "Función interna"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando de Git crea un tag en el repositorio?",
        "opciones": ["git tag", "git branch", "git tag new"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es 'dead code'?",
        "opciones": ["Código que nunca se ejecuta", "Código duplicado", "Código optimizado"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el evento que inicia un Sprint?",
        "opciones": ["Sprint Planning", "Sprint Review", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué valor de comparación no estricta en JavaScript ignora el tipo?",
        "opciones": ["==", "===", "!="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una HVAC en Agile?",
        "opciones": ["No existe HVAC", "Un termostato", "Un modelo de desarrollo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un pipeline de CI/CD?",
        "opciones": ["Conjunto de etapas automatizadas para construir, probar y desplegar", "Un script de shell", "Un servidor de base de datos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace un trie en estructuras de datos?",
        "opciones": ["Almacena cadenas en formato de árbol", "Ordena números", "Calcula factorial"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se mide en puntos de historia?",
        "opciones": ["Complejidad relativa del trabajo", "Horas de trabajo", "Número de tests"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método elimina el primer elemento de una lista en Python?",
        "opciones": ["pop(0)", "append", "removeLast"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum evalúa lo realizado y recoge feedback?",
        "opciones": ["Sprint Review", "Daily Scrum", "Sprint Planning"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un mock en testing?",
        "opciones": ["Objeto simulado que imita comportamiento real", "Función principal", "Variable global"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el comando 'git fetch'?",
        "opciones": ["Descarga cambios remotos sin integrarlos", "Fusiona ramas", "Crea una nueva rama"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa SOLID en programación?",
        "opciones": ["Cinco principios para diseño orientado a objetos", "Un framework", "Lenguaje nuevo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un stub en testing?",
        "opciones": ["Objeto con comportamiento fijo para pruebas", "Función global", "Archivo de configuración"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una regresión en testing?",
        "opciones": ["Error que reaparece después de cambios", "Nueva funcionalidad", "Variable temporal"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un diagrama UML?",
        "opciones": ["Herramienta para representar estructuras y procesos de software", "Lenguaje de programación", "Framework front-end"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para pruebas end-to-end en web?",
        "opciones": ["Selenium", "Pip", "Npm"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una normalización en bases de datos?",
        "opciones": ["Proceso de organizar datos para reducir redundancia", "Cifrado de datos", "Backup"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un webhook?",
        "opciones": ["Llamada de HTTP triggered por un evento externo", "Variable local", "Web script"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace un garbage collector?",
        "opciones": ["Libera memoria no referenciada automáticamente", "Compila código", "Prueba variables"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un microbenchmark?",
        "opciones": ["Pequeñas pruebas de rendimiento para partes específicas del codebase", "Reunión Scrum", "Ejecución completa del sistema"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica se usa para priorizar backlog con esfuerzo vs valor?",
        "opciones": ["MoSCoW", "TDD", "BDD"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un stub en API?",
        "opciones": ["Implementación simulada de API para testing", "Servicio real", "Cache"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué métrica calcula el tiempo desde que se ingresa una historia hasta su finalización?",
        "opciones": ["Lead time", "Cycle time", "Latency"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Lambda en AWS?",
        "opciones": ["Servicio serverless para ejecutar código bajo demanda", "Función local", "Comando Git"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa CI/CD?",
        "opciones": ["Integración Continua / Entrega Continua", "Control de Integración", "Computación Inmediata"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una API idempotente?",
        "opciones": ["Puede llamarse varias veces sin cambiar el resultado más allá de la primera vez", "No permite llamadas", "Borra datos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la métrica 'throughput' en Kanban?",
        "opciones": ["Número de ítems completados en un periodo", "Velocidad del equipo", "Tamaño del backlog"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué patrón Singleton garantiza?",
        "opciones": ["Solo una instancia de una clase", "Múltiples instancias", "Registro global de funciones"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un contenedor Docker?",
        "opciones": ["Entorno aislado que incluye aplicación y sus dependencias", "Servidor web", "Editor de código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa JSON Web Token (JWT)?",
        "opciones": ["Token seguro basado en JSON", "Archivo de imagen", "Protocolo de red"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la 'production readiness review'?",
        "opciones": ["Evaluación antes de lanzar cambios en producción", "Documentación técnica", "Reunión diaria"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un CDN?",
        "opciones": ["Red de distribución de contenido geográficamente dispersa", "Servidor de base de datos", "Editor web"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando docker construye una imagen?",
        "opciones": ["docker build", "docker run", "docker pull"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un rollback en base de datos?",
        "opciones": ["Revertir una transacción", "Eliminar una tabla", "Insertar datos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es REST en diseño de API?",
        "opciones": ["Representational State Transfer, estilo arquitectónico para APIs HTTP", "Un framework", "Un lenguaje"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para monitoreo de aplicaciones?",
        "opciones": ["Prometheus", "Azure", "Google Docs"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es GitHub Actions?",
        "opciones": ["Herramienta para CI/CD integrada en GitHub", "Editor de texto", "Servidor web"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa UX?",
        "opciones": ["User Experience", "User Execution", "Usage Extension"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el comando 'docker run'?",
        "opciones": ["Ejecuta un contenedor a partir de una imagen", "Construye una imagen", "Elimina un volumen"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un índice compuesto en base de datos?",
        "opciones": ["Índice sobre múltiples columnas", "Índice único", "Índice de texto completo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un CDN?",
        "opciones": ["Red de entrega de contenido", "Disco duro", "Sistema operativo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace un alerta Prometheus?",
        "opciones": ["Notifica al detectar condiciones anormales", "Monitorea logs", "Guarda respaldos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es A/B testing?",
        "opciones": ["Comparar dos versiones de un elemento para medir preferencia", "Reorganizar el backlog", "Duplicar código"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un mock server?",
        "opciones": ["Servidor ficticio que simula API para pruebas", "Servidor en producción", "Editor web"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es SonarQube?",
        "opciones": ["Herramienta de análisis de calidad de código", "Editor de texto", "Navegador web"],
        "respuesta_correcta": 0
    }
];
export default preguntasData;