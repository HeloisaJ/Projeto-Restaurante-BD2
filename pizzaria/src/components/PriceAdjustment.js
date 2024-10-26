// src/components/PriceAdjustment.js

import React, { useState } from 'react';
import styles from '../styles/PriceAdjustment.module.css';

function PriceAdjustment() {
    const [percentual, setPercentual] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/adjust-prices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ percentual: parseFloat(percentual) })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setPercentual('');
            } else {
                setMessage(data.error || 'Erro ao reajustar preços.');
            }
        } catch (error) {
            console.error("Erro:", error);
            setMessage('Erro ao realizar o reajuste.');
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
                <button type="submit" className={styles.btnAdjust}>Reajustar Preços</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default PriceAdjustment;
