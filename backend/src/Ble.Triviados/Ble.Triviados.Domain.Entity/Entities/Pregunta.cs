using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Entities
{
    public class Pregunta : BaseEntity
    {
        public string Enunciado { get; set; }
        public string Tipo { get; set; }
        public string Tema { get; set; }
        public string RespuestaCorrecta { get; set; }

        public List<string> RespuestasPregunta { get; set; } = new List<string>();

        public Pregunta()
        {
           
        }
    }
}
