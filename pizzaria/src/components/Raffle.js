// src/components/Raffle.js

import React, { useState, useEffect } from 'react';
import styles from '../styles/Raffle.module.css';

function Raffle() {
    const [clients, setClients] = useState([]);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/clients'); // Endpoint para obter os clientes
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClients();
    }, []);

    const handleRaffle = () => {
        if (clients.length === 0) {
            setWinner('Nenhum cliente disponível para sorteio.');
            return;
        }
        const randomIndex = Math.floor(Math.random() * clients.length);
        const selectedClient = clients[randomIndex];
        setWinner(`${selectedClient.nome} ganhou 100 pontos!`);
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
