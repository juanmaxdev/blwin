using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Domain.Entity.Interfaces;
using Microsoft.Extensions.Configuration;
using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Application.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        /// <summary>
        /// Registra un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="dto">El DTO que contiene la información del nuevo usuario, como su nombre y contraseña.</param>
        /// <returns>Un mensaje indicando el resultado de la operación. Si el usuario se registra correctamente, 
        /// se retorna "Usuario registrado correctamente." Si ocurre un error, se retorna "Error al registrar el usuario." 
        /// Si el nombre o la contraseña no son válidos, se retorna "Nombre o contraseña no válidos."</returns>
        public async Task<string> RegistrarUsuarioAsync(RegistroUsuarioDto dto)
        {
            // Validaciones básicas
            if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Password))
                return "Nombre o contraseña no válidos.";

            var nuevoUsuario = new Domain.Entity.Entities.Usuario
            {
                Name = dto.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FechaRegistro = DateTime.Now
            };

            var usuarioCreado = await _usuarioRepository.RegistrarAsync(nuevoUsuario);
            return usuarioCreado != null ? "Usuario registrado correctamente." : "Error al registrar el usuario.";
        }

        /// <summary>
        /// Autentica a un usuario en el sistema verificando su nombre y contraseña.
        /// </summary>
        /// <param name="dto">El DTO que contiene el nombre de usuario y la contraseña a verificar.</param>
        /// <returns>Un token JWT si la autenticación es exitosa, o un mensaje de error si falla.</returns>
        public async Task<string> LoginUsuarioAsync(LoginUsuarioDto dto)
        {
            var usuario = await _usuarioRepository.ObtenerPorNombreAsync(dto.Name);

            if (usuario == null)
                return "Usuario no encontrado.";

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, usuario.Password))
                return "Contraseña incorrecta.";

            // Generar el token JWT
            var token = GenerarToken(usuario);
            return token;
        }

        /// <summary>
        /// Genera un token JWT para un usuario autenticado.
        /// </summary>
        /// <param name="usuario">El usuario autenticado.</param>
        /// <returns>Un token JWT como string.</returns>
        private string GenerarToken(Domain.Entity.Entities.Usuario usuario)
        {
            var claims = new[]
            {
                new Claim("id",usuario.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public async Task<PtosDto?> AgregarPuntosUsuarioAsync(int usuarioId, int puntos)
        {
            var usuario = await _usuarioRepository.AgregarPuntosAsync(usuarioId, puntos);
            if (usuario == null)
                return null;

            return new PtosDto
            {
                UsuarioId = usuario.Id,
                Puntos = usuario.Puntos
            };
        }

        public async Task<List<UsuarioRankingDto>> ObtenerRankingUsuariosAsync()
        {
            var ranking = await _usuarioRepository.ObtenerRankingUsuariosAsync();

            return ranking.Select(u => new UsuarioRankingDto
            {
                UsuarioId = u.Id,
                Nombre = u.Name,
                Puntos = u.Puntos
            }).ToList();
        }


        public async Task<int?> ObtenerPuntosUsuarioAsync(string userId)
        {
            return await _usuarioRepository.ObtenerPuntosPorIdAsync(userId);
        }

    }
}