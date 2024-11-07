// src/components/PriceAdjustment.js

import React, { useState, useEffect } from "react";
import styles from "../styles/PriceAdjustment.module.css";

function PriceAdjustment() {
    const [percentual, setPercentual] = useState("");
    const [message, setMessage] = useState("");
    const [adjustments, setAdjustments] = useState([]);

    // Carrega a lista de reajustes aplicados ao carregar o componente
    useEffect(() => {
        fetchAdjustments();
    }, []);

    // Função para buscar reajustes aplicados
    const fetchAdjustments = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/reajuste");
            const data = await response.json();
            setAdjustments(data);
        } catch (error) {
            console.error("Erro ao buscar reajustes:", error);
        }
    };

    // Envia o percentual de reajuste ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const sendData = { adjustment: parseFloat(percentual) };

        try {
            const response = await fetch("http://localhost:3001/api/reajuste", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sendData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Reajuste aplicado com sucesso!");
                setPercentual("");
                fetchAdjustments(); // Atualiza a lista de reajustes
            } else {
                setMessage(data.error || "Erro ao reajustar preços.");
            }
        } catch (error) {
            console.error("Erro ao realizar o reajuste:", error);
            setMessage("Erro ao realizar o reajuste.");
        }
    };

    return (
        <div className={styles.adjustmentContainer}>
            <h1 className={styles.title}>Reajuste de Preços</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Percentual de Reajuste (%):
                        <input
                            type="number"
                            className={styles.inputField}
                            value={percentual}
                            onChange={(e) => setPercentual(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className={styles.btnAdjust}>
                    Aplicar Reajuste
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            <h2 className={styles.subTitle}>Histórico de Reajustes</h2>
            <table className={styles.adjustmentTable}>
                <thead>
                    <tr>
                        <th>Percentual (%)</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {adjustments.map((adj) => (
                        <tr key={adj.id}>
                            <td>{adj.adjustment}</td>
                            <td>{new Date(adj.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PriceAdjustment;
