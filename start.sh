#!/bin/bash

# Iniciar el backend (.NET 9) en segundo plano
echo "Iniciando el backend de .NET 9..."
cd /app/backend
dotnet Ble.Triviados.Services.WebApi.dll &  # Asegúrate de que el archivo .dll correcto esté en /app/backend

# Esperar un momento para asegurarse de que el backend está listo
sleep 10

# Iniciar el frontend (React) en segundo plano
echo "Iniciando el frontend de React..."
cd /app/frontend
npm start &  # Arrancar el servidor de desarrollo de React

# Esperar que ambos procesos continúen ejecutándose
wait
