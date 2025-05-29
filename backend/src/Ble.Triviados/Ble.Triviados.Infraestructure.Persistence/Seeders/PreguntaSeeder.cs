using System.Text.Json;
using Ble.Triviados.Domain.Entity.Entities;
using Microsoft.EntityFrameworkCore;
 
namespace Ble.Triviados.Infraestructure.Persistence.Seeders
{
    public static class PreguntaSeeder
    {
        public static async Task SeedAsync(TriviadosDbContext context)
        {
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "SeedData", "preguntas.json");
 
            if (!File.Exists(path))
            {
                Console.WriteLine("Archivo preguntas.json no encontrado.");
                return;
            }
 
            var json = await File.ReadAllTextAsync(path);
 
            Console.WriteLine("Contenido leído del JSON:");
            Console.WriteLine(json);
 
            var opciones = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
 
            var preguntas = JsonSerializer.Deserialize<List<Pregunta>>(json, opciones);
 
            // Eliminar todas las preguntas existentes antes de insertar
            var existentes = await context.Preguntas.ToListAsync();
            context.Preguntas.RemoveRange(existentes);
            await context.SaveChangesAsync();
 
            // Insertar nuevas preguntas
            if (preguntas != null)
            {
                context.Preguntas.AddRange(preguntas);
                await context.SaveChangesAsync();
                Console.WriteLine($"{preguntas.Count} preguntas insertadas.");
            }
        }
    }
}