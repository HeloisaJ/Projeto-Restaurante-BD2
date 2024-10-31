import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AuthForm.module.css'; // Ajuste o caminho se necessário

function AuthForm() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Aqui você pode adicionar lógica de autenticação se necessário
        navigate('/dashboard'); // Redireciona para a dashboard
    };

    return (
        <div className={styles.authContainer}>
            <h1 className={styles.title}>Pizzaria do JayJay</h1>
            <h2 className={styles.subtitle}>Login</h2>
            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Nome de Usuário ou Email</label>
                    <input id="username" type="text" className={styles.inputField} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" className={styles.inputField} />
                </div>
                <button className={styles.btnSignin} onClick={handleLogin}>Entrar</button>
                <div className={styles.divider}>
                    <p className={styles.newAccount}>Novo por aqui? <a href="#" className={styles.link}>Crie uma conta</a></p>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
