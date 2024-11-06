using MySqlConnector;
using serverApi.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public class IngredientService
    {
        private readonly string _connectionString;

        public IngredientService(IConfiguration configuration) {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                                ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is not configured.");
        }

        public async Task<List<Ingredient>> GetAllIngredientsAsync() {
            var ingredients = new List<Ingredient>();

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "SELECT * FROM ingredientes;";
            using var cmd = new MySqlCommand(query, cn);

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync()) {
                ingredients.Add(new Ingredient {
                    Id = Convert.ToInt32(reader["id"]),
                    Nome = reader["nome"]?.ToString() ?? throw new ArgumentNullException("Nome cannot be null"),
                    DataFabricacao = Convert.ToDateTime(reader["data_fabricacao"]),
                    DataValidade = Convert.ToDateTime(reader["data_validade"]),
                    Quantidade = Convert.ToInt16(reader["quantidade"]),
                    Observacao = reader["observacao"]?.ToString() ?? string.Empty
                    // Usos
                });
            }

            return ingredients;
        }
    }
}
