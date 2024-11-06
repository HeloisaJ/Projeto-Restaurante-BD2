// See https://aka.ms/new-console-template for more information
using System;
using System.IO;
using MySql.Data.MySqlClient;

namespace AdoNet {
    class Program {
        static void Main(string[] args) {
            string connectionString = "Server=localhost;Port=3306;Database=Pizzaria;User ID=testerpizza;Password=pizza123;";

			string queryFilePath = "../query.sql";
            string query = File.ReadAllText(queryFilePath);

            using (MySqlConnection connection = new MySqlConnection(connectionString)) {
                try {
                    connection.Open();
                    Console.WriteLine("Connection opened successfully.");

                    using (MySqlCommand command = new MySqlCommand(query, connection)) {
                        using (MySqlDataReader reader = command.ExecuteReader()) {
                            while (reader.Read()) {
                                Console.WriteLine();
                            }
                        }
                    }
                } catch (MySqlException ex) {
                    Console.WriteLine("An error occurred: " + ex.Message);
                }
            }
        }
    }
}
