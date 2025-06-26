
# Blwin

**Blwin** es una plataforma interactiva diseñada para facilitar el aprendizaje de la programación. Su objetivo es proporcionar a los usuarios una experiencia educativa integral a través de ejercicios prácticos, desafíos de codificación y materiales didácticos organizados por niveles de dificultad y lenguajes de programación.

La aplicación está compuesta por dos partes:

- **Frontend** desarrollado en **React**
- **Backend** desarrollado en **.NET Core**

---

## 📚 Características principales

- Interfaz de usuario intuitiva y responsiva  
- Sistema de autenticación de usuarios  
- Seguimiento del progreso del usuario  

---

## 🚀 Requisitos previos

### Generales

- Node.js   
- .NET 
- Git  
- Base de datos SQL Server (local o en la nube)  
- Visual Studio o Visual Studio Code  

---

## 🧰 Herramientas utilizadas

Para el desarrollo y mantenimiento de Blwin, se han utilizado las siguientes herramientas esenciales:

- **Git**: Sistema de control de versiones distribuido que permite gestionar el historial de cambios del código fuente, facilitar la colaboración entre desarrolladores y mantener un flujo de trabajo organizado mediante ramas y commits.

- **Visual Studio Code**: Editor de código ligero, multiplataforma y altamente extensible, ideal para trabajar con tecnologías como JavaScript, TypeScript y React. Se utiliza principalmente para el desarrollo del frontend.

- **Visual Studio 2022**: Entorno de desarrollo integrado (IDE) completo y potente, utilizado para desarrollar, depurar y administrar proyectos .NET. Es especialmente útil para trabajar con el backend de Blwin, ya que ofrece herramientas avanzadas para manejo de bases de datos, depuración, pruebas y migraciones.

- **Docker** *(opcional)*: Plataforma de contenedores que permite empaquetar la aplicación y sus dependencias en entornos aislados. Facilita la implementación en diferentes entornos (local, pruebas, producción) asegurando consistencia y portabilidad.

---

## ⚙️ Preparación de la base de datos.

### No dispones de servidor de base de datos:

   Para usar nuestra base de datos en docker recomendamos usar la imagen "mssql/server". Para usarla tenemos que disponer de docker instalado y solo tendríamos que ejecutar el comando siguiente:

   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=TuContraseña" \
   -p 1433:1433 --name sqlserver-blwin \
   -d mcr.microsoft.com/mssql/server:2022-latest

   ```

### Dispones de servidor de base de datos

Si ya dispones de un servidor de base de datos podrías pasar a la instalación del backend sin ningun problema.

---

## ⚙️ Instalación del Backend (.NET)

1. Clona el repositorio:

   ```bash
   git clone https://dev.azure.com/savia/BL_Feedback/_git/blwin/
   cd blwin/backend
   ```

2. Configura el archivo `appsettings.json`:

   Asegúrate de tener la cadena de conexión correcta a tu base de datos SQL Server.  
   Ejemplo:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=BlwinDb;Trusted_Connection=True;"
     }
   }
   ```

3. Ejecuta las migraciones para crear la base de datos:

   ```bash
   dotnet ef database update
   ```

4. Inicia el servidor:

   ```bash
   dotnet run
   ```

   El backend estará disponible en `https://localhost:5001` (o el puerto configurado).

---

## 💻 Instalación del Frontend (React)

1. Abre una terminal y navega al directorio del frontend:

   ```bash
   cd ../frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:

   ```bash
   npm start
   ```

   La aplicación se ejecutará en `http://localhost:3000`.

---

## 🧪 Pruebas

### Backend

```bash
cd backend
dotnet test
```

### Frontend

```bash
cd frontend
npm test
```

---

## 🛠 Tecnologías utilizadas

- **Frontend**: React, TypeScript, Axios, React Router, Tailwind CSS  
- **Backend**: ASP.NET Core, Entity Framework Core, SQL Server  
- **Autenticación**: JWT  
- **Control de versiones**: Git
