using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Services.WebApi.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Ble.Triviados.UnitTests.WebAPI.Controllers
{
    public class PreguntaControllerTests
    {
        [Fact]
        public async Task ObtenerPorTematica_DeberiaRetornarOkConPreguntas()
        {
           
            var mockService = new Mock<IPreguntaService>();
            var tematica = "Arte";
            var preguntas = new List<PreguntaDto> { new PreguntaDto { Id = 1, Tematica = tematica } };

            mockService.Setup(s => s.ObtenerPreguntasPorTematicaAsync(tematica))
                       .ReturnsAsync(preguntas);

            var controller = new PreguntaController(mockService.Object);

          
            var resultado = await controller.ObtenerPorTematica(tematica);

        
            var okResult = resultado as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.Value.Should().BeEquivalentTo(preguntas);
        }

        [Fact]
        public async Task ObtenerTematicaAleatoria_DeberiaRetornarOkSiExiste()
        {
            var mockService = new Mock<IPreguntaService>();
            mockService.Setup(s => s.ObtenerTematicaAleatoriaAsync())
                       .ReturnsAsync("Ciencia");

            var controller = new PreguntaController(mockService.Object);

            var resultado = await controller.ObtenerTematicaAleatoria();

            var okResult = resultado as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.Value.Should().Be("Ciencia");
        }

        [Fact]
        public async Task ObtenerTematicaAleatoria_DeberiaRetornarNotFoundSiNoExiste()
        {
            var mockService = new Mock<IPreguntaService>();
            mockService.Setup(s => s.ObtenerTematicaAleatoriaAsync())
                       .ReturnsAsync((string?)null);

            var controller = new PreguntaController(mockService.Object);

            var resultado = await controller.ObtenerTematicaAleatoria();

            resultado.Should().BeOfType<NotFoundObjectResult>();
        }

        [Fact]
        public async Task ObtenerTematicaEvitandoUltima_DeberiaRetornarOkSiExiste()
        {
            var mockService = new Mock<IPreguntaService>();
            mockService.Setup(s => s.ObtenerTematicaAleatoriaEvitandoUltimaAsync("Arte"))
                       .ReturnsAsync("Historia");

            var controller = new PreguntaController(mockService.Object);

            var resultado = await controller.ObtenerTematicaEvitandoUltima("Arte");

            var okResult = resultado as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.Value.Should().Be("Historia");
        }

        [Fact]
        public async Task ObtenerTematicaEvitandoUltima_DeberiaRetornarNotFoundSiNoExiste()
        {
            var mockService = new Mock<IPreguntaService>();
            mockService.Setup(s => s.ObtenerTematicaAleatoriaEvitandoUltimaAsync("Arte"))
                       .ReturnsAsync((string?)null);

            var controller = new PreguntaController(mockService.Object);

            var resultado = await controller.ObtenerTematicaEvitandoUltima("Arte");

            resultado.Should().BeOfType<NotFoundObjectResult>();
        }
    }
}
