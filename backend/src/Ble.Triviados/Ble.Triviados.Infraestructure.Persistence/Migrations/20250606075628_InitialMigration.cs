using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ble.Triviados.Infraestructure.Persistence.Migrations;

/// <inheritdoc />
public partial class InitialMigration : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Juegos",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Juegos", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Usuarios",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                Puntos = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Usuarios", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "UsuarioJuegos",
            columns: table => new
            {
                UsuarioId = table.Column<int>(type: "int", nullable: false),
                JuegoId = table.Column<int>(type: "int", nullable: false),
                Puntuacion = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UsuarioJuegos", x => new { x.UsuarioId, x.JuegoId });
                table.ForeignKey(
                    name: "FK_UsuarioJuegos_Juegos_JuegoId",
                    column: x => x.JuegoId,
                    principalTable: "Juegos",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_UsuarioJuegos_Usuarios_UsuarioId",
                    column: x => x.UsuarioId,
                    principalTable: "Usuarios",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Juegos_Nombre",
            table: "Juegos",
            column: "Nombre",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_UsuarioJuegos_JuegoId",
            table: "UsuarioJuegos",
            column: "JuegoId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "UsuarioJuegos");

        migrationBuilder.DropTable(
            name: "Juegos");

        migrationBuilder.DropTable(
            name: "Usuarios");
    }
}
