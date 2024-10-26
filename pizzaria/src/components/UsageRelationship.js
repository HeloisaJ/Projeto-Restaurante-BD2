// src/components/UsageRelationship.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/UsageRelationship.module.css';

function UsageRelationship() {
    const [usos, setUsos] = useState([]);

    useEffect(() => {
        const fetchUsos = async () => {
            try {
                const response = await fetch('/api/usos'); // Ajuste a URL conforme necessário
                const data = await response.json();
                setUsos(data);
            } catch (error) {
                console.error("Erro ao buscar dados de usos:", error);
            }
        };

        fetchUsos();
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
