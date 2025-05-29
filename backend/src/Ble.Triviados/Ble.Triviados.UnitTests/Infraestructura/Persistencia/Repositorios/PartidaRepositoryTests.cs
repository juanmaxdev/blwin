using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Infraestructure.Persistence;
using Ble.Triviados.Infraestructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ble.Triviados.UnitTests.Infraestructura.Persistencia.Repositorios
{
    public class PartidaRepositoryTests
    {
        private async Task<TriviadosDbContext> GetDbContextAsync()
        {
            var options = new DbContextOptionsBuilder<TriviadosDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new TriviadosDbContext(options);
            await context.Database.EnsureCreatedAsync();
            return context;
        }

        [Fact]
        public async Task CrearPartidaAsync_DeberiaAgregarPartida()
        {
            var context = await GetDbContextAsync();
            var repo = new PartidaRepository(context);

            var partida = new Partida
            {
                UsuarioId = 1,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow,
                PuntosPartida = 0,
                VidasRestantes = 3
            };

            await repo.CrearPartidaAsync(partida);

            var partidaGuardada = await context.Partidas.FirstOrDefaultAsync();
            partidaGuardada.Should().NotBeNull();
            partidaGuardada!.UsuarioId.Should().Be(1);
        }

        [Fact]
        public async Task ObtenerPorIdAsync_DeberiaDevolverPartidaSiExiste()
        {
            var options = new DbContextOptionsBuilder<TriviadosDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TriviadosDbContext(options);

            var usuario = new Usuario
            {
                Id = 1,
                Name = "usuarioPrueba",
                Password = "1234",
                Rol = "User",
                FechaRegistro = DateTime.UtcNow
            };

            await context.Usuarios.AddAsync(usuario);
            await context.SaveChangesAsync();

            var partida = new Partida
            {
                UsuarioId = usuario.Id,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow,
                PuntosPartida = 100,
                VidasRestantes = 3
            };

            await context.Partidas.AddAsync(partida);
            await context.SaveChangesAsync();

            var repo = new PartidaRepository(context);

            var resultado = await repo.ObtenerPorIdAsync(partida.Id);

            resultado.Should().NotBeNull();
            resultado!.UsuarioId.Should().Be(usuario.Id);
            resultado.Usuario.Should().NotBeNull();
            resultado.Usuario!.Name.Should().Be("usuarioPrueba");
        }

        [Fact]
        public async Task ActualizarPartidaAsync_DeberiaActualizarLosCampos()
        {
            var context = await GetDbContextAsync();
            var partida = new Partida
            {
                UsuarioId = 3,
                PuntosPartida = 0,
                VidasRestantes = 3,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow
            };

            context.Partidas.Add(partida);
            await context.SaveChangesAsync();

            var repo = new PartidaRepository(context);
            partida.PuntosPartida = 500;
            partida.VidasRestantes = 1;

            await repo.ActualizarPartidaAsync(partida);

            var actualizada = await context.Partidas.FindAsync(partida.Id);
            actualizada!.PuntosPartida.Should().Be(500);
            actualizada.VidasRestantes.Should().Be(1);
        }

        [Fact]
        public async Task ObtenerRankingGlobalAsync_DeberiaDevolverPartidasOrdenadas()
        {
            var context = await GetDbContextAsync();

            var usuarios = new List<Usuario>
            {
                new Usuario { Name = "usuario1", Password = "pass", Rol = "User" },
                new Usuario { Name = "usuario2", Password = "pass", Rol = "User" },
                new Usuario { Name = "usuario3", Password = "pass", Rol = "User" }
            };

            context.Usuarios.AddRange(usuarios);
            await context.SaveChangesAsync();

            var partidas = new List<Partida>
            {
                new Partida { UsuarioId = usuarios[0].Id, PuntosPartida = 300, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuarios[1].Id, PuntosPartida = 800, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuarios[2].Id, PuntosPartida = 500, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow }
            };

            context.Partidas.AddRange(partidas);
            await context.SaveChangesAsync();

            var repository = new PartidaRepository(context);

            var ranking = await repository.ObtenerRankingGlobalAsync();

            ranking.Should().HaveCount(3);
            ranking[0].PuntosPartida.Should().Be(800);
            ranking[1].PuntosPartida.Should().Be(500);
            ranking[2].PuntosPartida.Should().Be(300);
        }

        [Fact]
        public async Task ObtenerTop10Async_DeberiaDevolverTop10UsuariosConMasPuntos()
        {
            var context = await GetDbContextAsync();
            var usuarios = Enumerable.Range(1, 15).Select(i => new Usuario
            {
                Name = $"Usuario{i}",
                Password = "pass",
                Rol = "User"
            }).ToList();

            context.Usuarios.AddRange(usuarios);
            await context.SaveChangesAsync();

            var partidas = usuarios.Select((u, i) => new Partida
            {
                UsuarioId = u.Id,
                PuntosPartida = i * 100,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow
            }).ToList();

            context.Partidas.AddRange(partidas);
            await context.SaveChangesAsync();

            var repo = new PartidaRepository(context);
            var top10 = await repo.ObtenerTop10Async();

            top10.Should().HaveCount(10);
            top10[0].Puntos.Should().Be(1400);
            top10[9].Puntos.Should().Be(500);
        }

        [Fact]
        public async Task ObtenerPosicionUsuarioAsync_DeberiaDevolverPosicionYMaximoPuntaje()
        {
            var context = await GetDbContextAsync();
            var usuario1 = new Usuario { Name = "User1", Password = "123", Rol = "User" };
            var usuario2 = new Usuario { Name = "User2", Password = "123", Rol = "User" };

            context.Usuarios.AddRange(usuario1, usuario2);
            await context.SaveChangesAsync();

            context.Partidas.AddRange(
                new Partida { UsuarioId = usuario1.Id, PuntosPartida = 200, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuario2.Id, PuntosPartida = 500, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow }
            );
            await context.SaveChangesAsync();

            var repo = new PartidaRepository(context);
            var posicion = await repo.ObtenerPosicionUsuarioAsync(usuario1.Id);

            posicion.Should().NotBeNull();
            posicion!.Value.Posicion.Should().Be(2);
            posicion!.Value.Puntos.Should().Be(200);
        }

        [Fact]
        public async Task ObtenerPartidasPorUsuarioAsync_DeberiaDevolverSoloPartidasDelUsuario()
        {
            var context = await GetDbContextAsync();

            var usuario = new Usuario { Name = "UserTest", Password = "pass", Rol = "User" };
            await context.Usuarios.AddAsync(usuario);
            await context.SaveChangesAsync();

            context.Partidas.AddRange(
                new Partida { UsuarioId = usuario.Id, PuntosPartida = 100, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuario.Id, PuntosPartida = 200, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuario.Id + 1, PuntosPartida = 999, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow }
            );
            await context.SaveChangesAsync();

            var repo = new PartidaRepository(context);
            var partidasUsuario = await repo.ObtenerPartidasPorUsuarioAsync(usuario.Id);

            partidasUsuario.Should().HaveCount(2);
            partidasUsuario.All(p => p.UsuarioId == usuario.Id).Should().BeTrue();
        }


        [Fact]
        public async Task ObtenerPartidasActivasAsync_DeberiaDevolverSoloPartidasConVidasRestantes()
         {
                var context = await GetDbContextAsync();

                var usuarios = new List<Usuario>
                {
                new Usuario { Name = "Jugador1", Password = "123", Rol = "User" },
                new Usuario { Name = "Jugador2", Password = "123", Rol = "User" }
                };

                context.Usuarios.AddRange(usuarios);
                await context.SaveChangesAsync();

                var partidas = new List<Partida>
                {
                new Partida { UsuarioId = usuarios[0].Id, VidasRestantes = 3, PuntosPartida = 150, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuarios[0].Id, VidasRestantes = 0, PuntosPartida = 200, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuarios[1].Id, VidasRestantes = 1, PuntosPartida = 250, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow },
                new Partida { UsuarioId = usuarios[1].Id, VidasRestantes = -1, PuntosPartida = 300, FechaInicio = DateTime.UtcNow, FechaFin = DateTime.UtcNow }
                };

                context.Partidas.AddRange(partidas);
                await context.SaveChangesAsync();

                var repo = new PartidaRepository(context);
                var activas = await repo.ObtenerPartidasActivasAsync();

                activas.Should().HaveCount(2);
                activas.All(p => p.VidasRestantes > 0).Should().BeTrue();
                activas.Select(p => p.Usuario).Should().NotContainNulls();
         }

        }
}
