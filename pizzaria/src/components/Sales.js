import React, { useEffect, useState } from "react";
import styles from "../styles/Sales.module.css";

function Sales() {
    const [vendas, setVendas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [pratos, setPratos] = useState([]);

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await fetch("http://localhost/api/vendas");
                const data = await response.json();
                setVendas(data);
            } catch (error) {
                console.error("Erro ao buscar dados de vendas:", error);
            }
        };

        const fetchClientes = async () => {
            try {
                const response = await fetch("http://localhost/api/clientes"); // Adjusted URL
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Erro ao buscar dados de clientes:", error);
            }
        };

        const fetchPratos = async () => {
            try {
                const response = await fetch("http://localhost/api/pratos"); // Adjusted URL
                const data = await response.json();
                setPratos(data);
            } catch (error) {
                console.error("Erro ao buscar dados de pratos:", error);
            }
        };

        fetchVendas();
        fetchClientes();
        fetchPratos();
    }, []);

    const getNomeCliente = (idCliente) => {
        const cliente = clientes.find((cliente) => cliente.id === idCliente);
        return cliente ? cliente.nome : "Cliente não encontrado";
    };

    const getNomePrato = (idPrato) => {
        const prato = pratos.find((prato) => prato.id === idPrato);
        return prato ? prato.nome : "Prato não encontrado";
    };

    return (
        <div className={styles.salesContainer}>
            <h1 className={styles.title}>Vendas Realizadas</h1>
            <table className={styles.salesTable}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Prato</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <tr key={venda.id}>
                            <td>{getNomeCliente(venda.id_cliente)}</td>
                            <td>{getNomePrato(venda.id_prato)}</td>
                            <td>{venda.quantidade}</td>
                            <td>{venda.dia}</td>
                            <td>{venda.hora}</td>
                            <td>{venda.valor.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;
