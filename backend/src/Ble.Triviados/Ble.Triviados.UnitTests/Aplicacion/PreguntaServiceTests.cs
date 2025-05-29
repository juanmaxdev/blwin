using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace Ble.Triviados.UnitTests.Aplicacion
{
    public class PreguntaServiceTests
    {
        [Fact]
        public async Task ObtenerPreguntasPorTematicaAsync_DeberiaRetornar3PreguntasAleatorias()
        {
            // Arrange
            var preguntas = new List<Pregunta>
            {
                new Pregunta { Id = 1, Enunciado = "P1", Tipo = "M", Tema = "Arte", RespuestaCorrecta = "A", RespuestasPregunta = new List<string> { "A", "B", "C", "D", "E", "F" } },
                new Pregunta { Id = 2, Enunciado = "P2", Tipo = "VF", Tema = "Arte", RespuestaCorrecta = "Verdadero", RespuestasPregunta = new List<string> { "Verdadero", "Falso" } },
                new Pregunta { Id = 3, Enunciado = "P3", Tipo = "M", Tema = "Arte", RespuestaCorrecta = "X", RespuestasPregunta = new List<string> { "X", "Y", "Z", "W" } },
                new Pregunta { Id = 4, Enunciado = "P4", Tipo = "M", Tema = "Arte", RespuestaCorrecta = "Q", RespuestasPregunta = new List<string> { "Q", "R", "S", "T" } },
            };

            var mockRepo = new Mock<IPreguntaRepository>();
            mockRepo.Setup(r => r.ObtenerPorTematicaAsync("Arte")).ReturnsAsync(preguntas);

            var service = new PreguntaService(mockRepo.Object);

            // Act
            var resultado = await service.ObtenerPreguntasPorTematicaAsync("Arte");

            // Assert
            resultado.Should().HaveCount(3);
            resultado.Should().OnlyContain(p => p.Tematica == "Arte");

            foreach (var pregunta in resultado.Where(p => p.Tipo == "M"))
            {
                pregunta.RespuestasPregunta.Should().HaveCount(3);
                pregunta.RespuestasPregunta.Should().NotContain(pregunta.RespuestaCorrecta); // Solo incorrectas
            }
        }

        [Fact]
        public async Task ObtenerTematicaAleatoriaAsync_DeberiaRetornarTematica()
        {
            var mockRepo = new Mock<IPreguntaRepository>();
            mockRepo.Setup(r => r.ObtenerTematicaAleatoriaAsync()).ReturnsAsync("Historia");

            var service = new PreguntaService(mockRepo.Object);

            var resultado = await service.ObtenerTematicaAleatoriaAsync();

            resultado.Should().Be("Historia");
        }

        [Fact]
        public async Task ObtenerTematicaAleatoriaEvitandoUltimaAsync_SinUltima_DeberiaRetornarCualquiera()
        {
            var mockRepo = new Mock<IPreguntaRepository>();
            mockRepo.Setup(r => r.ObtenerTematicaAleatoriaAsync()).ReturnsAsync("Deportes");

            var service = new PreguntaService(mockRepo.Object);

            var resultado = await service.ObtenerTematicaAleatoriaEvitandoUltimaAsync(null);

            resultado.Should().Be("Deportes");
        }

        [Fact]
        public async Task ObtenerTematicaAleatoriaEvitandoUltimaAsync_ConUltima_DeberiaEvitarEsa()
        {
            var mockRepo = new Mock<IPreguntaRepository>();
            mockRepo.Setup(r => r.ObtenerTematicaAleatoriaEvitandoUltimaAsync("Ciencia")).ReturnsAsync("Arte");

            var service = new PreguntaService(mockRepo.Object);

            var resultado = await service.ObtenerTematicaAleatoriaEvitandoUltimaAsync("Ciencia");

            resultado.Should().Be("Arte");
        }
    }
}
