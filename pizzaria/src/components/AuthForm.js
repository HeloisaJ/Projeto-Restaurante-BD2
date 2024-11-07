import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AuthForm.module.css";

function AuthForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                navigate("/dashboard");
            } else {
                setError("Nome de usuário ou senha incorretos.");
            }
        } catch (error) {
            setError("Erro ao conectar ao servidor. Tente novamente.");
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <div className={styles.authContainer}>
            <h1 className={styles.title}>Pizzaria do JayJay</h1>
            <h2 className={styles.subtitle}>Login</h2>
            <div className={styles.formContainer}>
                {error && <p className={styles.errorText}>{error}</p>}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Nome de Usuário ou Email</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                </div>
                <button className={styles.btnSignin} onClick={handleLogin}>
                    Entrar
                </button>
            </div>
        </div>
    );
}

export default AuthForm;
//pepeu certifique-se de que o endpoint de login (/api/login) esteja preparado para receber 
//um POST com username e password, e que ele retorne um objeto JSON com success: 
//true em caso de sucesso ou uma mensagem de erro em caso de falha.