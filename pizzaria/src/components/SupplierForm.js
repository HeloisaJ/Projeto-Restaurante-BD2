// src/components/SupplierForm.js

import React, { useState } from 'react';
import styles from '../styles/SupplierForm.module.css';

function SupplierForm() {
    const [name, setName] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const supplier = {nome: name, estado_origem: state};
        console.log({ name, state });

        try{
            const response = await fetch('http://localhost:3001/api/fornecedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplier),
            });

            if(!response.ok){
                throw new Error("Failed to submit the suplier data, try again later");
            }

            const postResult = await response.json();
            console.log("Response from server: ", postResult);
            alert("Supplier added with success!");
        } 
        catch(error){
            console.error("An error occurred while submitting the supplier data:", error);
            alert("An error occurred while adding the supplier");
        }
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
