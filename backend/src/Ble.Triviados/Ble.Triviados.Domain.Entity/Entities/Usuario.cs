using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Entities
{
    public class Usuario : Actor 
    {
        public Usuario(string nombre, string email, string password) 
            : base(nombre, email, password)
        {

        }

        public Usuario()      {}
    }
}
