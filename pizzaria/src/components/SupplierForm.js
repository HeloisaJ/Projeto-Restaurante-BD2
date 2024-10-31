// src/components/SupplierForm.js

import React, { useState } from 'react';
import styles from '../styles/SupplierForm.module.css';

function SupplierForm() {
    const [name, setName] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados ao servidor
        console.log({ name, state });
    };

    return (
        <div className={styles.supplierContainer}>
            <h1 className={styles.title}>Cadastro de Fornecedores</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome do Fornecedor</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="state">Estado de Origem</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.btnSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}

export default SupplierForm;
