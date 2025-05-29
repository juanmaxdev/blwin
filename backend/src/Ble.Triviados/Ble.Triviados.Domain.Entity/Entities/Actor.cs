using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Entities
{
   
    public class Actor
    {
        public int Id { get; set; }  
        public string Name { get; set; }
        public string Password { get;  set; }
        public DateTime FechaRegistro { get; set; }
        public string Rol { get; set; }

        
        public Actor(string name, string password, string rol)
        {
            // Validaciones
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("El nombre no puede estar vacío.", nameof(name));
            }
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("La contraseña no puede estar vacía.", nameof(password));
            }
            if (string.IsNullOrWhiteSpace(rol))
            {
                throw new ArgumentException("El rol no puede estar vacío.", nameof(rol));
            }

            // Asignación de valores
            Name = name;
            Password = password;
            Rol = rol;
            FechaRegistro = DateTime.Now;
        }

        // Constructor vacío protegido para permitir derivación pero no instanciación directa
        public Actor() { }
    }
}
