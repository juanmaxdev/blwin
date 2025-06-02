using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Domain.Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Ble.Triviados.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Ble.Triviados.Services.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public AuthController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        /// <summary>
        /// POST: api/auth/register
        /// Registra un nuevo usuario
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>Respuesta HTTP 200 OK con el resultado del registro</returns>  
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistroUsuarioDto dto)
        {
            var result = await _usuarioService.RegistrarUsuarioAsync(dto);
            return Ok(result);
        }

        /// <summary>
        /// POST: api/auth/login
        /// Autentica a un usuario
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>Si login fue exitoso, retorna 200 OK con el token JWT; si no, retorna 400 Bad Request</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUsuarioDto dto)
        {
            var resultado = await _usuarioService.LoginUsuarioAsync(dto);

            // Si el resultado no es un token válido, asumimos que es un mensaje de error
            if (!resultado.StartsWith("eyJ")) // Verifica si no es un token JWT (generalmente comienza con "eyJ")
            {
                return BadRequest(new { Message = resultado });
            }

            return Ok(new { Token = resultado });
        }

        /// <summary>
        /// POST: api/auth/agregar-puntos
        /// Añade puntos a un usuario existente
        /// </summary>
        /// <param name="dto">DTO con UsuarioId y Puntos a agregar</param>
        /// <returns>PuntuacionDto actualizado o NotFound si el usuario no existe</returns>
        [HttpPost("agregarPuntos")]
        [Authorize] // Opcional, si quieres que solo usuarios autenticados puedan usarlo
        public async Task<IActionResult> AgregarPuntos([FromBody] PuntuacionDto dto)
        {
            var resultado = await _usuarioService.AgregarPuntosUsuarioAsync(dto);
            if (resultado == null)
                return NotFound(new { Message = "Usuario no encontrado." });

            return Ok(resultado);
        }


    }
}