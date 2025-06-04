using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Services.WebApi.Controllers;
using Moq;


namespace Test.BLWin.Controllers
{
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
        public async Task RegistrarPuntuacionCorrectamente()
        {
            // Arrange
            // Act
            // Assert
        }

        
    }
}
