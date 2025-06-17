export interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta_correcta: number;
}

const preguntasData: Pregunta[] = [
    {
        "pregunta": "¿Qué estructura de datos usa el algoritmo de búsqueda en amplitud?",
        "opciones": ["Cola", "Pila"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué paradigma sigue Scrum?",
        "opciones": ["Ágil", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de lenguaje es Python?",
        "opciones": ["Interpretado", "Compilado"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento de Scrum se realiza diariamente?",
        "opciones": ["Daily Scrum", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una función pura tiene efectos secundarios?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para control de versiones?",
        "opciones": ["Git", "Docker"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El Product Owner prioriza el backlog?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿HTML es un lenguaje de programación?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una API REST usa típicamente HTTP?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La recursividad puede reemplazar la iteración?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum tiene roles definidos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿SQL se usa para bases de datos relacionales?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un objeto es una instancia de una clase?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La programación funcional evita el estado mutable?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum recomienda Sprints de duración fija?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿'==' compara valor y tipo en JavaScript?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El framework Django es para Python?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Kanban limita el trabajo en progreso (WIP)?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un 'array' puede tener tamaño dinámico en C?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿CSS se usa para definir estilos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum prescribe roles como DevOps?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿JSON es un formato de texto?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una variable 'const' en JavaScript se puede reasignar?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La complejidad O(n) es mejor que O(log n)?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Los Sprints en Scrum deben durar entre 1 y 4 semanas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿GitHub es un sistema de control de versiones?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿El framework Angular usa TypeScript?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un árbol binario de búsqueda permite duplicados?",
        "opciones": ["Depende de la implementación", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum recomienda retrospectivas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una API pública es accesible sin autenticación por defecto?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La encapsulación oculta detalles internos de una clase?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un for-loop puede ser reemplazado por while?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Scrum, el equipo de desarrollo se autoorganiza?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum se basa en la inspección y adaptación?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un commit en Git es irreversible?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una clase puede heredar de varias clases en Java?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Java es fuertemente tipado?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum puede aplicarse a proyectos no software?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una función puede devolver múltiples valores en Python?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El backlog es responsabilidad del Scrum Master?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El ciclo de vida de Scrum incluye planificación?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La agilidad prioriza individuos y colaboración?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una interfaz puede tener métodos implementados en Java 8+?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El rol de Scrum Master es jerárquico?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un pull request es una solicitud de fusión?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una excepción no controlada detiene el programa?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El Sprint Backlog es estático?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una promesa en JavaScript se puede encadenar?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El testing unitario prueba toda la aplicación?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un Sprint puede ser cancelado?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum se basa en un enfoque iterativo?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El lenguaje C es orientado a objetos?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El Scrum Master facilita las ceremonias?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿JavaScript es un lenguaje tipado estáticamente?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El Product Owner representa al cliente?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un archivo .py es código Python?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El framework Spring es para Python?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un Sprint puede tener tareas de mantenimiento?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Git permite crear ramas (branches)?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿CSS puede definir animaciones?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La planificación de Sprint ocurre antes del Sprint?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una función anónima tiene nombre?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Python usa indentación para bloques?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum utiliza el término 'épica' formalmente?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un método 'static' en Java pertenece a la clase?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El manifiesto ágil favorece procesos rígidos?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una lista enlazada permite inserciones rápidas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una función puede retornar otra función?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Los Sprints deben ser de duración variable?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿HTML5 incluye soporte para video?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una excepción puede capturarse con try/catch?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Scrum, el equipo decide cómo hacer el trabajo?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿SQL es un lenguaje declarativo?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El método main en Java es el punto de entrada?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum es adecuado solo para grandes empresas?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un bucle infinito puede colgar un programa?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Las historias de usuario deben tener valor para el usuario?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Python, 'None' indica ausencia de valor?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un Sprint puede durar 3 semanas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿React es un framework de backend?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una variable global se puede acceder desde cualquier parte?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum Master asigna tareas al equipo?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una clase puede implementar múltiples interfaces?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Las pruebas unitarias detectan errores tempranos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un diccionario en Python usa claves únicas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum tiene un Product Backlog Refinement?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La herencia múltiple está permitida en Python?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Scrum hay entregas frecuentes de valor?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Docker se usa para contenerizar aplicaciones?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿CSS puede ser usado para diseño responsivo?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Scrum el Sprint Planning se hace con todo el equipo?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Java compila a bytecode para la JVM?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una promesa en JavaScript puede estar pendiente?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La retrospección busca mejorar procesos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una excepción lanzada sin captura termina el programa?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum puede usarse con DevOps?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una tabla en SQL puede tener clave primaria?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Las variables en JavaScript pueden ser declaradas con let?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum tiene entregas al final de cada Sprint?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum define roles específicos en el equipo?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El ciclo de vida de desarrollo ágil es secuencial?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿JavaScript se ejecuta en el navegador?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Scrum hay reuniones diarias obligatorias?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Python es un lenguaje compilado?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El Sprint Review evalúa el trabajo entregado?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿CSS define estilos visuales de una página web?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Kanban tiene iteraciones fijas como Scrum?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un commit en Git guarda cambios en el repositorio local?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Agile busca adaptabilidad al cambio?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una variable booleana puede ser verdadera o falsa?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El Product Owner prioriza el backlog?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿HTML puede contener scripts en JavaScript?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El objetivo de Scrum es entregar valor continuamente?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En Python, 'def' define una función?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum tiene roles como Líder Técnico?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una API permite la comunicación entre sistemas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿SQL se usa para acceder a bases de datos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una clase abstracta puede tener métodos implementados?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Agile es un marco de trabajo prescriptivo?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Java puede ejecutarse en múltiples plataformas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum enfatiza el trabajo en equipo y la transparencia?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El método 'push' en JavaScript agrega elementos al final del array?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El manifiesto ágil tiene 4 valores y 12 principios?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una interfaz puede contener implementación en Java?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una excepción no controlada puede detener un programa?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum tiene entregables en cada Sprint?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una función puede devolver múltiples valores en Python?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La retrospectiva ocurre al inicio del Sprint?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Los test unitarios son parte de TDD?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿GitHub es una plataforma de control de versiones?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El método 'pop' en una lista elimina el último elemento?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El manifiesto ágil valora individuos sobre procesos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un objeto es una instancia de una clase?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿La daily Scrum tiene una duración máxima recomendada?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El backlog contiene requisitos priorizados?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿React se basa en componentes reutilizables?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un algoritmo de ordenamiento puede ser estable o inestable?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum tiene una duración máxima para los Sprints?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un constructor se invoca al crear un objeto?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Una estructura de datos FIFO entrega primero lo más nuevo?",
        "opciones": ["No", "Sí"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Las historias de usuario deben ser negociables?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Las promesas en JavaScript pueden ser encadenadas?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Scrum enfatiza entregas pequeñas y frecuentes?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El método POST en HTTP modifica datos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿El rol del Scrum Master incluye remover impedimentos?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un bug es un error en el software?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Un Sprint Backlog puede cambiar durante el Sprint?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Las pruebas automatizadas permiten detectar errores rápido?",
        "opciones": ["Sí", "No"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de estructura sigue una pila?",
        "opciones": ["LIFO", "FIFO"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el rol principal que representa al cliente en Scrum?",
        "opciones": ["Product Owner", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se utiliza para estructurar contenido en la web?",
        "opciones": ["HTML", "Python"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método JavaScript transforma cada elemento de un array?",
        "opciones": ["map", "filter"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Quién es responsable de remover impedimentos en Scrum?",
        "opciones": ["Scrum Master", "Product Owner"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador lógico representa la conjunción?",
        "opciones": ["&&", "||"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se utiliza más comúnmente para bases de datos relacionales?",
        "opciones": ["SQL", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué artefacto contiene la lista priorizada de requisitos en Scrum?",
        "opciones": ["Product Backlog", "Sprint Backlog"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el evento de Scrum para inspeccionar y adaptar el proceso?",
        "opciones": ["Sprint Retrospective", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de dato almacena verdadero o falso?",
        "opciones": ["Boolean", "String"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave se usa para declarar una constante en JavaScript?",
        "opciones": ["const", "let"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de datos utiliza claves y valores?",
        "opciones": ["Diccionario", "Lista"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento marca el inicio del Sprint en Scrum?",
        "opciones": ["Sprint Planning", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje de programación es más utilizado para análisis de datos?",
        "opciones": ["Python", "C++"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método en JavaScript agrega un elemento al final de un array?",
        "opciones": ["push", "shift"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué parte del Scrum Team se encarga de desarrollar el producto?",
        "opciones": ["Developers", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo de vida es iterativo e incremental?",
        "opciones": ["Ágil", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el bucle que se ejecuta mientras una condición sea verdadera?",
        "opciones": ["while", "for"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje es más comúnmente utilizado para el frontend?",
        "opciones": ["JavaScript", "Ruby"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta permite el control de versiones de código?",
        "opciones": ["Git", "Excel"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué framework se usa comúnmente para pruebas unitarias en Java?",
        "opciones": ["JUnit", "Django"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador en Python sirve para exponenciación?",
        "opciones": ["**", "^"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es un valor por defecto común de inicialización para una variable booleana?",
        "opciones": ["false", "true"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué elemento de Scrum permite revisar lo entregado en el Sprint?",
        "opciones": ["Sprint Review", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué etiqueta en HTML se usa para encabezados principales?",
        "opciones": ["<h1>", "<p>"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método en JavaScript ordena los elementos de un array?",
        "opciones": ["sort", "join"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué valor devuelve una promesa resuelta?",
        "opciones": ["fulfilled", "rejected"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad de CSS cambia el tamaño del texto?",
        "opciones": ["font-size", "color"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura almacena elementos sin orden en Python?",
        "opciones": ["set", "list"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método se usa para eliminar el último elemento de un array en JavaScript?",
        "opciones": ["pop", "shift"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función de Python obtiene la longitud de una lista?",
        "opciones": ["len()", "count()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál de estos es un principio ágil?",
        "opciones": ["Colaboración con el cliente", "Documentación exhaustiva"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué atributo HTML se usa para definir un enlace?",
        "opciones": ["href", "src"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa comúnmente para tableros Kanban?",
        "opciones": ["Trello", "Excel"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál de estos es un rol de Scrum?",
        "opciones": ["Scrum Master", "Project Coordinator"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave define una función en JavaScript?",
        "opciones": ["function", "method"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de dato es '42' en JavaScript sin comillas?",
        "opciones": ["number", "string"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo de vida incluye entregas frecuentes de software funcional?",
        "opciones": ["Ágil", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador se usa para asignar un valor?",
        "opciones": ["=", "=="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje de programación tiene tipado dinámico?",
        "opciones": ["Python", "C++"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum ocurre cada día y es breve?",
        "opciones": ["Daily Scrum", "Sprint Planning"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué símbolo se usa para comentarios de una línea en Java?",
        "opciones": ["//", "/*"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de JavaScript ejecuta una función sobre cada elemento de un array?",
        "opciones": ["forEach", "reduce"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué principio de agilidad prioriza individuos sobre procesos?",
        "opciones": ["Manifesto Ágil", "PMBOK"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de datos se usa para representar texto en Python?",
        "opciones": ["str", "int"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué etiqueta HTML se usa para listas no ordenadas?",
        "opciones": ["<ul>", "<ol>"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol define el contenido del Product Backlog?",
        "opciones": ["Product Owner", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo de vida requiere especificaciones completas al inicio?",
        "opciones": ["Cascada", "Ágil"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función de Python devuelve el valor absoluto?",
        "opciones": ["abs()", "round()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de bucle en Python garantiza al menos una ejecución?",
        "opciones": ["while", "do-while (simulado)"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué lenguaje se usa más comúnmente para scripts en servidores web?",
        "opciones": ["PHP", "CSS"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué elemento del equipo Scrum maximiza el valor del producto?",
        "opciones": ["Product Owner", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de control permite múltiples condiciones en Java?",
        "opciones": ["switch", "if"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de prueba se hace antes de subir a producción?",
        "opciones": ["Pruebas de integración", "Pruebas unitarias"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué metodología favorece entregas frecuentes y feedback continuo?",
        "opciones": ["Agile", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa para construir interfaces móviles con React?",
        "opciones": ["JavaScript", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué framework se usa para desarrollar APIs REST en Python?",
        "opciones": ["Flask", "Bootstrap"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué atributo HTML define una imagen?",
        "opciones": ["src", "href"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento en Scrum revisa el incremento del producto?",
        "opciones": ["Sprint Review", "Daily Scrum"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué principio ágil sugiere mantener un ritmo sostenible?",
        "opciones": ["Trabajo constante", "Trabajo extensivo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador sirve para concatenar en JavaScript?",
        "opciones": ["+", "&"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de datos puede almacenar múltiples tipos en Python?",
        "opciones": ["Lista", "Entero"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo de vida requiere adaptabilidad constante?",
        "opciones": ["Ágil", "Secuencial"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol facilita la implementación de Scrum?",
        "opciones": ["Scrum Master", "QA Tester"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de variable no puede cambiar su valor?",
        "opciones": ["Constante", "Variable"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa comúnmente para scripting en Unix?",
        "opciones": ["Bash", "Swift"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta permite desplegar contenedores fácilmente?",
        "opciones": ["Docker", "Apache"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura representa una cola?",
        "opciones": ["FIFO", "LIFO"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para gestión de versiones?",
        "opciones": ["Git", "Photoshop"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa refactorizar código?",
        "opciones": ["Mejorar sin cambiar su comportamiento", "Agregar nuevas funcionalidades"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa con Node.js?",
        "opciones": ["JavaScript", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una historia de usuario?",
        "opciones": ["Una funcionalidad descrita desde el punto de vista del usuario", "Una tarea técnica"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué componente de Scrum determina qué se puede hacer en el Sprint?",
        "opciones": ["Sprint Planning", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando en Git guarda cambios localmente?",
        "opciones": ["commit", "clone"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de dato almacena verdadero o falso?",
        "opciones": ["boolean", "char"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué concepto representa el conjunto de prácticas ágiles?",
        "opciones": ["Manifiesto Ágil", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de estructura usa llaves para definir pares clave-valor?",
        "opciones": ["Diccionario", "Lista"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de reunión en Scrum es diaria y breve?",
        "opciones": ["Daily Scrum", "Sprint Planning"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo de vida de proyecto permite cambios continuos?",
        "opciones": ["Ágil", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de error ocurre cuando no se respetan las reglas del lenguaje?",
        "opciones": ["Error de sintaxis", "Error lógico"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de bucle tiene condición al inicio?",
        "opciones": ["while", "do-while (simulado)"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta organiza trabajo en tableros visuales?",
        "opciones": ["Kanban", "Burndown Chart"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué librería JavaScript se enfoca en la interfaz de usuario?",
        "opciones": ["React", "Django"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador es usado para igualdad estricta en JavaScript?",
        "opciones": ["===", "=="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué artefacto de Scrum contiene trabajo a realizar en el Sprint?",
        "opciones": ["Sprint Backlog", "Product Increment"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave se usa en Python para definir funciones?",
        "opciones": ["def", "func"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de control se usa para repetir bloques de código?",
        "opciones": ["bucle", "condición"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué expresión se evalúa primero en operaciones matemáticas?",
        "opciones": ["Paréntesis", "Multiplicación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando clona un repositorio remoto en Git?",
        "opciones": ["git clone", "git init"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se revisa en una retrospectiva de Sprint?",
        "opciones": ["El proceso", "El incremento del producto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa DRY en programación?",
        "opciones": ["Don't Repeat Yourself", "Define Real Yield"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum permite planear qué se trabajará en el Sprint?",
        "opciones": ["Sprint Planning", "Daily Scrum"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando en la terminal crea un entorno virtual en Python?",
        "opciones": ["python -m venv", "pip install"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura permite iterar sobre pares clave-valor?",
        "opciones": ["diccionario", "lista"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de datos permite almacenar verdadero/falso en Java?",
        "opciones": ["boolean", "byte"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta es útil para automatizar la integración continua?",
        "opciones": ["Jenkins", "Excel"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje usa 'print' para mostrar texto?",
        "opciones": ["Python", "C++"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa principalmente para desarrollo de aplicaciones Android?",
        "opciones": ["Kotlin", "Ruby"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol en Scrum es responsable de eliminar impedimentos?",
        "opciones": ["Scrum Master", "Product Owner"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura permite almacenar datos únicos sin orden específico?",
        "opciones": ["Set", "List"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo de vida de desarrollo enfatiza entregas incrementales?",
        "opciones": ["Ágil", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador se usa para la comparación en Python?",
        "opciones": ["==", "="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum inspecciona cómo fue el trabajo durante el Sprint?",
        "opciones": ["Sprint Retrospective", "Sprint Planning"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la forma correcta de declarar una constante en JavaScript?",
        "opciones": ["const", "var"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para gestión de dependencias en Node.js?",
        "opciones": ["npm", "curl"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el valor inicial de un booleano en muchos lenguajes?",
        "opciones": ["false", "true"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué práctica busca entregar software funcional con frecuencia?",
        "opciones": ["Integración continua", "Despliegue anual"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje utiliza bloques de código indentados en lugar de llaves?",
        "opciones": ["Python", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué artefacto en Scrum prioriza funcionalidades del producto?",
        "opciones": ["Product Backlog", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave se usa para herencia en Java?",
        "opciones": ["extends", "implements"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica divide el desarrollo en bloques de tiempo fijos?",
        "opciones": ["Sprints", "Milestones"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la forma correcta de imprimir en consola en Python?",
        "opciones": ["print()", "echo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de datos funciona como pila?",
        "opciones": ["LIFO", "FIFO"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje es fuertemente tipado de forma estática?",
        "opciones": ["Java", "JavaScript"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué documento guía el desarrollo en una metodología ágil?",
        "opciones": ["Manifiesto Ágil", "Contrato de proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué elemento define estilos en una página web?",
        "opciones": ["CSS", "HTML"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué formato de datos es ampliamente usado para APIs?",
        "opciones": ["JSON", "CSV"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje usa `.py` como extensión de archivo?",
        "opciones": ["Python", "Perl"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta muestra visualmente el progreso en Scrum?",
        "opciones": ["Burndown chart", "Gantt chart"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura permite acceso a elementos por clave?",
        "opciones": ["Diccionario", "Lista"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS cambia el tamaño de la fuente?",
        "opciones": ["font-size", "text-style"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se busca en una retrospectiva?",
        "opciones": ["Mejoras al proceso", "Validar requerimientos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método permite recorrer un array en JavaScript?",
        "opciones": ["forEach", "slice"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol prioriza las historias de usuario?",
        "opciones": ["Product Owner", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método convierte texto a número en JavaScript?",
        "opciones": ["parseInt()", "split()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de error aparece al dividir por cero?",
        "opciones": ["Error en tiempo de ejecución", "Error de sintaxis"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué componente almacena los requerimientos funcionales?",
        "opciones": ["Product Backlog", "Incremento"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el incremento en Scrum?",
        "opciones": ["Producto potencialmente entregable", "Plan de tareas"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando de Git muestra cambios sin guardar?",
        "opciones": ["git status", "git commit"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se usa para documentar APIs?",
        "opciones": ["Swagger", "MySQL"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de bucle en C ejecuta primero y luego evalúa?",
        "opciones": ["do-while", "for"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje es común para scripts en páginas web?",
        "opciones": ["JavaScript", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa un Pull Request?",
        "opciones": ["Solicitud de integración de código", "Despliegue automático"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa MVP en metodologías ágiles?",
        "opciones": ["Producto Mínimo Viable", "Valor Máximo del Producto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de prueba verifica unidades individuales de código?",
        "opciones": ["Pruebas unitarias", "Pruebas de aceptación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué componente Scrum establece el objetivo del Sprint?",
        "opciones": ["Sprint Goal", "Product Increment"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa TDD?",
        "opciones": ["Desarrollo guiado por pruebas", "Diseño técnico detallado"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo busca responder rápido a cambios?",
        "opciones": ["Iterativo", "Lineal"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué atributo HTML se usa para enlaces?",
        "opciones": ["href", "src"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS posiciona elementos en una grilla?",
        "opciones": ["display: grid", "align-items"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje usa `System.out.println` para imprimir?",
        "opciones": ["Java", "Python"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta mide la velocidad de un equipo ágil?",
        "opciones": ["Burndown chart", "Backlog grooming"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad JavaScript se usa para longitud de array?",
        "opciones": ["length", "size"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica se usa para detectar errores al escribir código?",
        "opciones": ["Linting", "Minificación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Sprint Backlog?",
        "opciones": ["Trabajo comprometido para el Sprint", "Ideas futuras"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué patrón de diseño crea solo una instancia de clase?",
        "opciones": ["Singleton", "Observer"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje de programación se usa principalmente para el desarrollo web del lado del cliente?",
        "opciones": ["JavaScript", "Python"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función se utiliza en JavaScript para esperar una promesa?",
        "opciones": ["await", "delay"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué elemento HTML se utiliza para insertar una imagen?",
        "opciones": ["<img>", "<media>"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica de testing se enfoca en probar rutas individuales de código?",
        "opciones": ["Pruebas unitarias", "Pruebas de integración"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué característica permite reutilizar código en POO?",
        "opciones": ["Herencia", "Compilación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave define una variable en JavaScript que no cambia?",
        "opciones": ["const", "let"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol en Scrum representa al cliente o usuario final?",
        "opciones": ["Product Owner", "Scrum Master"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la unidad básica de código en Java?",
        "opciones": ["Clase", "Archivo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje se usa comúnmente para consultas a bases de datos?",
        "opciones": ["SQL", "HTML"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué artefacto Scrum contiene el trabajo a realizar en un Sprint?",
        "opciones": ["Sprint Backlog", "Product Increment"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave define una función en Python?",
        "opciones": ["def", "func"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura almacena pares clave-valor en JavaScript?",
        "opciones": ["Objeto", "Array"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo del refinamiento del backlog?",
        "opciones": ["Clarificar y priorizar ítems", "Medir velocidad del equipo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando se usa para crear una nueva rama en Git?",
        "opciones": ["git branch", "git commit"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS controla el espaciado interno?",
        "opciones": ["padding", "margin"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica de diseño evita el acoplamiento entre objetos?",
        "opciones": ["Inversión de dependencias", "Herencia múltiple"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el ciclo iterativo de Scrum?",
        "opciones": ["Sprint", "Release"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de array en JavaScript crea una nueva lista transformada?",
        "opciones": ["map", "pop"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando actualiza tu repositorio local desde el remoto?",
        "opciones": ["git pull", "git push"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la forma correcta de declarar una función anónima en JavaScript?",
        "opciones": ["()=>{}", "function()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué componente Scrum define lo que se va a hacer en un Sprint?",
        "opciones": ["Sprint Planning", "Daily Scrum"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método elimina el último elemento de un array en JavaScript?",
        "opciones": ["pop", "shift"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad de CSS alinea texto al centro?",
        "opciones": ["text-align: center", "justify-content: center"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta de control de versiones es más usada en desarrollo?",
        "opciones": ["Git", "SVN"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué formato es más utilizado para intercambio de datos web?",
        "opciones": ["JSON", "XML"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el tipo de ciclo de vida de desarrollo de software iterativo?",
        "opciones": ["Ágil", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador se usa en Python para comprobar pertenencia?",
        "opciones": ["in", "=="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum evalúa el incremento del producto?",
        "opciones": ["Sprint Review", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando crea un nuevo repositorio Git?",
        "opciones": ["git init", "git add"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué elemento HTML contiene el contenido visible de la página?",
        "opciones": ["<body>", "<head>"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave en JavaScript declara una variable global?",
        "opciones": ["var", "let"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de prueba valida componentes combinados?",
        "opciones": ["Pruebas de integración", "Pruebas unitarias"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se utiliza en HTML para agrupar contenido semántico?",
        "opciones": ["<section>", "<br>"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica ayuda a reducir la deuda técnica continuamente?",
        "opciones": ["Refactorización", "Compilación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS establece el tipo de fuente?",
        "opciones": ["font-family", "font-color"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave crea una clase en Java?",
        "opciones": ["class", "object"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de variable existe solo dentro de su función?",
        "opciones": ["Local", "Global"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS controla el tamaño de un elemento?",
        "opciones": ["width", "visibility"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa DRY en desarrollo?",
        "opciones": ["Don't Repeat Yourself", "Develop Rapidly Yourself"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git guarda cambios localmente con mensaje?",
        "opciones": ["git commit", "git clone"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo se basa en planear, hacer, verificar y actuar?",
        "opciones": ["PDCA", "PEPS"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función JavaScript convierte string en número decimal?",
        "opciones": ["parseFloat", "toString"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de array filtra elementos según condición?",
        "opciones": ["filter", "concat"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando en Git muestra los últimos commits?",
        "opciones": ["git log", "git revert"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué metodología divide el trabajo en ciclos iterativos cortos?",
        "opciones": ["Scrum", "RUP"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador JavaScript compara tipo y valor?",
        "opciones": ["===", "=="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento diario revisa el progreso en Scrum?",
        "opciones": ["Daily Scrum", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de error impide compilar el código?",
        "opciones": ["Error de sintaxis", "Error de lógica"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje de programación es interpretado y orientado a objetos?",
        "opciones": ["Python", "C++"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum es para planificar el trabajo del Sprint?",
        "opciones": ["Sprint Planning", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave se usa para declarar variables que cambian en JavaScript?",
        "opciones": ["let", "const"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de control usa condiciones en Python?",
        "opciones": ["if", "switch"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de ciclo se usa para repetir hasta que se cumpla una condición?",
        "opciones": ["while", "for"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Product Backlog en Scrum?",
        "opciones": ["Lista priorizada de requisitos", "Plan de pruebas"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git sube los cambios al repositorio remoto?",
        "opciones": ["git push", "git pull"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS controla la opacidad de un elemento?",
        "opciones": ["opacity", "visibility"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra reservada en Java define una clase?",
        "opciones": ["class", "struct"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de array en JavaScript agrega un elemento al final?",
        "opciones": ["push", "pop"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa MVP en desarrollo ágil?",
        "opciones": ["Producto mínimo viable", "Máximo valor posible"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum permite que el equipo se autoorganice?",
        "opciones": ["Daily Scrum", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador en JavaScript compara valores y tipo?",
        "opciones": ["===", "=="],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué lenguaje de programación se usa para desarrollo iOS?",
        "opciones": ["Swift", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función en Python imprime en pantalla?",
        "opciones": ["print()", "echo()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de testing verifica integración entre módulos?",
        "opciones": ["Pruebas de integración", "Pruebas unitarias"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum revisa el producto entregado al final del Sprint?",
        "opciones": ["Sprint Review", "Sprint Planning"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué etiqueta HTML crea un enlace?",
        "opciones": ["<a>", "<link>"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave en JavaScript crea una función anónima?",
        "opciones": ["function", "var"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo Scrum dura generalmente entre 1 y 4 semanas?",
        "opciones": ["Sprint", "Release"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS cambia el color de fondo?",
        "opciones": ["background-color", "color"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura de datos permite acceso rápido por clave?",
        "opciones": ["Diccionario", "Lista"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum es diario y dura máximo 15 minutos?",
        "opciones": ["Daily Scrum", "Sprint Retrospective"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git clona un repositorio remoto?",
        "opciones": ["git clone", "git fetch"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una historia de usuario en Scrum?",
        "opciones": ["Descripción simple de funcionalidad", "Código fuente"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra en Python define un bucle?",
        "opciones": ["for", "loop"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador en JavaScript realiza concatenación de cadenas?",
        "opciones": ["+", "&"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave en Java declara una constante?",
        "opciones": ["final", "const"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum se usa para reflexionar sobre el proceso?",
        "opciones": ["Sprint Retrospective", "Sprint Review"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función en JavaScript convierte texto en número entero?",
        "opciones": ["parseInt()", "toString()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué estructura en programación almacena pares clave-valor?",
        "opciones": ["Mapa (Map)", "Array"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa la sigla API en desarrollo de software?",
        "opciones": ["Interfaz de Programación de Aplicaciones", "Archivo de Protocolo Interno"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git deshace cambios en el área de trabajo?",
        "opciones": ["git checkout -- archivo", "git revert"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica en agilidad busca mejorar procesos constantemente?",
        "opciones": ["Kaizen", "Waterfall"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS controla la visibilidad de un elemento?",
        "opciones": ["visibility", "display"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra clave en Java crea un objeto nuevo?",
        "opciones": ["new", "create"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función JavaScript añade elementos al principio de un array?",
        "opciones": ["unshift()", "push()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum se realiza al final de un Sprint?",
        "opciones": ["Sprint Review", "Sprint Planning"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué función en Python devuelve la longitud de una lista?",
        "opciones": ["len()", "size()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué tipo de prueba valida todo el sistema funcionando junto?",
        "opciones": ["Pruebas de sistema", "Pruebas unitarias"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador lógico representa la conjunción?",
        "opciones": ["&&", "||"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git muestra los cambios sin confirmar?",
        "opciones": ["git status", "git diff"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum ayuda a planificar y revisar tareas pendientes?",
        "opciones": ["Sprint Planning", "Daily Scrum"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de array en JavaScript devuelve un nuevo array filtrado?",
        "opciones": ["filter()", "map()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué palabra en Python inicia un bloque except?",
        "opciones": ["except", "catch"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando Git guarda los cambios en un commit local?",
        "opciones": ["git commit", "git add"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica de agilidad promueve entregas frecuentes y feedback?",
        "opciones": ["Iterativa e incremental", "Cascada"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum tiene lugar todos los días a la misma hora?",
        "opciones": ["Daily Scrum", "Sprint Review"],
        "respuesta_correcta": 0
    }
];
export default preguntasData;
