
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
