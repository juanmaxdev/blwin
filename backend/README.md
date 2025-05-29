# Documentación - Backend

## 1_ Descripción del Proyecto

Este backend forma parte de la aplicación web **Triviados**, (juego de preguntas y respuestas). Los usuarios pueden **registrarse e iniciar sesión** para participar en partidas.

Las funcionalidades implementadas se exponen con más detalle en este documento. 

Tecnologías utilizadas:

- ASP.NET Core (C#)
- Entity Framework Core - persistencia de datos.
- Arquitectura basada en **DDD (Domain-Driven Design)**
- **Swagger** - prueba y exploración de la API durante el desarrollo.
- **xUnit** - pruebas unitarias.
- Base de datos relacional (SQL Server).

## 2_ Arquitectura del Proyecto

El backend sigue una arquitectura basada en **DDD**, que permite dividir la lógica de negocio, la lógica de aplicación, la infraestructura y la capa de presentación (WebAPI) en módulos bien definidos y desacoplados.

Esta separación mejora la mantenibilidad, escalabilidad y claridad del proyecto.

---

## Estructura del Proyecto

```text
├── Aplicacion
│   ├── Dtos
│   │   └── RegistroUsuarioDto.cs
│   │   └── ****.cs
│   │
│   ├── Interfaces
│   │   └── IUsuarioService.cs
│   │   └── ****.cs
│   │
│   └── Services
│       └── UsuarioService.cs
│       └── ****.cs
│   
├── Dominio
│   ├── Entities
│   │   └── Usuario.cs
│   │   └── ****.cs
│   │
│   ├── Interfaces
│   │   └── IUsuarioRepository.cs
│   │   └── ****.cs
│   │
│   └── Services
│       └── (vacío / por implementar)
│       └── ****.cs
│   
│
├── Infraestructura
│   ├── Migrations
│   │   └── (generado por EF Core)
│   │
│   ├── Repositories
│   │   └── UsuarioRepository.cs
│   │   └── ****.cs
│   │
│   └── TriviadosDbContext.cs
│
├── WebAPI
│   ├── Controllers
│   │   └── AuthController.cs
│   │   └── ****.cs
│   │
│   └── Properties
│       └── launchSettings.json
│
└── Tests (pruebas unitarias con xUnit) 
    │── Aplication
    │── Dominio
    └── WebAPI
```


## Detalle de las Capas



### ✅ Aplicacion

Contiene la **lógica de aplicación**, orquestando servicios y flujos entre la WebAPI y el Dominio.

- `Dtos`: Estructuras de datos que recibe o entrega la API.
- `Interfaces`: Contratos de servicios de aplicación.
- `Services`: Implementaciones que coordinan el dominio e infraestructura.

### ✅ Dominio

Contiene el **modelo de negocio**, entidades y contratos que definen cómo debe comportarse el sistema, sin depender de tecnología.

- `Entities`: Clases con lógica y atributos del negocio.
- `Interfaces`: Contratos para los repositorios u otros servicios del dominio.
- `Services`: Lógica de negocio compleja (a futuro).

### ✅ Infraestructura

Contiene la implementación técnica de acceso a datos y recursos externos.

- `Repositories`: Implementaciones de acceso a datos con EF Core.
- `Migrations`: Archivos generados para el control de versiones de la base de datos.
- `AppDbContext.cs`: Contexto de EF Core.

### ✅ WebAPI

Expone la API REST.

- `Controllers`: Endpoints HTTP que reciben solicitudes del cliente y responden.
- `Properties`: Archivos de configuración (por ejemplo, `launchSettings.json`).

### ✅ Test

Contiene las **pruebas automatizadas** del proyecto, utilizando el framework **xUnit**. Pruebas unitarias que validan comportamientos de servicios o lógica del dominio.

- `Aplicacion`: Pruebas unitarias en la capa Aplicacion.
- `Dominio`: Pruebas unitarias en la capa Dominio.
- `WebAPI`: Pruebas unitarias en la capa WebAPI.


## 3_ Persistencia: Entity Framework Core (EF Core)


La aplicación utiliza **Entity Framework Core (EF Core)** como **ORM (Object-Relational Mapper)** para gestionar el acceso a la base de datos de forma sencilla y tipada, sin necesidad de escribir consultas SQL manuales.

EF Core permite trabajar con las entidades del dominio (`Usuario`, etc.) como si fueran objetos C# normales, y se encarga internamente de convertir las operaciones sobre estos objetos en sentencias SQL.

---

### 🧠 ¿Qué hace EF Core en este proyecto?

- Mapea las **entidades del dominio** a **tablas en la base de datos**.
- Permite **consultar y guardar datos** usando LINQ.
- Gestiona las **migraciones** de la base de datos (creación y actualizaciones del esquema).
- Se usa a través del archivo `AppDbContext.cs`, que actúa como puente entre las entidades y la base de datos real.

---

### 📄 Archivo principal: `AppDbContext.cs`

Este archivo se encuentra en la capa **Infraestructura**. Hereda de `DbContext`, y en él se registran las entidades como propiedades `DbSet`.

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }
}
````
DbSet\<Usuario> representa la tabla Usuarios en la base de datos. EF Core se encarga de crear esa tabla (y sus columnas)en función de la entidad Usuario.

### 📄 Configuración

``AppDbContext``se registra en el contenedor de servicios de ASP.NET en ``Program.cs``.

La cadena de conexión debe estar definida en ``appsettings.json``.

Puedes adaptarla a tu servidor y motor de base de datos (SQL Server, SQLite, PostgreSQL, etc.).

### 📄 Migraciones

EF Core permite gestionar el esquema de la base de datos mediante migraciones, que son archivos generados automáticamente a partir de los cambios en las entidades.

### 🛠 Crear una migración

```bash
dotnet ef migrations add NombreDeLaMigracion
````

### 🛠 Aplicar una migración a la base de datos

```bash
dotnet ef database update
````

### 🛠 Carpeta de migraciones

Las migraciones generadas se guardan en:
```bash
Infraestructura/Migrations/
````


## 4_ Swagger: Uso en el Proyecto

Se ha integrado **Swagger** como herramienta de desarrollo para facilitar la prueba y exploración de los endpoints de la API.

### ✅ Propósito

- Permite que los desarrolladores frontend puedan **probar funcionalidades** directamente desde el navegador sin necesidad de herramientas externas como Postman.
- Facilita la **comprobación rápida de la API** durante el desarrollo.
- Ayuda a verificar que los endpoints funcionen correctamente y devuelvan las respuestas esperadas.

> ⚠️ **Nota:** No se utiliza Swagger como documentación pública de la API, sino como **herramienta interna para desarrollo y testing**.

### ⚙️ Configuración de Swagger en `Program.cs`

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

app.UseSwagger();
app.UseSwaggerUI();
```

### ⚙️  Uso de la interfaz de Swagger 

Una vez levantado el servidor, se puede acceder a la interfaz de Swagger ejecutando la aplicación y accediendo a:

https://localhost:\<puerto>/swagger

Comprobar el puerto del que se accede en la terminal que se abre al ejecutar la aplicación.

 Desde ahí se pueden ejecutar métodos GET, POST, etc., ver estructuras de datos, y validar el comportamiento de la API sin escribir código del lado cliente.


## 5_ Funcionalidades Implementadas

### <u> 1_ Registro de Usuarios </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **registro de usuario**, desde que el frontend realiza una solicitud HTTP hasta que se guarda el usuario en base de datos. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>
El cliente realiza una solicitud `POST` a `/api/usuarios/registro` con los datos: nombre, email y contraseña.

 
2. <u> Entrada en el controlador.</u>  El controlador de la API (WebAPI) (`AuthController`) recibe la solicitud y el modelo DTO (`RegistroUsuarioDto`) con los datos. Envía el DTO al servicio de Aplicación `UsuarioService`.
3. <u> Servicio de aplicación.</u>  El servicio (`UsuarioService`) valida que el usuario y la contraseña sean válidos.
4. Si no existe, crea una nueva entidad `Usuario`,  y la guarda a través del repositorio `UsuarioRepository` (capa `Infraestructura`).
5. <u> Repositorio (acceso a datos). </u> El repositorio (`UsuarioRepository`)  implementa la interfaz del dominio  `IUsuarioRepository`. Utiliza `AppDbContext`  para acceder a la base de datos con Entity Framework Core.
6. Se devuelve una respuesta de éxito o error al cliente.

---

### Archivos Involucrados

| Capa           | Archivo                  | Descripción                                                  |
|----------------|--------------------------|--------------------------------------------------------------|
| Dominio        | `Usuario.cs`             | Entidad del dominio `Usuario`.                               |
| Dominio        | `IUsuarioRepository.cs`  | Contrato del repositorio de usuarios.                        |
| Aplicacion     | `RegistroUsuarioDto.cs`  | DTO que representa los datos del formulario de registro.     |
| Aplicacion     | `IUsuarioService.cs`     | Interfaz del servicio de aplicación para usuarios.           |
| Aplicacion     | `UsuarioService.cs`      | Implementación del servicio de registro de usuarios.         |
| Infraestructura| `UsuarioRepository.cs`   | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura| `TriviadosDbContext.cs`  | Contexto de EF Core que incluye `DbSet<Usuario>`.            |
| WebAPI         | `UsuariosController.cs`  | Controlador que expone el endpoint `POST /api/usuarios/registro`. |

---


### <u> 2_ Login de Usuarios </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **login de usuario**, desde que el frontend realiza una solicitud HTTP hasta que se valida si el usuario existe. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>  
   El cliente realiza una solicitud `POST` a `/api/auth/login` con los datos: nombre y contraseña.

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`AuthController`) recibe la solicitud con el `LoginUsuarioDto`. Envía los datos al servicio de aplicación `UsuarioService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`UsuarioService`) consulta si existe el usuario en base de datos a través del repositorio.  
   - Si existe y la contraseña coincide, se devuelve un mensaje de éxito.  
   - Si no existe o la contraseña no coincide, se devuelve un mensaje de error.

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`UsuarioRepository`) implementa `IUsuarioRepository` y usa `TriviadosDbContext` para consultar la base de datos mediante Entity Framework Core.

5. Se responde al cliente con un `200 OK` si el login es válido o un `400 BadRequest` si es incorrecto.

---

### Archivos Involucrados

| Capa            | Archivo                                             | Descripción                                                  |
|-----------------|-----------------------------------------------------|--------------------------------------------------------------|
| Dominio         | `Usuario.cs`                                        | Entidad del dominio `Usuario`.                               |
| Dominio         | `IUsuarioRepository.cs`                             | Contrato del repositorio de usuarios.                        |
| Aplicación      | `LoginUsuarioDto.cs`                                | DTO que representa los datos del formulario de login.        |
| Aplicación      | `IUsuarioService.cs`                                | Interfaz del servicio de aplicación para usuarios.           |
| Aplicación      | `UsuarioService.cs`                                 | Implementación del servicio de login de usuarios.            |
| Infraestructura | `Repositories/UsuarioRepository.cs`                 | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura | `TriviadosDbContext.cs`                             | Contexto de EF Core que incluye `DbSet<Usuario>`.            |
| WebAPI          | `Controllers/AuthController.cs`                     | Controlador que expone el endpoint `POST /api/auth/login`.   |



### <u> 3_ Obtener temática con ruleta </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **Obtener temática con ruleta**, desde que el frontend realiza una solicitud HTTP hasta que se envía la temática obtenida. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>  
   El cliente realiza una solicitud `GET` a `/api/pregunta/tematica/aleatoria` o `GET` a `/api/pregunta/tematica/aleatoria-evitando` si anteriormente se ha elegido una temática para evitar la última temática elegida. Esto ocurre al darle al botón de girar ruleta.

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`PreguntaController`) recibe la solicitud  y la envía al servicio de aplicación `PreguntaService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`PreguntaService`) consulta las temáticas de las preguntas en la base de datos a través del repositorio (`PreguntaRepository`).
  

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`PreguntaRepository`) implementa `IPreguntaRepository` y usa `TriviadosDbContext` para consultar la base de datos mediante Entity Framework Core. Devuelve una temática de manera aleatoria evitando la última si procede,

5. Se responde al cliente con un `OK` si no hay error junto con la `temática` o un mensaje si hubiera algún error.

---

### Archivos Involucrados

| Capa           | Archivo                   | Descripción                                                  |
|----------------|-----------------------.---|--------------------------------------------------------------|
| Dominio        | `Pregunta.cs`             | Entidad del dominio `Pregunta`.                              |
| Dominio        | `IPreguntaRepository.cs`  | Contrato del repositorio de preguntas.                       |
| Aplicacion     | `PreguntaDto.cs`          | DTO que representa los datos de las preguntas.               |
| Aplicacion     | `IPreguntaService.cs`     | Interfaz del servicio de aplicación para preguntas.          |
| Aplicacion     | `PreguntaService.cs`      | Implementación de los servicios relacionados con preguntas.  |
| Infraestructura| `PreguntaRepository.cs`   | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura| `TriviadosDbContext.cs`   | Contexto de EF Core que incluye `DbSet<Pregunta>`.           |
| WebAPI         | `PreguntaController.cs`   | Controlador que expone los endpoints                         |
|                |                           | `GET/api/pregunta/tematica/aleatoria` y                      |
|                |                           | `GET/api/pregunta/tematica/aleatoria-evitando`.              | 



### <u> 4_ Obtener preguntas según temática elegida </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **Obtener preguntas según temática elegida**, desde que el frontend realiza una solicitud HTTP hasta que se envían las preguntas según la temática obtenida. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>  
   El cliente realiza una solicitud `GET` a `/api/pregunta/tematica/tematica/{tematica}` automáticamente tras haber girado la ruleta incluyendo la temática elegida .

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`PreguntaController`) recibe la solicitud que incluye la temática y la envía al servicio de aplicación `PreguntaService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`PreguntaService`) consulta las preguntas con dicha temática en la base de datos a través del repositorio (`PreguntaRepository`). De la lista de preguntas obtenida coge 3 y las muestra.
  

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`PreguntaRepository`) implementa `IPreguntaRepository` y usa `TriviadosDbContext` para consultar la base de datos mediante Entity Framework Core. Devuelve las  preguntas con dicha temática.

5. Se responde al cliente con un `OK` si no hay error junto con las `preguntas` o un mensaje si hubiera algún error.

---

### Archivos Involucrados

| Capa           | Archivo                   | Descripción                                                  |
|----------------|-----------------------.---|--------------------------------------------------------------|
| Dominio        | `Pregunta.cs`             | Entidad del dominio `Pregunta`.                              |
| Dominio        | `IPreguntaRepository.cs`  | Contrato del repositorio de preguntas.                       |
| Aplicacion     | `PreguntaDto.cs`          | DTO que representa los datos de las preguntas.               |
| Aplicacion     | `IPreguntaService.cs`     | Interfaz del servicio de aplicación para preguntas.          |
| Aplicacion     | `PreguntaService.cs`      | Implementación de los servicios relacionados con preguntas.  |
| Infraestructura| `PreguntaRepository.cs`   | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura| `TriviadosDbContext.cs`   | Contexto de EF Core que incluye `DbSet<Pregunta>`.           |
| WebAPI         | `PreguntaController.cs`   | Controlador que expone el endpoint                           |
|                |                           | `GET/api/pregunta/tematica/tematica/{tematica}`              |


### <u> 5_ Comienzo del juego/partida  </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **Comienzo del juego/partida**, desde que el frontend realiza una solicitud HTTP hasta que se inicializa la partida. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>  
   Al pulsar el botón Jugar en la página Home, si no se ha iniciado sesión se redirecciona a la página de login, y si se ha iniciado sesión se realiza una solicitud `POST` a `/api/Partida/Crear` enviandose el id del usuario.

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`PartidaController`) recibe la solicitud con el dto `CrearPartidaDto` que incluye el id del usuario. Envía los datos al servicio de aplicación `PartidaAppService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`PartidaAppService`) crea una nueva partida a través del repositorio (`PartidaRepository`) y devuelve el id de la partida creada.
  

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`PartidaRepository`) implementa `IPartidaRepository` y usa `TriviadosDbContext` para consultar la base de datos mediante Entity Framework Core. Añade la partida recibida a la base de datos.

5. Se responde al cliente con un `OK` si no hay error junto con la `id` de la partida o un mensaje si hubiera algún error.

---

### Archivos Involucrados

| Capa           | Archivo                   | Descripción                                                  |
|----------------|-----------------------.---|--------------------------------------------------------------|
| Dominio        | `Partida.cs`              | Entidad del dominio `Partida`.                               |
| Dominio        | `IPartidaRepository.cs`   | Contrato del repositorio de partidas.                        |
| Aplicacion     | `CrearPartidaDto.cs`      | DTO que representa la creación de una partida.               |
| Aplicacion     | `IPartidaService.cs`      | Interfaz del servicio de aplicación para partidas.           |
| Aplicacion     | `PartidaAppService.cs`    | Implementación de los servicios relacionados con partidas.   |
| Infraestructura| `PartidaRepository.cs`    | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura| `TriviadosDbContext.cs`   | Contexto de EF Core que incluye `DbSet<Partida>`.            |
| WebAPI         | `PartidaController.cs`    | Controlador que expone el endpoints                          |
|                |                           | `POST/api/Partida/Crear`                                     |

### <u> 6_ Actualización de partida durante el juego </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **Actualización de partida durante el juego**, desde que el frontend realiza una solicitud HTTP hasta que se actualiza la partida. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>  
   Al seleccionar la respuesta se realiza una solicitud `POST` a `/api/Partida/actualizar` enviandose los datos para el dto `ActualizarPartidaDto`.

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`PartidaController`) recibe la solicitud con el dto `ActualizarPartidaDto` que incluye el id de la partida, si la respuesta es correcta o no y el tipo de pregunta. Envía los datos al servicio de aplicación `PartidaAppService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`PartidaAppService`) actualiza los datos de la partida (PuntosPartida y VidasRestantes) implementando el repositorio (`PartidaRepository`).
  

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`PartidaRepository`) implementa `IPartidaRepository` y usa `TriviadosDbContext` para consultar la base de datos mediante Entity Framework Core. Actualiza la partida recibida en la base de datos.

5. Se responde al cliente con un `OK` si no hay error  o un mensaje si hubiera algún error.

---

### Archivos Involucrados

| Capa           | Archivo                   | Descripción                                                  |
|----------------|-----------------------.---|--------------------------------------------------------------|
| Dominio        | `Partida.cs`              | Entidad del dominio `Partida`.                               |
| Dominio        | `IPartidaRepository.cs`   | Contrato del repositorio de partidas.                        |
| Aplicacion     | `ActualizarPartidaDto.cs` | DTO que representa la actualización de una partida.          |
| Aplicacion     | `IPartidaService.cs`      | Interfaz del servicio de aplicación para partidas.           |
| Aplicacion     | `PartidaAppService.cs`    | Implementación de los servicios relacionados con partidas.   |
| Infraestructura| `PartidaRepository.cs`    | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura| `TriviadosDbContext.cs`   | Contexto de EF Core que incluye `DbSet<Partida>`.            |
| WebAPI         | `PartidaController.cs`    | Controlador que expone el endpoint                           |
|                |                           | `POST/api/Partida/actualizar`                                |


### <u> 7_ Comprobación de estado de la partida </u>

### Flujo General

A continuación se describe el flujo de ejecución completo para la funcionalidad de **Comprobación de estado de la partida**, desde que el frontend realiza una solicitud HTTP hasta que se devuelve el estado de la partida, es decir, información de la partida como vidasRestantes, puntos o partidaFinalizada. Se indican los archivos y métodos que intervienen en cada paso.

1. <u> Solicitud del Cliente. </u>  
   Durante el juego se comprueba el estado de la partida realizando la solicitud `GET` a `/api/Partida/estado/${partidaId}` enviandose el id de la partida.

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`PartidaController`) recibe la solicitud con el id de la partida. Envía los datos al servicio de aplicación `PartidaAppService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`PartidaAppService`) obtiene los datos de la partida a través del repositorio (`PartidaRepository`) y devuelve un dto `PartidaEstadoDto` con los datos del estado de la partida.
  

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`PartidaRepository`) implementa `IPartidaRepository` y usa `TriviadosDbContext` para consultar la base de datos mediante Entity Framework Core. Devuelve la partida de la base de datos con el id recibido.

5. Se responde al cliente con un `OK` si no hay error junto con los datos del estado de la partida o un mensaje si hubiera algún error.

---

### Archivos Involucrados

| Capa           | Archivo                   | Descripción                                                  |
|----------------|-----------------------.---|--------------------------------------------------------------|
| Dominio        | `Partida.cs`              | Entidad del dominio `Partida`.                               |
| Dominio        | `IPartidaRepository.cs`   | Contrato del repositorio de partidas.                        |
| Aplicacion     | `PartidaEstadoDto.cs`     | DTO que representa el estado de una partida.                 |
| Aplicacion     | `IPartidaService.cs`      | Interfaz del servicio de aplicación para partidas.           |
| Aplicacion     | `PartidaAppService.cs`    | Implementación de los servicios relacionados con partidas.   |
| Infraestructura| `PartidaRepository.cs`    | Implementación concreta del repositorio usando EF Core.      |
| Infraestructura| `TriviadosDbContext.cs`   | Contexto de EF Core que incluye `DbSet<Partida>`.            |
| WebAPI         | `PartidaController.cs`    | Controlador que expone el endpoint                           |
|                |                           | `GET/api/Partida/estado/${partidaId}`                        | 



### <u> 8_ Mostrar usuarios con partida activa </u>

### Flujo General

Esta funcionalidad permite al frontend **mostrar una lista de usuarios que están jugando activamente**, es decir, que tienen al menos una partida en curso (con vidas restantes).

1. <u> Solicitud del Cliente. </u>  
   El cliente realiza una solicitud `GET` a `/api/Partida/jugadores-activos` para obtener los jugadores activos.

2. <u> Entrada en el controlador. </u>  
   El controlador de la API (`PartidaController`) recibe la solicitud. Llama al método `ObtenerJugadoresConPartidaActivaAsync()` del servicio `PartidaAppService`.

3. <u> Servicio de aplicación. </u>  
   El servicio (`PartidaAppService`) consulta las partidas activas (vidas > 0) en la base de datos a través del repositorio (`PartidaRepository`). Agrupa por usuario y devuelve un DTO (`JugadorActivoDto`) con los datos más relevantes: nombre, puntos y vidas restantes.

4. <u> Repositorio (acceso a datos). </u>  
   El repositorio (`PartidaRepository`) implementa `IPartidaRepository` y utiliza `TriviadosDbContext` para devolver las partidas activas ordenadas por puntaje y enlazadas con el usuario correspondiente.

5. Se responde al cliente con un `200 OK` y una lista de usuarios activos, o con un mensaje de error si no se encuentra información.

---

### Archivos Involucrados

| Capa           | Archivo                    | Descripción                                                              |
|----------------|----------------------------|--------------------------------------------------------------------------|
| Dominio        | `Partida.cs`               | Entidad del dominio `Partida`.                                           |
| Dominio        | `IPartidaRepository.cs`    | Contrato del repositorio de partidas.                                    |
| Aplicación     | `JugadorActivoDto.cs`      | DTO que representa un usuario con una partida activa.                    |
| Aplicación     | `IPartidaService.cs`       | Interfaz del servicio de aplicación para partidas.                       |
| Aplicación     | `PartidaAppService.cs`     | Implementación de la lógica que filtra y agrupa jugadores activos.       |
| Infraestructura| `PartidaRepository.cs`     | Implementación que consulta partidas con vidas restantes > 0.            |
| Infraestructura| `TriviadosDbContext.cs`    | Contexto de EF Core con acceso a `DbSet<Partida>` y `DbSet<Usuario>`.    |
| WebAPI         | `PartidaController.cs`     | Controlador que expone el endpoint: `GET /api/Partida/jugadores-activos` |

