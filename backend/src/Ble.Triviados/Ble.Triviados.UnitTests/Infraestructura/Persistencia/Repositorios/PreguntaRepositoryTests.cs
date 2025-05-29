using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Infraestructure.Persistence;
using Ble.Triviados.Infraestructure.Persistence.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Ble.Triviados.UnitTests.Infraestructura.Persistencia.Repositorios
{
    public class PreguntaRepositoryTests
    {
        private async Task<TriviadosDbContext> GetDbContextAsync()
        {
            var options = new DbContextOptionsBuilder<TriviadosDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Base aislada por test
                .Options;

            var context = new TriviadosDbContext(options);
            await context.Database.EnsureCreatedAsync();
            return context;
        }

        [Fact]
        public async Task ObtenerPorTematicaAsync_DeberiaRetornarPreguntasDeLaTematica()
        {
            // Arrange
            var context = await GetDbContextAsync();
            context.Preguntas.AddRange(
                new Pregunta { Tema = "Historia", Enunciado = "Pregunta 1", Tipo = "M", RespuestaCorrecta = "Respuesta A", RespuestasPregunta = new List<string> { "Respuesta A", "B", "C", "D" } },
                new Pregunta { Tema = "Arte", Enunciado = "Pregunta 2", Tipo = "VF", RespuestaCorrecta = "Verdadero", RespuestasPregunta = new List<string> { "Verdadero", "Falso" } }
            );
            await context.SaveChangesAsync();

            var repository = new PreguntaRepository(context);

            // Act
            var resultado = await repository.ObtenerPorTematicaAsync("Historia");

            // Assert
            resultado.Should().HaveCount(1);
            resultado.First().Tema.Should().Be("Historia");
        }

        [Fact]
        public async Task ObtenerTematicaAleatoriaAsync_DeberiaRetornarUnaTematica()
        {
            // Arrange
            var context = await GetDbContextAsync();
            context.Preguntas.AddRange(
                new Pregunta { Tema = "Ciencia", Enunciado = "¿Qué es el ADN?", Tipo = "M", RespuestaCorrecta = "Ácido desoxirribonucleico", RespuestasPregunta = new List<string> { "A", "B", "C", "Ácido desoxirribonucleico" } },
                new Pregunta { Tema = "Historia", Enunciado = "¿Año del descubrimiento de América?", Tipo = "VF", RespuestaCorrecta = "1492", RespuestasPregunta = new List<string> { "1492", "1493" } }
            );
            await context.SaveChangesAsync();

            var repository = new PreguntaRepository(context);

            // Act
            var tematica = await repository.ObtenerTematicaAleatoriaAsync();

            // Assert
            tematica.Should().NotBeNull();
            new[] { "Ciencia", "Historia" }.Should().Contain(tematica);
        }

        [Fact]
        public async Task ObtenerTematicaAleatoriaEvitandoUltimaAsync_DeberiaEvitarUltima()
        {
            // Arrange
            var context = await GetDbContextAsync();
            context.Preguntas.AddRange(
                new Pregunta { Tema = "Cine", Enunciado = "¿Quién dirigió Titanic?", Tipo = "M", RespuestaCorrecta = "James Cameron", RespuestasPregunta = new List<string> { "James Cameron", "Spielberg", "Nolan" } },
                new Pregunta { Tema = "Geografía", Enunciado = "Capital de Japón", Tipo = "VF", RespuestaCorrecta = "Tokio", RespuestasPregunta = new List<string> { "Tokio", "Osaka" } }
            );
            await context.SaveChangesAsync();

            var repository = new PreguntaRepository(context);

            // Act
            var tematica = await repository.ObtenerTematicaAleatoriaEvitandoUltimaAsync("Cine");

            // Assert
            tematica.Should().NotBe("Cine");
            tematica.Should().Be("Geografía");
        }
    }
}
