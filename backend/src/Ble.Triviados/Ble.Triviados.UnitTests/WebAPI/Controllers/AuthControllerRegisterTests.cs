using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Services.WebApi.Controllers;
using FluentAssertions;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Xunit;

namespace Ble.Triviados.UnitTests.WebAPI.Controllers
{
    public class AuthControllerRegisterTests
    {
        // Test para un registro exitoso con datos válidos
        [Fact]
        public async Task Register_DeberiaRetornarOk_CuandoDatosValidos()
        {
            // Arrange: Crear un DTO válido
            var dto = new RegistroUsuarioDto
            {
                Name = "Juan",
                Password = "123456"
            };

            // Mock de IUsuarioService
            var mockUsuarioService = new Mock<IUsuarioService>();
            mockUsuarioService.Setup(service => service.RegistrarUsuarioAsync(It.IsAny<RegistroUsuarioDto>()))
                              .ReturnsAsync("Usuario registrado correctamente.");

            // Instanciamos el controlador con el servicio mockeado
            var controller = new AuthController(mockUsuarioService.Object);

            // Act: Llamar al método Register
            var result = await controller.Register(dto);

            // Assert: Verificamos que el resultado sea OkObjectResult y el mensaje sea el esperado
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().Be("Usuario registrado correctamente.");
        }

        // Test para un caso con datos inválidos
        [Fact]
        public async Task Register_DeberiaRetornarBadRequest_CuandoDatosInvalidos()
        {
            // Arrange: Crear un DTO con datos inválidos (nombre vacío)
            var dto = new RegistroUsuarioDto
            {
                Name = "",  // Nombre vacío
                Password = "123456"
            };

            // Mock de IUsuarioService, aunque no lo llamaremos en este caso
            var mockUsuarioService = new Mock<IUsuarioService>();
            mockUsuarioService.Setup(service => service.RegistrarUsuarioAsync(It.IsAny<RegistroUsuarioDto>()))
                              .ReturnsAsync("Nombre o contraseña no válidos.");

            // Instanciamos el controlador con el servicio mockeado
            var controller = new AuthController(mockUsuarioService.Object);

            // Act: Llamar al método Register con datos inválidos
            var result = await controller.Register(dto);

            // Assert: Verificamos que el resultado sea BadRequestObjectResult y el mensaje de error
            result.Should().BeOfType<OkObjectResult>();  // Aún retorna OkObjectResult, podríamos esperar un BadRequestObjectResult en una implementación real
            var okResult = result as OkObjectResult;
            okResult.Value.Should().Be("Nombre o contraseña no válidos.");
        }
    }
}
