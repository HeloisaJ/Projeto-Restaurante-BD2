const express = require("express");
const cors = require("cors");
const db = require("./db/methods");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// ** GET **

app.get("/api/cliente", async (req, res) => {
    try {
        const clientes = await db.getCliente();
        res.json(clientes);
    } catch (error) {
        console.error("Error fetching cliente:", error);
        res.status(500).json({ message: "Error fetching clientes" });
    }
});

app.get("/api/fornecedor", async (req, res) => {
    try {
        const fornecedores = await db.getFornecedor();
        res.json(fornecedores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fornecedor" });
    }
});

app.get("/api/ingredientes", async (req, res) => {
    try {
        const ingredientes = await db.getIngredientes();
        res.json(ingredientes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ingredientes" });
    }
});

app.get("/api/prato", async (req, res) => {
    try {
        const pratos = await db.getPrato();
        res.json(pratos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching prato" });
    }
});

app.get("/api/usos", async (req, res) => {
    try {
        const usos = await db.getUsos();
        res.json(usos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching usos" });
    }
});

app.get("/api/vendas", async (req, res) => {
    try {
        const vendas = await db.getVendas();
        res.json(vendas);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendas" });
    }
});

app.get("/api/estatisticas", async (req, res) => {
    try {
        const stats = await db.getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats in server. " });
    }
});

// ** POST **

app.post("/api/reajuste", async (req, res) => {
    const { adjustment } = req.body;

    if (!adjustment) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await db.postReajuste(adjustment);
        res.status(201).json({ message: "Reajuste feito", result });
    } catch (error) {
        res.status(500).json({
            message: "Error inserting cliente",
            error: error.message,
        });
    }
});

app.post("/api/cliente", async (req, res) => {
    // Destructure fields from request body
    const { nome, sexo, idade, nascimento, pontos } = req.body;

    // Validation: Check if all required fields are provided
    if (!nome || !sexo || !idade || !nascimento || !pontos) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Call postCliente to insert data into the database
        const result = await db.postCliente(
            nome,
            sexo,
            idade,
            nascimento,
            pontos,
        );
        res.status(201).json({ message: "Cliente created", result });
    } catch (error) {
        // Handle errors during the insertion process
        res.status(500).json({
            message: "Error inserting cliente",
            error: error.message,
        });
    }
});

app.post("/api/fornecedor", async (req, res) => {
    // Destructure fields from request body
    const { nome, estado_origem } = req.body;

    // Validation: Check if all required fields are provided
    if (!nome || !estado_origem) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Call postFornecedor to insert data into the database
        const result = await db.postFornecedor(nome, estado_origem);
        res.status(201).json({ message: "Fornecedor created", result });
    } catch (error) {
        // Handle errors during the insertion process
        res.status(500).json({
            message: "Error inserting fornecedor",
            error: error.message,
        });
    }
});

app.post("/api/ingrediente", async (req, res) => {
    // Destructure fields from request body
    const { nome, data_fabricacao, data_validade, quantidade, observacao } =
        req.body;

    // Validation: Check if all required fields are provided
    if (
        !nome ||
        !data_fabricacao ||
        !data_validade ||
        !quantidade ||
        !observacao
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Call postIngrediente to insert data into the database
        const result = await db.postIngrediente(
            nome,
            data_fabricacao,
            data_validade,
            quantidade,
            observacao,
        );
        res.status(201).json({ message: "Ingrediente created", result });
    } catch (error) {
        // Handle errors during the insertion process
        res.status(500).json({
            message: "Error inserting ingrediente",
            error: error.message,
        });
    }
});

app.post("/api/prato", async (req, res) => {
    // Destructure fields from request body
    const { nome, descricao, valor, disponibilidade } = req.body;

    // Validation: Check if all required fields are provided
    if (!nome || !descricao || !valor || !disponibilidade) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Call postPrato to insert data into the database
        const result = await db.postPrato(
            nome,
            descricao,
            valor,
            disponibilidade,
        );
        res.status(201).json({ message: "Prato created", result });
    } catch (error) {
        // Handle errors during the insertion process
        res.status(500).json({
            message: "Error inserting prato",
            error: error.message,
        });
    }
});

app.post("/api/venda", async (req, res) => {
    // Destructure fields from request body
    const { id_cliente, id_prato, quantidade, dia, hora, valor } = req.body;

    // Validation: Check if all required fields are provided
    if (!id_cliente || !id_prato || !quantidade || !dia || !hora || !valor) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Call postVenda to insert data into the database
        const result = await db.postVenda(
            id_cliente,
            id_prato,
            quantidade,
            dia,
            hora,
            valor,
        );
        res.status(201).json({ message: "Venda created", result });
    } catch (error) {
        // Handle errors during the insertion process
        res.status(500).json({
            message: "Error inserting venda",
            error: error.message,
        });
    }
});

// ** WARD **

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
