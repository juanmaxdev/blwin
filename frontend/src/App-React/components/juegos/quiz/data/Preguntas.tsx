export interface Pregunta {
  id: number
  codigo: string
  respuestaCorrecta: string
  opciones: string[]
  explicacion?: string
}

export const Preguntas: Pregunta[] = [
  {
    id: 1,
    codigo: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));`,
    respuestaCorrecta: "JavaScript",
    opciones: ["Python", "JavaScript","Java", "C++"],
    explicacion: "Las funciones se declaran con 'function' y console.log es característico de JavaScript",
  },
  {
    id: 2,
    codigo: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int[] numbers = {1, 2, 3, 4, 5};
    }
}`,
    respuestaCorrecta: "Java",
    opciones: ["C#", "C++", "Kotlin", "Java"],
    explicacion: "La estructura de clase pública, main method y System.out.println son típicos de Java",
  },
  {
    id: 3,
    codigo: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Página</title>
</head>
<body>
    <h1>Hola Mundo</h1>
</body>
</html>`,
    respuestaCorrecta: "HTML",
    opciones: ["XML","HTML", "CSS", "JavaScript"],
    explicacion: "La estructura DOCTYPE, etiquetas html, head y body son propias de HTML",
  },
  {
    id: 4,
    codigo: `body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}`,
    respuestaCorrecta: "CSS",
    opciones: ["CSS", "SCSS", "HTML", "JavaScript"],
    explicacion: "Los selectores, propiedades como background-color y la sintaxis son típicos de CSS",
  },
  {
    id: 5,
    codigo: `package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    for _, num := range numbers {
        fmt.Println(num)
    }
}`,
    respuestaCorrecta: "Go",
    opciones: ["Rust", "C", "Go", "Swift"],
    explicacion: "La declaración 'package main', 'func main()' y 'fmt.Println' son característicos de Go",
  },
  {
    id: 6,
    codigo: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    for num in &numbers {
        println!("{}", num);
    }
    
    let result: Result<i32, &str> = Ok(42);
}`,
    respuestaCorrecta: "Rust",
    opciones: ["Go", "Rust", "C++", "Swift"],
    explicacion: "La sintaxis 'fn main()', 'let', 'vec!', 'println!' y tipos como Result son de Rust",
  },
  {
    id: 7,
    codigo: `print("Hola mundo")
    nombre = input("¿Cuál es tu nombre? ")
    print(f"Hola, {nombre}!")`,
    respuestaCorrecta: "Python",
    opciones: ["Ruby", "Python", "JavaScript", "Perl"],
    explicacion: "La función print, input y el uso de f-strings son distintivos de Python",
  },
  {
    id: 8,
    codigo: `puts "Hola mundo"
    print "¿Cómo te llamas? "
    nombre = gets.chomp
    puts "Hola, #{nombre}"`,
    respuestaCorrecta: "Ruby",
    opciones: ["Python", "JavaScript", "PHP", "Ruby"],
    explicacion: "El uso de 'puts', 'gets.chomp' y la interpolación con #{...} son característicos de Ruby",
  },
  {
    id: 9,
    codigo: `<?php
    $name = "Carlos";
    echo "Hola, " . $name;
    ?>`,
    respuestaCorrecta: "PHP",
    opciones: ["Perl", "PHP", "JavaScript", "HTML"],
    explicacion: "El uso de etiquetas <?php ?> y 'echo' son propios de PHP",
  },
  {
    id: 10,
    codigo: `let nombre = "Ana";
    console.log(\`Hola, \${nombre}\`);`,
    respuestaCorrecta: "JavaScript",
    opciones: ["JavaScript", "TypeScript", "Python", "Ruby"],
    explicacion: "Uso de backticks y template literals es característico de JavaScript",
  },
  {
    id: 11,
    codigo: `fun main() {
    val nombres = listOf("Ana", "Luis", "Carlos")
    for (nombre in nombres) {
        println("Hola, \$nombre")
    }
}`,
    respuestaCorrecta: "Kotlin",
    opciones: [ "Java", "Kotlin","Swift", "Scala"],
    explicacion: "La palabra clave 'fun', 'val', y el uso de listOf son característicos de Kotlin",
  },
  {
    id: 12,
    codigo: `val names = listOf("Alice", "Bob", "Charlie")
    names.foreach(name => println(s"Hello, $name"))`,
    respuestaCorrecta: "Scala",
    opciones: ["Scala", "Kotlin", "Java", "Haskell"],
    explicacion: "El uso de 'val', 'foreach' y la interpolación con 's\"\"' son distintivos de Scala",
  },
  {
    id: 13,
    codigo: `main() {
  var names = ['Ana', 'Luis', 'Carlos'];
  for (var name in names) {
    print('Hola \$name');
  }
}`,
    respuestaCorrecta: "Dart",              
    opciones: ["JavaScript", "Kotlin", "Dart", "Swift"],
    explicacion: "El uso de 'var', listas con corchetes y la sintaxis del main es típica de Dart",
  },
  {
    id: 14,
    codigo: `fn greet(name: &str) {
    println!("Hello, {}", name);
}

fn main() {
    greet("Alice");
}`,
    respuestaCorrecta: "Rust",
    opciones: ["Rust", "Go", "C++", "Swift"],
    explicacion: "La sintaxis 'fn', referencias con '&str' y el macro println! son característicos de Rust",
  },
  {
    id: 15,
    codigo: `fun main() {
  val greeting = "Hola"
  println("\$greeting mundo")
}`,
    respuestaCorrecta: "Kotlin",
    opciones: ["Swift", "Kotlin", "Scala", "Java"],
    explicacion: "El uso de 'val', 'fun' y la interpolación de strings con \$ es típico de Kotlin",
  },
  {
    id: 16,
    codigo: `print *, "Hello, world!"
    end`,
    respuestaCorrecta: "Fortran",
    opciones: ["Fortran", "Pascal", "COBOL", "Ada"],
    explicacion: `"print *" y la estructura sin paréntesis son distintivas de Fortran`,
  },
  {
    id: 17,
    codigo: `SELECT name FROM users WHERE age > 30;`,
    respuestaCorrecta: "SQL",
    opciones: ["T-SQL", "SQL", "PL/SQL", "LINQ"],
    explicacion: "La sentencia SELECT-FROM-WHERE es básica de SQL estándar",
  },
  {
    id: 18,
    codigo: `echo "Hola mundo"
    read -p "¿Cómo te llamas? " nombre
    echo "Hola \$nombre"`,
    respuestaCorrecta: "Bash",
    opciones: ["Bash", "Zsh", "PowerShell", "Perl"],
    explicacion: "El uso de 'echo', 'read -p' y la expansión con \$ es típico de Bash",
  },
  {
    id: 19,
    codigo: `Write-Host "Hola mundo"
    $name = Read-Host "¿Cómo te llamas?"
    Write-Host "Hola $name"`,
    respuestaCorrecta: "PowerShell",
    opciones: ["Bash", "CMD", "Perl", "PowerShell"],
    explicacion: "Uso de Write-Host, Read-Host y variables con \$ es distintivo de PowerShell",
  },
  {
  id: 20,
  codigo: `¿Cuál de los siguientes marcos de trabajo está más directamente relacionado con los principios del Manifiesto Ágil?`,
  respuestaCorrecta: "Scrum",
  opciones: ["Scrum", "Waterfall", "PRINCE2", "PMBOK"],
  explicacion: "Scrum es un marco de trabajo ágil basado en los valores y principios del Manifiesto Ágil.",
},
{
  id: 21,
  codigo: `¿Qué valor del Manifiesto Ágil enfatiza la colaboración directa con los clientes?`,
  respuestaCorrecta: "Colaboración con el cliente sobre la negociación de contratos",
  opciones: [
    "Procesos y herramientas sobre individuos",
    "Colaboración con el cliente sobre la negociación de contratos",
    "Seguimiento de un plan sobre la respuesta al cambio",
    "Documentación exhaustiva sobre software funcionando"
  ],
  explicacion: "Uno de los valores del Manifiesto Ágil es: 'Colaboración con el cliente sobre la negociación de contratos'.",
},
{
  id: 22,
  codigo: `¿Qué rol en Scrum es responsable de maximizar el valor del producto?`,
  respuestaCorrecta: "Product Owner",
  opciones: ["Scrum Master", "Product Owner", "Development Team", "Project Manager"],
  explicacion: "El Product Owner es el responsable de maximizar el valor del producto y gestionar el Product Backlog.",
},
{
  id: 23,
  codigo: `¿Cuál es la duración recomendada de un Sprint en Scrum?`,
  respuestaCorrecta: "Menos de un mes",
  opciones: ["1 semana", "2 semanas", "Menos de un mes", "No tiene duración fija"],
  explicacion: "Scrum recomienda que los Sprints duren un mes o menos para mantener una cadencia constante.",
},
{
  id: 24,
  codigo: `¿Qué artefacto en Scrum contiene la lista priorizada de funcionalidades del producto?`,
  respuestaCorrecta: "Product Backlog",
  opciones: ["Sprint Backlog", "Burndown Chart", "Product Backlog", "Definition of Done"],
  explicacion: "El Product Backlog es una lista priorizada de todo lo que podría ser necesario en el producto.",
},
{
  id: 25,
  codigo: `¿Cuál es el propósito de una retrospectiva en Scrum?`,
  respuestaCorrecta: "Mejorar continuamente el proceso del equipo",
  opciones: [
    "Asignar tareas del siguiente Sprint",
    "Revisar el progreso del producto con el cliente",
    "Mejorar continuamente el proceso del equipo",
    "Revisar las métricas del equipo"
  ],
  explicacion: "La retrospectiva busca que el equipo reflexione y mejore continuamente su forma de trabajar.",
},
{
  id: 26,
  codigo: `¿Qué principio ágil promueve la entrega continua de software funcionando?`,
  respuestaCorrecta: "Entrega temprana y continua de software con valor",
  opciones: [
    "Satisfacción del cliente mediante la entrega continua de valor",
    "Documentación detallada",
    "Control estricto del alcance",
    "Revisión trimestral de entregables"
  ],
  explicacion: "Uno de los principios del Manifiesto Ágil es: 'Nuestra mayor prioridad es satisfacer al cliente mediante la entrega temprana y continua de software con valor'.",
},
{
  id: 27,
  codigo: `¿Qué técnica ágil fomenta la planificación de historias de usuario y priorización colaborativa?`,
  respuestaCorrecta: "Planning Poker",
  opciones: ["PERT", "Gantt", "Planning Poker", "WBS"],
  explicacion: "Planning Poker es una técnica ágil para estimar historias de usuario basada en consenso del equipo.",
},
{
  id: 28,
  codigo: `¿Cuál de estos eventos NO es parte del marco de trabajo Scrum?`,
  respuestaCorrecta: "Fase de diseño detallado",
  opciones: [
    "Daily Scrum",
    "Sprint Retrospective",
    "Sprint Review",
    "Fase de diseño detallado"
  ],
  explicacion: "Scrum evita fases secuenciales como el diseño detallado, promoviendo iteraciones y mejora continua.",
},
{
  id: 29,
  codigo: `¿Qué significa "incremento" en Scrum?`,
  respuestaCorrecta: "La suma de todos los elementos del Product Backlog completados durante un Sprint y anteriores",
  opciones: [
    "Una mejora del proceso",
    "Una tarea completada",
    "El plan para el próximo Sprint",
    "La suma de todos los elementos del Product Backlog completados durante un Sprint y anteriores"
  ],
  explicacion: "El incremento es la versión utilizable y potencialmente desplegable del producto al final de un Sprint.",
}
]
