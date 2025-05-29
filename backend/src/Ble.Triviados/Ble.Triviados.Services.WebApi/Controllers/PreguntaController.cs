using Ble.Triviados.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Ble.Triviados.Services.WebApi.Controllers
{
    /// <summary>
    /// Controlador que gestiona las operaciones relacionadas con preguntas y temáticas.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PreguntaController : ControllerBase
    {
        private readonly IPreguntaService _preguntaService;

        /// <summary>
        /// Constructor que recibe el servicio de preguntas.
        /// </summary>
        /// <param name="preguntaService">Servicio de aplicación para preguntas.</param>
        public PreguntaController(IPreguntaService preguntaService)
        {
            _preguntaService = preguntaService;
        }

        /// <summary>
        /// Obtiene una lista de preguntas aleatorias pertenecientes a una temática específica.
        /// </summary>
        /// <param name="tematica">Nombre de la temática deseada.</param>
        /// <returns>Lista de preguntas correspondientes a la temática.</returns>
        [HttpGet("tematica/{tematica}")]
        public async Task<IActionResult> ObtenerPorTematica(string tematica)
        {
            var preguntas = await _preguntaService.ObtenerPreguntasPorTematicaAsync(tematica);
            return Ok(preguntas);
        }

        /// <summary>
        /// Devuelve una temática aleatoria disponible en la base de datos.
        /// </summary>
        /// <returns>Una temática aleatoria, o NotFound si no hay temáticas registradas.</returns>
        [HttpGet("tematica/aleatoria")]
        public async Task<IActionResult> ObtenerTematicaAleatoria()
        {
            var tematica = await _preguntaService.ObtenerTematicaAleatoriaAsync();

            if (string.IsNullOrEmpty(tematica))
                return NotFound("No hay temáticas disponibles.");

            return Ok(tematica);
        }

        /// <summary>
        /// Obtiene una temática aleatoria distinta a la última temática utilizada.
        /// </summary>
        /// <param name="ultimaTematica">Nombre de la última temática usada, que se desea evitar.</param>
        /// <returns>Una temática diferente a la proporcionada, o NotFound si no hay alternativas disponibles.</returns>
        [HttpGet("tematica/aleatoria-evitando")]
        public async Task<IActionResult> ObtenerTematicaEvitandoUltima([FromQuery] string ultimaTematica)
        {
            var tematica = await _preguntaService.ObtenerTematicaAleatoriaEvitandoUltimaAsync(ultimaTematica);

            if (string.IsNullOrEmpty(tematica))
                return NotFound("No hay temáticas disponibles distintas a la última.");

            return Ok(tematica);
        }
    }
}
