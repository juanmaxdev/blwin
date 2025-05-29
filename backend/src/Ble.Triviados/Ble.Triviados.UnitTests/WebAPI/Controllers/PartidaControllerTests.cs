using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Services.WebApi.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ble.Triviados.UnitTests.WebAPI.Controllers
{
    public class PartidaControllerTests
    {
        [Fact]
        public async Task Crear_DeberiaRetornarOkConId()
        {
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.CrearPartidaAsync(It.IsAny<CrearPartidaDto>()))
                       .ReturnsAsync(1);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.Crear(new CrearPartidaDto { UsuarioId = 99 });

            var ok = resultado as OkObjectResult;
            ok.Should().NotBeNull();
            ok!.Value.Should().BeEquivalentTo(new { partidaId = 1 });
        }

        [Fact]
        public async Task Actualizar_DeberiaRetornarOkSiExito()
        {
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ActualizarPartidaAsync(It.IsAny<ActualizarPartidaDto>()))
                       .ReturnsAsync(true);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.Actualizar(new ActualizarPartidaDto { PartidaId = 1 });

            resultado.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async Task Actualizar_DeberiaRetornarBadRequestSiFalla()
        {
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ActualizarPartidaAsync(It.IsAny<ActualizarPartidaDto>()))
                       .ReturnsAsync(false);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.Actualizar(new ActualizarPartidaDto { PartidaId = 1 });

            resultado.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task Obtener_DeberiaRetornarPartidaSiExiste()
        {
            var dto = new PartidaDto { Id = 1, UsuarioId = 1 };
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerPartidaAsync(1)).ReturnsAsync(dto);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.Obtener(1);

            var ok = resultado as OkObjectResult;
            ok.Should().NotBeNull();
            ok!.Value.Should().Be(dto);
        }

        [Fact]
        public async Task Obtener_DeberiaRetornarNotFoundSiNoExiste()
        {
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerPartidaAsync(It.IsAny<int>())).ReturnsAsync((PartidaDto?)null);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.Obtener(5);

            resultado.Should().BeOfType<NotFoundObjectResult>();
        }

        [Fact]
        public async Task ObtenerEstado_DeberiaRetornarOkSiExiste()
        {
            var dto = new PartidaEstadoDto { PartidaId = 1, Puntos = 500 };
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerEstadoPartidaAsync(1)).ReturnsAsync(dto);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.ObtenerEstado(1);

            var ok = resultado as OkObjectResult;
            ok.Should().NotBeNull();
            ok!.Value.Should().Be(dto);
        }

        [Fact]
        public async Task ObtenerEstado_DeberiaRetornarNotFoundSiNoExiste()
        {
            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerEstadoPartidaAsync(It.IsAny<int>()))
                       .ReturnsAsync((PartidaEstadoDto?)null);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.ObtenerEstado(10);

            resultado.Should().BeOfType<NotFoundObjectResult>();
        }

        [Fact]
        public async Task ObtenerRanking_DeberiaRetornarOkConLista()
        {
            var ranking = new List<RankingItemDto>
            {
                new RankingItemDto { Posicion = 1, NombreUsuario = "Juan", Puntos = 1000 }
            };

            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerRankingAsync(1)).ReturnsAsync(ranking);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.ObtenerRanking(1);

            var ok = resultado as OkObjectResult;
            ok.Should().NotBeNull();
            ok!.Value.Should().BeEquivalentTo(ranking);
        }

        [Fact]
        public async Task ObtenerRankingPorPartida_DeberiaRetornarOkConRanking()
        {
            var ranking = new List<RankingItemDto>
            {
                new RankingItemDto { Posicion = 1, NombreUsuario = "Ana", Puntos = 1200 }
            };

            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerRankingPorPartidaAsync(1)).ReturnsAsync(ranking);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.ObtenerRankingPorPartida(1);

            var ok = resultado as OkObjectResult;
            ok.Should().NotBeNull();
            ok!.Value.Should().BeEquivalentTo(ranking);
        }

        [Fact]
        public async Task ObtenerTop5_DeberiaRetornarTop5JugadoresConMasPuntos()
        {
           
            var top5 = new List<RankingItemDto>
            {
                new RankingItemDto { Posicion = 1, NombreUsuario = "Salvi", Puntos = 1000 },
                new RankingItemDto { Posicion = 2, NombreUsuario = "Carlos", Puntos = 950 },
                new RankingItemDto { Posicion = 3, NombreUsuario = "Jesús", Puntos = 900 },
                new RankingItemDto { Posicion = 4, NombreUsuario = "Esther", Puntos = 850 },
                new RankingItemDto { Posicion = 5, NombreUsuario = "Iván", Puntos = 800 }
             };

            var mockService = new Mock<IPartidaService>();
            mockService.Setup(s => s.ObtenerTop5Async()).ReturnsAsync(top5);

            var controller = new PartidaController(mockService.Object);

            var resultado = await controller.ObtenerTop5();

            var ok = resultado as OkObjectResult;
            ok.Should().NotBeNull();
            ok!.Value.Should().BeEquivalentTo(top5);
        }


        [Fact]
        public async Task ObtenerJugadoresActivos_DeberiaRetornarOkConVidasYPuntos()
            {
                var jugadoresActivos = new List<JugadorActivoDto>
        {
            new JugadorActivoDto { UsuarioId = 1, NombreUsuario = "Ana", Puntos = 1200, VidasRestantes = 2 },
            new JugadorActivoDto { UsuarioId = 2, NombreUsuario = "Luis", Puntos = 1100, VidasRestantes = 1 }
        };

                var mockService = new Mock<IPartidaService>();
                mockService.Setup(s => s.ObtenerJugadoresConPartidaActivaAsync())
                           .ReturnsAsync(jugadoresActivos);

                var controller = new PartidaController(mockService.Object);

                var resultado = await controller.ObtenerJugadoresActivos();

                var ok = resultado as OkObjectResult;
                ok.Should().NotBeNull();

                ok!.Value.Should().BeEquivalentTo(jugadoresActivos, options =>
                    options.WithStrictOrdering().IncludingFields());
            }

        }
}
