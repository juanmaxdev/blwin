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
    public class UsuarioLoginServiceTests
    {
        private readonly Mock<IUsuarioRepository> _usuarioRepositoryMock;
        private readonly UsuarioService _service;
        private readonly string _fakeKey = "ClaveSuperSecretaParaJWT1234567890";
        private readonly string _fakeIssuer = "Ble.Triviados";
        private readonly string _fakeAudience = "Ble.TriviadosUsuarios";

        public UsuarioLoginServiceTests()
        {
            _usuarioRepositoryMock = new Mock<IUsuarioRepository>();

            // Mock de IConfiguration para pasar la configuración al servicio
            var configurationMock = new Mock<IConfiguration>();
            configurationMock.Setup(c => c["Jwt:Key"]).Returns(_fakeKey);
            configurationMock.Setup(c => c["Jwt:Issuer"]).Returns(_fakeIssuer);
            configurationMock.Setup(c => c["Jwt:Audience"]).Returns(_fakeAudience);

            _service = new UsuarioService(_usuarioRepositoryMock.Object, configurationMock.Object);
        }

        [Fact]
        public async Task LoginUsuarioAsync_UsuarioNoExiste_RetornaMensajeDeError()
        {
            // Arrange
            var dto = new LoginUsuarioDto { Name = "Josepe", Password = "bl1234" };
            _usuarioRepositoryMock.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync((Usuario)null);

            // Act
            var resultado = await _service.LoginUsuarioAsync(dto);

            // Assert
            Assert.Equal("❌ Usuario no encontrado.", resultado);
        }

        [Fact]
        public async Task LoginUsuarioAsync_ContraseñaIncorrecta_RetornaMensajeDeError()
        {
            // Arrange
            var dto = new LoginUsuarioDto { Name = "Juan", Password = "incorrecta" };
            var usuario = new Usuario { Name = "Juan", Password = BCrypt.Net.BCrypt.HashPassword("1234") }; // Hash de la contraseña correcta

            _usuarioRepositoryMock.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync(usuario);

            // Act
            var resultado = await _service.LoginUsuarioAsync(dto);

            // Assert
            Assert.Equal("❌ Contraseña incorrecta.", resultado);
        }

        [Fact]
        public async Task LoginUsuarioAsync_CredencialesCorrectas_RetornaTokenValido()
        {
            // Arrange
            var dto = new LoginUsuarioDto { Name = "Paco", Password = "Paco1234" };
            var usuario = new Usuario { Name = "Paco", Password = BCrypt.Net.BCrypt.HashPassword("Paco1234")}; // Hash de la contraseña correcta

            _usuarioRepositoryMock.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync(usuario);

            // Act
            var resultado = await _service.LoginUsuarioAsync(dto);

            // Assert
            Assert.NotNull(resultado);

            // Validar que el resultado es un token JWT válido
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(resultado);

            Assert.NotNull(token);
            Assert.Equal("Paco", token.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value);
            Assert.Equal("User", token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value);
            Assert.Equal(_fakeIssuer, token.Issuer);
            Assert.Equal(_fakeAudience, token.Audiences.FirstOrDefault());
        }
    }
}