using Moq;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;
using Microsoft.Extensions.Configuration;

namespace Test.BLWin.Services;

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

    [TestMethod]
    public async Task ObtenerRankingUsuariosAsync_HayUsuarios_ListaRanking()
    {
        // Arrange : Creamos varios usuarios de prueba en la página
        var usuarios = new List<Usuario>
        {
            new Usuario { Id = 1, Name = "Juan", Puntos = 100 },
            new Usuario { Id = 2, Name = "Maria", Puntos = 200 }
        };

        _usuarioRepositoryMock
            .Setup(repo => repo.ObtenerRankingUsuariosAsync())
            .ReturnsAsync(usuarios);

        // Act
        var resultado = await _usuarioService.ObtenerRankingUsuariosAsync();

        // Assert : Comprobamos que se devuelve un listado de DTOs con el formato esperado
        Assert.IsNotNull(resultado);
        Assert.AreEqual(2, resultado.Count);
        Assert.AreEqual(1, resultado[0].UsuarioId);
        Assert.AreEqual("Juan", resultado[0].Nombre);
        Assert.AreEqual(100, resultado[0].Puntos);
        Assert.AreEqual(2, resultado[1].UsuarioId);
        Assert.AreEqual("Maria", resultado[1].Nombre);
        Assert.AreEqual(200, resultado[1].Puntos);
    }

    [TestMethod]
    public async Task ObtenerRankingUsuariosAsync_NoHayUsuarios_ListaVacia()
    {
        // Arrange : Creamos el mock sin introducir usuarios
        _usuarioRepositoryMock
            .Setup(repo => repo.ObtenerRankingUsuariosAsync())
            .ReturnsAsync(new List<Usuario>());

        // Act : Ejecutamos ObtenerRankingUsuariosAsync
        var resultado = await _usuarioService.ObtenerRankingUsuariosAsync();

        // Assert : Comprobamos que se devuelve un listado vacio
        Assert.IsNotNull(resultado);
        Assert.AreEqual(0, resultado.Count);
    }
}
