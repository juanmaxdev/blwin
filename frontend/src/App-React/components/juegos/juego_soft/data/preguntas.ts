import type { Retos } from "../tipos/juego"

export const preguntasProgramacion: Retos[] = [
  {
    id: "theory-java-oop-1",
    tipo: "teoría",
    lenguaje: "Java",
    titulo: "Programación Orientada a Objetos",
    descripcion: "Conceptos fundamentales de POO en Java",
    preguntas: "¿Cuál de los siguientes NO es un pilar de la Programación Orientada a Objetos?",
    opciones: ["Encapsulación", "Herencia", "Polimorfismo", "Compilación"],
    respuestaCorrecta: "Compilación",
    explicacion:
      "Los pilares de POO son: Encapsulación, Herencia, Polimorfismo y Abstraccion. La compilación es un proceso, no un pilar de POO.",
    accion: "pedirCarta",
    dificultad: "fácil",
  },
  {
    id: "theory-java-access-1",
    tipo: "teoría",
    lenguaje: "Java",
    titulo: "Modificadores de Acceso",
    descripcion: "Visibilidad en Java",
    preguntas: "¿Qué modificador de acceso permite que una variable sea accesible solo dentro de la misma clase?",
    opciones: ["public", "protected", "private", "default"],
    respuestaCorrecta: "private",
    explicacion: "private restringe el acceso solo a la misma clase donde se declara.",
    accion: "plantarse",
    dificultad: "fácil",
  },
  {
    id: "theory-java-inheritance-1",
    tipo: "teoría",
    lenguaje: "Java",
    titulo: "Herencia",
    descripcion: "Conceptos de herencia en Java",
    preguntas: "¿Qué palabra clave se usa en Java para heredar de una clase?",
    opciones: ["implements", "extends", "inherits", "super"],
    respuestaCorrecta: "extends",
    explicacion: "'extends' se usa para herencia de clases. 'implements' es para interfaces.",
    accion: "siguientePartida",
    dificultad: "medio",
  },
  {
    id: "theory-java-collections-1",
    tipo: "teoría",
    lenguaje: "Java",
    titulo: "Collections Framework",
    descripcion: "Estructuras de datos en Java",
    preguntas: "¿Qué interfaz en Java permite elementos duplicados y mantiene el orden de inserción?",
    opciones: ["Set", "List", "Map", "Queue"],
    respuestaCorrecta: "List",
    explicacion: "List permite duplicados y mantiene orden. Set no permite duplicados, Map almacena pares clave-valor.",
    accion: "pedirCarta",
    dificultad: "medio",
  },
  {
    id: "theory-java-exceptions-1",
    tipo: "teoría",
    lenguaje: "Java",
    titulo: "Manejo de Excepciones",
    descripcion: "Exception handling en Java",
    preguntas: "¿Cuál es la diferencia entre 'throw' y 'throws' en Java?",
    opciones: [
      "'throw' lanza una excepción, 'throws' declara que un método puede lanzar excepciones",
      "'throws' lanza una excepción, 'throw' declara excepciones",
      "Son sinónimos, se pueden usar indistintamente",
      "'throw' es para excepciones checked, 'throws' para unchecked",
    ],
    respuestaCorrecta: "'throw' lanza una excepción, 'throws' declara que un método puede lanzar excepciones",
    explicacion:
      "'throw' se usa para lanzar una excepción específica, mientras 'throws' se declara en la firma del método.",
    accion: "plantarse",
    dificultad: "dificil",
  },
  {
    id: "theory-csharp-linq-1",
    tipo: "teoría",
    lenguaje: "C#",
    titulo: "LINQ",
    descripcion: "Language Integrated Query",
    preguntas: "¿Qué significa LINQ en C#?",
    opciones: [
      "Language Integrated Query",
      "Linear Integrated Query",
      "Logic Integration Query",
      "List Integration Query",
    ],
    respuestaCorrecta: "Language Integrated Query",
    explicacion:
      "LINQ (Language Integrated Query) permite realizar consultas directamente en C# sobre colecciones, bases de datos, XML, etc.",
    accion: "pedirCarta",
    dificultad: "fácil",
  },
  {
    id: "theory-csharp-types-1",
    tipo: "teoría",
    lenguaje: "C#",
    titulo: "Tipos de Datos",
    descripcion: "Sistema de tipos en C#",
    preguntas: "¿Cuál es la principal diferencia entre 'struct' y 'class' en C#?",
    opciones: [
      "struct es tipo por valor, class es tipo por referencia",
      "struct permite herencia, class no",
      "struct es más lento que class",
      "No hay diferencia significativa",
    ],
    respuestaCorrecta: "struct es tipo por valor, class es tipo por referencia",
    explicacion:
      "Los struct son tipos por valor (se almacenan en el stack), mientras las class son tipos por referencia (se almacenan en el heap).",
    accion: "plantarse",
    dificultad: "medio",
  },
  {
    id: "theory-csharp-properties-1",
    tipo: "teoría",
    lenguaje: "C#",
    titulo: "Propiedades",
    descripcion: "Properties en C#",
    preguntas: "¿Cuál es la ventaja de usar propiedades en lugar de campos públicos?",
    opciones: [
      "Son más rápidas",
      "Permiten encapsulación y validación",
      "Ocupan menos memoria",
      "Son más fáciles de escribir",
    ],
    respuestaCorrecta: "Permiten encapsulación y validación",
    explicacion: "Las propiedades permiten controlar el acceso y validar datos, manteniendo la encapsulación.",
    accion: "siguientePartida",
    dificultad: "medio",
  },
  {
    id: "theory-csharp-async-1",
    tipo: "teoría",
    lenguaje: "C#",
    titulo: "Programación Asíncrona",
    descripcion: "async/await en C#",
    preguntas: "¿Cuál es el propósito principal de 'async' y 'await' en C#?",
    opciones: [
      "Hacer que el código sea más rápido",
      "Permitir programación asíncrona sin bloquear el hilo principal",
      "Crear múltiples hilos automáticamente",
      "Optimizar el uso de memoria",
    ],
    respuestaCorrecta: "Permitir programación asíncrona sin bloquear el hilo principal",
    explicacion:
      "async/await permite escribir código asíncrono que no bloquea el hilo principal, mejorando la responsividad.",
    accion: "pedirCarta",
    dificultad: "dificil",
  },
  {
    id: "theory-typescript-basic-1",
    tipo: "teoría",
    lenguaje: "TypeScript",
    titulo: "Introducción",
    descripcion: "Conceptos básicos de TypeScript",
    preguntas: "¿Qué es TypeScript?",
    opciones: [
      "Un framework de JavaScript",
      "Un superset de JavaScript que añade tipado estático",
      "Una librería para React",
      "Un compilador de JavaScript",
    ],
    respuestaCorrecta: "Un superset de JavaScript que añade tipado estático",
    explicacion:
      "TypeScript es un superset de JavaScript que añade tipado estático opcional y se compila a JavaScript.",
    accion: "plantarse",
    dificultad: "fácil",
  },
  {
    id: "theory-typescript-interfaces-1",
    tipo: "teoría",
    lenguaje: "TypeScript",
    titulo: "Interfaces",
    descripcion: "Definición de contratos en TypeScript",
    preguntas: "¿Cuál es la diferencia principal entre 'interface' y 'type' en TypeScript?",
    opciones: [
      "interface puede extenderse, type no",
      "type puede usar union types, interface no",
      "interface es para objetos, type es más flexible",
      "No hay diferencia práctica",
    ],
    respuestaCorrecta: "interface es para objetos, type es más flexible",
    explicacion:
      "Aunque ambos definen tipos, interface está diseñado específicamente para objetos y puede extenderse, mientras type es más flexible.",
    accion: "siguientePartida",
    dificultad: "medio",
  },
  {
    id: "theory-typescript-union-1",
    tipo: "teoría",
    lenguaje: "TypeScript",
    titulo: "Union Types",
    descripcion: "Tipos de unión en TypeScript",
    preguntas: "¿Qué representa el tipo 'string | number' en TypeScript?",
    opciones: [
      "Un tipo que puede ser string Y number al mismo tiempo",
      "Un tipo que puede ser string O number",
      "Un error de sintaxis",
      "Un tipo que convierte string a number",
    ],
    respuestaCorrecta: "Un tipo que puede ser string O number",
    explicacion: "Los union types (|) permiten que una variable pueda ser de uno de varios tipos especificados.",
    accion: "pedirCarta",
    dificultad: "medio",
  },
  {
    id: "theory-typescript-generics-1",
    tipo: "teoría",
    lenguaje: "TypeScript",
    titulo: "Genéricos",
    descripcion: "Tipos genéricos en TypeScript",
    preguntas: "¿Para qué se utilizan los genéricos (generics) en TypeScript?",
    opciones: [
      "Para crear funciones más rápidas",
      "Para crear componentes reutilizables que funcionan con múltiples tipos",
      "Para reducir el tamaño del código compilado",
      "Para mejorar la compatibilidad con navegadores",
    ],
    respuestaCorrecta: "Para crear componentes reutilizables que funcionan con múltiples tipos",
    explicacion:
      "Los genéricos permiten crear funciones, clases e interfaces que pueden trabajar con diferentes tipos manteniendo la seguridad de tipos.",
    accion: "plantarse",
    dificultad: "dificil",
  },
  {
    id: "theory-js-closures-1",
    tipo: "teoría",
    lenguaje: "JavaScript",
    titulo: "Closures",
    descripcion: "Conceptos de closures en JavaScript",
    preguntas: "¿Qué es un closure en JavaScript?",
    opciones: [
      "Una función que se ejecuta inmediatamente",
      "Una función que tiene acceso a variables de su ámbito exterior",
      "Una función que no puede ser llamada",
      "Una función que solo acepta parámetros",
    ],
    respuestaCorrecta: "Una función que tiene acceso a variables de su ámbito exterior",
    explicacion:
      "Un closure es una función que mantiene acceso a las variables de su ámbito léxico exterior, incluso después de que la función exterior haya terminado.",
    accion: "siguientePartida",
    dificultad: "dificil",
  },
  {
    id: "theory-js-hoisting-1",
    tipo: "teoría",
    lenguaje: "JavaScript",
    titulo: "Hoisting",
    descripcion: "Comportamiento de hoisting en JavaScript",
    preguntas: "¿Qué es el hoisting en JavaScript?",
    opciones: [
      "El proceso de optimización del código",
      "El comportamiento donde las declaraciones se mueven al inicio de su ámbito",
      "La ejecución de funciones en paralelo",
      "La conversión automática de tipos",
    ],
    respuestaCorrecta: "El comportamiento donde las declaraciones se mueven al inicio de su ámbito",
    explicacion:
      "Hoisting es el comportamiento donde las declaraciones de variables y funciones se 'elevan' al inicio de su ámbito durante la compilación.",
    accion: "pedirCarta",
    dificultad: "medio",
  },


  {
    id: "complete-js-array-access",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Acceso a elementos de array",
    descripcion: "Completa la sintaxis para acceder a elementos",
    preguntas: "Completa el código para acceder al primer elemento del array:",
    plantillaCodigo: `const frutas = ['manzana', 'banana', 'naranja'];
const primera = frutas[_____];
console.log('La primera fruta es:', primera);`,
    respuestaCorrecta: "0",
    explicacion: "Los arrays en JavaScript empiezan en índice 0, por lo que el primer elemento es frutas[0].",
    accion: "pedirCarta",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-loop-condition",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Condición de bucle",
    descripcion: "Completa la condición del bucle for",
    preguntas: "Completa la condición para que el bucle recorra todo el array:",
    plantillaCodigo: `const numeros = [10, 20, 30, 40, 50];
for (let i = 0; i < _____; i++) {
  console.log('Número en posición', i, ':', numeros[i]);
}`,
    respuestaCorrecta: "numeros.length",
    explicacion: "Para recorrer todo el array, la condición debe ser i < numeros.length",
    accion: "plantarse",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-string-method",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Métodos de string",
    descripcion: "Completa el método para convertir a mayúsculas",
    preguntas: "Completa el código para convertir el texto a mayúsculas:",
    plantillaCodigo: `const mensaje = 'hola mundo';
const mayusculas = mensaje._____;
console.log('Original:', mensaje);
console.log('En mayúsculas:', mayusculas);`,
    respuestaCorrecta: "toUpperCase()",
    explicacion: "El método toUpperCase() convierte un string a mayúsculas.",
    accion: "siguientePartida",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-sum-calculation",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Cálculo de suma",
    descripcion: "Completa la operación matemática",
    preguntas: "Completa el código para sumar todos los números del 1 al 5:",
    plantillaCodigo: `let suma = 0;
for (let i = 1; i <= 5; i++) {
  suma _____ i;
}
console.log('La suma total es:', suma);`,
    respuestaCorrecta: "+=",
    explicacion: "El operador += suma el valor de i a la variable suma en cada iteración.",
    accion: "pedirCarta",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "complete-js-even-check",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Verificar números pares",
    descripcion: "Completa la condición para números pares",
    preguntas: "Completa la condición para verificar si un número es par:",
    plantillaCodigo: `function esPar(numero) {
  return numero % 2 _____ 0;
}

console.log('¿Es 4 par?', esPar(4));
console.log('¿Es 7 par?', esPar(7));`,
    respuestaCorrecta: "===",
    explicacion: "Un número es par cuando el resto de dividirlo por 2 es igual a 0 (===).",
    accion: "plantarse",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "complete-js-function-syntax",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Sintaxis de función",
    descripcion: "Completa la declaración de función",
    preguntas: "Completa la sintaxis para declarar una función:",
    plantillaCodigo: `_____ saludar(nombre) {
  console.log('Hola, ' + nombre + '!');
}

saludar('María');`,
    respuestaCorrecta: "function",
    explicacion: "En JavaScript, las funciones se declaran con la palabra clave 'function'.",
    accion: "siguientePartida",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-object-property",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Propiedades de objeto",
    descripcion: "Completa el acceso a propiedades",
    preguntas: "Completa el código para acceder a la propiedad del objeto:",
    plantillaCodigo: `const persona = {
  nombre: 'Juan',
  edad: 25
};

console.log('El nombre es:', persona._____);`,
    respuestaCorrecta: "nombre",
    explicacion: "Para acceder a una propiedad de objeto usamos la notación punto: objeto.propiedad",
    accion: "pedirCarta",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-array-push",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Agregar elementos a array",
    descripcion: "Completa el método para agregar elementos",
    preguntas: "Completa el código para agregar un elemento al final del array:",
    plantillaCodigo: `const colores = ['rojo', 'verde'];
colores._____(azul');
console.log('Colores:', colores);`,
    respuestaCorrecta: "push('",
    explicacion: "El método push() agrega uno o más elementos al final de un array.",
    accion: "plantarse",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-if-condition",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Condición if",
    descripcion: "Completa la estructura condicional",
    preguntas: "Completa la estructura if para verificar si un número es mayor que 10:",
    plantillaCodigo: `const numero = 15;
_____ (numero > 10) {
  console.log('El número es mayor que 10');
} else {
  console.log('El número es menor o igual a 10');
}`,
    respuestaCorrecta: "if",
    explicacion: "La palabra clave 'if' se usa para crear estructuras condicionales en JavaScript.",
    accion: "siguientePartida",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-variable-declaration",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Declaración de variables",
    descripcion: "Completa la declaración de variable",
    preguntas: "Completa la declaración de una variable constante:",
    plantillaCodigo: `_____ PI = 3.14159;
console.log('El valor de PI es:', PI);`,
    respuestaCorrecta: "const",
    explicacion: "La palabra clave 'const' se usa para declarar variables constantes que no pueden ser reasignadas.",
    accion: "pedirCarta",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-array-filter",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Filtrar array",
    descripcion: "Completa el método filter",
    preguntas: "Completa el código para filtrar números mayores que 5:",
    plantillaCodigo: `const numeros = [1, 6, 3, 8, 2, 9];
const mayores = numeros._____(num => num > 5);
console.log('Números mayores que 5:', mayores);`,
    respuestaCorrecta: "filter",
    explicacion: "El método filter() crea un nuevo array con todos los elementos que pasan una prueba.",
    accion: "plantarse",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "complete-js-object-method",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Método de objeto",
    descripcion: "Completa el método del objeto",
    preguntas: "Completa el método para calcular el área de un rectángulo:",
    plantillaCodigo: `const rectangulo = {
  ancho: 5,
  alto: 3,
  calcularArea: function() {
    return _____.ancho * this.alto;
  }
};

console.log('Área:', rectangulo.calcularArea());`,
    respuestaCorrecta: "this",
    explicacion: "La palabra clave 'this' se refiere al objeto actual dentro de un método.",
    accion: "siguientePartida",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "complete-js-while-loop",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Bucle while",
    descripcion: "Completa la estructura del bucle while",
    preguntas: "Completa el bucle while para contar del 1 al 3:",
    plantillaCodigo: `let contador = 1;
_____ (contador <= 3) {
  console.log('Contador:', contador);
  contador++;
}`,
    respuestaCorrecta: "while",
    explicacion: "La palabra clave 'while' crea un bucle que se ejecuta mientras la condición sea verdadera.",
    accion: "pedirCarta",
    dificultad: "fácil",
    verEjecucion: true,
  },
  {
    id: "complete-js-arrow-function",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Función flecha",
    descripcion: "Completa la sintaxis de función flecha",
    preguntas: "Completa la función flecha para multiplicar por 2:",
    plantillaCodigo: `const duplicar = (numero) _____ numero * 2;
console.log('5 duplicado es:', duplicar(5));`,
    respuestaCorrecta: "=>",
    explicacion: "El operador '=>' se usa para crear funciones flecha en JavaScript.",
    accion: "plantarse",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "complete-js-try-catch",
    tipo: "codigo-completo",
    lenguaje: "JavaScript",
    titulo: "Manejo de errores",
    descripcion: "Completa la estructura try-catch",
    preguntas: "Completa la estructura para manejar errores:",
    plantillaCodigo: `try {
  const resultado = 10 / 0;
  console.log('Resultado:', resultado);
} _____ (error) {
  console.log('Error:', error.message);
}`,
    respuestaCorrecta: "catch",
    explicacion: "La palabra clave 'catch' se usa para capturar y manejar errores en un bloque try-catch.",
    accion: "siguientePartida",
    dificultad: "medio",
    verEjecucion: true,
  },


  {
    id: "predict-js-loop-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Predecir resultado de bucle",
    descripcion: "Analiza este código y predice qué imprimirá",
    preguntas: "¿Qué imprimirá este código en la consola?",
    codigo: `let resultado = 0;
for (let i = 1; i <= 3; i++) {
  resultado += i * 2;
}
console.log(resultado);`,
    opciones: ["6", "12", "18", "24"],
    respuestaCorrecta: "12",
    explicacion: "El bucle suma: (1*2) + (2*2) + (3*2) = 2 + 4 + 6 = 12",
    accion: "pedirCarta",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-array-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Predecir resultado de array",
    descripcion: "Analiza este código con arrays",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const frutas = ['manzana', 'banana', 'naranja'];
frutas.push('uva');
console.log(frutas.length);`,
    opciones: ["3", "4", "5", "undefined"],
    respuestaCorrecta: "4",
    explicacion: "El array inicial tiene 3 elementos, push() añade 1 más, total = 4",
    accion: "plantarse",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "predict-js-string-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Concatenación de strings",
    descripcion: "Predice el resultado de la concatenación",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const nombre = 'Juan';
const edad = 25;
console.log('Hola ' + nombre + ', tienes ' + edad + ' años');`,
    opciones: ["Hola Juan, tienes 25 años", "Hola nombre, tienes edad años", "Error de sintaxis", "undefined"],
    respuestaCorrecta: "Hola Juan, tienes 25 años",
    explicacion: "La concatenación con + une los strings y convierte el número a string automáticamente.",
    accion: "siguientePartida",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "predict-js-boolean-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Operaciones booleanas",
    descripcion: "Predice el resultado de la comparación",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const a = 5;
const b = '5';
console.log(a == b);
console.log(a === b);`,
    opciones: ["true, true", "true, false", "false, true", "false, false"],
    respuestaCorrecta: "true, false",
    explicacion: "== compara valores (5 == '5' es true), === compara valor y tipo (5 === '5' es false).",
    accion: "pedirCarta",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-function-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Llamada de función",
    descripcion: "Predice el resultado de la función",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `function multiplicar(x, y) {
  return x * y;
}

const resultado = multiplicar(3, 4);
console.log(resultado);`,
    opciones: ["7", "12", "34", "undefined"],
    respuestaCorrecta: "12",
    explicacion: "La función multiplica 3 * 4 = 12 y retorna ese valor.",
    accion: "plantarse",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "predict-js-object-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Acceso a propiedades",
    descripcion: "Predice el acceso a propiedades de objeto",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const persona = {
  nombre: 'Ana',
  edad: 30
};

console.log(persona.nombre);
console.log(persona['edad']);`,
    opciones: ["Ana, 30", "nombre, edad", "undefined, undefined", "Error"],
    respuestaCorrecta: "Ana, 30",
    explicacion: "Ambas notaciones (punto y corchetes) acceden correctamente a las propiedades del objeto.",
    accion: "siguientePartida",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "predict-js-array-method-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Métodos de array",
    descripcion: "Predice el resultado de métodos de array",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const numeros = [1, 2, 3];
numeros.pop();
console.log(numeros.length);`,
    opciones: ["1", "2", "3", "4"],
    respuestaCorrecta: "2",
    explicacion: "pop() elimina el último elemento, quedando [1, 2], por lo que length es 2.",
    accion: "pedirCarta",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-scope-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Ámbito de variables",
    descripcion: "Predice el comportamiento del ámbito",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `let x = 10;
function cambiar() {
  let x = 20;
  console.log(x);
}
cambiar();
console.log(x);`,
    opciones: ["20, 20", "10, 10", "20, 10", "10, 20"],
    respuestaCorrecta: "20, 10",
    explicacion: "La variable x dentro de la función es local (20), la x exterior permanece 10.",
    accion: "plantarse",
    dificultad: "dificil",
    verEjecucion: false,
  },
  {
    id: "predict-js-increment-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Operadores de incremento",
    descripcion: "Predice el comportamiento de ++",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `let i = 5;
console.log(i++);
console.log(i);`,
    opciones: ["5, 6", "6, 6", "5, 5", "6, 7"],
    respuestaCorrecta: "5, 6",
    explicacion: "i++ primero retorna el valor actual (5), luego incrementa. Después i vale 6.",
    accion: "siguientePartida",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-ternary-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Operador ternario",
    descripcion: "Predice el resultado del operador ternario",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const edad = 17;
const mensaje = edad >= 18 ? 'Mayor de edad' : 'Menor de edad';
console.log(mensaje);`,
    opciones: ["Mayor de edad", "Menor de edad", "17", "undefined"],
    respuestaCorrecta: "Menor de edad",
    explicacion: "Como 17 < 18, la condición es false, por lo que se ejecuta la parte después de ':'.",
    accion: "pedirCarta",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-typeof-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Operador typeof",
    descripcion: "Predice el resultado de typeof",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `console.log(typeof 42);
console.log(typeof 'hello');
console.log(typeof true);`,
    opciones: ["number, string, boolean", "int, text, bool", "42, hello, true", "object, object, object"],
    respuestaCorrecta: "number, string, boolean",
    explicacion: "typeof retorna el tipo de dato: 'number', 'string', 'boolean', etc.",
    accion: "plantarse",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "predict-js-array-join-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Método join de array",
    descripcion: "Predice el resultado de join",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const palabras = ['Hola', 'mundo', 'JavaScript'];
console.log(palabras.join(' '));`,
    opciones: [
      "Hola mundo JavaScript",
      "Hola,mundo,JavaScript",
      "['Hola', 'mundo', 'JavaScript']",
      "HolamundoJavaScript",
    ],
    respuestaCorrecta: "Hola mundo JavaScript",
    explicacion: "join(' ') une los elementos del array con espacios como separador.",
    accion: "siguientePartida",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-math-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Operaciones matemáticas",
    descripcion: "Predice el resultado de Math",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `console.log(Math.max(5, 10, 3));
console.log(Math.min(5, 10, 3));`,
    opciones: ["10, 3", "5, 5", "10, 5", "3, 10"],
    respuestaCorrecta: "10, 3",
    explicacion: "Math.max() retorna el mayor valor (10), Math.min() retorna el menor (3).",
    accion: "pedirCarta",
    dificultad: "fácil",
    verEjecucion: false,
  },
  {
    id: "predict-js-undefined-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Valores undefined",
    descripcion: "Predice el comportamiento de undefined",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `let x;
const obj = { a: 1 };
console.log(x);
console.log(obj.b);`,
    opciones: ["undefined, undefined", "null, null", "0, 0", "Error, Error"],
    respuestaCorrecta: "undefined, undefined",
    explicacion: "Variables no inicializadas y propiedades inexistentes retornan undefined.",
    accion: "plantarse",
    dificultad: "medio",
    verEjecucion: false,
  },
  {
    id: "predict-js-template-1",
    tipo: "predecir-salida",
    lenguaje: "JavaScript",
    titulo: "Template literals",
    descripcion: "Predice el resultado de template strings",
    preguntas: "¿Qué imprimirá este código?",
    codigo: `const nombre = 'Carlos';
const edad = 28;
console.log(\`Mi nombre es \${nombre} y tengo \${edad} años\`);`,
    opciones: [
      "Mi nombre es Carlos y tengo 28 años",
      "Mi nombre es ${nombre} y tengo ${edad} años",
      "Mi nombre es nombre y tengo edad años",
      "Error de sintaxis",
    ],
    respuestaCorrecta: "Mi nombre es Carlos y tengo 28 años",
    explicacion: "Los template literals con ${} interpolan las variables dentro del string.",
    accion: "siguientePartida",
    dificultad: "medio",
    verEjecucion: false,
  },
]