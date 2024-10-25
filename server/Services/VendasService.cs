using MySqlConnector;
using Pizzaria.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Services
{
    public class VendaService
    {
        private readonly string _connectionString;

        public VendaService(IConfiguration configuration) {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                                ?? throw new ArgumentNullException("Connection string 'DefaultConnection' is not configured.");
        }

        public async Task<List<Venda>> GetAllVendasAsync() {
            var vendas = new List<Venda>();

            using var cn = new MySqlConnection(_connectionString);
            await cn.OpenAsync();

            string query = "SELECT * FROM vendas;";
            using var cmd = new MySqlCommand(query, cn);

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync()) {
                vendas.Add(new Venda {
                    Id = Convert.ToInt32(reader["id"]),
                    IdCliente = Convert.ToInt32(reader["id_cliente"]),
                    IdPrato = Convert.ToInt32(reader["id_prato"]),
                    Quantidade = Convert.ToInt32(reader["quantidade"]),
                    Dia = Convert.ToDateTime(reader["dia"]),
                    Hora = TimeSpan.Parse(reader["hora"].ToString() ?? "00:00:00"),
                    Valor = Convert.ToDecimal(reader["valor"]),
                    // Cliente and Prato properties could be loaded here if needed
                });
            }

            return vendas;
        }
    }
}
