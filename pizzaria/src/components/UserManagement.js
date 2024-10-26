// src/components/UserManagement.js

import React, { useState, useEffect } from 'react';
import styles from '../styles/UserManagement.module.css';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name, role };

        if (editingUserId) {
            // Editar usuário
            fetch(`/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(users.map(user => (user.id === editingUserId ? data : user)));
                    setMessage('Usuário atualizado com sucesso!');
                    resetForm();
                });
        } else {
            // Criar novo usuário
            fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                    setUsers([...users, data]);
                    setMessage('Usuário criado com sucesso!');
                    resetForm();
                });
        }
    };

    const handleEdit = (user) => {
        setName(user.name);
        setRole(user.role);
        setEditingUserId(user.id);
    };

    const handleDelete = (userId) => {
        fetch(`/api/users/${userId}`, { method: 'DELETE' })
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
                setMessage('Usuário deletado com sucesso!');
            });
    };

    const resetForm = () => {
        setName('');
        setRole('');
        setEditingUserId(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestão de Usuários</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do Usuário"
                    className={styles.inputField}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={styles.inputField}
                    required
                >
                    <option value="">Selecione o Cargo</option>
                    <option value="admin">Administrador</option>
                    <option value="manager">Gerente</option>
                    <option value="employee">Funcionário</option>
                </select>
                <button type="submit" className={styles.btnSubmit}>
                    {editingUserId ? 'Atualizar Usuário' : 'Criar Usuário'}
                </button>
                <button type="button" onClick={resetForm} className={styles.btnReset}>
                    Cancelar
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            <h2>Lista de Usuários</h2>
            <ul className={styles.userList}>
                {users.map(user => (
                    <li key={user.id} className={styles.userItem}>
                        {user.name} - {user.role}
                        <button onClick={() => handleEdit(user)} className={styles.btnEdit}>Editar</button>
                        <button onClick={() => handleDelete(user.id)} className={styles.btnDelete}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;
