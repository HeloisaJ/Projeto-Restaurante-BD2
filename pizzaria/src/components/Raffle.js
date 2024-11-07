// src/components/Raffle.js

import React, { useState, useEffect } from "react";
import styles from "../styles/Raffle.module.css";

function Raffle() {
    const [clients, setClients] = useState([]);
    const [winner, setWinner] = useState("");

    // Função para buscar clientes ao montar o componente
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/clients");
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClients();
    }, []);

    // Função para realizar o sorteio de um cliente e atualizar os pontos
    const handleRaffle = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/sorteio", {
                method: "POST",
            });
            const data = await response.json();
            if (response.ok) {
                setWinner(`${data.nome} ganhou 100 pontos!`);
                // Atualiza os pontos do cliente sorteado na lista
                setClients((prevClients) =>
                    prevClients.map((client) =>
                        client.id === data.id ? { ...client, pontos: client.pontos + 100 } : client
                    )
                );
            } else {
                setWinner("Erro ao realizar o sorteio.");
            }
        } catch (error) {
            console.error("Erro ao realizar o sorteio:", error);
            setWinner("Erro ao realizar o sorteio.");
        }
    };

    return (
        <div className={styles.raffleContainer}>
            <h1 className={styles.title}>Sorteio de Clientes</h1>
            <button className={styles.btnRaffle} onClick={handleRaffle}>
                Realizar Sorteio
            </button>
            {winner && <p className={styles.message}>{winner}</p>}
        </div>
    );
}

export default Raffle;
