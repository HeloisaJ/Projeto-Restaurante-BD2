using MySqlConnector;
using Pizzaria.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Services
{
    public class FornecedorService
    {
        private readonly string _connectionString;

        public FornecedorService(IConfiguration configuration) {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                                ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is not configured.");
        }

        public async Task<List<Fornecedor>> GetAllFornecedoresAsync() {
            var fornecedores = new List<Fornecedor>();

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "SELECT * FROM fornecedores;";
            using var cmd = new MySqlCommand(query, cn);

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync()) {
                fornecedores.Add(new Fornecedor {
                    Id = Convert.ToInt32(reader["id"]),
                    Nome = reader["nome"]?.ToString() ?? throw new ArgumentNullException("Nome cannot be null"),
                    EstadoOrigem = reader["estado_origem"]?.ToString() ?? throw new ArgumentNullException("EstadoOrigem cannot be null")
                    // Ingredientes property could be loaded here if needed
                });
            }

            return fornecedores;
        }
    }
}
