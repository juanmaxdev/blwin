using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Domain.Entity.Interfaces;

namespace Ble.Triviados.Application.Services
{
    /// <summary>
    /// Servicio de aplicación que maneja la lógica relacionada con preguntas del juego.
    /// Aplica el principio de responsabilidad única (SRP): solo se encarga de coordinar operaciones
    /// de preguntas a través del repositorio.
    /// </summary>
    public class PreguntaService : IPreguntaService
    {
        private readonly IPreguntaRepository _preguntaRepository;

        /// <summary>
        /// Constructor que inyecta el repositorio de preguntas.
        /// </summary>
        /// <param name="preguntaRepository">Instancia del repositorio de preguntas.</param>
        public PreguntaService(IPreguntaRepository preguntaRepository)
        {
            _preguntaRepository = preguntaRepository;
        }

        /// <summary>
        /// Obtiene 3 preguntas aleatorias de una temática específica.
        /// Si la pregunta es de tipo "M", se devuelven 3 respuestas incorrectas aleatorias.
        /// Si es de tipo "FV", solo se incluye una respuesta para mostrar como opción.
        /// </summary>
        /// <param name="tematica">Nombre de la temática.</param>
        /// <returns>Una lista de 3 preguntas transformadas a DTO.</returns>
        public async Task<List<PreguntaDto>> ObtenerPreguntasPorTematicaAsync(string tematica)
        {
            var preguntas = await _preguntaRepository.ObtenerPorTematicaAsync(tematica);
            var random = new Random();

            var preguntasAleatorias = preguntas
                .OrderBy(p => Guid.NewGuid()) // Aleatoriza el orden
                .Take(3)
                .Select(p => new PreguntaDto
                {
                    Id = p.Id,
                    Enunciado = p.Enunciado,
                    Tipo = p.Tipo,
                    Tematica = p.Tema,
                    RespuestaCorrecta = p.RespuestaCorrecta,
                    RespuestasPregunta = p.Tipo == "M"
                        ? p.RespuestasPregunta
                            .Where(r => r != p.RespuestaCorrecta)
                            .OrderBy(x => random.Next())
                            .Take(3)
                            .ToList()
                        : p.RespuestasPregunta.Take(1).ToList() // Para tipo FV, una sola opción
                })
                .ToList();

            return preguntasAleatorias;
        }

        /// <summary>
        /// Obtiene una temática aleatoria disponible entre las existentes.
        /// </summary>
        /// <returns>El nombre de la temática aleatoria o null si no hay disponibles.</returns>
        public async Task<string?> ObtenerTematicaAleatoriaAsync()
        {
            return await _preguntaRepository.ObtenerTematicaAleatoriaAsync();
        }

        /// <summary>
        /// Devuelve una temática aleatoria distinta de la última temática usada.
        /// Si no se proporciona una temática anterior válida, se comporta como ObtenerTematicaAleatoriaAsync().
        /// </summary>
        /// <param name="ultimaTematica">La temática anterior a evitar.</param>
        /// <returns>Una nueva temática aleatoria distinta o null si no hay disponibles.</returns>
        public async Task<string?> ObtenerTematicaAleatoriaEvitandoUltimaAsync(string? ultimaTematica)
        {
            if (string.IsNullOrWhiteSpace(ultimaTematica))
            {
                return await _preguntaRepository.ObtenerTematicaAleatoriaAsync();
            }

            return await _preguntaRepository.ObtenerTematicaAleatoriaEvitandoUltimaAsync(ultimaTematica);
        }
    }
}
