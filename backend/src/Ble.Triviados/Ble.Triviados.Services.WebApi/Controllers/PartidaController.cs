using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ble.Triviados.Services.WebApi.Controllers
{
    /// <summary>
    /// Controlador API que gestiona las acciones relacionadas con partidas.
    /// Exponer la lógica de inicio, actualización, consulta y ranking de partidas del juego.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PartidaController : ControllerBase
    {
        private readonly IPartidaService _partidaService;

        /// <summary>
        /// Constructor que recibe el servicio de partidas.
        /// </summary>
        /// <param name="partidaService">Servicio de aplicación para gestionar partidas.</param>
        public PartidaController(IPartidaService partidaService)
        {
            _partidaService = partidaService;
        }

        /// <summary>
        /// Crea una nueva partida para un usuario.
        /// </summary>
        /// <param name="dto">DTO con el ID del usuario que inicia la partida.</param>
        /// <returns>ID de la partida creada.</returns>
        [HttpPost("crear")]
        public async Task<IActionResult> Crear([FromBody] CrearPartidaDto dto)
        {
            var partidaId = await _partidaService.CrearPartidaAsync(dto);
            return Ok(new { partidaId });
        }

        /// <summary>
        /// Actualiza el estado de una partida según la respuesta del usuario.
        /// Suma puntos o resta vidas.
        /// </summary>
        /// <param name="dto">DTO con datos de la partida y si la respuesta fue correcta.</param>
        /// <returns>200 OK si se actualiza correctamente, 400 BadRequest si no fue posible.</returns>
        [HttpPut("actualizar")]
        public async Task<IActionResult> Actualizar([FromBody] ActualizarPartidaDto dto)
        {
            var exito = await _partidaService.ActualizarPartidaAsync(dto);

            if (!exito)
                return BadRequest("No se pudo actualizar la partida. Puede que esté finalizada.");

            return Ok("Partida actualizada.");
        }

        /// <summary>
        /// Obtiene los detalles completos de una partida por su ID.
        /// </summary>
        /// <param name="id">ID de la partida.</param>
        /// <returns>Información de la partida o 404 si no existe.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            var partida = await _partidaService.ObtenerPartidaAsync(id);

            if (partida == null)
                return NotFound("Partida no encontrada.");

            return Ok(partida);
        }

        /// <summary>
        /// Obtiene el estado resumido de una partida (vidas y puntos).
        /// </summary>
        /// <param name="partidaId">ID de la partida.</param>
        /// <returns>Estado de la partida o 404 si no existe.</returns>
        [HttpGet("estado/{partidaId}")]
        public async Task<IActionResult> ObtenerEstado(int partidaId)
        {
            var estado = await _partidaService.ObtenerEstadoPartidaAsync(partidaId);

            if (estado == null)
                return NotFound("Partida no encontrada.");

            return Ok(estado);
        }

        /// <summary>
        /// Obtiene el ranking general y la posición del usuario actual si no está en el top 10.
        /// </summary>
        /// <param name="usuarioId">ID del usuario actual.</param>
        /// <returns>Lista del ranking de partidas.</returns>
        [HttpGet("ranking/{usuarioId}")]
        public async Task<IActionResult> ObtenerRanking(int usuarioId)
        {
            var ranking = await _partidaService.ObtenerRankingAsync(usuarioId);
            return Ok(ranking);
        }

        /// <summary>
        /// Obtiene el top 5 del ranking de partidas, generalmente para mostrar a los mejores jugadores.
        /// </summary>
        /// <returns>Lista con los 5 mejores jugadores según su puntaje.</returns>
        [HttpGet("ranking/top5")]
        public async Task<IActionResult> ObtenerTop5()
        {
            var top5 = await _partidaService.ObtenerTop5Async();
            return Ok(top5);
        }

        /// <summary>
        /// Obtiene el ranking específico de una partida en particular.
        /// Útil para mostrar la clasificación de jugadores dentro de una misma sesión de juego.
        /// </summary>
        /// <param name="partidaId">ID de la partida.</param>
        /// <returns>Lista de jugadores con su puntaje para la partida especificada.</returns>
        [HttpGet("ranking/por-partida/{partidaId}")]
        public async Task<IActionResult> ObtenerRankingPorPartida(int partidaId)
        {
            var ranking = await _partidaService.ObtenerRankingPorPartidaAsync(partidaId);
            return Ok(ranking);
        }

        /// <summary>
        /// Obtiene la lista de jugadores que actualmente tienen una partida activa.
        /// </summary>
        /// <returns>Listado de jugadores con partidas en curso.</returns>
        [HttpGet("jugadores-activos")]
        public async Task<IActionResult> ObtenerJugadoresActivos()
        {
            var jugadores = await _partidaService.ObtenerJugadoresConPartidaActivaAsync();
            return Ok(jugadores);
        }


    }
}
