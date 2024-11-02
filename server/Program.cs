using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add a MySQL connection service
builder.Services.AddTransient<MySqlConnection>(sp =>
{
    string connStr = "Server=localhost; User ID=tester; Password=1234; Database=Pizzaria";
    return new MySqlConnection(connStr);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Call the database connection method when the application starts
await ConnectToDatabase(app.Services);

app.Run();

async Task ConnectToDatabase(IServiceProvider services)
{
    using var connection = services.GetRequiredService<MySqlConnection>();
    await connection.OpenAsync();
    string query = "SELECT * FROM ingredientes;";
    
    using var command = new MySqlCommand(query, connection);
    using var reader = await command.ExecuteReaderAsync();
    
    while (await reader.ReadAsync())
    {
        Console.WriteLine(reader["nome"].ToString() + " " + reader["quantidade"].ToString());
    }
}
