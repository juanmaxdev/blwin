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
    opciones: ["JavaScript", "Python", "Java", "C++"],
    explicacion: "Las funciones se declaran con 'function' y console.log es característico de JavaScript",
  },
  {
    id: 2,
    codigo: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    respuestaCorrecta: "Python",
    opciones: ["Python", "Ruby", "JavaScript", "Go"],
    explicacion: "La sintaxis 'def', indentación y list comprehensions son características de Python",
  },
  {
    id: 3,
    codigo: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int[] numbers = {1, 2, 3, 4, 5};
    }
}`,
    respuestaCorrecta: "Java",
    opciones: ["Java", "C#", "C++", "Kotlin"],
    explicacion: "La estructura de clase pública, main method y System.out.println son típicos de Java",
  },
  {
    id: 4,
    codigo: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    for(auto num : nums) {
        cout << num << " ";
    }
    return 0;
}`,
    respuestaCorrecta: "C++",
    opciones: ["C++", "C", "Rust", "Go"],
    explicacion: "Los #include, using namespace std, y cout son característicos de C++",
  },
  {
    id: 5,
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
    opciones: ["HTML", "XML", "CSS", "JavaScript"],
    explicacion: "La estructura DOCTYPE, etiquetas html, head y body son propias de HTML",
  },
  {
    id: 6,
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
    id: 7,
    codigo: `package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    for _, num := range numbers {
        fmt.Println(num)
    }
}`,
    respuestaCorrecta: "Go",
    opciones: ["Go", "Rust", "C", "Swift"],
    explicacion: "La declaración 'package main', 'func main()' y 'fmt.Println' son característicos de Go",
  },
  {
    id: 8,
    codigo: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    for num in &numbers {
        println!("{}", num);
    }
    
    let result: Result<i32, &str> = Ok(42);
}`,
    respuestaCorrecta: "Rust",
    opciones: ["Rust", "Go", "C++", "Swift"],
    explicacion: "La sintaxis 'fn main()', 'let', 'vec!', 'println!' y tipos como Result son de Rust",
  },
  {
    id: 9,
    codigo: `using System;
using System.Collections.Generic;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
            foreach (var num in numbers)
            {
                Console.WriteLine(num);
            }
        }
    }
}`,
    respuestaCorrecta: "C#",
    opciones: ["C#", "Java", "F#", "Visual Basic"],
    explicacion: "El uso de 'using System', 'namespace', 'Console.WriteLine' y la sintaxis de clases son típicos de C#",
  },
  {
    id: 10,
    codigo: `public async Task<IActionResult> GetUserAsync(int id)
{
    if (id <= 0)
    {
        return BadRequest("Invalid user id");
    }

    var user = await _userService.GetByIdAsync(id);
    if (user == null)
    {
        return NotFound();
    }

    return Ok(user);
}`,
    respuestaCorrecta: "C#",
    opciones: ["C#", "TypeScript", "Java", "Kotlin"],
    explicacion:
      "La sintaxis de Task<IActionResult>, async/await y los métodos BadRequest/NotFound/Ok son típicos de ASP.NET Core en C#",
  },
  {
    id: 11,
    codigo: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function createUser(user: User): User {
  return {
    ...user,
    isActive: true
  };
}

const newUser = createUser({
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: false
});`,
    respuestaCorrecta: "TypeScript",
    opciones: ["TypeScript", "JavaScript", "Flow", "Dart"],
    explicacion:
      "La definición de interfaces con tipos explícitos (number, string, boolean) y anotaciones de tipo en parámetros de funciones son características de TypeScript",
  },
  {
    id: 12,
    codigo: `class UserService<T extends BaseEntity> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findById(id: number): Promise<T | undefined> {
    return await this.repository.findOne({ where: { id } });
  }
}

const userService = new UserService<User>(userRepository);`,
    respuestaCorrecta: "TypeScript",
    opciones: ["TypeScript", "Java", "C#", "Kotlin"],
    explicacion:
      "Los genéricos con restricciones (T extends BaseEntity), anotaciones de tipo y async/await con Promise<T> son características de TypeScript",
  },
  {
    id: 13,
    codigo: `[Authorize]
public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    
    public AccountController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    
    [HttpPost]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }
        }
        
        return View(model);
    }
}`,
    respuestaCorrecta: "C#",
    opciones: ["C#", "Java", "TypeScript", "PHP"],
    explicacion:
      "Los atributos [Authorize], [HttpPost], la herencia de Controller, y el uso de ModelState.IsValid son típicos de ASP.NET MVC en C#",
  },
  {
    id: 14,
    codigo: `type Props = {
  title: string;
  description?: string;
  items: Array<{
    id: number;
    name: string;
  }>;
  onSelect: (id: number) => void;
};

export const ItemList: React.FC<Props> = ({ 
  title, 
  description = "Default description", 
  items, 
  onSelect 
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={() => onSelect(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};`,
    respuestaCorrecta: "TypeScript",
    opciones: ["TypeScript", "JavaScript", "JSX", "Flow"],
    explicacion:
      "La definición de tipos con 'type Props', anotaciones de tipo para props de componentes React, y el tipado de funciones como '(id: number) => void' son características de TypeScript con React",
  },
  {
    id: 15,
    codigo: `class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

class Program
{
    static void Main()
    {
        Animal myPet = new Dog();
        myPet.MakeSound(); // Outputs: Woof!
    }
}`,
    respuestaCorrecta: "C#",
    opciones: ["C#", "Java", "C++", "TypeScript"],
    explicacion:
      "Las palabras clave 'virtual', 'override', la sintaxis de herencia con ':' y Console.WriteLine son características de C#",
  },
  {
    id: 16,
    codigo: `print("Hola mundo")
    nombre = input("¿Cuál es tu nombre? ")
    print(f"Hola, {nombre}!")`,
    respuestaCorrecta: "Python",
    opciones: ["Python", "Ruby", "JavaScript", "Perl"],
    explicacion: "La función print, input y el uso de f-strings son distintivos de Python",
  },
  {
    id: 17,
    codigo: `puts "Hola mundo"
    print "¿Cómo te llamas? "
    nombre = gets.chomp
    puts "Hola, #{nombre}"`,
    respuestaCorrecta: "Ruby",
    opciones: ["Ruby", "Python", "JavaScript", "PHP"],
    explicacion: "El uso de 'puts', 'gets.chomp' y la interpolación con #{...} son característicos de Ruby",
  },
  {
    id: 18,
    codigo: `<?php
    $name = "Carlos";
    echo "Hola, " . $name;
    ?>`,
    respuestaCorrecta: "PHP",
    opciones: ["PHP", "Perl", "JavaScript", "HTML"],
    explicacion: "El uso de etiquetas <?php ?> y 'echo' son propios de PHP",
  },
  {
    id: 19,
    codigo: `let nombre = "Ana";
    console.log(\`Hola, \${nombre}\`);`,
    respuestaCorrecta: "JavaScript",
    opciones: ["JavaScript", "TypeScript", "Python", "Ruby"],
    explicacion: "Uso de backticks y template literals es característico de JavaScript",
  },
  {
    id: 20,
    codigo: `fun main() {
    val nombres = listOf("Ana", "Luis", "Carlos")
    for (nombre in nombres) {
        println("Hola, \$nombre")
    }
}`,
    respuestaCorrecta: "Kotlin",
    opciones: ["Kotlin", "Java", "Swift", "Scala"],
    explicacion: "La palabra clave 'fun', 'val', y el uso de listOf son característicos de Kotlin",
  },
  {
    id: 21,
    codigo: `val names = listOf("Alice", "Bob", "Charlie")
    names.foreach(name => println(s"Hello, $name"))`,
    respuestaCorrecta: "Scala",
    opciones: ["Scala", "Kotlin", "Java", "Haskell"],
    explicacion: "El uso de 'val', 'foreach' y la interpolación con 's\"\"' son distintivos de Scala",
  },
  {
    id: 22,
    codigo: `main() {
  var names = ['Ana', 'Luis', 'Carlos'];
  for (var name in names) {
    print('Hola \$name');
  }
}`,
    respuestaCorrecta: "Dart",
    opciones: ["Dart", "JavaScript", "Kotlin", "Swift"],
    explicacion: "El uso de 'var', listas con corchetes y la sintaxis del main es típica de Dart",
  },
  {
    id: 23,
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
    id: 24,
    codigo: `fun main() {
  val greeting = "Hola"
  println("\$greeting mundo")
}`,
    respuestaCorrecta: "Kotlin",
    opciones: ["Kotlin", "Swift", "Scala", "Java"],
    explicacion: "El uso de 'val', 'fun' y la interpolación de strings con \$ es típico de Kotlin",
  },
  {
    id: 25,
    codigo: `print *, "Hello, world!"
    end`,
    respuestaCorrecta: "Fortran",
    opciones: ["Fortran", "Pascal", "COBOL", "Ada"],
    explicacion: `"print *" y la estructura sin paréntesis son distintivas de Fortran`,
  },
  {
    id: 26,
    codigo: `with Ada.Text_IO;
use Ada.Text_IO;

procedure Hello is
begin
   Put_Line ("Hello, world!");
end Hello;`,
    respuestaCorrecta: "Ada",
    opciones: ["Ada", "Pascal", "Modula-2", "Fortran"],
    explicacion: "El uso de 'procedure', 'Put_Line', y la sintaxis estructurada es propia de Ada",
  },
  {
    id: 27,
    codigo: `BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello, World!');
    END;`,
    respuestaCorrecta: "PL/SQL",
    opciones: ["PL/SQL", "T-SQL", "SQL", "Pascal"],
    explicacion: "El uso de DBMS_OUTPUT.PUT_LINE es típico de PL/SQL de Oracle",
  },
  {
    id: 28,
    codigo: `SELECT name FROM users WHERE age > 30;`,
    respuestaCorrecta: "SQL",
    opciones: ["SQL", "T-SQL", "PL/SQL", "LINQ"],
    explicacion: "La sentencia SELECT-FROM-WHERE es básica de SQL estándar",
  },
  {
    id: 29,
    codigo: `echo "Hola mundo"
    read -p "¿Cómo te llamas? " nombre
    echo "Hola \$nombre"`,
    respuestaCorrecta: "Bash",
    opciones: ["Bash", "Zsh", "PowerShell", "Perl"],
    explicacion: "El uso de 'echo', 'read -p' y la expansión con \$ es típico de Bash",
  },
  {
    id: 30,
    codigo: `Write-Host "Hola mundo"
    $name = Read-Host "¿Cómo te llamas?"
    Write-Host "Hola $name"`,
    respuestaCorrecta: "PowerShell",
    opciones: ["PowerShell", "Bash", "CMD", "Perl"],
    explicacion: "Uso de Write-Host, Read-Host y variables con \$ es distintivo de PowerShell",
  }
]
