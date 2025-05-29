using Ble.Triviados.Domain.Entity.Entities;
using FluentAssertions;
using System;
using Xunit;

namespace Ble.Triviados.UnitTests.Domain
{
    public class UsuarioTests
    {
        [Fact]
        public void Constructor_AsignarPropiedades_CuandoDatosSonValidos()
        {
            // Arrange: Se definen los datos válidos
            var nombre = "Juan Flores";
            var email = "juan.flores@example.com";
            var password = "P@ssw0rd";

            // Act: Se crea una nueva instancia de Usuario
            var usuario = new Usuario(nombre, email, password);

            // Assert: Verificamos que las propiedades se asignaron correctamente
            usuario.Name.Should().Be(nombre);
            usuario.Password.Should().Be(email); // Actualmente el email se asigna a la propiedad Password
            usuario.Rol.Should().Be(password);   // Actualmente el password se asigna a la propiedad Rol
            usuario.FechaRegistro.Should().BeCloseTo(DateTime.Now, TimeSpan.FromSeconds(1));
        }

        [Fact]
        public void Constructor_DeberiaLanzarExcepcion_CuandoNombreEstaVacio()
        {
            // Arrange & Act: Intentamos crear un usuario con nombre vacío
            Action act = () => new Usuario("", "email", "rol");

            // Assert: Se espera una excepción indicando que el nombre no puede estar vacío
            act.Should().Throw<ArgumentException>()
               .WithMessage("El nombre no puede estar vacío.*");
        }

        [Fact]
        public void Constructor_DeberiaLanzarExcepcion_CuandoEmailEstaVacio()
        {
            // Arrange & Act: Intentamos crear un usuario con email vacío (pero se asigna como contraseña)
            Action act = () => new Usuario("Nombre", "", "rol");

            // Assert: Se espera una excepción indicando que la contraseña no puede estar vacía
            act.Should().Throw<ArgumentException>()
               .WithMessage("La contraseña no puede estar vacía.*");
        }

        [Fact]
        public void Constructor_DeberiaLanzarExcepcion_CuandoPasswordEstaVacio()
        {
            // Arrange & Act: Intentamos crear un usuario con contraseña vacía (pero se asigna como rol)
            Action act = () => new Usuario("Nombre", "email", "");

            // Assert: Se espera una excepción indicando que el rol no puede estar vacío
            act.Should().Throw<ArgumentException>()
               .WithMessage("El rol no puede estar vacío.*");
        }
    }
}