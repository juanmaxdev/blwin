using Moq;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;

namespace Test.BLWin.Services;

[TestClass]
public class JuegoServiceTests
{
    private Mock<IJuegoRepository> _juegoRepositoryMock;
    private JuegoService _juegoService;

    [TestInitialize]
    public void Setup()
    {
        _juegoRepositoryMock = new Mock<IJuegoRepository>();
        _juegoService = new JuegoService(_juegoRepositoryMock.Object);
    }

    [TestMethod]
    public async Task CrearJuegoAsync_DatosValidos_JuegoCreado()
    {
        // Arrange: Preparamos el nombre, descripción y la respuesta esperada
        var nombre = "Trivial";
        var descripcion = "Un juego de preguntas con temáticas de programación";

        var juegoEsperado = new Juego
        {
            Id = 1,
            Nombre = nombre,
            Descripcion = descripcion
        };

        _juegoRepositoryMock
            .Setup(repo => repo.CrearAsync(It.IsAny<Juego>()))
            .ReturnsAsync(juegoEsperado);

        // Act: Llamamos al método CrearJuegoAsync
        var resultado = await _juegoService.CrearJuegoAsync(nombre, descripcion);

        // Assert: Comprobamos que el juego creado coincide con lo esperado
        Assert.IsNotNull(resultado);
        Assert.AreEqual(juegoEsperado.Nombre, resultado.Nombre);
        Assert.AreEqual(juegoEsperado.Descripcion, resultado.Descripcion);
    }

    [TestMethod]
    public async Task ObtenerJuegoPorIdAsync_JuegoExiste_DevuelveJuego()
    {
        // Arrange: Creamos una situación poara simular que se devuelve un juego con el ID especificado
        var juego = new Juego
        {
            Id = 10,
            Nombre = "Nave CSS",
            Descripcion = "Juego sobre controlar una nave y esquivar asteroides usando estilos de CSS"
        };

        _juegoRepositoryMock
            .Setup(repo => repo.ObtenerPorIdAsync(10))
            .ReturnsAsync(juego);

        // Act: Llamamos al método ObtenerJuegoPorIdAsync
        var resultado = await _juegoService.ObtenerJuegoPorIdAsync(10);

        // Assert: Validamos que se obtuvo el juego correcto
        Assert.IsNotNull(resultado);
        Assert.AreEqual(juego.Id, resultado?.Id);
        Assert.AreEqual("Nave CSS", resultado?.Nombre);
    }

    [TestMethod]
    public async Task ObtenerJuegoPorIdAsync_JuegoNoExiste_DevuelveNull()
    {
        // Arrange: Configuramos el mock para devolver null si el ID no existe
        _juegoRepositoryMock
            .Setup(repo => repo.ObtenerPorIdAsync(999))
            .ReturnsAsync((Juego?)null);

        // Act: Ejecutamos el método ObtenerJuegoPorIdAsync
        var resultado = await _juegoService.ObtenerJuegoPorIdAsync(999);

        // Assert: Comprobamos que el resultado es null
        Assert.IsNull(resultado);
    }

    [TestMethod]
    public async Task ObtenerTodosLosJuegosAsync_ExistenJuegos_DEvuelveLista()
    {
        // Arrange: Creamos una lista de juegos
        var juegos = new List<Juego>
        {
            new Juego { Id = 1, Nombre = "Adivina el lenguaje", Descripcion = "Juego sobre adivinar en que lenguaje esta escrtito un código" },
            new Juego { Id = 2, Nombre = "Ahorcado", Descripcion = "Juego del ahorcado" }
        };

        _juegoRepositoryMock
            .Setup(repo => repo.ObtenerTodosAsync())
            .ReturnsAsync(juegos);

        // Act: Obtenemos todos los juegos mediante el servicio
        var resultado = await _juegoService.ObtenerTodosLosJuegosAsync();

        // Assert: Verificamos que la lista no esté vacía y contenga los juegos esperados
        Assert.IsNotNull(resultado);
        Assert.AreEqual(2, resultado.Count());
        Assert.IsTrue(resultado.Any(j => j.Nombre == "Ahorcado"));
    }
}
