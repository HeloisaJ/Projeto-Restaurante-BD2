import React from 'react';
import styles from '../styles/DishForm.module.css';

function DishForm() {
    return (
        <div className={styles.dishFormContainer}>
            <h1>Cadastrar Prato</h1>
            <form id = "dishForm">
                <div className={styles.formGroup}>
                    <label htmlFor="dishName">Nome do Prato</label>
                    <input id="dishName" type="text" className={styles.inputField} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Descrição</label>
                    <textarea id="description" className={styles.inputField}></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Preço</label>
                    <input id="price" type="number" className={styles.inputField} />
                </div>
                <button className={styles.btnSubmit} type = "submit">Cadastrar</button>
            </form>

            <script src = "../connect_to_backend/DishForm"></script>
        </div>
    );
}

export default DishForm;
