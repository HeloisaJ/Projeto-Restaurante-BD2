// src/components/IngredientForm.js

import React, { useState } from 'react';
import styles from '../styles/IngredientForm.module.css';

function IngredientForm() {
    const [name, setName] = useState('');
    const [manufactureDate, setManufactureDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [observation, setObservation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const ingredient = {nome: name, data_fabricacao: manufactureDate, data_validade: expiryDate, quantidade: quantity, observacao: observation};
        console.log({ name, manufactureDate, expiryDate, quantity, observation });

        try{
            const response = await fetch('http://localhost:3001/api/ingrediente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });

            if(!response.ok){
                throw new Error("Failed to submit the ingredient data, try again later");
            }

            const postResult = await response.json();
            console.log("Response from server: ", postResult);
            alert("Ingredient added with success!");
        }
        catch(error){
            console.error("An error occurred while submitting the ingredient data:", error);
            alert("An error occurred while adding the ingredient");
        }
    };

    return (
        <div className={styles.ingredientContainer}>
            <h1 className={styles.title}>Cadastro de Ingredientes</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome do Ingrediente</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="manufactureDate">Data de Fabricação</label>
                    <input
                        type="date"
                        id="manufactureDate"
                        value={manufactureDate}
                        onChange={(e) => setManufactureDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="expiryDate">Data de Validade</label>
                    <input
                        type="date"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="quantity">Quantidade</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="observation">Observação</label>
                    <input
                        type="text"
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.btnSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}

export default IngredientForm;
