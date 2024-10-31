// src/components/Sales.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/Sales.module.css';

function Sales() {
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await fetch('/api/vendas'); // Ajuste a URL conforme necessário
                const data = await response.json();
                setVendas(data);
            } catch (error) {
                console.error("Erro ao buscar dados de vendas:", error);
            }
        };

        fetchVendas();
    }, []);

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
                            <td>{venda.nome_cliente}</td>
                            <td>{venda.nome_prato}</td>
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
