using Moq;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;

namespace Test.BLWin.Services;

[TestClass]
public class TestsUsuarioJuegoService
{
    private Mock<IUsuarioJuegoRepository> _usuarioJuegoRepoMock;
    private UsuarioJuegoService _usuarioJuegoService;

    [TestInitialize]
    public void Setup()
    {
        _usuarioJuegoRepoMock = new Mock<IUsuarioJuegoRepository>();
        _usuarioJuegoService = new UsuarioJuegoService(_usuarioJuegoRepoMock.Object);
    }

    [TestMethod]
    public async Task RegistrarPuntuacionAsync_DatosValidos_Relacion()
    {
        // Arrange : Creo una nueva relación Juego - Usuario directamente
        var usuarioJuego = new UsuarioJuego
        {
            UsuarioId = 1,
            JuegoId = 2,
            Puntuacion = 150
        };

        _usuarioJuegoRepoMock
            .Setup(repo => repo.RegistrarPuntuacionAsync(It.IsAny<UsuarioJuego>()))
            .ReturnsAsync(usuarioJuego);

        // Act : Ejecutamos el método RegistrarPuntuacionAsync
        var resultado = await _usuarioJuegoService.RegistrarPuntuacionAsync(1, 2, 150);

        // Assert : Comprobamos que se registran los datos de forma correcta
        Assert.IsNotNull(resultado);
        Assert.AreEqual(1, resultado.UsuarioId);
        Assert.AreEqual(2, resultado.JuegoId);
        Assert.AreEqual(150, resultado.Puntuacion);
    }

    [TestMethod]
    public async Task ObtenerRelacionAsync_RelacionExiste_Relacion()
    {
        // Arrange : Creamos datos de una relación en BBDD
        var relacion = new UsuarioJuego { UsuarioId = 1, JuegoId = 2, Puntuacion = 100 };

        _usuarioJuegoRepoMock
            .Setup(repo => repo.ObtenerPorUsuarioYJuegoAsync(1, 2))
            .ReturnsAsync(relacion);

        // Act : Llamamos al método ObtenerRelacionAsync
        var resultado = await _usuarioJuegoService.ObtenerRelacionAsync(1, 2);

        // Assert : Comprobamos que obtenemos los datos que esperamos
        Assert.IsNotNull(resultado);
        Assert.AreEqual(100, resultado.Puntuacion);
    }

    [TestMethod]
    public async Task ObtenerRelacionAsync_RelacionNoExiste_Null()
    {
        // Arrange : Creamos el mock de la BBDD
        _usuarioJuegoRepoMock
            .Setup(repo => repo.ObtenerPorUsuarioYJuegoAsync(99, 88))
            .ReturnsAsync((UsuarioJuego?)null);

        // Act : LLamamos al método teniendo en cuenta que no hay nada registrado
        var resultado = await _usuarioJuegoService.ObtenerRelacionAsync(99, 88);

        // Assert : Comprobamos que obtenemos un null
        Assert.IsNull(resultado);
    }

    [TestMethod]
    public async Task ObtenerJuegosPorUsuarioAsync_UsuarioConJuegos_Lista()
    {
        // Arrange : creamos varios registros de relaciones Juego - Usuario en BBDD
        var relaciones = new List<UsuarioJuego>
        {
            new UsuarioJuego { UsuarioId = 1, JuegoId = 1, Puntuacion = 100 },
            new UsuarioJuego { UsuarioId = 1, JuegoId = 2, Puntuacion = 200 }
        };

        _usuarioJuegoRepoMock
            .Setup(repo => repo.ObtenerPorUsuarioAsync(1))
            .ReturnsAsync(relaciones);

        // Act : Ejecutamos la función ObtenerJuegosPorUsuarioAsync
        var resultado = await _usuarioJuegoService.ObtenerJuegosPorUsuarioAsync(1);

        // Assert : Comprobamos el listado de que nos devuelve
        Assert.IsNotNull(resultado);
        Assert.AreEqual(2, resultado.Count());
    }

    [TestMethod]
    public async Task ActualizarRelacionAsync_RelacionValida_Actualiza()
    {
        // Arrange : Registramos datos nuevos de una relación, para actualizar otra antigua
        var relacion = new UsuarioJuego { UsuarioId = 1, JuegoId = 2, Puntuacion = 300 };

        _usuarioJuegoRepoMock
            .Setup(repo => repo.ActualizarRelacionAsync(relacion))
            .ReturnsAsync(relacion);

        // Act : Ejecutamos ActualizarRelacionAsync
        var resultado = await _usuarioJuegoService.ActualizarRelacionAsync(relacion);

        // Assert : Comprobamos que nos devuelve los datos actualizados tras realizar los cambios en BBDD
        Assert.IsNotNull(resultado);
        Assert.AreEqual(300, resultado.Puntuacion);
    }

    [TestMethod]
    public async Task ObtenerRankingDtoPorJuegoAsync_JuegoConUsuarios_Ranking()
    {
        // Arrange : Creamos una situación en la que hay registros de varios usuarios que han jugado a un mismo juego
        var relaciones = new List<UsuarioJuego>
        {
            new UsuarioJuego
            {
                Usuario = new Usuario { Id = 1, Name = "Alice" },
                Puntuacion = 250
            },
            new UsuarioJuego
            {
                Usuario = new Usuario { Id = 2, Name = "Bob" },
                Puntuacion = 150
            }
        };

        _usuarioJuegoRepoMock
            .Setup(repo => repo.ObtenerRankingPorJuegoAsync("Trivia"))
            .ReturnsAsync(relaciones);

        // Act : Ejecutamos ObtenerRankingDtoPorJuegoAsync con el nmombre del juego del que queremos generar el ranking
        var resultado = await _usuarioJuegoService.ObtenerRankingDtoPorJuegoAsync("Trivia");

        // Assert : Comprobamos que ha creado el listado de DTOs de forma correcta
        Assert.IsNotNull(resultado);
        var ranking = resultado.ToList();
        Assert.AreEqual(2, ranking.Count);
        Assert.AreEqual("Alice", ranking[0].Nombre);
        Assert.AreEqual(250, ranking[0].Puntos);
    }
}
