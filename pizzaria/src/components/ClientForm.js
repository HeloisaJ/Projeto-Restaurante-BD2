// src/components/ClientForm.js

import React, { useState } from 'react';
import styles from '../styles/ClientForm.module.css';

function ClientForm() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('m');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [points, setPoints] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newClient = { name, gender, age, birthDate, points };
    
        try {
            const response = await fetch('http://localhost:3001/api/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the client data, try again later');
            }

            const postResult = await response.json();
            console.log('Response from server: ', postResult);
            alert('Client added successfully!');
            
            // Reset the form after successful submission
            setName('');
            setGender('m');
            setAge('');
            setBirthDate('');
            setPoints(0);
        } 
        catch (error) {
            console.error('An error occurred while submitting the client data:', error);
            alert('An error occurred while adding the client');
        }
    };

    return (
        <div className={styles.clientContainer}>
            <h1 className={styles.title}>Cadastro de Clientes</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="gender">Sexo</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="m">Masculino</option>
                        <option value="f">Feminino</option>
                        <option value="o">Outro</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Idade</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthDate">Data de Nascimento</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="points">Pontos</label>
                    <input
                        type="number"
                        id="points"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        disabled
                    />
                </div>
                <button type="submit" className={styles.btnSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}

export default ClientForm;
