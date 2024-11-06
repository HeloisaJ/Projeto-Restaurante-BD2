import { useState, React } from "react";
import styles from "../styles/DishForm.module.css";

function DishForm() {
    const [dishName, setDishName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            dishName,
            description,
            price: parseFloat(price),
        };

        let m = "insert";
        let t = "prato";

        try {
            const response = await fetch("http://localhost:3001/dishes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(m, t, formData),
            });

            if (response.ok) {
                alert("Prato cadastrado com sucesso!");
            } else {
                alert("Erro ao cadastrar prato.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Erro ao enviar dados para o backend.");
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
                        onChange={(e) => setDishName(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        className={styles.inputField}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Preço</label>
                    <input
                        id="price"
                        type="number"
                        className={styles.inputField}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button className={styles.btnSubmit}>Cadastrar</button>
            </form>
        </div>
    );
}

export default DishForm;
