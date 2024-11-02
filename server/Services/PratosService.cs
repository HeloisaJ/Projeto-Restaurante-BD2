using MySqlConnector;
using Pizzaria.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Services
{
    public class PratoService
    {
        private readonly string _connectionString;

        public PratoService(IConfiguration configuration) {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                               ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is not configured.");
        }

        public async Task<List<Prato>> GetAllPratosAsync() {
            var pratos = new List<Prato>();

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "SELECT * FROM pratos;";
            using var cmd = new MySqlCommand(query, cn);

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync()) {
                pratos.Add(new Prato {
                    Id = Convert.ToInt32(reader["id"]),
                    Nome = reader["nome"]?.ToString() ?? throw new ArgumentNullException("Nome cannot be null"),
                    Descricao = reader["descricao"]?.ToString() ?? string.Empty,
                    Valor = reader["valor"] != DBNull.Value ? Convert.ToDecimal(reader["valor"]) : 0m,
                    Disponibilidade = reader["disponibilidade"] != DBNull.Value && Convert.ToBoolean(reader["disponibilidade"]),
                    // Load Vendas and Usos if required
                });
            }

            return pratos;
        }
    }
}
