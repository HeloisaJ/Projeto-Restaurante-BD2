import React, { useEffect, useState } from "react";
import styles from "../styles/UsageRelationship.module.css";

function UsageRelationship() {
    const [usos, setUsos] = useState([]);
    const [pratos, setPratos] = useState([]);

    useEffect(() => {
        const fetchUsos = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/usos"); // URL corrigida
                const data = await response.json();
                setUsos(data);
            } catch (error) {
                console.error("Erro ao buscar dados de usos:", error);
            }
        };

        const fetchPratos = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/prato"); // URL corrigida
                const data = await response.json();
                setPratos(data);
            } catch (error) {
                console.error("Erro ao buscar dados de usos:", error);
            }
        };

        fetchUsos();
        fetchPratos();
    }, []);

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
                            <td>{uso.nome_prato}</td>
                            <td>{uso.nome_ingrediente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsageRelationship;
