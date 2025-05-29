using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;

namespace Ble.Triviados.Application.Services
{
    /// <summary>
    /// Servicio de aplicación que gestiona las operaciones relacionadas con una partida.
    /// Se encarga de la creación, actualización, consulta y generación de ranking de partidas.
    /// </summary>
    public class PartidaAppService : IPartidaService
    {
        private readonly IPartidaRepository _partidaRepository;

        /// <summary>
        /// Constructor que recibe el repositorio de partidas.
        /// </summary>
        /// <param name="partidaRepository">Repositorio de acceso a datos de partidas.</param>
        public PartidaAppService(IPartidaRepository partidaRepository)
        {
            _partidaRepository = partidaRepository;
        }

        /// <summary>
        /// Crea una nueva partida para un usuario.
        /// </summary>
        /// <param name="dto">DTO con los datos necesarios para la creación.</param>
        /// <returns>El ID de la partida creada.</returns>
        public async Task<int> CrearPartidaAsync(CrearPartidaDto dto)
        {
            var partida = new Partida
            {
                UsuarioId = dto.UsuarioId,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow,
                PuntosPartida = 0,
                VidasRestantes = 3
            };

            await _partidaRepository.CrearPartidaAsync(partida);
            return partida.Id;
        }

        /// <summary>
        /// Actualiza el estado de una partida después de una pregunta.
        /// Suma puntos si la respuesta es correcta, o resta una vida si no lo es.
        /// </summary>
        /// <param name="dto">DTO con información de la partida y el resultado de la pregunta.</param>
        /// <returns>True si se pudo actualizar correctamente; false si la partida no existe o está finalizada.</returns>
        public async Task<bool> ActualizarPartidaAsync(ActualizarPartidaDto dto)
        {
            var partida = await _partidaRepository.ObtenerPorIdAsync(dto.PartidaId);

            if (partida == null || partida.VidasRestantes <= 0)
                return false;

            if (dto.RespuestaCorrecta)
            {
                partida.PuntosPartida += dto.TipoPregunta == "M" ? 200 : 100;
            }
            else
            {
                partida.VidasRestantes--;
            }

            partida.FechaFin = DateTime.UtcNow;

            await _partidaRepository.ActualizarPartidaAsync(partida);
            return true;
        }

        /// <summary>
        /// Devuelve los datos completos de una partida específica.
        /// </summary>
        /// <param name="id">ID de la partida.</param>
        /// <returns>DTO con los datos de la partida, o null si no existe.</returns>
        public async Task<PartidaDto?> ObtenerPartidaAsync(int id)
        {
            var partida = await _partidaRepository.ObtenerPorIdAsync(id);

            if (partida == null) return null;

            return new PartidaDto
            {
                Id = partida.Id,
                UsuarioId = partida.UsuarioId,
                FechaInicio = partida.FechaInicio,
                FechaFin = partida.FechaFin,
                PuntosPartida = partida.PuntosPartida,
                VidasRestantes = partida.VidasRestantes
            };
        }

        /// <summary>
        /// Obtiene un resumen del estado actual de una partida (vidas y puntuación).
        /// </summary>
        /// <param name="partidaId">ID de la partida.</param>
        /// <returns>DTO con el estado de la partida o null si no existe.</returns>
        public async Task<PartidaEstadoDto?> ObtenerEstadoPartidaAsync(int partidaId)
        {
            var partida = await _partidaRepository.ObtenerPorIdAsync(partidaId);

            if (partida == null) return null;

            return new PartidaEstadoDto
            {
                PartidaId = partida.Id,
                UsuarioId = partida.UsuarioId,
                VidasRestantes = partida.VidasRestantes,
                Puntos = partida.PuntosPartida
            };
        }

        /// <summary>
        /// Obtiene un ranking de los usuarios con mayor puntuación.
        /// Muestra los 10 primeros y la posición del usuario actual, si no está entre ellos.
        /// </summary>
        /// <param name="usuarioId">ID del usuario actual (para marcar su posición).</param>
        /// <returns>Lista de DTOs con la información de ranking.</returns>
        public async Task<List<RankingItemDto>> ObtenerRankingAsync(int usuarioId)
        {
            var rankingCompleto = await _partidaRepository.ObtenerRankingGlobalAsync();

            var rankingOrdenado = rankingCompleto
                .OrderByDescending(p => p.PuntosPartida)
                .ToList();

            var resultado = new List<RankingItemDto>();
            int posicion = 1;
            int? posicionUsuarioActual = null;

            for (int i = 0; i < rankingOrdenado.Count; i++)
            {
                var partida = rankingOrdenado[i];

                if (i < 10)
                {
                    resultado.Add(new RankingItemDto
                    {
                        Posicion = posicion,
                        NombreUsuario = partida.Usuario.Name,
                        Puntos = partida.PuntosPartida,
                        EsUsuarioActual = partida.UsuarioId == usuarioId,
                        UsuarioId = partida.UsuarioId
                    });
                }

                if (partida.UsuarioId == usuarioId)
                {
                    posicionUsuarioActual = posicion;

                    if (i >= 10)
                    {
                        resultado.Add(new RankingItemDto
                        {
                            Posicion = posicionUsuarioActual.Value,
                            NombreUsuario = partida.Usuario.Name,
                            Puntos = partida.PuntosPartida,
                            EsUsuarioActual = true,
                            UsuarioId = partida.UsuarioId
                        });
                    }
                }

                posicion++;
            }

            return resultado;
        }
        /// <summary>
        /// Obtiene el top 5 de partidas con mayor puntuación.
        /// </summary>
        /// <returns>Lista con los 5 jugadores con mayor puntaje en sus partidas.</returns>
        public async Task<List<RankingItemDto>> ObtenerTop5Async()
        {
            var rankingCompleto = await _partidaRepository.ObtenerRankingGlobalAsync();

            var rankingTop5 = rankingCompleto
                .OrderByDescending(p => p.PuntosPartida)
                .Take(5)
                .Select((partida, index) => new RankingItemDto
                {
                    Posicion = index + 1,
                    NombreUsuario = partida.Usuario.Name,
                    Puntos = partida.PuntosPartida,
                    EsUsuarioActual = false,
                    UsuarioId = partida.UsuarioId
                })
                .ToList();

            return rankingTop5;
        }

        /// <summary>
        /// Obtiene el ranking específico de una partida por su ID.
        /// Incluye el top 10 y la posición de la partida actual si no está en el top.
        /// </summary>
        /// <param name="partidaId">ID de la partida.</param>
        /// <returns>Lista de partidas con su posición en el ranking.</returns>
        public async Task<List<RankingItemDto>> ObtenerRankingPorPartidaAsync(int partidaId)
        {
            var partidaActual = await _partidaRepository.ObtenerPorIdAsync(partidaId);
            if (partidaActual == null) return new List<RankingItemDto>();

            var rankingCompleto = await _partidaRepository.ObtenerRankingGlobalAsync();

            var rankingOrdenado = rankingCompleto
                .OrderByDescending(p => p.PuntosPartida)
                .ToList();

            var resultado = new List<RankingItemDto>();
            int posicion = 1;
            RankingItemDto? posicionPartidaActual = null;

            for (int i = 0; i < rankingOrdenado.Count; i++)
            {
                var partida = rankingOrdenado[i];

                var dto = new RankingItemDto
                {
                    Posicion = posicion,
                    NombreUsuario = partida.Usuario.Name,
                    Puntos = partida.PuntosPartida,
                    EsUsuarioActual = partida.Id == partidaId,
                    UsuarioId = partida.UsuarioId
                };

                if (i < 10)
                {
                    resultado.Add(dto);
                }

                if (partida.Id == partidaId)
                {
                    if (i >= 10)
                        posicionPartidaActual = dto;
                }

                posicion++;
            }

            if (posicionPartidaActual != null)
            {
                resultado.Add(new RankingItemDto
                {
                    Posicion = -1,
                    NombreUsuario = "...",
                    Puntos = -1,
                    EsUsuarioActual = false,
                    UsuarioId = -1
                });

                resultado.Add(posicionPartidaActual);
            }

            return resultado;
        }

        /// <summary>
        /// Obtiene una lista de jugadores que tienen partidas activas actualmente.
        /// Se agrupan por usuario y se elige la partida con mayor puntaje por jugador.
        /// </summary>
        /// <returns>Lista de jugadores con su puntaje actual.</returns>
        public async Task<List<JugadorActivoDto>> ObtenerJugadoresConPartidaActivaAsync()
        {
            var partidasActivas = await _partidaRepository.ObtenerPartidasActivasAsync();

            return partidasActivas
                .GroupBy(p => p.UsuarioId)
                .Select(g => g.OrderByDescending(p => p.PuntosPartida).First())
                .Select(p => new JugadorActivoDto
                {
                    UsuarioId = p.UsuarioId,
                    NombreUsuario = p.Usuario.Name,
                    Puntos = p.PuntosPartida,
                    VidasRestantes = p.VidasRestantes
                })
                .OrderByDescending(p => p.Puntos)
                .ToList();

                    }





    }
}
