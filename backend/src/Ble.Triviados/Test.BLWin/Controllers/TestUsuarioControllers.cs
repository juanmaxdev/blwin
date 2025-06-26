using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Interfaces;
using Moq;
using Microsoft.Extensions.Configuration;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Domain.Entity.Entities;


namespace Test.BLWin.Controllers;

[TestClass]
public class TestUsuarioControllers
{
    private Mock<IUsuarioRepository> _mockUsuarioRepository;
    private Mock<IConfiguration> _mockConfiguration;
    private UsuarioService _service;

    [TestInitialize]
    public void Setup()
    {
        _mockUsuarioRepository = new Mock<IUsuarioRepository>();

        _mockConfiguration = new Mock<IConfiguration>();
        _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("claveSuperSecretaMuyLargaQueTieneMasDe32Caracteres!");
        _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("claveSuperSecretaMuyLargaQueTieneMasDe32Caracteres!");
        _mockConfiguration.Setup(c => c["Jwt:Issuer"]).Returns("issuer-test");
        _mockConfiguration.Setup(c => c["Jwt:Audience"]).Returns("audiencia-test");

        _service = new UsuarioService(_mockUsuarioRepository.Object, _mockConfiguration.Object);

    }

    [TestMethod]
    public async Task RegistrarUsuarioAsync_NombreYContraseñaInvalidos() 
    {
        // Registrar Usuario con Nombre y Contraseña Invalidos

        // Arrange
        var dto = new RegistroUsuarioDto
        {
            Name = "",   // Nombre vacío
            Password = "" // Contraseña vacía
        };

        // Act
        var resultado = await _service.RegistrarUsuarioAsync(dto);

        // Assert
        Assert.AreEqual("Nombre o contraseña no válidos.", resultado);
    }

    [TestMethod]
    public async Task RegistrarUsuarioAsync_UsuarioRegistradoCorrectamente()
    {
        // Registrar Usuario con credenciales correctas

        // Arrange
        var dto = new RegistroUsuarioDto
        {
            Name = "usuario1",
            Password = "password123"
        };

        var usuarioSimulado = new Usuario
        {
            Id = 1,
            Name = dto.Name,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            FechaRegistro = System.DateTime.Now
        };

        _mockUsuarioRepository
            .Setup(repo => repo.RegistrarAsync(It.IsAny<Usuario>()))
            .ReturnsAsync(usuarioSimulado);

        // Act
        var resultado = await _service.RegistrarUsuarioAsync(dto);

        // Assert
        Assert.AreEqual("Usuario registrado correctamente.", resultado);
    }

    [TestMethod]
    public async Task LoginUsuarioAsync_UsuarioNoExiste()
    {
        // Login con un Usuario no existente

        // Arrange
        var dto = new LoginUsuarioDto { Name = "inexistente", Password = "1234" };
        _mockUsuarioRepository.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync((Usuario)null);

        // Act
        var resultado = await _service.LoginUsuarioAsync(dto);

        // Assert
        Assert.AreEqual("Usuario no encontrado.", resultado);
    }

    [TestMethod]
    public async Task LoginUsuarioAsync_ContraseñaIncorrecta()
    {
        // Login con Contraseña incorrecta

        // Arrange
        var dto = new LoginUsuarioDto { Name = "usuario1", Password = "incorrecta" };
        var usuario = new Usuario
        {
            Id = 1,
            Name = dto.Name,
            Password = BCrypt.Net.BCrypt.HashPassword("correcta") // la contraseña real
        };

        _mockUsuarioRepository.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync(usuario);

        // Act
        var resultado = await _service.LoginUsuarioAsync(dto);

        // Assert
        Assert.AreEqual("Contraseña incorrecta.", resultado);
    }

    [TestMethod]
    public async Task LoginUsuarioAsync_CredencialesValidas_DevuelveToken()
    {
        // Login Usuario con credenciales validas y devuelve el token

        // Arrange
        var dto = new LoginUsuarioDto { Name = "usuario1", Password = "correcta" };
        var usuario = new Usuario
        {
            Id = 1,
            Name = dto.Name,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _mockUsuarioRepository.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync(usuario);

        // Act
        var resultado = await _service.LoginUsuarioAsync(dto);

        // Assert
        Assert.IsFalse(string.IsNullOrWhiteSpace(resultado), "El token JWT no debe estar vacío.");
        Assert.IsFalse(resultado.Contains("Usuario") || resultado.Contains("Contraseña"), "No debe ser un mensaje de error.");
    }


    [TestMethod]
    public async Task LoginUsuarioAsync_CredencialesCorrectas_RetornaTokenJWTValido()
    {
        // Login Usuario credenciales correctas y se asegura que el token tiene el formato JWT válido.

        // Arrange
        var dto = new LoginUsuarioDto { Name = "usuario1", Password = "correcta" };
        var usuario = new Usuario
        {
            Id = 1,
            Name = dto.Name,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _mockUsuarioRepository.Setup(r => r.ObtenerPorNombreAsync(dto.Name)).ReturnsAsync(usuario);

        // Act
        var resultado = await _service.LoginUsuarioAsync(dto);

        // Assert
        Assert.IsFalse(string.IsNullOrWhiteSpace(resultado), "El token JWT no debe estar vacío.");
        Assert.IsFalse(resultado.Contains("Usuario") || resultado.Contains("Contraseña"), "No debe ser un mensaje de error.");

        // Validar que el token tiene formato JWT 
        var partes = resultado.Split('.');
        Assert.AreEqual(3, partes.Length, "El token JWT debe tener tres partes separadas por puntos.");
    }

    [TestMethod]
    public async Task AgregarPuntosUsuarioAsync_UsuarioExiste_RetornaPtosDto()
    {
        // Si el repositorio devuelve un usuario existente con los puntos actualizados,
        // Entonces el servicio devuelve correctamente un PtosDto con esos datos.

        // Arrange
        int usuarioId = 1;
        int puntosAgregar = 50;
        var usuarioConPuntosActualizados = new Usuario
        {
            Id = usuarioId,
            Puntos = 150 // por ejemplo, puntos actuales + puntosAgregar
        };

        _mockUsuarioRepository
            .Setup(r => r.AgregarPuntosAsync(usuarioId, puntosAgregar))
            .ReturnsAsync(usuarioConPuntosActualizados);

        // Act
        var resultado = await _service.AgregarPuntosUsuarioAsync(usuarioId, puntosAgregar);

        // Assert
        Assert.IsNotNull(resultado, "El resultado no debe ser null.");
        Assert.AreEqual(usuarioId, resultado!.UsuarioId, "El Id de usuario debe coincidir.");
        Assert.AreEqual(usuarioConPuntosActualizados.Puntos, resultado.Puntos, "Los puntos deben coincidir.");
    }

    [TestMethod]
    public async Task AgregarPuntosUsuarioAsync_UsuarioNoExiste_RetornaNull()
    {
        // Arrange
        int usuarioId = 99;
        int puntosAgregar = 50;

        _mockUsuarioRepository
            .Setup(r => r.AgregarPuntosAsync(usuarioId, puntosAgregar))
            .ReturnsAsync((Usuario?)null);

        // Act
        var resultado = await _service.AgregarPuntosUsuarioAsync(usuarioId, puntosAgregar);

        // Assert
        Assert.IsNull(resultado, "El resultado debe ser null cuando el usuario no existe.");
    }



}
