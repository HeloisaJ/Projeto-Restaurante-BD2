// backend/dbScript.js
import { mysql } from "mysql2";

// Configure a conexão com o banco de dados
const connection = mysql.createConnection({
    host: "localhost",
    user: "testerpizza",
    password: "pizza123",
    database: "Pizzaria",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados!");
});

// Função para executar uma consulta SQL
const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const insert_queries = async (t, inp) => {
    switch (t) {
        case "cliente":
            await executeQuery(
                `INSERT INTO ${t} (nome, sexo, idade, nascimento, pontos) VALUES (${inp[0]}, ${inp[1]}, ${inp[2]}, ${inp[3]}, ${inp[4]})`,
            );

            break;
        case "fornecedor":
            await executeQuery(
                `INSERT INTO ${t} (nome, estado_origem) VALUES (${inp[0]}, ${inp[1]})`,
            );

            break;
        case "ingredientes":
            await executeQuery(
                `INSERT INTO ${t} (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES (${inp[0]}, ${inp[1]}, ${inp[2]}, ${inp[3]}, ${inp[4]})`,
            );

            break;
        case "prato":
            await executeQuery(
                `INSERT INTO ${t} (nome, descricao, valor, disponibilidade) VALUES (${inp[0]}, ${inp[1]}, ${inp[2]}, ${inp[3]})`,
            );

            break;
        case "usos":
            await executeQuery(
                `INSERT INTO ${t} (id_prato, id_ingrediente) VALUES (${inp[0]}, ${inp[1]})`,
            );

            break;
        case "venda":
            await executeQuery(
                `INSERT INTO ${t} (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES (${inp[0]}, ${inp[1]}, ${inp[2]}, ${inp[3]}, ${inp[4]}, ${inp[5]})`,
            );

            break;
        default:
            break;
    }
    console.log("Registro inserido!");
};

const get_queries = async (t, inp) => {
    await executeQuery(`SELECT * FROM ${t}`);
    console.log("Registro apresentado!");
};

const update_queries = async (t, inp) => {
    switch (t) {
        case "cliente":
            await executeQuery(
                `UPDATE ${t} SET nome = ${inp[1]}, sexo = ${inp[2]}, idade = ${inp[3]}, nascimento = ${inp[4]}, pontos = ${inp[5]} WHERE id = ${inp[0]}`,
            );

            break;
        case "fornecedor":
            await executeQuery(
                `UPDATE ${t} SET nome = ${inp[1]}, estado_origem = ${inp[2]} WHERE id = ${inp[0]}`,
            );

            break;
        case "ingredientes":
            await executeQuery(
                `UPDATE ${t} SET nome = ${inp[1]}, data_fabricacao = ${inp[2]}, data_validacao = ${inp[3]}, quantidade = ${inp[4]}, observacao = ${inp[5]} WHERE id = ${inp[0]}`,
            );

            break;
        case "prato":
            await executeQuery(
                `UPDATE ${t} SET nome = ${inp[1]}, descricao = ${inp[2]}, valor = ${inp[3]}, disponibilidade = ${inp[4]} WHERE id = ${inp[0]}`,
            );

            break;
        case "usos":
            await executeQuery(
                `UPDATE ${t} SET id_ingrediente = ${inp[1]} WHERE id = ${inp[0]}`,
            );

            break;
        case "venda":
            await executeQuery(
                `UPDATE ${t} SET id_cliente = ${inp[1]}, id_prato = ${inp[2]}, quantidade = ${inp[3]}, dia = ${inp[4]}, hora = ${inp[5]}, valor = ${inp[6]} WHERE id = ${inp[0]}`,
            );

            break;
        default:
            break;
    }
    console.log("Registro atualizado!");
};

const delete_queries = async (t, inp) => {
    switch (t) {
        case "cliente":
            await executeQuery(`DELETE FROM ${t} WHERE id = ${inp[0]}`);

            break;
        case "fornecedor":
            await executeQuery(`DELETE FROM ${t} WHERE id = ${inp[0]}`);
            break;
        case "ingredientes":
            await executeQuery(`DELETE FROM ${t} WHERE id = ${inp[0]}`);
            break;
        case "prato":
            await executeQuery(`DELETE FROM ${t} WHERE id = ${inp[0]}`);
            break;
        case "usos":
            await executeQuery(`DELETE FROM ${t} WHERE id = ${inp[0]}`); // check if this is correct
            break;
        case "venda":
            await executeQuery(`DELETE FROM ${t} WHERE id = ${inp[0]}`);
            break;
        default:
            break;
    }
    console.log("Registro inserido!");
};

// Exemplo de manipulação
module.exports.runScript = async (m, t, inp) => {
    try {
        switch (m) {
            case "insert":
                await insert_queries(t, inp);
                break;
            case "get":
                await get_queries(t, inp);
                break;
            case "update":
                await update_queries(t, inp);
                break;
            case "delete":
                await delete_queries(t, inp);
                break;
            default:
                break;
        }
    } catch (error) {
        console.error("Erro ao manipular o banco de dados:", error);
    } finally {
        connection.end(); // it can give some error in the processing, alter after
    }
};

// Execute o script
// add the runScript to the files and pass the infos
// m means what it will do {
// - insert
// - get
// - update
// - delete
// }
//
// t means the table it will occour {
//  - cliente
//  - fornecedor
//  - ingredientes
//  - prato
//  - usos
//  - venda
// }
//
// inp means the input it will receive, it will be an array of informations
// ** IMPORTANT **
// ** in update the inp[0] is reserved for the ID of the table
//
// ** FOR NEXT UPDATES **
// ** Protect from SQL injection using '?' instead of the input[x]
// ** Add the results --> console.log("result: ", results);
// ** Refactor the code
runScript();
