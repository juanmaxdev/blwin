using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ble.Triviados.Services.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioJuegoController : ControllerBase
    {
        private readonly IUsuarioJuegoService _usuarioJuegoService;

        public UsuarioJuegoController(IUsuarioJuegoService usuarioJuegoService)
        {
            _usuarioJuegoService = usuarioJuegoService;
        }

        /// <summary>
        /// POST: api/usuariojuego/registrar
        /// Registra una puntuación para el usuario en un juego
        /// </summary>
        [HttpPost("registrar")]
        [Authorize]
        public async Task<IActionResult> RegistrarPuntuacion([FromBody] RegistrarPuntuacionDto dto)
        {
            var usuarioIdClaim = User.FindFirst("id")?.Value;

            if (!int.TryParse(usuarioIdClaim, out var usuarioId))
            {
                return Unauthorized(new { Message = "No se pudo obtener el ID del usuario del token." });
            }

            var resultado = await _usuarioJuegoService.RegistrarPuntuacionAsync(usuarioId, dto.JuegoId, dto.Puntuacion);
            return Ok(resultado);
        }

        /// <summary>
        /// GET: api/usuariojuego/misjuegos
        /// Devuelve todos los juegos en los que el usuario ha participado
        /// </summary>
        [HttpGet("misjuegos")]
        [Authorize]
        public async Task<IActionResult> ObtenerMisJuegos()
        {
            var usuarioIdClaim = User.FindFirst("id")?.Value;

            if (!int.TryParse(usuarioIdClaim, out var usuarioId))
            {
                return Unauthorized(new { Message = "No se pudo obtener el ID del usuario del token." });
            }

            var juegos = await _usuarioJuegoService.ObtenerJuegosPorUsuarioAsync(usuarioId);
            return Ok(juegos);
        }

        /// <summary>
        /// GET: api/usuariojuego/{juegoId}
        /// Obtiene la puntuación del usuario autenticado para un juego específico
        /// </summary>
        [HttpGet("{juegoId}")]
        [Authorize]
        public async Task<IActionResult> ObtenerPuntuacion(int juegoId)
        {
            var usuarioIdClaim = User.FindFirst("id")?.Value;

            if (!int.TryParse(usuarioIdClaim, out var usuarioId))
            {
                return Unauthorized(new { Message = "No se pudo obtener el ID del usuario del token." });
            }

            var relacion = await _usuarioJuegoService.ObtenerRelacionAsync(usuarioId, juegoId);
            if (relacion == null)
                return NotFound(new { Message = "No se encontró la relación usuario-juego." });

            return Ok(relacion);
        }
    }
}
