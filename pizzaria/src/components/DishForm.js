import React, { useState } from "react";
import styles from "../styles/DishForm.module.css";

function DishForm() {
    const [dishName, setDishName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDish = {
            nome: dishName,
            descricao: description,
            valor: price,
            disponibilidade: 1,
        };

        try {
            const response = await fetch("http://localhost:3001/api/prato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDish),
            });

            if (!response.ok) {
                throw new Error(
                    "Failed to submit the dish data, try again later",
                );
            }

            const postResult = await response.json();
            console.log("Response from server: ", postResult);
            alert("Dish added successfully!");

            // Reset the form after successful submission
            setDishName("");
            setDescription("");
            setPrice("");
        } catch (error) {
            console.error(
                "An error occurred while submitting the dish data:",
                error,
            );
            alert("An error occurred while adding the dish");
        }
    };

    return (
        <div className={styles.dishFormContainer}>
            <h1>Cadastrar Prato</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="dishName">Nome do Prato</label>
                    <input
                        id="dishName"
                        type="text"
                        className={styles.inputField}
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)} // Atualiza o estado conforme o usuário digita
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        className={styles.inputField}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Atualiza o estado conforme o usuário digita
                    ></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Preço</label>
                    <input
                        id="price"
                        type="number"
                        className={styles.inputField}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} // Atualiza o estado conforme o usuário digita
                    />
                </div>
                <button className={styles.btnSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}

export default DishForm;
