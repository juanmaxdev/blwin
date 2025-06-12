using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Services.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioJuegoService _usuarioJuegoService;
        private readonly IJuegoService _juegoService;
        private readonly IUsuarioService _usuarioService;
        private readonly AppDbContext _contexto;

        public UsuarioController(IUsuarioJuegoService usuarioJuegoService, IUsuarioService usuarioService, IJuegoService juegoService, AppDbContext contexto)
        {
            _usuarioService = usuarioService;
            _usuarioJuegoService = usuarioJuegoService;
            _juegoService = juegoService;
            _contexto = contexto;
        }

        /// <summary>
        /// POST: api/usuario/agregar-puntos
        /// Añade puntos a un usuario existente
        /// </summary>
        /// <returns>PuntuacionDto actualizado o NotFound si el usuario no existe</returns>
        [HttpPut("agregar-puntos")]
        [Authorize]
        public async Task<IActionResult> AgregarPuntos([FromBody] RegistrarJuegoPuntuacionDto dto)
        {
            var usuarioIdString = User.FindFirst("id")?.Value;

            if (!int.TryParse(usuarioIdString, out var usuarioId))
            {
                return Unauthorized(new { Message = "No se pudo obtener la ID del usuario desde el token." });
            }

            using var transaccion = await _contexto.Database.BeginTransactionAsync();

            try
            {
                // 1. Obtenemos o creamos el juego en BBDD
                var juego = await _juegoService.ObtenerPorNombreAsync(dto.NombreJuego);
                if (juego == null)
                {
                    juego = await _juegoService.CrearJuegoAsync(dto.NombreJuego, "Descripción por defecto");
                }

                // 2. Obtenemos la relación usuario-juego
                var relacion = await _usuarioJuegoService.ObtenerRelacionAsync(usuarioId, juego.Id);

                if (relacion == null)
                {
                    // Si no hay relación, la creamos con la puntuación actual
                    await _usuarioJuegoService.RegistrarPuntuacionAsync(usuarioId, juego.Id, dto.Puntuacion);
                }
                else if (dto.Puntuacion > relacion.Puntuacion)
                {
                    // Si la nueva puntuación es mayor, se actualiza
                    relacion.Puntuacion = dto.Puntuacion;
                    await _usuarioJuegoService.ActualizarRelacionAsync(relacion);
                }

                // 3. SIEMPRE sumamos los puntos al usuario
                var usuarioActualizado = await _usuarioService.AgregarPuntosUsuarioAsync(usuarioId, dto.Puntuacion);
                if (usuarioActualizado == null)
                {
                    await transaccion.RollbackAsync();
                    return NotFound(new { Message = "Usuario no encontrado." });
                }

                await transaccion.CommitAsync();
                return Ok(usuarioActualizado);
            }
            catch (Exception ex)
            {
                await transaccion.RollbackAsync();
                return StatusCode(500, new { Message = "Ocurrió un error interno.", Error = ex.Message });
            }
        }

        /// <summary>
        /// GET: api/usuario/ranking
        /// Muestra el listado de usuarios ordenados por puntos, a modo de raanking
        /// </summary>
        /// <returns>Lista de usuarios ordenados con mayor puntuación general de BBDD</returns>
        [HttpGet("ranking")]
        [AllowAnonymous]
        public async Task<IActionResult> ObtenerRankingUsuarios()
        {
            var ranking = await _usuarioService.ObtenerRankingUsuariosAsync();

            if (ranking == null || !ranking.Any())
                return NotFound(new { Message = "No se encontraron usuarios con puntuación." });

            return Ok(ranking);
        }

    }
}
