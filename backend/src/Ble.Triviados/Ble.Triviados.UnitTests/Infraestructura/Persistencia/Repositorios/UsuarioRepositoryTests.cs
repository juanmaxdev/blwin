using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Infraestructure.Persistence.Repositories;
using Moq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;
using System.Linq;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Services.WebApi.Helpers;


namespace Ble.Triviados.UnitTests.Infraestructura.Persistencia.Repositorios
{
    public class UsuarioRepositoryTests
    {
        private readonly Mock<IUsuarioService> _mockUsuarioService;

        public UsuarioRepositoryTests()
        {
            _mockUsuarioService = new Mock<IUsuarioService>();
        }

        [Fact]
        public async Task LoginUsuarioAsync_ShouldReturnToken_WhenCredentialsAreValid()
        {
            // Arrange
            var fakeKey = "ClaveSuperSecretaParaJWT1234567890";
            var fakeIssuer = "Ble.Triviados";
            var fakeAudience = "Ble.TriviadosUsuarios";

            var fakeToken = JwtTokenHelper.GenerateFakeJwtToken(fakeKey, fakeIssuer, fakeAudience);

            _mockUsuarioService
                .Setup(service => service.LoginUsuarioAsync(It.IsAny<LoginUsuarioDto>()))
                .ReturnsAsync(fakeToken);

            var loginDto = new LoginUsuarioDto
            {
                Name = "Paco",
                Password = "Paco1234"
            };

            // Act
            var result = await _mockUsuarioService.Object.LoginUsuarioAsync(loginDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(fakeToken, result);
        }

        [Fact]
        public async Task LoginUsuarioAsync_ShouldReturnError_WhenCredentialsAreInvalid()
        {
            // Arrange
            _mockUsuarioService
                .Setup(service => service.LoginUsuarioAsync(It.IsAny<LoginUsuarioDto>()))
                .ReturnsAsync("❌ Usuario no encontrado.");

            var loginDto = new LoginUsuarioDto
            {
                Name = "InvalidUser",
                Password = "InvalidPassword"
            };

            // Act
            var result = await _mockUsuarioService.Object.LoginUsuarioAsync(loginDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("❌ Usuario no encontrado.", result);
        }
    }
}