using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace Ble.Triviados.UnitTests.Aplicacion
{
    public class PartidaAppServiceTests
    {
        [Fact]
        public async Task CrearPartidaAsync_DeberiaCrearPartidaConValoresIniciales()
        {
            var mockRepo = new Mock<IPartidaRepository>();
            var service = new PartidaAppService(mockRepo.Object);

            var dto = new CrearPartidaDto { UsuarioId = 1 };

            var id = await service.CrearPartidaAsync(dto);

            mockRepo.Verify(r => r.CrearPartidaAsync(It.Is<Partida>(
                p => p.UsuarioId == dto.UsuarioId &&
                     p.PuntosPartida == 0 &&
                     p.VidasRestantes == 3 &&
                     p.FechaInicio != default &&
                     p.FechaFin != default
            )), Times.Once);
        }

        [Fact]
        public async Task ActualizarPartidaAsync_RespuestaCorrecta_TipoM_Suma200Puntos()
        {
            var partida = new Partida
            {
                Id = 1,
                UsuarioId = 99,
                VidasRestantes = 3,
                PuntosPartida = 0
            };

            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(partida.Id)).ReturnsAsync(partida);

            var service = new PartidaAppService(mockRepo.Object);

            var dto = new ActualizarPartidaDto
            {
                PartidaId = partida.Id,
                RespuestaCorrecta = true,
                TipoPregunta = "M"
            };

            var resultado = await service.ActualizarPartidaAsync(dto);

            Assert.True(resultado);
            Assert.Equal(200, partida.PuntosPartida);
            mockRepo.Verify(r => r.ActualizarPartidaAsync(partida), Times.Once);
        }

        [Fact]
        public async Task ActualizarPartidaAsync_RespuestaIncorrecta_DecrementaVida()
        {
            var partida = new Partida
            {
                Id = 2,
                UsuarioId = 88,
                VidasRestantes = 2,
                PuntosPartida = 300
            };

            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(partida.Id)).ReturnsAsync(partida);

            var service = new PartidaAppService(mockRepo.Object);

            var dto = new ActualizarPartidaDto
            {
                PartidaId = partida.Id,
                RespuestaCorrecta = false,
                TipoPregunta = "VF"
            };

            var resultado = await service.ActualizarPartidaAsync(dto);

            Assert.True(resultado);
            Assert.Equal(1, partida.VidasRestantes);
            Assert.Equal(300, partida.PuntosPartida);
            mockRepo.Verify(r => r.ActualizarPartidaAsync(partida), Times.Once);
        }

        [Theory]
        [InlineData(null, "M", false, 0)]
        [InlineData(3, "VF", false, 0)]
        public async Task ActualizarPartidaAsync_CuandoNoExisteOPartidaFinalizada_DevuelveFalse(int? partidaId, string tipoPregunta, bool respuestaCorrecta, int vidasRestantes)
        {
            Partida? partida = partidaId.HasValue
                ? new Partida
                {
                    Id = partidaId.Value,
                    VidasRestantes = vidasRestantes,
                    PuntosPartida = 0,
                    UsuarioId = 1
                }
                : null;

            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(It.IsAny<int>())).ReturnsAsync(partida);

            var service = new PartidaAppService(mockRepo.Object);

            var dto = new ActualizarPartidaDto
            {
                PartidaId = partidaId ?? 99,
                RespuestaCorrecta = respuestaCorrecta,
                TipoPregunta = tipoPregunta
            };

            var resultado = await service.ActualizarPartidaAsync(dto);

            Assert.False(resultado);
            mockRepo.Verify(r => r.ActualizarPartidaAsync(It.IsAny<Partida>()), Times.Never);
        }

        [Fact]
        public async Task ObtenerPartidaAsync_CuandoExistePartida_DevuelveDtoCorrecto()
        {
            var partida = new Partida
            {
                Id = 1,
                UsuarioId = 10,
                FechaInicio = new DateTime(2025, 1, 1),
                FechaFin = new DateTime(2025, 1, 2),
                PuntosPartida = 300,
                VidasRestantes = 2
            };

            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(1)).ReturnsAsync(partida);

            var service = new PartidaAppService(mockRepo.Object);

            var resultado = await service.ObtenerPartidaAsync(1);

            Assert.NotNull(resultado);
            Assert.Equal(partida.Id, resultado.Id);
            Assert.Equal(partida.UsuarioId, resultado.UsuarioId);
            Assert.Equal(partida.FechaInicio, resultado.FechaInicio);
            Assert.Equal(partida.FechaFin, resultado.FechaFin);
            Assert.Equal(partida.PuntosPartida, resultado.PuntosPartida);
            Assert.Equal(partida.VidasRestantes, resultado.VidasRestantes);
        }

        [Fact]
        public async Task ObtenerPartidaAsync_CuandoNoExistePartida_DevuelveNull()
        {
            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(It.IsAny<int>())).ReturnsAsync((Partida?)null);

            var service = new PartidaAppService(mockRepo.Object);

            var resultado = await service.ObtenerPartidaAsync(99);

            Assert.Null(resultado);
        }

        [Fact]
        public async Task ObtenerEstadoPartidaAsync_CuandoExistePartida_DevuelveEstadoCorrecto()
        {
            var partida = new Partida
            {
                Id = 1,
                UsuarioId = 10,
                VidasRestantes = 2,
                PuntosPartida = 400
            };

            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(partida.Id)).ReturnsAsync(partida);

            var service = new PartidaAppService(mockRepo.Object);

            var resultado = await service.ObtenerEstadoPartidaAsync(partida.Id);

            Assert.NotNull(resultado);
            Assert.Equal(partida.Id, resultado.PartidaId);
            Assert.Equal(partida.UsuarioId, resultado.UsuarioId);
            Assert.Equal(partida.VidasRestantes, resultado.VidasRestantes);
            Assert.Equal(partida.PuntosPartida, resultado.Puntos);
        }

        [Fact]
        public async Task ObtenerEstadoPartidaAsync_CuandoNoExistePartida_DevuelveNull()
        {
            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(It.IsAny<int>())).ReturnsAsync((Partida?)null);

            var service = new PartidaAppService(mockRepo.Object);

            var resultado = await service.ObtenerEstadoPartidaAsync(999);

            Assert.Null(resultado);
        }

        [Fact]
        public async Task ObtenerRankingAsync_DevuelveUsuarioDentroDelTop10()
        {
            var usuarioId = 3;
            var mockRepo = new Mock<IPartidaRepository>();

            var partidas = Enumerable.Range(1, 15).Select(i =>
                new Partida
                {
                    Id = i,
                    UsuarioId = i,
                    PuntosPartida = 1000 - i * 10,
                    Usuario = new Usuario { Id = i, Name = $"Usuario{i}" }
                }).ToList();

            mockRepo.Setup(r => r.ObtenerRankingGlobalAsync()).ReturnsAsync(partidas);

            var service = new PartidaAppService(mockRepo.Object);

            var ranking = await service.ObtenerRankingAsync(usuarioId);

            ranking.Should().NotBeNull();
            ranking.Count.Should().BeGreaterThan(9);
            ranking.Any(r => r.UsuarioId == usuarioId).Should().BeTrue();
            ranking.Any(r => r.EsUsuarioActual).Should().BeTrue();
        }

        [Fact]
        public async Task ObtenerRankingPorPartidaAsync_DeberiaDevolverRankingConSeparadorSiPartidaFueraDelTop10()
        {
            var partidaId = 15;
            var partidas = Enumerable.Range(1, 20).Select(i =>
                new Partida
                {
                    Id = i,
                    UsuarioId = i,
                    PuntosPartida = 1000 - i * 10,
                    Usuario = new Usuario { Id = i, Name = $"Usuario{i}" }
                }).ToList();

            var partidaActual = partidas.First(p => p.Id == partidaId);

            var mockRepo = new Mock<IPartidaRepository>();
            mockRepo.Setup(r => r.ObtenerPorIdAsync(partidaId)).ReturnsAsync(partidaActual);
            mockRepo.Setup(r => r.ObtenerRankingGlobalAsync()).ReturnsAsync(partidas);

            var service = new PartidaAppService(mockRepo.Object);

            var ranking = await service.ObtenerRankingPorPartidaAsync(partidaId);

            ranking.Should().NotBeNull();
            ranking.Should().Contain(r => r.UsuarioId == partidaId && r.EsUsuarioActual);
            ranking.Should().Contain(r => r.Posicion == -1 && r.NombreUsuario == "...");
            ranking.Count.Should().BeGreaterThan(10);
        }

        [Fact]
        public async Task ObtenerTop5Async_DeberiaDevolver5PrimerosUsuariosConMasPuntos()
        {
            
            var mockRepo = new Mock<IPartidaRepository>();
            var partidas = Enumerable.Range(1, 10).Select(i =>
                new Partida
                {
                    Id = i,
                    UsuarioId = i,
                    PuntosPartida = 1000 - i * 10,
                    Usuario = new Usuario { Id = i, Name = $"Usuario{i}" }
                }).ToList();

            mockRepo.Setup(r => r.ObtenerRankingGlobalAsync()).ReturnsAsync(partidas);

            var service = new PartidaAppService(mockRepo.Object);

            var resultado = await service.ObtenerTop5Async();

            resultado.Should().HaveCount(5);
            resultado[0].Puntos.Should().BeGreaterThan(resultado[4].Puntos);
            resultado.All(r => r.NombreUsuario.StartsWith("Usuario")).Should().BeTrue();
        }


        [Fact]
            public async Task ObtenerJugadoresConPartidaActivaAsync_DeberiaDevolverJugadorConMayorPuntajePorUsuario()
            {
                var partidasActivas = new List<Partida>
        {
            new Partida { UsuarioId = 1, PuntosPartida = 100, Usuario = new Usuario { Id = 1, Name = "User1" } },
            new Partida { UsuarioId = 1, PuntosPartida = 300, Usuario = new Usuario { Id = 1, Name = "User1" } },
            new Partida { UsuarioId = 2, PuntosPartida = 250, Usuario = new Usuario { Id = 2, Name = "User2" } },
            new Partida { UsuarioId = 2, PuntosPartida = 150, Usuario = new Usuario { Id = 2, Name = "User2" } },
            new Partida { UsuarioId = 3, PuntosPartida = 400, Usuario = new Usuario { Id = 3, Name = "User3" } }
        };

                var mockRepo = new Mock<IPartidaRepository>();
                mockRepo.Setup(r => r.ObtenerPartidasActivasAsync()).ReturnsAsync(partidasActivas);

                var service = new PartidaAppService(mockRepo.Object);

                var resultado = await service.ObtenerJugadoresConPartidaActivaAsync();

                resultado.Should().HaveCount(3);
                resultado.Should().ContainSingle(j => j.UsuarioId == 1 && j.Puntos == 300);
                resultado.Should().ContainSingle(j => j.UsuarioId == 2 && j.Puntos == 250);
                resultado.Should().ContainSingle(j => j.UsuarioId == 3 && j.Puntos == 400);
            }


        }
}
