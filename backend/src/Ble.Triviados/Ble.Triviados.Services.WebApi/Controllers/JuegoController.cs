using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ble.Triviados.Services.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JuegoController : ControllerBase
{
    private readonly IJuegoService _juegoService;

    public JuegoController(IJuegoService juegoService)
    {
        _juegoService = juegoService;
    }

    /// <summary>
    /// POST: api/juego
    /// Crea un nuevo juego
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CrearJuego([FromBody] CrearJuegoDto dto, CancellationToken cancellationToken)
    {
        var juego = await _juegoService.CrearJuegoAsync(dto.Nombre, dto.Descripcion);
        return Ok(juego);
    }

    /// <summary>
    /// GET: api/juego/{id}
    /// Obtiene un juego por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerJuegoPorId(int id)
    {
        var juego = await _juegoService.ObtenerJuegoPorIdAsync(id);
        if (juego == null) return NotFound(new { Message = "Juego no encontrado." });
        return Ok(juego);
    }

    /// <summary>
    /// GET: api/juego
    /// Lista todos los juegos
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> ObtenerTodos()
    {
        var juegos = await _juegoService.ObtenerTodosLosJuegosAsync();
        return Ok(juegos);
    }
}
