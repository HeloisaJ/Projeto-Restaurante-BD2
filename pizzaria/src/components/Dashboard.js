// src/components/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.title}>Dashboard</h1>
            <button onClick={() => navigate('/dish-form')} className={styles.optionButton}>Cadastrar Prato</button>
            <button onClick={() => navigate('/supplier-form')} className={styles.optionButton}>Cadastrar Fornecedor</button>
            <button onClick={() => navigate('/ingredient-form')} className={styles.optionButton}>Cadastrar Ingrediente</button>
            <button onClick={() => navigate('/client-form')} className={styles.optionButton}>Cadastrar Cliente</button>
            <button onClick={() => navigate('/usage-relationship')} className={styles.optionButton}>Relacionamento de Usos</button>
            <button onClick={() => navigate('/sales')} className={styles.optionButton}>Vendas Realizadas</button>
            <button onClick={() => navigate('/reports')} className={styles.optionButton}>Relatórios e Estatísticas</button>
            <button onClick={() => navigate('/price-adjustment')} className={styles.optionButton}>Reajuste de Preços</button>
            <button onClick={() => navigate('/raffle')} className={styles.optionButton}>Sorteio de Clientes</button>
            <button onClick={() => navigate('/use-points')} className={styles.optionButton}>Uso de Pontos</button>
            <button onClick={() => navigate('/user-management')} className={styles.optionButton}>Gestão de Usuários</button> {/* Nova opção */}
        </div>
    );
}

export default Dashboard;
