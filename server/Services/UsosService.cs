using MySqlConnector;
using Pizzaria.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Services
{
    public class UsoService
    {
        private readonly string _connectionString;

        public UsoService(IConfiguration configuration) {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                                ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is not configured.");
        }

        public async Task<List<Usos>> GetAllUsosAsync() {
            var usos = new List<Usos>();

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "SELECT * FROM usos;";
            using var cmd = new MySqlCommand(query, cn);

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync()) {
                usos.Add(new Usos {
                    IdPrato = reader["id_prato"] != DBNull.Value ? Convert.ToInt32(reader["id_prato"]) : throw new ArgumentNullException("IdPrato cannot be null"),
                    IdIngrediente = reader["id_ingrediente"] != DBNull.Value ? Convert.ToInt32(reader["id_ingrediente"]) : throw new ArgumentNullException("IdIngrediente cannot be null"),
                    // Load Prato and Ingrediente properties if necessary
                });
            }

            return usos;
        }
    }
}
