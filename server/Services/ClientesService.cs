using MySqlConnector;
using Pizzaria.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Services
{
    public class ClienteService
    {
        private readonly string _connectionString;

        public ClienteService(IConfiguration configuration) {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                                ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is not configured.");
        }

        public async Task<List<Cliente>> GetAllClientesAsync() {
            var clientes = new List<Cliente>();

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "SELECT * FROM clientes;";
            using var cmd = new MySqlCommand(query, cn);

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync()) {
                clientes.Add(new Cliente {
                    Id = Convert.ToInt32(reader["id"]),
                    Nome = reader["nome"]?.ToString() ?? throw new ArgumentNullException("Nome cannot be null"),
                    Sexo = Convert.ToChar(reader["sexo"]),
                    Idade = Convert.ToInt32(reader["idade"]),
                    Nascimento = Convert.ToDateTime(reader["nascimento"]),
                    Pontos = Convert.ToInt32(reader["pontos"]),
                    // Load Vendas if necessary
                });
            }

            return clientes;
        }

        public async void PostClienteAsync(Cliente c){

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES(" + 
                c.Nome + ", " + 
                c.Sexo + ", " +
                c.Idade + ", " +
                c.Nascimento + ", " +
                c.Pontos + ");";

            using var cmd = new MySqlCommand(query, cn);
            await cmd.ExecuteReaderAsync();
        }
    }
}
