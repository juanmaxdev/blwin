using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using FluentAssertions;
using Microsoft.IdentityModel.Tokens;
using Moq;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Ble.Triviados.UnitTests.Aplicacion
{
    public class UsuarioRegisterServiceTests
    {
        private readonly string _fakeKey = "ClaveSuperSecretaParaJWT";
        private readonly string _fakeIssuer = "Ble.Triviados";
        private readonly string _fakeAudience = "Ble.TriviadosUsuarios";

        [Fact]
        public async Task RegistrarUsuarioAsync_DeberiaRetornarMensajeExito_CuandoDatosSonValidos()
        {
            // Arrange: Creamos DTO válido y mock del repositorio que devuelve un usuario simulado
            var dto = new RegistroUsuarioDto
            {
                Name = "Juan",
                Password = "123456"
            };

            var usuarioMock = new Usuario
            {
                Name = dto.Name,
                Password = dto.Password,
                FechaRegistro = DateTime.Now
            };

            var mockRepo = new Mock<IUsuarioRepository>();
            mockRepo.Setup(repo => repo.RegistrarAsync(It.IsAny<Usuario>()))
                    .ReturnsAsync(usuarioMock);

            // Mock de IConfiguration para pasar la configuración al servicio
            var configurationMock = new Mock<IConfiguration>();
            configurationMock.Setup(c => c["Jwt:Key"]).Returns(_fakeKey);
            configurationMock.Setup(c => c["Jwt:Issuer"]).Returns(_fakeIssuer);
            configurationMock.Setup(c => c["Jwt:Audience"]).Returns(_fakeAudience);

            var service = new UsuarioService(mockRepo.Object, configurationMock.Object);

            // Act
            var resultado = await service.RegistrarUsuarioAsync(dto);

            // Assert
            resultado.Should().Be("Usuario registrado correctamente.");
        }


        public async Task RegistrarUsuarioAsync_DeberiaRetornarMensajeError_CuandoNombreOContrasenaInvalidos(string nombre, string password)
        {
            // Arrange
            var dto = new RegistroUsuarioDto
            {
                Name = nombre,
                Password = password
            };

            var mockRepo = new Mock<IUsuarioRepository>();
            var configurationMock = new Mock<IConfiguration>();
            var service = new UsuarioService(mockRepo.Object, configurationMock.Object);

            // Act
            var resultado = await service.RegistrarUsuarioAsync(dto);

            // Assert
            resultado.Should().Be("Nombre o contraseña no válidos.");
        }

        [Fact]
        public async Task RegistrarUsuarioAsync_DeberiaRetornarMensajeError_CuandoRepositorioRetornaNull()
        {
            // Arrange: Repositorio simula fallo (devuelve null)
            var dto = new RegistroUsuarioDto
            {
                Name = "Pedro",
                Password = "456789"
            };

            var mockRepo = new Mock<IUsuarioRepository>();
            mockRepo.Setup(repo => repo.RegistrarAsync(It.IsAny<Usuario>()))
                    .ReturnsAsync((Usuario)null);

            var configurationMock = new Mock<IConfiguration>();
            var service = new UsuarioService(mockRepo.Object, configurationMock.Object);

            // Act
            var resultado = await service.RegistrarUsuarioAsync(dto);

            // Assert
            resultado.Should().Be("Error al registrar el usuario.");
        }
    }
}
