using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Entities
{
    public class Usuario 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime FechaRegistro { get; set; }

        public int Puntos { get; set; } = 0;

        [JsonIgnore]
        public ICollection<UsuarioJuego> UsuarioJuegos { get; set; } = new List<UsuarioJuego>();

        public Usuario()
        {
        }

        public Usuario(int id, string name, string password, int puntos)
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

            // Asignación de valores
            Id = id;
            Name = name;
            Password = password;
            Puntos = puntos;
            FechaRegistro = DateTime.Now;
        }
    }
}
