# Etapa 1: Construcción del Frontend
FROM node:23-alpine AS frontend-builder

WORKDIR /frontend

# Copiar los archivos del frontend
COPY frontend/src/App-React/package.json ./ 
COPY frontend/src/App-React/package-lock.json ./
COPY frontend/src/App-React/tailwind.config.js ./
COPY frontend/src/App-React/tsconfig.json ./

RUN npm install

# Copiar el resto de los archivos
COPY frontend/src/App-React/ ./

RUN npm run build

# Etapa de construcción del backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-builder

WORKDIR /src

# Copiar los archivos de proyecto primero
COPY backend/src/Ble.Triviados/Ble.Triviados.Services.WebApi/*.csproj ./Ble.Triviados.Services.WebApi/
COPY backend/src/Ble.Triviados/Ble.Triviados.Application/*.csproj ./Ble.Triviados.Application/
COPY backend/src/Ble.Triviados/Ble.Triviados.Domain.Entity/*.csproj ./Ble.Triviados.Domain.Entity/
COPY backend/src/Ble.Triviados/Ble.Triviados.Infraestructure.Persistence/*.csproj ./Ble.Triviados.Infraestructure.Persistence/


# Restaurar dependencias
RUN dotnet restore ./Ble.Triviados.Services.WebApi/Ble.Triviados.Services.WebApi.csproj

# Copiar el resto de los archivos
COPY backend/src/Ble.Triviados/ ./Ble.Triviados/

WORKDIR /src/Ble.Triviados

# Publicar la aplicación
RUN dotnet publish /src/Ble.Triviados/Ble.Triviados.Services.WebApi/Ble.Triviados.Services.WebApi.csproj -c Release -o /app/backend

# Etapa final
FROM mcr.microsoft.com/dotnet/aspnet:9.0

# Instalar dependencias de Node.js
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

WORKDIR /app

# Copiar los resultados del build del frontend
COPY --from=frontend-builder /frontend ./frontend


# Copiar el backend y los archivos necesarios
COPY --from=backend-builder /app/backend ./backend

# Copiar el script de inicio
COPY start.sh ./start.sh

# Dar permisos de ejecución al script de inicio
RUN chmod +x ./start.sh

# Exponer los puertos necesarios
EXPOSE 3000
EXPOSE 8080


# Configuración de entorno
# ENV ENVIROMENT=Development
# ENV VERSION=1.0.0

# Comando para iniciar la aplicación
CMD ["sh", "./start.sh"]
