using Ble.Triviados.Domain.Entity.Entities;
using System;
using System.Collections.Generic;
using Xunit;

namespace Ble.Triviados.UnitTests.Dominio
{
    public class PreguntaTests
    {
        [Fact]
        public void Constructor_ConValoresValidos_CreaPreguntaCorrectamente()
        {
            // Arrange
            var enunciado = "¿Cuál es la capital de Francia?";
            var tipo = "M";
            var tema = "Geografía";
            var correcta = "París";
            var respuestas = new List<string> { "París", "Londres", "Roma", "Madrid" };

            // Act
            var pregunta = new Pregunta
            {
                Enunciado = enunciado,
                Tipo = tipo,
                Tema = tema,
                RespuestaCorrecta = correcta,
                RespuestasPregunta = respuestas
            };

            // Assert
            Assert.Equal(enunciado, pregunta.Enunciado);
            Assert.Equal(tipo, pregunta.Tipo);
            Assert.Equal(tema, pregunta.Tema);
            Assert.Equal(correcta, pregunta.RespuestaCorrecta);
            Assert.Equal(respuestas, pregunta.RespuestasPregunta);
        }

        [Fact]
        public void RespuestasPregunta_NoDebeSerNula()
        {
            // Arrange & Act
            var pregunta = new Pregunta();

            // Assert
            Assert.NotNull(pregunta.RespuestasPregunta);
        }
    }
}
