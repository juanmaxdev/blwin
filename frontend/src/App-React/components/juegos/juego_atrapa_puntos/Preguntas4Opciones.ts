
export interface Pregunta {
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
}

const preguntasData: Pregunta[] = [
    {
        "pregunta": "¿Qué hace el operador '===' en JavaScript?",
        "opciones": ["Compara solo el valor", "Asigna un valor", "Compara valor y tipo", "Convierte una variable a string"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué estructura se usa para repetir mientras una condición sea verdadera en muchos lenguajes?",
        "opciones": ["if", "switch", "while", "try"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál de estos no es un lenguaje de programación?",
        "opciones": ["Python", "HTML", "Java", "C++"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué palabra clave define una función en Python?",
        "opciones": ["function", "def", "fun", "define"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa 'null' en muchos lenguajes?",
        "opciones": ["Un número negativo", "Una cadena vacía", "Ausencia de valor", "Un error"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "En C, ¿cómo se inicia la función principal?",
        "opciones": ["func main()", "def main():", "int main()", "Main()"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el resultado de 2 + '2' en JavaScript?",
        "opciones": ["4", "22", "NaN", "undefined"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué tipo de dato es true en Java?",
        "opciones": ["int", "boolean", "String", "char"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la salida de print(3 * 'a') en Python?",
        "opciones": ["aaa", "SyntaxError", "3a", "Error"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa SQL?",
        "opciones": ["Structured Query Language", "Simple Query Language", "Structured Question Language", "Simple Question Language"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Para qué se usa Git?",
        "opciones": ["Diseño gráfico", "Control de versiones", "Cálculos", "Testing"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué comando clona un repositorio en Git?",
        "opciones": ["git init", "git clone", "git pull", "git commit"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué etiqueta se usa para enlazar una hoja de estilos CSS en HTML?",
        "opciones": ["<script>", "<link>", "<style>", "<css>"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "En Java, ¿qué palabra clave crea una instancia de un objeto?",
        "opciones": ["new", "create", "instantiate", "make"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué valor devuelve una función sin return en Python?",
        "opciones": ["0", "None", "undefined", "false"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "En JavaScript, ¿cómo defines una función anónima guardada en variable?",
        "opciones": ["var f = function() {}", "function f() {}", "def f()", "f := function()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador representa 'o lógico' en muchos lenguajes?",
        "opciones": ["&&", "||", "!", "=="],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la salida de 5 % 2?",
        "opciones": ["1", "2", "0", "2.5"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿En qué lenguaje es popular Django?",
        "opciones": ["Ruby", "Java", "Python", "PHP"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué comando compila código C?",
        "opciones": ["python file.c", "javac file.c", "gcc file.c", "run file.c"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa DOM en desarrollo web?",
        "opciones": ["Document Object Model", "Data Object Model", "Document Oriented Map", "Data Oriented Model"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cómo se comenta una línea en Python?",
        "opciones": ["// comentario", "# comentario", "/* comentario */", "<!-- comentario -->"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "En SQL, ¿qué hace SELECT * FROM tabla?",
        "opciones": ["Elimina datos", "Inserta datos", "Muestra todos los campos", "Actualiza datos"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué método convierte una cadena a número en JavaScript?",
        "opciones": ["parseInt()", "toString()", "Number()", "stringToNum()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ciclo se asegura de ejecutarse al menos una vez?",
        "opciones": ["for", "while", "do...while", "if"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué palabra clave detiene un bucle en Python?",
        "opciones": ["stop", "break", "exit", "end"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un array en programación?",
        "opciones": ["Una función", "Una estructura de datos", "Un bucle", "Un tipo nativo de JavaScript"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es una excepción?",
        "opciones": ["Un tipo de dato", "Un error manejable", "Un bucle", "Un objeto de base de datos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cómo capturas excepciones en Java?",
        "opciones": ["if/else", "try/catch", "switch/case", "loop/exit"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa CSS?",
        "opciones": ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Coded Style Syntax"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué símbolo se usa para comentarios en Java?",
        "opciones": ["#", "//", "--", "%%"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué operador se usa para asignar un valor en C++?",
        "opciones": ["==", "=", ":=", "->"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la forma correcta de declarar un array en Java?",
        "opciones": ["int arr()", "array arr[]", "int arr[]", "arr = int[]"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué método convierte un string en entero en Python?",
        "opciones": ["parseInt()", "toInt()", "int()", "str()"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué librería de Python se usa para análisis de datos?",
        "opciones": ["NumPy", "Pandas", "Matplotlib", "Requests"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'loop infinito'?",
        "opciones": ["Un bucle que nunca se ejecuta", "Un bucle que ejecuta una vez", "Un bucle que nunca termina", "Un bucle recursivo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cómo se declara una variable en JavaScript (ES6)?",
        "opciones": ["var", "let", "define", "dim"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué hace el método push() en JavaScript?",
        "opciones": ["Elimina un elemento", "Agrega un elemento al final", "Ordena el array", "Reemplaza un valor"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué estructura de datos sigue LIFO?",
        "opciones": ["Queue", "Stack", "Array", "Tree"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué tipo de lenguaje es Python?",
        "opciones": ["Compilado", "Interpretado", "Máquina", "Markup"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el operador de incremento en C?",
        "opciones": ["++", "+=", "inc", "+1"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué instrucción crea una clase en Java?",
        "opciones": ["object", "function", "class", "create"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el archivo principal de configuración en Node.js?",
        "opciones": ["index.js", "package.json", "server.js", "main.js"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál no es una estructura de datos común?",
        "opciones": ["Árbol", "Tabla hash", "Cubo mágico", "Pila"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué lenguaje es mejor conocido por desarrollo iOS?",
        "opciones": ["Swift", "Kotlin", "Python", "Java"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa JSON?",
        "opciones": ["Java Standard Object Notation", "JavaScript Object Notation", "Java System Object Name", "Joint Syntax Object Network"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué operador se usa para concatenar strings en Python?",
        "opciones": ["&", "+", ".", "*"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es una función recursiva?",
        "opciones": ["Una que se repite sola", "Una que se llama a sí misma", "Una función grande", "Una función sin argumentos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la sintaxis correcta para un bloque try-catch en Java?",
        "opciones": ["try {} except {}", "try {} catch {}", "try: except:", "try() catch()"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la función principal del compilador?",
        "opciones": ["Diseñar interfaces", "Traducir código fuente", "Escribir código", "Leer archivos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué comando se usa para instalar paquetes en Python?",
        "opciones": ["npm install", "python install", "pip install", "pkg add"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa API?",
        "opciones": ["Application Protocol Interface", "Application Programming Interface", "Advanced Program Interface", "Automated Process Integration"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué método convierte texto a minúsculas en JavaScript?",
        "opciones": ["toLowerCase()", "lowercase()", "convertLower()", "toLower()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es un tipo de bucle en Python?",
        "opciones": ["loop", "repeat", "foreach", "for"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué tecnología se usa para dar estilo a una página web?",
        "opciones": ["HTML", "CSS", "JavaScript", "JSON"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué tipo de lenguaje es Java?",
        "opciones": ["Interpretado", "Compilado", "Markup", "Declarativo"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un IDE?",
        "opciones": ["Un lenguaje", "Un editor de texto", "Entorno de desarrollo", "Un framework"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué método imprime en consola en Python?",
        "opciones": ["echo()", "console.log()", "print()", "write()"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es una variable global?",
        "opciones": ["Una variable visible en todo el código", "Una variable en una función", "Una constante", "Una función"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el backend?",
        "opciones": ["La interfaz del usuario", "El diseño web", "La lógica del servidor", "Los estilos CSS"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué hace el comando 'return' en una función?",
        "opciones": ["Finaliza la ejecución del programa", "Reinicia la función", "Devuelve un valor", "Imprime en consola"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué extensión tienen los archivos de Python?",
        "opciones": [".js", ".java", ".py", ".cpp"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué palabra se usa para heredar una clase en Java?",
        "opciones": ["inherits", "extends", "implements", "uses"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué estructura se usa para manejar múltiples condiciones?",
        "opciones": ["if", "for", "switch", "while"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué símbolo se usa para acceder a propiedades en JavaScript?",
        "opciones": [":", ".", "->", "::"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'boolean'?",
        "opciones": ["Un número", "Un tipo de bucle", "Un valor verdadero o falso", "Una función"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cómo se representa un string en Java?",
        "opciones": ["'texto'", "\"texto\"", "`texto`", "{texto}"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué método en Python permite recorrer una lista?",
        "opciones": ["iterate()", "range()", "loop()", "for"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué hace el operador '!='?",
        "opciones": ["Compara si es igual", "Asigna un valor", "Compara si es diferente", "Concatena cadenas"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué estructura permite almacenar pares clave-valor?",
        "opciones": ["List", "Set", "Tuple", "Dictionary"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué es una promesa en JavaScript?",
        "opciones": ["Un valor booleano", "Un tipo de bucle", "Un valor que puede estar disponible en el futuro", "Una función recursiva"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es la función principal de HTML?",
        "opciones": ["Estilo visual", "Estructura del contenido", "Interactividad", "Base de datos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué se utiliza para declarar una constante en JavaScript?",
        "opciones": ["var", "let", "const", "static"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué tipo de dato es [1, 2, 3] en Python?",
        "opciones": ["tuple", "set", "list", "dict"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es la función de 'console.log()' en JavaScript?",
        "opciones": ["Leer archivos", "Imprimir en consola", "Ejecutar código", "Guardar datos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué operador se usa para 'y lógico' en Python?",
        "opciones": ["||", "and", "&&", "&"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la estructura correcta para un condicional en Python?",
        "opciones": ["if condición:", "if (condición)", "condición ? ...", "if = condición"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método de JavaScript convierte texto en mayúsculas?",
        "opciones": ["toUpper()", "upperCase()", "toUpperCase()", "makeUpper()"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál de los siguientes es un lenguaje de programación funcional?",
        "opciones": ["Java", "Haskell", "C", "HTML"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es una función anónima?",
        "opciones": ["Una función con nombre", "Una función sin nombre", "Una función de red", "Una función dentro de una clase"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la sintaxis para declarar una función en JavaScript?",
        "opciones": ["function nombre() {}", "func nombre()", "def nombre():", "function: nombre()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando se usa para iniciar un proyecto npm?",
        "opciones": ["npm create", "npm install", "npm init", "npm start"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es un módulo en programación?",
        "opciones": ["Un archivo separado que contiene funciones o clases", "Una línea de código", "Un comentario", "Una estructura HTML"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el operador 'typeof' en JavaScript?",
        "opciones": ["Muestra el tipo de dato", "Convierte a string", "Compara variables", "Imprime en consola"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una API REST?",
        "opciones": ["Una base de datos", "Un tipo de API que usa HTTP", "Un entorno gráfico", "Un motor de búsqueda"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué lenguaje se usa principalmente para estilos web?",
        "opciones": ["JavaScript", "Python", "HTML", "CSS"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué función se usa para obtener la longitud de una lista en Python?",
        "opciones": ["length()", "len()", "count()", "size()"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es una expresión regular?",
        "opciones": ["Un tipo de variable", "Un operador", "Una cadena para buscar patrones", "Un tipo de bucle"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es la salida de 2 ** 3 en Python?",
        "opciones": ["6", "9", "8", "5"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué hace 'git status'?",
        "opciones": ["Elimina un archivo", "Muestra el estado actual del repositorio", "Sube archivos al repositorio", "Clona un repositorio"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el valor booleano de 0 en la mayoría de los lenguajes?",
        "opciones": ["true", "false", "null", "undefined"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué estructura de control se utiliza para repetir un bloque de código hasta que una condición sea falsa?",
        "opciones": ["if", "switch", "while", "case"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa SQL?",
        "opciones": ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Server Query Language"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué operador lógico representa 'o' en Python?",
        "opciones": ["||", "or", "&&", "and"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué estructura se usa para almacenar datos únicos en Python?",
        "opciones": ["list", "tuple", "dict", "set"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué tipo de error es 'NullPointerException' en Java?",
        "opciones": ["De sintaxis", "De lógica", "De ejecución", "De tipo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué tipo de lenguaje es HTML?",
        "opciones": ["De programación", "De estilos", "De marcado", "Orientado a objetos"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué lenguaje se usa comúnmente con Django?",
        "opciones": ["Java", "Ruby", "PHP", "Python"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué método elimina el último elemento de un array en JavaScript?",
        "opciones": ["remove()", "pop()", "shift()", "delete()"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el símbolo para comentarios de múltiples líneas en CSS?",
        "opciones": ["<!-- -->", "//", "/* */", "#"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se utiliza para declarar interfaces en TypeScript?",
        "opciones": ["interface", "type", "struct", "class"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la salida de '5 == \"5\"' en JavaScript?",
        "opciones": ["true", "false", "Error", "undefined"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el tipo de dato de una clave en un diccionario de Python?",
        "opciones": ["Cualquiera", "Solo cadenas", "Solo enteros", "Debe ser inmutable"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Cuál de estos no es un sistema de control de versiones?",
        "opciones": ["Git", "Subversion", "Mercurial", "Firebase"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué palabra clave se usa para definir constantes en Java?",
        "opciones": ["const", "define", "final", "static"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué método convierte un número a string en JavaScript?",
        "opciones": ["str()", "toString()", "String()", "parseString()"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cómo se llama la estructura de datos tipo 'árbol binario'?",
        "opciones": ["Una base de datos", "Una lista enlazada", "Un tipo de árbol con dos hijos máximo", "Un conjunto de arrays"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el comando para clonar un repositorio Git?",
        "opciones": ["git fetch", "git pull", "git clone", "git copy"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué hace el operador '===' en JavaScript?",
        "opciones": ["Comparación débil", "Comparación estricta", "Asignación", "Concatenación"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué tipo de lenguaje es CSS?",
        "opciones": ["Lenguaje de programación", "Lenguaje de servidor", "Lenguaje de estilos", "Lenguaje de máquina"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el nombre del bucle que siempre se ejecuta al menos una vez?",
        "opciones": ["while", "for", "do...while", "loop"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué hace el método filter() en JavaScript?",
        "opciones": ["Modifica un array", "Filtra elementos que cumplen una condición", "Ordena elementos", "Agrega elementos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué archivo contiene las dependencias en un proyecto Node.js?",
        "opciones": ["package.json", "index.js", "server.js", "config.json"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el valor de una variable no definida en JavaScript?",
        "opciones": ["null", "NaN", "undefined", "false"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué hace la palabra clave 'break' en un bucle?",
        "opciones": ["Continúa con la siguiente iteración", "Reinicia el bucle", "Finaliza el bucle", "Lanza una excepción"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué estructura de datos funciona como FIFO?",
        "opciones": ["Stack", "Array", "Queue", "Tree"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el símbolo de comentario en Python?",
        "opciones": ["//", "#", "/*", "--"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa OOP?",
        "opciones": ["Open Oriented Programming", "Object Oriented Programming", "Object Operation Processing", "Optimal Object Path"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la función principal de un servidor web?",
        "opciones": ["Compilar código", "Ejecutar comandos", "Servir contenido web al cliente", "Enviar correos"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa 'NaN' en JavaScript?",
        "opciones": ["No action needed", "Not a Number", "New array node", "No assigned name"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa 'compilar' en programación?",
        "opciones": ["Escribir código", "Convertir código fuente a ejecutable", "Depurar errores", "Enviar código a un servidor"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la función del comando 'npm install'?",
        "opciones": ["Inicializar un proyecto", "Actualizar el sistema", "Instalar dependencias", "Eliminar archivos"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué tipo de bucle es ideal para recorrer un arreglo?",
        "opciones": ["if", "for", "switch", "case"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es una variable?",
        "opciones": ["Una función", "Un número", "Un contenedor de datos", "Un operador"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué palabra clave se usa para definir una clase en Python?",
        "opciones": ["function", "class", "def", "struct"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es una 'key' en una base de datos relacional?",
        "opciones": ["Una función", "Un identificador único", "Un número aleatorio", "Un archivo"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué lenguaje se utiliza con React?",
        "opciones": ["Python", "JavaScript", "PHP", "Ruby"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa el valor 'None' en Python?",
        "opciones": ["Falso", "Vacío", "Cero", "Nulo"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué tipo de dato es verdadero o falso?",
        "opciones": ["String", "Boolean", "Integer", "Float"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué palabra clave detiene una función y devuelve un valor?",
        "opciones": ["stop", "break", "end", "return"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Cómo se declaran constantes en Python?",
        "opciones": ["const", "final", "No existe una sintaxis específica", "static"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el resultado de 3 + '3' en JavaScript?",
        "opciones": ["6", "33", "Error", "NaN"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué herramienta se usa para versionar proyectos?",
        "opciones": ["Git", "MySQL", "Node.js", "Postman"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el operador para módulo (resto) en muchos lenguajes?",
        "opciones": ["%", "/", "//", "\\"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cómo se define una función en Python?",
        "opciones": ["function nombre()", "def nombre():", "func nombre()", "define nombre()"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué hace el método 'push()' en JavaScript?",
        "opciones": ["Elimina el último elemento", "Agrega al final del array", "Ordena un array", "Cambia el primer elemento"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la estructura que se comporta como LIFO?",
        "opciones": ["Queue", "Tree", "Stack", "Array"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué comando crea un entorno virtual en Python?",
        "opciones": ["pip install", "python -m venv", "virtualenv init", "env start"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué extensión tiene un archivo JSON?",
        "opciones": [".xml", ".json", ".js", ".txt"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué función de JavaScript convierte texto a número entero?",
        "opciones": ["parseInt()", "int()", "Number()", "toNumber()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué propiedad CSS cambia el color del texto?",
        "opciones": ["text-color", "font-color", "color", "textStyle"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se usa para evitar errores cuando accedemos a recursos que pueden fallar?",
        "opciones": ["if", "try-catch", "loop", "switch"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué librería se usa para el manejo del estado en React?",
        "opciones": ["Lodash", "Axios", "Redux", "Express"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué comando sube los cambios al repositorio remoto en Git?",
        "opciones": ["git commit", "git push", "git pull", "git upload"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el valor de 10 / 2 en Python?",
        "opciones": ["5", "5.0", "5.00", "Error"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué lenguaje se ejecuta del lado del cliente?",
        "opciones": ["PHP", "Java", "JavaScript", "Python"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué hace un compilador?",
        "opciones": ["Traduce el código fuente a lenguaje máquina", "Edita el código", "Imprime el código", "Interpreta paso a paso"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es una expresión booleana?",
        "opciones": ["Una cadena", "Una operación que da verdadero o falso", "Un número", "Un método"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué palabra clave se usa para importar módulos en Python?",
        "opciones": ["include", "require", "import", "load"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué método convierte una cadena JSON en objeto en JavaScript?",
        "opciones": ["parse()", "stringify()", "toJSON()", "JSON.parse()"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué método en Python convierte una cadena en una lista?",
        "opciones": ["split()", "join()", "parse()", "explode()"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué comando se usa para iniciar un nuevo proyecto React?",
        "opciones": ["react-create-app", "npx create-react-app", "npm new react", "node react-init"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa 'CRUD' en desarrollo web?",
        "opciones": ["Create, Read, Update, Delete", "Copy, Run, Undo, Debug", "Compile, Run, Upload, Download", "Create, Rewrite, Upload, Delete"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el resultado de 'typeof null' en JavaScript?",
        "opciones": ["'null'", "'object'", "'undefined'", "'boolean'"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué herramienta es común para hacer peticiones HTTP en JavaScript?",
        "opciones": ["Lodash", "Axios", "Redux", "JQuery"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué operador se usa para concatenar cadenas en JavaScript?",
        "opciones": ["+", "&", ".", ","],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace el operador '&&' en programación?",
        "opciones": ["OR lógico", "AND lógico", "Concatenación", "Negación"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el método correcto para recorrer un diccionario en Python?",
        "opciones": ["for key, value in dict", "for i in dict", "for dict in key", "for key => value in dict"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método se usa para agregar un elemento a un set en Python?",
        "opciones": ["append()", "insert()", "add()", "extend()"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el valor de '2 ** 3' en Python?",
        "opciones": ["6", "8", "9", "5"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué librería se usa en Python para ciencia de datos?",
        "opciones": ["Django", "NumPy", "Flask", "Requests"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué palabra clave en JavaScript define una variable constante?",
        "opciones": ["const", "let", "var", "define"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa el acrónimo API?",
        "opciones": ["Application Programming Interface", "Applied Program Interface", "Advanced Programming Instruction", "App Plugin Interface"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué extensión suele tener un archivo de estilo CSS?",
        "opciones": [".style", ".scss", ".css", ".html"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué método en JavaScript elimina el primer elemento de un array?",
        "opciones": ["pop()", "shift()", "slice()", "remove()"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el propósito del archivo .gitignore?",
        "opciones": ["Ignorar errores de Git", "Evitar el seguimiento de archivos específicos", "Eliminar ramas", "Listar comandos de Git"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué librería se usa para manejar rutas en React?",
        "opciones": ["ReactPath", "ReactRouter", "RouterJS", "ReactNavigation"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué método de JavaScript transforma un objeto en cadena JSON?",
        "opciones": ["parse()", "toString()", "JSON.stringify()", "serialize()"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué palabra clave se usa para herencia en Java?",
        "opciones": ["this", "super", "inherit", "extends"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué estructura de datos tiene claves y valores?",
        "opciones": ["Array", "Set", "List", "Diccionario"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué lenguaje se usa con Flask?",
        "opciones": ["JavaScript", "Python", "Ruby", "Go"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'commit' en Git?",
        "opciones": ["Crear un repositorio", "Subir al servidor", "Guardar cambios en el historial local", "Eliminar archivos"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es un 'callback' en JavaScript?",
        "opciones": ["Una función pasada como argumento", "Un error", "Un operador", "Una clase"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa DOM en desarrollo web?",
        "opciones": ["Document Object Model", "Data Object Method", "Display Output Mode", "DOMino Pattern"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué método devuelve la longitud de una lista en Python?",
        "opciones": ["size()", "count()", "length()", "len()"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué significa la sigla SQL?",
        "opciones": ["Simple Query Language", "Structured Query Language", "Server Query Layer", "Syntax Query Logic"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué hace la función 'map()' en Python?",
        "opciones": ["Filtra elementos", "Transforma elementos", "Agrega elementos", "Ordena elementos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el resultado de 4 == '4' en JavaScript?",
        "opciones": ["true", "false", "undefined", "error"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el símbolo de asignación en la mayoría de lenguajes?",
        "opciones": ["==", ":", "::", "="],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué representa una promesa (Promise) en JavaScript?",
        "opciones": ["Una variable global", "Una función que lanza errores", "Una operación asincrónica", "Un tipo de array"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es Scrum?",
        "opciones": ["Un lenguaje de programación", "Una metodología tradicional", "Un framework ágil", "Un software de gestión"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el rol del Scrum Master?",
        "opciones": ["Es el líder del equipo de desarrollo", "Es el responsable del producto", "Facilita el proceso y elimina impedimentos", "Asigna tareas al equipo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es el Product Backlog?",
        "opciones": ["Un registro de errores", "Una lista priorizada de requisitos del producto", "Un documento de planificación financiera", "Un diagrama de Gantt"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué evento Scrum ocurre diariamente?",
        "opciones": ["Sprint Review", "Sprint Planning", "Daily Scrum", "Retrospective"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se revisa en el Sprint Review?",
        "opciones": ["El rendimiento del equipo", "El incremento del producto", "La planificación del próximo sprint", "Los problemas personales"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el máximo de duración recomendada para un Sprint?",
        "opciones": ["1 semana", "2 semanas", "4 semanas", "No hay límite"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Quién prioriza los elementos del Product Backlog?",
        "opciones": ["Scrum Master", "Equipo de desarrollo", "Product Owner", "Stakeholders"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué representa el término 'incremento' en Scrum?",
        "opciones": ["Horas trabajadas", "Velocidad del equipo", "Producto usable y entregable", "Errores solucionados"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se discute en la Sprint Retrospective?",
        "opciones": ["Qué se entregó", "Qué mejorar como equipo", "Qué priorizar", "Qué tareas se completaron"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un artefacto en Scrum?",
        "opciones": ["Una herramienta de diseño", "Un entregable final", "Un elemento clave del marco de trabajo", "Una actividad repetitiva"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál NO es un artefacto de Scrum?",
        "opciones": ["Product Backlog", "Sprint Backlog", "Incremento", "Gantt Chart"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué mide la 'velocidad' en Scrum?",
        "opciones": ["Tiempo de reuniones", "Tiempo de carga de la app", "Trabajo completado en un Sprint", "Cantidad de errores"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa 'ágil' en el contexto del desarrollo de software?",
        "opciones": ["Entregar más rápido sin calidad", "Seguir un plan rígido", "Adaptarse al cambio y entregar valor continuo", "Reducir el número de programadores"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál de los siguientes es un principio del Manifiesto Ágil?",
        "opciones": ["Procesos y herramientas sobre personas", "Seguimiento estricto del plan", "Documentación exhaustiva", "Colaboración con el cliente"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué es un Sprint Backlog?",
        "opciones": ["Una lista de impedimentos", "El registro de errores", "El plan del Sprint y sus tareas seleccionadas", "El resumen del Sprint anterior"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué NO es responsabilidad del Product Owner?",
        "opciones": ["Maximizar el valor del producto", "Gestionar el Product Backlog", "Priorizar historias de usuario", "Dirigir al equipo de desarrollo"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué se busca en una retrospectiva?",
        "opciones": ["Evaluar al Product Owner", "Definir el próximo Sprint", "Mejorar el proceso", "Calificar al equipo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué representa una historia de usuario?",
        "opciones": ["Un caso de prueba", "Un plan de proyecto", "Un requerimiento descrito desde la perspectiva del usuario", "Una actividad técnica del equipo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el resultado del Sprint Planning?",
        "opciones": ["Incremento del producto", "Plan de Sprint", "Lista de errores", "Informe de progreso"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa TDD?",
        "opciones": ["Team Driven Design", "Technical Delivery Directive", "Test Driven Development", "Time Dependent Development"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué valor de Scrum se relaciona con decir la verdad y ser transparente?",
        "opciones": ["Respeto", "Compromiso", "Transparencia", "Coraje"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es un impedimento en Scrum?",
        "opciones": ["Un error en el código", "Un bloqueo que impide avanzar", "Un conflicto de roles", "Un cambio de sprint"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es una ventaja clave del enfoque ágil?",
        "opciones": ["Desarrollo en cascada", "Flexibilidad ante el cambio", "Documentación extensa", "Fases estrictas"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la duración típica del Daily Scrum?",
        "opciones": ["15 minutos", "1 hora", "45 minutos", "30 minutos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuándo se puede cambiar el contenido del Sprint Backlog?",
        "opciones": ["Nunca", "Durante el Sprint Planning", "En cualquier momento del Sprint", "Cuando el equipo lo necesite"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Scrum es adecuado solo para software?",
        "opciones": ["Sí", "No", "Solo para startups", "Solo en empresas grandes"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Quién puede cancelar un Sprint?",
        "opciones": ["Scrum Master", "Equipo de desarrollo", "Product Owner", "Stakeholders"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué es un Definition of Done (DoD)?",
        "opciones": ["Un acuerdo sobre cuándo una tarea está completa", "Una lista de tareas pendientes", "Un tipo de backlog", "Un error cerrado"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué mide un burn-down chart?",
        "opciones": ["Errores abiertos", "Horas extras", "Trabajo restante en el Sprint", "Tamaño del equipo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Scrum es predictivo o adaptativo?",
        "opciones": ["Predictivo", "Adaptativo", "Ambos", "Ninguno"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el objetivo principal de una metodología ágil?",
        "opciones": ["Reducir costos de infraestructura", "Minimizar el número de reuniones", "Entregar valor frecuentemente al cliente", "Evitar la documentación"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es una característica del desarrollo ágil?",
        "opciones": ["Fases largas y secuenciales", "Planificación detallada al inicio", "Iteraciones cortas y entregables frecuentes", "Entrega única al final del proyecto"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se entiende por 'timebox' en Scrum?",
        "opciones": ["Una herramienta de gestión", "Un marco de tiempo fijo para una actividad", "Una técnica de programación", "Un tipo de backlog"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es una práctica común en metodologías ágiles?",
        "opciones": ["Documentación exhaustiva", "Reuniones diarias de seguimiento", "Asignación jerárquica de tareas", "Gestión centralizada de decisiones"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Quién debe asistir al Daily Scrum?",
        "opciones": ["Todo el equipo Scrum", "Solo el Scrum Master", "Product Owner y Stakeholders", "Gerentes y supervisores"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ocurre si el trabajo planificado no se completa en un Sprint?",
        "opciones": ["Se cancela el proyecto", "Se transfiere al próximo Sprint", "Se ignora", "Se elimina del backlog"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es una ventaja del enfoque ágil?",
        "opciones": ["Menor colaboración del cliente", "Rápida adaptación al cambio", "Más control jerárquico", "Menor visibilidad del avance"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué técnica ayuda a estimar el esfuerzo en Scrum?",
        "opciones": ["MoSCoW", "Kanban", "Planning Poker", "PERT"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa MVP?",
        "opciones": ["Most Valuable Product", "Minimal Viable Product", "Most Validated Process", "Minimum Verified Plan"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué define mejor a un equipo ágil?",
        "opciones": ["Jerárquico y dependiente", "Multidisciplinario y autoorganizado", "Pasivo y receptivo", "Grande y estructurado"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es un rol definido por Scrum?",
        "opciones": ["Business Analyst", "Project Manager", "Scrum Master", "Technical Lead"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es una responsabilidad del equipo de desarrollo?",
        "opciones": ["Asignar prioridades al backlog", "Establecer metas del Sprint", "Estimar y entregar incrementos de valor", "Liderar la retrospectiva"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se discute típicamente en el Daily Scrum?",
        "opciones": ["Planes para el próximo Sprint", "Revisión del código", "Progreso diario y bloqueos", "Informes financieros"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál de los siguientes valores pertenece a Scrum?",
        "opciones": ["Confianza", "Coraje", "Disciplina", "Ambición"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el primer evento en un Sprint?",
        "opciones": ["Daily Scrum", "Sprint Retrospective", "Sprint Review", "Sprint Planning"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué es un Spike en Scrum?",
        "opciones": ["Un error crítico", "Una historia técnica para investigación", "Una mala práctica", "Una sobrecarga de trabajo"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa un 'Epic' en Agile?",
        "opciones": ["Un bug complejo", "Una tarea pequeña", "Una gran funcionalidad dividida en historias", "Un documento legal"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se espera del Product Owner respecto al cliente?",
        "opciones": ["Evitar contacto directo", "Representar sus intereses y necesidades", "Delegar todo al Scrum Master", "Revisar solo los errores"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el foco principal del equipo ágil?",
        "opciones": ["Reducir costos", "Cumplir normas estrictas", "Entregar valor al cliente", "Escribir documentación"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué herramienta visual se usa comúnmente para visualizar el flujo de trabajo?",
        "opciones": ["Mapa de calor", "Burndown chart", "Kanban board", "Wireframe"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué NO forma parte del Manifiesto Ágil?",
        "opciones": ["Individuos y relaciones sobre procesos", "Software funcionando sobre documentación", "Colaboración con el cliente", "Entregar producto al final del proyecto"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Qué evento permite inspeccionar el incremento y adaptar el backlog?",
        "opciones": ["Daily Scrum", "Sprint Planning", "Sprint Review", "Sprint Retrospective"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el propósito del Sprint?",
        "opciones": ["Planear el proyecto entero", "Crear documentación técnica", "Generar un incremento usable del producto", "Hacer mantenimiento del backlog"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es la unidad de medida más usada en Scrum para estimar esfuerzo?",
        "opciones": ["Horas", "Días", "Story Points", "Tareas"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué relación tiene el Scrum Master con el equipo?",
        "opciones": ["Es el jefe directo", "Es su superior jerárquico", "Es un facilitador y guía", "Es un auditor externo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es una práctica recomendada para equipos ágiles distribuidos?",
        "opciones": ["Evitar reuniones diarias", "Documentar poco", "Usar herramientas de colaboración digital", "Trabajar en diferentes zonas horarias sin coordinación"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué representa un 'impedimento' para el equipo?",
        "opciones": ["Un requerimiento nuevo", "Un bloqueo que impide avanzar", "Una mejora de proceso", "Un cambio en el backlog"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué debe incluir la Definition of Done?",
        "opciones": ["Costo del proyecto", "Criterios mínimos de completitud para una entrega", "Duración del Sprint", "Nombres del equipo"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuántos Product Owners hay en un equipo Scrum?",
        "opciones": ["Uno", "Dos", "Depende del tamaño", "Ninguno"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es una señal de un equipo ágil maduro?",
        "opciones": ["Sigue órdenes sin cuestionar", "Se autoorganiza, mejora continuamente y entrega valor frecuente", "Evita la retrospectiva", "Depende del Scrum Master para todo"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál de los siguientes NO es un evento oficial en Scrum?",
        "opciones": ["Sprint Planning", "Daily Scrum", "Sprint Demo", "Sprint Retrospective"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el objetivo del Sprint Planning?",
        "opciones": ["Asignar tareas individuales", "Seleccionar historias y definir cómo se realizarán", "Revisar el backlog completo", "Revisar bugs"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué valor de Scrum está relacionado con ser leal al equipo y a los objetivos?",
        "opciones": ["Compromiso", "Coraje", "Apertura", "Transparencia"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué NO es responsabilidad del Scrum Master?",
        "opciones": ["Eliminar impedimentos", "Asegurar que se sigan los eventos de Scrum", "Asignar tareas al equipo", "Facilitar reuniones"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué define mejor a la retrospectiva del Sprint?",
        "opciones": ["Discusión de bugs técnicos", "Revisión del código", "Revisión del proceso y relaciones del equipo", "Selección de tareas"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué rol en Scrum representa al cliente?",
        "opciones": ["Scrum Master", "Stakeholder", "Product Owner", "Sponsor"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es la principal función de los Stakeholders?",
        "opciones": ["Programar reuniones", "Monitorear el Daily Scrum", "Proporcionar feedback sobre el producto", "Gestionar el Sprint Backlog"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué herramienta se usa para visualizar cuánto trabajo queda en un Sprint?",
        "opciones": ["Gráfico de flujo acumulativo", "Kanban Board", "Burndown Chart", "Matriz de riesgo"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Quién es responsable de crear historias de usuario?",
        "opciones": ["Scrum Master", "Product Owner", "Equipo de Desarrollo", "Tester"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa un 'roadmap' en Agile?",
        "opciones": ["Plan financiero", "Cronograma detallado", "Visión general de entregas futuras", "Lista de bugs"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál de los siguientes NO es un valor ágil?",
        "opciones": ["Colaboración", "Flexibilidad", "Control rígido", "Entrega continua"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué se espera del equipo durante la retrospectiva?",
        "opciones": ["Revisar presupuesto", "Identificar mejoras de proceso", "Cerrar tareas", "Planificar nuevos sprints"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Quién define el objetivo del Sprint?",
        "opciones": ["Product Owner y Equipo de Desarrollo", "Scrum Master", "Stakeholders", "Clientes"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la relación entre Scrum y Agile?",
        "opciones": ["Scrum reemplaza a Agile", "Son lo mismo", "Scrum es un framework ágil", "Agile es una parte de Scrum"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa que un equipo sea 'cross-functional'?",
        "opciones": ["Tiene muchos líderes", "Cada miembro tiene una sola habilidad", "Tiene todas las habilidades necesarias para entregar valor", "Está compuesto por clientes"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué son las historias de usuario?",
        "opciones": ["Casos de prueba", "Requisitos escritos en lenguaje técnico", "Requisitos expresados desde el punto de vista del usuario", "Errores reportados"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué evento de Scrum se usa para inspeccionar y adaptar el producto?",
        "opciones": ["Sprint Planning", "Daily Scrum", "Sprint Review", "Sprint Retrospective"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el entregable principal de un Sprint?",
        "opciones": ["Un informe técnico", "Un incremento del producto usable", "Una reunión con stakeholders", "Un roadmap del próximo Sprint"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuándo se actualiza el Product Backlog?",
        "opciones": ["Una vez al mes", "Solo al principio del proyecto", "De manera continua", "Al final del Sprint"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es el propósito del Kanban en agilidad?",
        "opciones": ["Estimar tareas", "Documentar errores", "Visualizar flujo de trabajo y limitar trabajo en curso", "Generar historias de usuario"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cómo se mide la eficiencia de un equipo ágil?",
        "opciones": ["Horas trabajadas", "Cumplimiento del cronograma", "Valor entregado y mejora continua", "Documentación producida"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué técnica ágil se basa en post-its o tarjetas visuales?",
        "opciones": ["Scrum", "Kanban", "TDD", "BDD"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa el término 'refinamiento del backlog'?",
        "opciones": ["Eliminar tareas", "Aumentar la duración del sprint", "Actualizar, dividir y priorizar elementos del backlog", "Cambiar el objetivo del sprint"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué significa 'empowerment' en equipos ágiles?",
        "opciones": ["Obediencia a un líder", "Autonomía y responsabilidad para tomar decisiones", "Descentralizar roles", "Evitar conflictos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa la transparencia en Scrum?",
        "opciones": ["Mostrar el código fuente", "Acceso abierto al Product Backlog y procesos", "Revisar informes financieros", "Hacer público el código al cliente"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué actividad permite al equipo enfocarse en la mejora continua?",
        "opciones": ["Sprint Review", "Daily Scrum", "Sprint Retrospective", "Refinamiento"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué NO debería hacer un Product Owner?",
        "opciones": ["Priorizar tareas", "Estimar trabajo técnico", "Colaborar con stakeholders", "Asegurar valor del producto"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la mejor descripción de 'aceptación' en Scrum?",
        "opciones": ["Aprobación del presupuesto", "Pruebas completadas", "Criterios cumplidos y aceptación del Product Owner", "Integración en producción"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es un principio del Manifiesto Ágil?",
        "opciones": ["Cumplir plazos estrictos", "Seguir un plan exacto", "Entregar software funcional frecuentemente", "Priorizar procesos sobre personas"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es una buena práctica al escribir historias de usuario?",
        "opciones": ["Ser técnico y detallado", "Incluir tareas específicas", "Usar lenguaje del usuario y criterios de aceptación", "Incluir tiempos estimados en días"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué elemento de Scrum contiene todas las funcionalidades pendientes para el producto?",
        "opciones": ["Sprint Backlog", "Product Backlog", "Incremento", "Roadmap"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Quién tiene la autoridad para cancelar un Sprint?",
        "opciones": ["Scrum Master", "Product Owner", "Equipo de Desarrollo", "Stakeholders"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa que un equipo es autoorganizado?",
        "opciones": ["No necesita liderazgo", "Gestiona su propio trabajo sin órdenes externas", "No tiene roles definidos", "No realiza reuniones"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el tiempo máximo recomendado para una Daily Scrum en un equipo de 7 personas?",
        "opciones": ["15 minutos", "30 minutos", "1 hora", "10 minutos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué mide el 'Velocity' en Scrum?",
        "opciones": ["Cantidad de horas trabajadas", "Cantidad de puntos completados por Sprint", "Número de bugs corregidos", "Tamaño del equipo"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué rol facilita la comunicación entre Product Owner y Equipo de Desarrollo?",
        "opciones": ["Scrum Master", "Stakeholder", "Sponsor", "Tester"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué ocurre durante el Sprint Review?",
        "opciones": ["Se planifica el próximo Sprint", "Se presenta el trabajo completado al cliente y stakeholders", "Se resuelven impedimentos", "Se hace la retrospectiva"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué describe mejor el término 'incremento' en Scrum?",
        "opciones": ["Una versión preliminar", "El trabajo no terminado", "Un conjunto de funcionalidades completadas y listas para usar", "Una tarea asignada"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es una práctica común para priorizar historias de usuario?",
        "opciones": ["FIFO", "MoSCoW", "Kanban", "PERT"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'burndown chart'?",
        "opciones": ["Un gráfico de progreso del trabajo restante", "Una herramienta de testing", "Un documento de requisitos", "Una reunión diaria"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito de la Definition of Done (DoD)?",
        "opciones": ["Definir cuándo una tarea está completa", "Asignar tareas", "Planificar el Sprint", "Documentar errores"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento de Scrum permite identificar mejoras en el proceso de trabajo?",
        "opciones": ["Sprint Planning", "Sprint Review", "Daily Scrum", "Sprint Retrospective"],
        "respuesta_correcta": 3
    },
    {
        "pregunta": "¿Cuál es la duración típica recomendada de un Sprint?",
        "opciones": ["1 a 4 semanas", "1 día", "3 a 6 meses", "6 meses a 1 año"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un impedimento en Scrum?",
        "opciones": ["Un bloqueador que impide el progreso del equipo", "Una tarea no priorizada", "Una función del producto", "Un rol dentro del equipo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Quién es responsable de mantener el Product Backlog?",
        "opciones": ["Scrum Master", "Product Owner", "Equipo de Desarrollo", "Stakeholders"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa 'transparencia' en Scrum?",
        "opciones": ["Mostrar el progreso real y los procesos para todos", "Guardar información para el equipo", "Ocultar problemas", "Solo el Product Owner conoce el avance"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un equipo Scrum es 'cross-functional'?",
        "opciones": ["Está compuesto por especialistas de un área", "Tiene todas las habilidades necesarias para entregar valor", "Solo incluye testers", "Solo incluye desarrolladores"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la principal responsabilidad del Product Owner?",
        "opciones": ["Gestionar el equipo de desarrollo", "Priorizar el Product Backlog", "Facilitar reuniones", "Gestionar los recursos financieros"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa que un producto tenga un MVP (Producto Mínimo Viable)?",
        "opciones": ["Producto con funcionalidades básicas para validar hipótesis", "Producto completo", "Producto sin funcionalidades", "Producto con todos los bugs corregidos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Epic' en Agile?",
        "opciones": ["Una tarea pequeña", "Una gran historia que se puede dividir en historias más pequeñas", "Un bug", "Un error de planificación"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el foco del Daily Scrum?",
        "opciones": ["Resolver problemas técnicos", "Coordinar el trabajo diario y detectar impedimentos", "Planificar todo el Sprint", "Actualizar el Product Backlog"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué técnica ágil usa cartas para estimar esfuerzo en equipo?",
        "opciones": ["Planning Poker", "Scrum Board", "Kanban", "Burnup Chart"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se entiende por 'refinamiento del backlog'?",
        "opciones": ["Revisar, aclarar y dividir las historias del Product Backlog", "Planificar el Sprint", "Eliminar tareas", "Documentar bugs"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el rol del Scrum Master respecto a los impedimentos?",
        "opciones": ["Resolver todos personalmente", "Identificarlos y ayudar al equipo a removerlos", "Ignorarlos", "Asignarlos a otros equipos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa la 'Definition of Ready'?",
        "opciones": ["Condiciones para que una historia esté lista para desarrollarse", "Condiciones para aceptar el producto final", "Lista de errores", "Plan de proyecto"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'story point'?",
        "opciones": ["Unidad para medir tiempo", "Unidad para estimar complejidad o esfuerzo relativo", "Número de tareas", "Horas dedicadas"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa que un equipo sea 'autoorganizado'?",
        "opciones": ["Recibe tareas del Scrum Master", "Decide cómo hacer su trabajo y se gestiona a sí mismo", "No se comunica", "Sigue órdenes estrictas"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué evento marca el fin de un Sprint?",
        "opciones": ["Sprint Planning", "Sprint Review", "Sprint Retrospective", "Sprint Completion"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el objetivo del Sprint Retrospective?",
        "opciones": ["Planificar las tareas", "Inspeccionar y mejorar el proceso de trabajo", "Presentar el producto al cliente", "Revisar los bugs"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la responsabilidad principal del equipo de desarrollo?",
        "opciones": ["Escribir la documentación del proyecto", "Entregar el incremento de producto terminado", "Gestionar el Product Backlog", "Facilitar las reuniones"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la duración máxima recomendada para un Sprint Planning?",
        "opciones": ["4 horas para un Sprint de un mes", "1 hora", "2 días", "30 minutos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Product Increment'?",
        "opciones": ["Una versión beta", "El conjunto de todos los elementos completados durante un Sprint", "Un documento de requisitos", "Una tarea pendiente"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa 'time-boxing' en Scrum?",
        "opciones": ["Asignar tiempo ilimitado para actividades", "Limitar el tiempo para eventos y tareas", "Pausar el proyecto", "Extender plazos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué característica debe tener un buen Product Backlog?",
        "opciones": ["Ser estático y no cambiar", "Priorizar ítems y ser refinado continuamente", "Estar oculto al equipo", "Solo contener bugs"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el rol del Scrum Master durante el Daily Scrum?",
        "opciones": ["Dirigir la reunión y asignar tareas", "Eliminar impedimentos y facilitar, si es necesario", "Actualizar el Product Backlog", "No participar"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es el 'Definition of Done'?",
        "opciones": ["Un checklist que asegura calidad y completitud de tareas", "Una lista de tareas pendientes", "Un plan de proyecto", "Una técnica de estimación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué documento representa la visión general y objetivos del producto?",
        "opciones": ["Product Backlog", "Roadmap del producto", "Sprint Backlog", "Informe de bugs"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es la 'Velocidad' en Scrum?",
        "opciones": ["Cantidad de trabajo completado por Sprint", "Número de personas en el equipo", "Horas trabajadas por día", "Cantidad de bugs encontrados"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum sirve para inspeccionar y adaptar el proceso de trabajo?",
        "opciones": ["Sprint Review", "Sprint Retrospective", "Sprint Planning", "Daily Scrum"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el principal beneficio de trabajar en Sprints cortos?",
        "opciones": ["Mejor planificación financiera", "Entrega frecuente y rápida de valor", "Menor necesidad de comunicación", "Mayor documentación"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'impedimento' en Scrum?",
        "opciones": ["Una tarea asignada", "Un obstáculo que bloquea el progreso del equipo", "Un bug reportado", "Una reunión cancelada"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa que el equipo Scrum es 'autoorganizado'?",
        "opciones": ["No tiene un líder", "Decide cómo hacer el trabajo sin órdenes externas", "No tiene roles definidos", "No tiene responsabilidades"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Quién es responsable de gestionar el Sprint Backlog?",
        "opciones": ["Scrum Master", "Equipo de Desarrollo", "Product Owner", "Stakeholders"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el propósito principal del Sprint Review?",
        "opciones": ["Planificar el próximo Sprint", "Revisar el incremento y obtener feedback", "Eliminar impedimentos", "Realizar retrospectiva"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'Epic' en metodologías ágiles?",
        "opciones": ["Una historia muy grande que puede dividirse en varias más pequeñas", "Un bug crítico", "Una tarea de testing", "Una reunión del equipo"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica se utiliza para estimar esfuerzo en Scrum?",
        "opciones": ["Planning Poker", "Diagrama de Gantt", "Análisis PERT", "Benchmarking"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo principal del Product Owner?",
        "opciones": ["Gestionar el equipo", "Maximizar el valor del producto", "Asignar tareas", "Facilitar reuniones"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué representa un 'story point'?",
        "opciones": ["Medida de tiempo exacto", "Estimación relativa de esfuerzo o complejidad", "Cantidad de tareas", "Horas asignadas"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué evento Scrum se realiza diariamente para sincronizar al equipo?",
        "opciones": ["Sprint Planning", "Sprint Retrospective", "Daily Scrum", "Sprint Review"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Cuál es la función del Scrum Master?",
        "opciones": ["Liderar el equipo de desarrollo", "Eliminar impedimentos y asegurar que Scrum se entienda", "Priorizar el backlog", "Definir requisitos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa 'refinamiento del backlog'?",
        "opciones": ["Actualizar y priorizar ítems del Product Backlog", "Planificar el Sprint", "Asignar tareas", "Eliminar bugs"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué característica debe tener una buena historia de usuario?",
        "opciones": ["Ser técnica y detallada", "Ser breve, clara y centrada en el usuario", "No incluir criterios de aceptación", "Ser ambigua"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'Sprint Goal'?",
        "opciones": ["Un objetivo que guía el trabajo del Sprint", "Una tarea asignada", "Un tipo de historia de usuario", "Un informe financiero"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se revisa en la Sprint Retrospective?",
        "opciones": ["El producto entregado", "El proceso y colaboración del equipo", "El backlog completo", "Los bugs corregidos"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué rol Scrum es responsable de eliminar impedimentos?",
        "opciones": ["Product Owner", "Scrum Master", "Equipo de Desarrollo", "Stakeholders"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es la 'Definition of Ready'?",
        "opciones": ["Condiciones para que una historia esté lista para comenzar a trabajar", "Condiciones para aceptar el producto final", "Una técnica de testing", "Un documento de planificación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la principal ventaja de usar Kanban junto con Scrum?",
        "opciones": ["Limitar el trabajo en curso y visualizar el flujo", "Eliminar Sprints", "Reducir el equipo", "Aumentar la documentación"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa un 'Burndown Chart'?",
        "opciones": ["Progreso del trabajo restante en un Sprint", "Lista de tareas asignadas", "Plan de proyecto", "Documento de requisitos"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la entrega continua en Agile?",
        "opciones": ["Entrega frecuente de incrementos de producto listos para producción", "Entrega de un producto final al final del proyecto", "Entrega de documentación cada semana", "Planificación continua"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un equipo 'cross-functional'?",
        "opciones": ["Equipo que realiza todas las habilidades necesarias para completar el trabajo", "Equipo dividido por especialidades", "Solo desarrolladores", "Solo testers"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se busca en la colaboración con stakeholders?",
        "opciones": ["Asegurar su alineación y obtener feedback", "Ignorarlos", "Delegar todas las decisiones", "Solo informar al final"],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es la transparencia en Scrum?",
        "opciones": [
            "Mantener toda la información confidencial",
            "Mostrar el estado real del trabajo y procesos para todos",
            "Solo el Product Owner tiene acceso a la información",
            "Compartir documentos solo al final del proyecto"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es la finalidad principal de la reunión de Sprint Planning?",
        "opciones": [
            "Revisar el trabajo completado",
            "Planificar y comprometerse con el trabajo del próximo Sprint",
            "Identificar impedimentos",
            "Presentar el producto a los stakeholders"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un equipo autoorganizado en Scrum?",
        "opciones": [
            "Un equipo sin un líder",
            "Un equipo que decide internamente cómo hacer su trabajo",
            "Un equipo que solo trabaja bajo órdenes",
            "Un equipo que no tiene roles definidos"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué evento Scrum tiene una duración máxima de 15 minutos?",
        "opciones": [
            "Sprint Review",
            "Daily Scrum",
            "Sprint Planning",
            "Sprint Retrospective"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Quién es responsable de maximizar el valor del producto?",
        "opciones": [
            "Scrum Master",
            "Product Owner",
            "Equipo de Desarrollo",
            "Stakeholders"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es la Definition of Done?",
        "opciones": [
            "Un listado de tareas pendientes",
            "Un criterio que indica cuándo una tarea está completa",
            "Un plan de proyecto",
            "Una técnica para estimar esfuerzo"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué se revisa en la Sprint Review?",
        "opciones": [
            "El incremento del producto y el feedback de stakeholders",
            "El backlog del producto",
            "Los impedimentos del Sprint",
            "El plan del siguiente Sprint"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Product Backlog?",
        "opciones": [
            "Lista priorizada de todo el trabajo pendiente para el producto",
            "Lista de bugs del producto",
            "Plan de recursos del proyecto",
            "Informe de sprint"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el objetivo de la Sprint Retrospective?",
        "opciones": [
            "Mejorar el proceso de trabajo y la colaboración del equipo",
            "Revisar el backlog del producto",
            "Planificar el próximo Sprint",
            "Revisar el incremento entregado"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol facilita la eliminación de impedimentos?",
        "opciones": [
            "Product Owner",
            "Scrum Master",
            "Equipo de Desarrollo",
            "Stakeholders"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Cuál es el tamaño típico recomendado para un Sprint?",
        "opciones": [
            "1 a 4 semanas",
            "1 a 2 días",
            "1 a 3 meses",
            "6 meses"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un equipo es 'cross-functional'?",
        "opciones": [
            "Equipo compuesto por miembros con diferentes habilidades necesarias para completar el trabajo",
            "Equipo con roles tradicionales separados",
            "Equipo que solo desarrolla código",
            "Equipo que solo realiza pruebas"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Epic' en Agile?",
        "opciones": [
            "Una historia grande que se puede dividir en historias más pequeñas",
            "Un error grave del producto",
            "Una reunión de equipo",
            "Un documento de requisitos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué técnica de estimación usa tarjetas numeradas para votar?",
        "opciones": [
            "Planning Poker",
            "Kanban",
            "Scrum Board",
            "Burnup Chart"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un Sprint Goal?",
        "opciones": [
            "Un objetivo que guía el trabajo del Sprint",
            "La lista de tareas del Sprint",
            "El backlog del producto",
            "El tiempo asignado al Sprint"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol es responsable de gestionar el Product Backlog?",
        "opciones": [
            "Scrum Master",
            "Product Owner",
            "Equipo de Desarrollo",
            "Stakeholders"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'impedimento' en Scrum?",
        "opciones": [
            "Un problema que bloquea el progreso del equipo",
            "Una tarea asignada",
            "Un tipo de historia de usuario",
            "Un documento de requisitos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Burndown Chart'?",
        "opciones": [
            "Un gráfico que muestra el trabajo restante en un Sprint",
            "Un documento de planificación",
            "Un listado de tareas",
            "Una técnica de testing"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la función del Scrum Master en el equipo?",
        "opciones": [
            "Asignar tareas a los desarrolladores",
            "Facilitar Scrum y eliminar impedimentos",
            "Priorizar el backlog",
            "Realizar testing"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué significa 'time-boxing' en Scrum?",
        "opciones": [
            "Limitar el tiempo de los eventos para mantener la disciplina",
            "Asignar tiempo ilimitado para tareas",
            "Evitar reuniones",
            "Extender plazos según necesidad"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'MVP' en Agile?",
        "opciones": [
            "Producto Mínimo Viable para validar hipótesis con el mínimo esfuerzo",
            "Producto más vendido",
            "Máximo valor posible",
            "Una técnica de testing"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un equipo tenga alta 'Velocity'?",
        "opciones": [
            "Entrega más puntos de historia por Sprint",
            "Trabaja más horas",
            "Tiene más miembros",
            "Produce más bugs"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la diferencia entre Sprint Review y Sprint Retrospective?",
        "opciones": [
            "Review evalúa el producto, Retrospective evalúa el proceso",
            "No hay diferencia",
            "Retrospective revisa el producto, Review revisa el proceso",
            "Ambos revisan el backlog"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un equipo 'self-managing'?",
        "opciones": [
            "Equipo que decide cómo organizar y realizar su trabajo sin supervisión externa",
            "Equipo sin líder",
            "Equipo que trabaja solo",
            "Equipo con roles fijos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué describe mejor la reunión Daily Scrum?",
        "opciones": [
            "Reunión diaria para sincronizar actividades y detectar impedimentos",
            "Reunión para planificar el Sprint",
            "Reunión para revisar el producto con stakeholders",
            "Reunión para solucionar bugs"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se busca con el Refinamiento del Backlog?",
        "opciones": [
            "Clarificar, detallar y priorizar ítems del Product Backlog",
            "Eliminar ítems del backlog",
            "Planificar el próximo Sprint",
            "Revisar bugs"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué sucede si un impedimento no se elimina durante el Sprint?",
        "opciones": [
            "Puede retrasar la entrega del Sprint",
            "Se ignora y se sigue trabajando",
            "Se cancela el Sprint automáticamente",
            "El Scrum Master es removido"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'release' en Scrum?",
        "opciones": [
            "Entrega de una versión funcional del producto a los usuarios",
            "Una tarea dentro del Sprint",
            "Un tipo de reunión",
            "Un documento de requisitos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la principal responsabilidad del Product Owner durante el Sprint?",
        "opciones": [
            "Responder preguntas y clarificar requisitos para el equipo",
            "Asignar tareas",
            "Facilitar reuniones",
            "Realizar testing"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que una historia de usuario tiene criterios de aceptación?",
        "opciones": [
            "Condiciones que deben cumplirse para que la historia sea considerada completa",
            "Un resumen del proyecto",
            "La lista de tareas del Sprint",
            "Un documento legal"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué representa el 'Sprint Backlog'?",
        "opciones": [
            "La lista de tareas seleccionadas para el Sprint actual",
            "El backlog completo del producto",
            "La planificación del proyecto a largo plazo",
            "Los impedimentos del equipo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Quién define las prioridades en el Product Backlog?",
        "opciones": [
            "Scrum Master",
            "Product Owner",
            "Equipo de Desarrollo",
            "Stakeholders"
        ],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué es un 'Increment' en Scrum?",
        "opciones": [
            "La suma de todos los elementos del Product Backlog completados durante un Sprint",
            "Una tarea del Sprint Backlog",
            "Un bug corregido",
            "Un documento de requisitos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la duración máxima recomendada para una Sprint Retrospective?",
        "opciones": [
            "3 horas para un Sprint de un mes",
            "1 hora",
            "30 minutos",
            "6 horas"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta visual se usa para mostrar el progreso del Sprint?",
        "opciones": [
            "Burndown Chart",
            "Diagrama de Gantt",
            "Roadmap",
            "Kanban Board"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el 'Scrum Board'?",
        "opciones": [
            "Un tablero para visualizar tareas del Sprint",
            "Un documento de planificación",
            "Una reunión diaria",
            "Una técnica de estimación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué sucede si no se cumple la Definition of Done en una tarea?",
        "opciones": [
            "No se considera completada",
            "Se puede entregar igualmente",
            "Se pasa al siguiente Sprint",
            "Se elimina del backlog"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el 'Refinamiento del Backlog'?",
        "opciones": [
            "Proceso continuo para aclarar y priorizar ítems del Product Backlog",
            "Reunión para planificar el Sprint",
            "Evaluación de desempeño del equipo",
            "Revisión del incremento"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es la responsabilidad principal del Scrum Master?",
        "opciones": [
            "Facilitar Scrum y remover impedimentos",
            "Gestionar el Product Backlog",
            "Desarrollar el producto",
            "Aprobar tareas"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué evento Scrum sirve para inspeccionar el producto y adaptarlo según feedback?",
        "opciones": [
            "Sprint Review",
            "Sprint Planning",
            "Daily Scrum",
            "Sprint Retrospective"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un equipo 'self-organizing'?",
        "opciones": [
            "Un equipo que decide internamente cómo realizar el trabajo sin supervisión externa",
            "Un equipo sin Product Owner",
            "Un equipo sin Scrum Master",
            "Un equipo con roles definidos rígidamente"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que un equipo sea 'cross-functional'?",
        "opciones": [
            "Tiene todas las habilidades necesarias para entregar el producto sin depender de otros",
            "Está dividido en subequipos",
            "Solo se enfoca en desarrollo",
            "Solo se enfoca en testing"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Sprint Goal'?",
        "opciones": [
            "Un objetivo definido para guiar el trabajo del Sprint",
            "La lista de tareas del Sprint",
            "La duración del Sprint",
            "Un documento de requisitos"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Quién participa en el Daily Scrum?",
        "opciones": [
            "Equipo de Desarrollo",
            "Scrum Master y Product Owner solamente",
            "Solo el Product Owner",
            "Stakeholders"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué se debe hacer si un impedimento no puede ser eliminado inmediatamente?",
        "opciones": [
            "Comunicarlo y buscar alternativas mientras se trabaja para removerlo",
            "Ignorarlo y continuar",
            "Cancelar el Sprint",
            "Asignar más tareas"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'User Story' en Scrum?",
        "opciones": [
            "Una descripción breve de una funcionalidad desde la perspectiva del usuario",
            "Una tarea técnica",
            "Un bug reportado",
            "Un documento formal"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito de la Sprint Planning?",
        "opciones": [
            "Planificar qué se hará en el Sprint y cómo se realizará",
            "Revisar el incremento terminado",
            "Resolver impedimentos",
            "Revisar la retrospectiva anterior"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'Burnup Chart'?",
        "opciones": [
            "Gráfico que muestra el trabajo completado contra el trabajo total",
            "Un listado de tareas pendientes",
            "Una técnica de estimación",
            "Un tipo de reunión"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué significa que una historia de usuario tiene 'criterios de aceptación'?",
        "opciones": [
            "Condiciones que deben cumplirse para considerar la historia completada",
            "La descripción del usuario",
            "El tiempo estimado para realizarla",
            "La prioridad asignada"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito de la Sprint Retrospective?",
        "opciones": [
            "Identificar mejoras en el proceso y la colaboración del equipo",
            "Revisar el incremento entregado",
            "Planificar el próximo Sprint",
            "Actualizar el Product Backlog"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué hace un Scrum Master durante el Sprint?",
        "opciones": [
            "Facilita, elimina impedimentos y protege al equipo",
            "Define los requisitos del producto",
            "Asigna tareas",
            "Realiza testing"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué indica la 'velocidad' de un equipo Scrum?",
        "opciones": [
            "La cantidad de puntos completados en un Sprint",
            "Las horas trabajadas por día",
            "El número de miembros del equipo",
            "El tiempo total del proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Cuál es el propósito del Product Backlog Refinement?",
        "opciones": [
            "Aclarar y priorizar las historias del Product Backlog",
            "Planificar el Sprint",
            "Asignar tareas",
            "Revisar la Sprint Retrospective"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el 'MVP' en metodologías ágiles?",
        "opciones": [
            "Producto Mínimo Viable para validar hipótesis rápidamente",
            "La versión final del producto",
            "Un documento de requisitos",
            "Un plan de proyecto"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es el 'Definition of Ready'?",
        "opciones": [
            "Criterios que indican cuándo una historia está lista para ser trabajada",
            "Lista de tareas completadas",
            "Condiciones para entregar el producto",
            "Una técnica de estimación"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Quién debe asistir a la Sprint Review?",
        "opciones": [
            "Equipo Scrum y stakeholders interesados",
            "Solo el Product Owner",
            "Solo el Scrum Master",
            "Solo el equipo de desarrollo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué es un 'impedimento' en Scrum?",
        "opciones": [
            "Un obstáculo que bloquea el progreso del equipo",
            "Una tarea del Sprint",
            "Una historia de usuario",
            "Un rol en el equipo"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué herramienta se usa para limitar el trabajo en curso en Kanban?",
        "opciones": [
            "WIP Limits",
            "Burnup Chart",
            "Sprint Backlog",
            "User Stories"
        ],
        "respuesta_correcta": 0
    },
    {
        "pregunta": "¿Qué rol es responsable de remover impedimentos en Scrum?",
        "opciones": [
            "Scrum Master",
            "Product Owner",
            "Equipo de Desarrollo",
            "Stakeholders"
        ],
        "respuesta_correcta": 0
    }
];

export default preguntasData;