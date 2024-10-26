import React, { useState, useEffect } from 'react';
import styles from '../styles/IngredientManagement.module.css';

function IngredientManagement() {
    const [ingredients, setIngredients] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('/api/ingredients');
                if (!response.ok) throw new Error('Erro ao carregar ingredientes.');
                const data = await response.json();
                setIngredients(data);
            } catch (err) {
                setMessage(err.message);
            }
        };

        const fetchDishes = async () => {
            try {
                const response = await fetch('/api/dishes');
                if (!response.ok) throw new Error('Erro ao carregar pratos.');
                const data = await response.json();
                setDishes(data);
            } catch (err) {
                setMessage(err.message);
            }
        };

        fetchIngredients();
        fetchDishes();
    }, []);

    const checkExpiredIngredients = () => {
        const currentDate = new Date();
        const updatedDishes = dishes.map(dish => {
            const hasExpiredIngredient = dish.ingredients.some(ingredientId => {
                const ingredient = ingredients.find(ing => ing.id === ingredientId);
                return ingredient && new Date(ingredient.validade) < currentDate;
            });
            return { ...dish, available: !hasExpiredIngredient };
        });

        setDishes(updatedDishes);
        setMessage('Verificação de ingredientes concluída.');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestão de Ingredientes</h1>
            <button onClick={checkExpiredIngredients} className={styles.btnCheck}>
                Verificar Ingredientes Vencidos
            </button>
            {message && <p className={styles.message}>{message}</p>}
            <h2>Ingredientes</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Validade</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map(ingredient => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.nome}</td>
                            <td>{new Date(ingredient.validade).toLocaleDateString()}</td>
                            <td>
                                {new Date(ingredient.validade) < new Date() ? 'Vencido' : 'Válido'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Pratos</h2>
            <ul>
                {dishes.map(dish => (
                    <li key={dish.id}>
                        {dish.nome} - {dish.available ? 'Disponível' : 'Indisponível'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientManagement;
