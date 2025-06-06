using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Test.BLWin.Services
{
    [TestClass]
    public class UsuarioServiceTests
    {
        private Mock<IUsuarioRepository> _usuarioRepositoryMock;
        private Mock<IConfiguration> _configurationMock;
        private UsuarioService _usuarioService;

        [TestInitialize]
        public void Setup()
        {
            _usuarioRepositoryMock = new Mock<IUsuarioRepository>();
            _configurationMock = new Mock<IConfiguration>();
            _usuarioService = new UsuarioService(_usuarioRepositoryMock.Object, _configurationMock.Object);
        }

        [TestMethod]
        public async Task RegistrarUsuarioAsync_UsuarioValido_MensajeExito()
        {
            // Arrange: Creamos un DTO con datos válidos
            var dto = new RegistroUsuarioDto
            {
                Name = "testuser",
                Password = "1234"
            };

            var usuario = new Usuario
            {
                Id = 1,
                Name = "testuser",
                Password = "hashed",
                FechaRegistro = DateTime.Now
            };

            _usuarioRepositoryMock
                .Setup(repo => repo.RegistrarAsync(It.IsAny<Usuario>()))
                .ReturnsAsync(usuario); // Simulamos que el usuario se guarda correctamente

            // Act: Llamamos al método RegistrarUsuarioAsync
            var result = await _usuarioService.RegistrarUsuarioAsync(dto);

            // Assert: Verificamos que el resultado sea el mensaje de éxito esperado
            Assert.AreEqual("Usuario registrado correctamente.", result);
        }

        [TestMethod]
        public async Task RegistrarUsuarioAsync_UsuarioInvalido_MensajeError()
        {
            // Arrange: Creamos un DTO con nombre y contraseña inválidos
            var dto = new RegistroUsuarioDto { Name = "", Password = "" };

            // Act: Ejecutamos el método RegistrarUsuarioAsync_UsuarioInvalido_MensajeError
            var result = await _usuarioService.RegistrarUsuarioAsync(dto);

            // Assert: Comprobamos que el mensaje devuelto indique que los datos no son válidos
            Assert.AreEqual("Nombre o contraseña no válidos.", result);
        }
    }
}
