import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "testerpizza",
    password: "pizza123",
    database: "Pizzaria",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to database!");
});

const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// ** GET **

const getCliente = async () => {
    try {
        const results = await executeQuery("SELECT * FROM cliente");
        console.log("cliente: ", results);
        return results;
    } catch (error) {
        console.log("Error executing get method from cliente");
    }
};

const getFornecedor = async () => {
    try {
        const results = await executeQuery("SELECT * FROM fornecedor");
        console.log("fornecedor: ", results);
        return results;
    } catch (error) {
        console.log("Error executing get method from fornecedor");
    }
};

const getIngredientes = async () => {
    try {
        const results = await executeQuery("SELECT * FROM ingredientes");
        console.log("ingredientes: ", results);
        return results;
    } catch (error) {
        console.log("Error executing get method from ingredientes");
    }
};

const getPrato = async () => {
    try {
        const results = await executeQuery("SELECT * FROM prato");
        console.log("prato: ", results);
        return results;
    } catch (error) {
        console.log("Error executing get method from prato");
    }
};

const getUsos = async () => {
    try {
        const results = await executeQuery("SELECT * FROM usos");
        console.log("usos: ", results);
        return results;
    } catch (error) {
        console.log("Error executing get method from usos");
    }
};

const getVendas = async () => {
    try {
        const results = await executeQuery("SELECT * FROM venda");
        console.log("venda: ", results);
        return results;
    } catch (error) {
        console.log("Error executing get method from venda");
    }
};

const getStats = async () => {
    try {
        const results = await executeQuery("CALL EstatisticasVendas()");
        console.log("Estatisticas: ", results);
        return results;
    } catch (error) {
        console.log("Error executing post method for cliente:", error);
    }
};

// ** POST **

const postCliente = async (nome, sexo, idade, nascimento, pontos) => {
    const query =
        "INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES (?, ?, ?, ?, ?)";
    const values = [nome, sexo, idade, nascimento, pontos];
    try {
        const results = await executeQuery(query, values);
        console.log("Cliente inserted:", results);
    } catch (error) {
        console.log("Error executing post method for cliente:", error);
    }
};

const postFornecedor = async (nome, estado_origem) => {
    const query = "INSERT INTO fornecedor (nome, estado_origem) VALUES (?, ?)";
    const values = [nome, estado_origem];
    try {
        const results = await executeQuery(query, values);
        return results;
    } catch (error) {
        throw error;
    }
};

const postIngrediente = async (
    nome,
    data_fabricacao,
    data_validade,
    quantidade,
    observacao,
) => {
    const query =
        "INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES (?, ?, ?, ?, ?)";
    const values = [
        nome,
        data_fabricacao,
        data_validade,
        quantidade,
        observacao,
    ];
    try {
        const results = await executeQuery(query, values);
        return results;
    } catch (error) {
        throw error;
    }
};

const postPrato = async (nome, descricao, valor, disponibilidade) => {
    const query =
        "INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES (?, ?, ?, ?)";
    const values = [nome, descricao, valor, disponibilidade];
    try {
        const results = await executeQuery(query, values);
        return results;
    } catch (error) {
        throw error;
    }
};

const postVenda = async (
    id_cliente,
    id_prato,
    quantidade,
    dia,
    hora,
    valor,
) => {
    const query =
        "INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [id_cliente, id_prato, quantidade, dia, hora, valor];
    try {
        const results = await executeQuery(query, values);
        return results;
    } catch (error) {
        throw error;
    }
};

const postReajuste = async (adjustment) => {
    const query = "CALL reajuste(?);";
    const values = [adjustment];
    try {
        const results = await executeQuery(query, values);
        return results;
    } catch (error) {
        throw error;
    }
};

// ** EXPORTS **

export {
    getCliente,
    getFornecedor,
    getIngredientes,
    getPrato,
    getUsos,
    getVendas,
    postCliente,
    postFornecedor,
    postIngrediente,
    postPrato,
    postVenda,
    postReajuste,
};
