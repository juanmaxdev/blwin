using System.Security.Claims;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Services.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;


namespace Test.BLWin.Controllers;

[TestClass]
public class TestsUsuarioJuegoControllers
{

    private Mock<IUsuarioJuegoService> _mockUsuarioJuegoService;
    private UsuarioJuegoController _controller;

    [TestInitialize]
    public void Setup()
    {
        _mockUsuarioJuegoService = new Mock<IUsuarioJuegoService>();
        _controller = new UsuarioJuegoController(_mockUsuarioJuegoService.Object);
    
    
    }

    [TestMethod]
    public async Task RegistrarPuntuacion_ReturnsOkResult_WhenPuntuacionIsRegistered()
    {
        // Registrar puntuación correctamente

        // Arrange
        var dto = new RegistrarPuntuacionDto { JuegoId = 10, Puntuacion = 100 };
        var resultadoEsperado = new UsuarioJuego
        {
            UsuarioId = 1,
            JuegoId = dto.JuegoId,
            Puntuacion = dto.Puntuacion
        };

        // Setup mock para que devuelva resultadoEsperado
        _mockUsuarioJuegoService
            .Setup(s => s.RegistrarPuntuacionAsync(1, dto.JuegoId, dto.Puntuacion))
            .ReturnsAsync(resultadoEsperado);

        // Simula el claim "id" para el usuario
        var claims = new[] { new Claim("id", "1") };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = principal }
        };

        // Act
        var result = await _controller.RegistrarPuntuacion(dto);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);

        var value = okResult.Value as UsuarioJuego;
        Assert.IsNotNull(value);
        Assert.AreEqual(resultadoEsperado.UsuarioId, value.UsuarioId);
        Assert.AreEqual(resultadoEsperado.JuegoId, value.JuegoId);
        Assert.AreEqual(resultadoEsperado.Puntuacion, value.Puntuacion);
    }

    [TestMethod]
    public async Task ObtenerMisJuegos_ReturnsUnauthorized_WhenUserIdClaimIsMissing()
    {
        //Obtener mis juegos pero retorna unauthorized

        // Arrange
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal(new ClaimsIdentity()) }
        };

        // Act
        var result = await _controller.ObtenerMisJuegos();

        // Assert
        var unauthorizedResult = result as UnauthorizedObjectResult;
        Assert.IsNotNull(unauthorizedResult);
        Assert.AreEqual(401, unauthorizedResult.StatusCode);

        // Serializamos y deserializamos para acceder a "Message"
        var json = System.Text.Json.JsonSerializer.Serialize(unauthorizedResult.Value);
        var dict = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(json);

        Assert.IsNotNull(dict);
        Assert.IsTrue(dict.ContainsKey("Message"));
        Assert.AreEqual("No se pudo obtener el ID del usuario del token.", dict["Message"]);
    }

    [TestMethod]
    public async Task ObtenerPuntuacion_ReturnsOkResult_WhenRelacionExists()
    {
        // Obtener puntuación correctamente

        // Arrange
        int juegoId = 5;
        int usuarioId = 1;

        var relacionEsperada = new UsuarioJuego
        {
            Puntuacion = 150,
            JuegoId = juegoId,
            UsuarioId = usuarioId
        };

        var claims = new[] { new Claim("id", usuarioId.ToString()) };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = principal }
        };

        _mockUsuarioJuegoService
            .Setup(s => s.ObtenerRelacionAsync(usuarioId, juegoId))
            .ReturnsAsync(relacionEsperada);

        // Act
        var result = await _controller.ObtenerPuntuacion(juegoId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
        Assert.AreEqual(relacionEsperada, okResult.Value);
    }


    [TestMethod]
    public async Task ObtenerPuntuacion_ReturnsNotFound_WhenRelacionIsNull()
    {
        // Obtener puntuación y retorna null

        // Arrange
        int juegoId = 5;
        int usuarioId = 1;

        var claims = new[] { new Claim("id", usuarioId.ToString()) };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = principal }
        };

        _mockUsuarioJuegoService
            .Setup(s => s.ObtenerRelacionAsync(usuarioId, juegoId))
            .ReturnsAsync((UsuarioJuego)null);  // null con tipo correcto

        // Act
        var result = await _controller.ObtenerPuntuacion(juegoId);

        // Assert
        var notFoundResult = result as NotFoundObjectResult;
        Assert.IsNotNull(notFoundResult);
        Assert.AreEqual(404, notFoundResult.StatusCode);

        var json = System.Text.Json.JsonSerializer.Serialize(notFoundResult.Value);
        var dict = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(json);

        Assert.IsNotNull(dict);
        Assert.IsTrue(dict.ContainsKey("Message"));
        Assert.AreEqual("No se encontró la relación usuario-juego.", dict["Message"]);
    }



}
