using Ble.Triviados.Domain.Entity.Entities;
using System;
using Xunit;

namespace Ble.Triviados.UnitTests.Dominio
{
    public class PartidaTests
    {
        [Fact]
        public void Constructor_ConValoresValidos_CreaPartidaCorrectamente()
        {
            // Arrange
            var usuarioId = 1;
            var fechaInicio = DateTime.UtcNow;
            var fechaFin = fechaInicio.AddMinutes(10);
            var puntos = 300;
            var vidas = 2;

            // Act
            var partida = new Partida(usuarioId, fechaInicio, fechaFin, puntos, vidas);

            // Assert
            Assert.Equal(usuarioId, partida.UsuarioId);
            Assert.Equal(fechaInicio, partida.FechaInicio);
            Assert.Equal(fechaFin, partida.FechaFin);
            Assert.Equal(puntos, partida.PuntosPartida);
            Assert.Equal(vidas, partida.VidasRestantes);
        }

        [Fact]
        public void Constructor_PuntosNegativos_LanzaExcepcion()
        {
            // Act & Assert
            Assert.Throws<ArgumentException>(() =>
                new Partida(1, DateTime.UtcNow, DateTime.UtcNow, -100, 3)
            );
        }

        [Fact]
        public void Constructor_VidasNegativas_LanzaExcepcion()
        {
            // Act & Assert
            Assert.Throws<ArgumentException>(() =>
                new Partida(1, DateTime.UtcNow, DateTime.UtcNow, 100, -1)
            );
        }
    }
}
