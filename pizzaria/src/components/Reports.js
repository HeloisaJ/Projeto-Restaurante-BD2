import React, { useEffect, useState } from 'react';
import styles from '../styles/Reports.module.css';

function Reports() {
    const [relatorios, setRelatorios] = useState({
        produtoMaisVendido: {},
        produtoMenosVendido: {},
        totalVendas: 0,
        vendasPorMes: {}
    });

    // Buscar os relatórios quando o componente for montado
    useEffect(() => {
        const fetchRelatorios = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/reports');
                if (!response.ok) {
                    throw new Error("Erro ao buscar relatórios.");
                }
                const data = await response.json();
                setRelatorios(data);
            } catch (error) {
                console.error("Erro ao buscar relatórios:", error);
            }
        };

        fetchRelatorios();
    }, []);

    return (
        <div className={styles.reportsContainer}>
            <h1 className={styles.title}>Relatórios e Estatísticas</h1>
            <div className={styles.report}>
                <h2>Produto Mais Vendido</h2>
                <p>{relatorios.produtoMaisVendido.nome} - {relatorios.produtoMaisVendido.quantidade} vendidos</p>
            </div>
            <div className={styles.report}>
                <h2>Produto Menos Vendido</h2>
                <p>{relatorios.produtoMenosVendido.nome} - {relatorios.produtoMenosVendido.quantidade} vendidos</p>
            </div>
            <div className={styles.report}>
                <h2>Total de Vendas</h2>
                <p>R$ {relatorios.totalVendas.toFixed(2)}</p>
            </div>
            <div className={styles.report}>
                <h2>Vendas por Mês</h2>
                <ul>
                    {Object.entries(relatorios.vendasPorMes).map(([mes, valor]) => (
                        <li key={mes}>{mes}: R$ {valor.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Reports;
