using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Services.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Test.BLWin.Controllers
{
    [TestClass]
    public class TestJuegoController
    {
        private Mock<IJuegoService> _mockJuegoService;
        private JuegoController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockJuegoService = new Mock<IJuegoService>();
            _controller = new JuegoController(_mockJuegoService.Object);
        }

        [TestMethod]
        public async Task CrearJuego_ReturnsOkResult_WithCreatedJuego()
        {
            // Crear juego correctamente

            // Arrange
            var dto = new CrearJuegoDto { Nombre = "Parchis", Descripcion = "Juego de mesa clásico" };
            var juegoCreado = new Juego
            {
                Id = 1,
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion
            };

            _mockJuegoService
                .Setup(s => s.CrearJuegoAsync(dto.Nombre, dto.Descripcion))
                .ReturnsAsync(juegoCreado);

            // Act
            var result = await _controller.CrearJuego(dto);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(juegoCreado, okResult.Value);
        }

        [TestMethod]
        public async Task ObtenerJuegoPorId_ReturnsOk_WhenJuegoExists()
        {
            // Obtener el ID juego y retorna Ok cuando el juego existe

            // Arrange
            int juegoId = 1;
            var juegoEsperado = new Juego
            {
                Id = juegoId,
                Nombre = "Triviados",
                Descripcion = "Juego de preguntas"
            };

            _mockJuegoService
                .Setup(s => s.ObtenerJuegoPorIdAsync(juegoId))
                .ReturnsAsync(juegoEsperado);

            // Act
            var result = await _controller.ObtenerJuegoPorId(juegoId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(juegoEsperado, okResult.Value);
        }

        [TestMethod]
        public async Task ObtenerJuegoPorId_ReturnsNotFound_WhenJuegoDoesNotExist()
        {
            // Obtener juego por ID retorna que no lo encuentra

            // Arrange
            int juegoId = 99;

            _mockJuegoService
                .Setup(s => s.ObtenerJuegoPorIdAsync(juegoId))
                .ReturnsAsync((Juego)null); 

            // Act
            var result = await _controller.ObtenerJuegoPorId(juegoId);

            // Assert
            var notFoundResult = result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual(404, notFoundResult.StatusCode);

            var dict = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(
                System.Text.Json.JsonSerializer.Serialize(notFoundResult.Value)
            );

            Assert.IsNotNull(dict);
            Assert.IsTrue(dict.ContainsKey("Message"));
            Assert.AreEqual("Juego no encontrado.", dict["Message"]);
        }

        [TestMethod]
        public async Task ObtenerTodos_ReturnsOk_WithListOfJuegos()
        {
            // Obtener todos returna OK

            // Arrange
            var juegos = new List<Juego>
            {
            new Juego { Id = 1, Nombre = "Triviados", Descripcion = "Juego de preguntas" },
            new Juego { Id = 2, Nombre = "Geografía", Descripcion = "Juego de mapas" }
            };

            _mockJuegoService
                .Setup(s => s.ObtenerTodosLosJuegosAsync())
                .ReturnsAsync(juegos);

            // Act
            var result = await _controller.ObtenerTodos();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(juegos, okResult.Value);
        }

        [TestMethod]
        public async Task ObtenerTodos_ReturnsOk_WithEmptyList()
        {
            // Obtener Todos retorna Ok con la lista vacía

            // Arrange
            var juegos = new List<Juego>(); 

            _mockJuegoService
                .Setup(s => s.ObtenerTodosLosJuegosAsync())
                .ReturnsAsync(juegos);

            // Act
            var result = await _controller.ObtenerTodos();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            var resultList = okResult.Value as List<Juego>;
            Assert.IsNotNull(resultList);
            Assert.AreEqual(0, resultList.Count);
        }



    }
}
