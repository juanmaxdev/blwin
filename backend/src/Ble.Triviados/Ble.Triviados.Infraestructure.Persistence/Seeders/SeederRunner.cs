namespace Ble.Triviados.Infraestructure.Persistence.Seeders
{
    public static class SeederRunner
    {
        public static async Task RunAsync(TriviadosDbContext context)
        {
            await UsuarioSeeder.SeedAsync(context);
            await PreguntaSeeder.SeedAsync(context); 
            await PartidaSeeder.SeedAsync(context); 
            // Agregar aquí otros seeders que se creen
        }
    }
}
