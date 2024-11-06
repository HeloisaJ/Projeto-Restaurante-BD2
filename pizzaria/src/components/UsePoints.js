import React, { useState, useEffect } from "react";
import styles from "../styles/UsePoints.module.css";

function UsePoints() {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState("");
    const [dishes, setDishes] = useState([]);
    const [selectedDishId, setSelectedDishId] = useState("");
    const [setPointsUsed] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("/api/clients");
                if (!response.ok) throw new Error("Erro ao carregar clientes.");
                const data = await response.json();
                setClients(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchDishes = async () => {
            try {
                const response = await fetch("/api/dishes");
                if (!response.ok) throw new Error("Erro ao carregar pratos.");
                const data = await response.json();
                setDishes(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClients();
        fetchDishes();
    }, []);

    const handleUsePoints = async () => {
        setMessage("");
        setError("");

        const selectedClient = clients.find(
            (client) => client.id === selectedClientId,
        );
        if (!selectedClient) {
            setError("Selecione um cliente válido.");
            return;
        }

        const dish = dishes.find((dish) => dish.id === selectedDishId);
        if (!dish) {
            setError("Selecione um prato válido.");
            return;
        }

        const totalPointsNeeded = Math.ceil(dish.valor); // Usar centavos como 1 ponto extra
        if (selectedClient.pontos < totalPointsNeeded) {
            setError("Pontos insuficientes para adquirir este prato.");
            return;
        }

        // Atualiza os pontos do cliente e registra a venda (simulação)
        try {
            const response = await fetch("/api/use-points", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clientId: selectedClientId,
                    dishId: selectedDishId,
                    pointsUsed: totalPointsNeeded,
                }),
            });

            if (!response.ok) throw new Error("Erro ao utilizar os pontos.");

            const updatedClient = await response.json();
            setClients(
                clients.map((client) =>
                    client.id === updatedClient.id ? updatedClient : client,
                ),
            );
            setMessage(`Prato ${dish.nome} adquirido com sucesso!`);
            setPointsUsed(totalPointsNeeded);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Uso de Pontos</h1>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {clients.length === 0 && (
                <p className={styles.message}>
                    Nenhum cliente registrado ainda.
                </p>
            )}
            <div className={styles.formGroup}>
                <label className={styles.label}>Selecione o Cliente:</label>
                <select
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    className={styles.inputField}
                >
                    <option value="">Selecione um cliente</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Selecione o Prato:</label>
                <select
                    value={selectedDishId}
                    onChange={(e) => setSelectedDishId(e.target.value)}
                    className={styles.inputField}
                >
                    <option value="">Selecione um prato</option>
                    {dishes.map((dish) => (
                        <option key={dish.id} value={dish.id}>
                            {dish.nome} - R${dish.valor.toFixed(2)}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleUsePoints} className={styles.btnUsePoints}>
                Usar Pontos
            </button>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default UsePoints;
