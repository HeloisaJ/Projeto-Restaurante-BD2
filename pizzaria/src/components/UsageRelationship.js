import React, { useEffect, useState } from "react";
import styles from "../styles/UsageRelationship.module.css";

function UsageRelationship() {
    const [usos, setUsos] = useState([]);
    const [pratos, setPratos] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
        const fetchUsos = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/usos");
                const data = await response.json();
                setUsos(data);
            } catch (error) {
                console.error("Erro ao buscar dados de usos:", error);
            }
        };

        const fetchPratos = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/prato");
                const data = await response.json();
                setPratos(data);
            } catch (error) {
                console.error("Erro ao buscar dados de pratos:", error);
            }
        };

        const fetchIngredientes = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/ingredientes",
                );
                const data = await response.json();
                setIngredientes(data);
            } catch (error) {
                console.error("Erro ao buscar dados de ingredientes:", error);
            }
        };

        fetchUsos();
        fetchPratos();
        fetchIngredientes();
    }, []);

    const getNomePrato = (idPrato) => {
        const prato = pratos.find((prato) => prato.id === idPrato);
        return prato ? prato.nome : "Prato não encontrado";
    };

    const getNomeIngrediente = (idIngrediente) => {
        const ingrediente = ingredientes.find(
            (ingrediente) => ingrediente.id === idIngrediente,
        );
        return ingrediente ? ingrediente.nome : "Ingrediente não encontrado";
    };

    return (
        <div className={styles.usageContainer}>
            <h1 className={styles.title}>Relacionamento de Usos</h1>
            <table className={styles.usageTable}>
                <thead>
                    <tr>
                        <th>Prato</th>
                        <th>Ingrediente</th>
                    </tr>
                </thead>
                <tbody>
                    {usos.map((uso) => (
                        <tr key={`${uso.id_prato}-${uso.id_ingrediente}`}>
                            <td>{getNomePrato(uso.id_prato)}</td>
                            <td>{getNomeIngrediente(uso.id_ingrediente)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsageRelationship;
