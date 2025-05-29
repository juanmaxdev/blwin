using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Services.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;
using System.Threading.Tasks;
using Moq;
using Xunit;

namespace Ble.Triviados.UnitTests.WebAPI.Controllers
{
    public class AuthControllerLoginTests
    {
        private readonly Mock<IUsuarioService> _usuarioServiceMock;
        private readonly AuthController _controller;

        public AuthControllerLoginTests()
        {
            _usuarioServiceMock = new Mock<IUsuarioService>();
            _controller = new AuthController(_usuarioServiceMock.Object);
        }

        [Fact]
        public async Task Login_DeberiaRetornarOk_CuandoCredencialesSonValidas()
        {
            // Arrange
            var dto = new LoginUsuarioDto { Name = "Paco", Password = "Paco1234" };
            var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Token JWT simulado

            _usuarioServiceMock
                .Setup(s => s.LoginUsuarioAsync(dto))
                .ReturnsAsync(token);

            // Act
            var result = await _controller.Login(dto);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult?.Value.Should().BeEquivalentTo(new { Token = token });
        }

        [Fact]
        public async Task Login_DeberiaRetornarBadRequest_CuandoUsuarioNoExiste()
        {
            // Arrange
            var dto = new LoginUsuarioDto { Name = "Noexiste", Password = "Paco1234" };
            var mensaje = "❌ Usuario no encontrado.";

            _usuarioServiceMock
                .Setup(s => s.LoginUsuarioAsync(dto))
                .ReturnsAsync(mensaje);

            // Act
            var result = await _controller.Login(dto);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult?.Value.Should().BeEquivalentTo(new { Message = mensaje });
        }

        [Fact]
        public async Task Login_DeberiaRetornarBadRequest_CuandoContraseñaEsIncorrecta()
        {
            // Arrange
            var dto = new LoginUsuarioDto { Name = "Paco", Password = "Padsafdgdsafsdf" };
            var mensaje = "❌ Contraseña incorrecta.";

            _usuarioServiceMock
                .Setup(s => s.LoginUsuarioAsync(dto))
                .ReturnsAsync(mensaje);

            // Act
            var result = await _controller.Login(dto);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult?.Value.Should().BeEquivalentTo(new { Message = mensaje });
        }
    }
}
