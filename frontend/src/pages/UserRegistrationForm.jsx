import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import styles from './UserRegistrationForm.module.css';
import axios from 'axios';

export const UserRegistrationForm = () => {
    const navigate = useNavigate(); // Inicialize o hook para navegação

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            full_name: document.getElementById('fullName').value,
            login: document.getElementById('login').value,
            cpf: document.getElementById('cpf').value,
            birth_date: document.getElementById('birthDate').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/register/', userData);
            alert('Usuário cadastrado com sucesso!');
            console.log(response.data);
            navigate('/'); // Redirecione para a página padrão
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert('Erro ao cadastrar usuário!');
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.pageTitleContainer}>
                <h1 className={styles.pageTitle}>
                    Sistema de Automação de Processos Jurídicos com IA
                </h1>
            </div>

            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.formContent}>
                        <h1 className={styles.formTitle}>Cadastro de usuários</h1>
                        <label htmlFor="fullName">Nome completo</label>
                        <div className={styles.formField}>
                            <input
                                id="fullName"
                                type="text"
                                className={styles.input}
                                placeholder="Insira seu nome..."
                            />
                        </div>
                        <label htmlFor="login">Login *</label>
                        <div className={styles.formField}>
                            <input
                                id="login"
                                type="text"
                                required
                                className={styles.input}
                                placeholder="Insira seu login..."
                            />
                        </div>
                        <label htmlFor="cpf">CPF</label>
                        <div className={styles.formField}>
                            <input
                                id="cpf"
                                type="text"
                                className={styles.input}
                                placeholder="Insira seu cpf..."
                            />
                        </div>
                        <label htmlFor="birthDate">Nascimento</label>
                        <div className={styles.formField}>
                            <input
                                id="birthDate"
                                type="date"
                                className={styles.input}
                            />
                        </div>
                        <label htmlFor="password">Senha *</label>
                        <div className={styles.formField}>
                            <input
                                id="password"
                                type="password"
                                required
                                className={styles.input}
                                placeholder="Insira sua senha..."
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Salvar
                        </button>
                    </form>
                    <p className={styles.requiredNote}>
                        *: Campos obrigatórios
                    </p>
                </div>
            </div>
        </main>
    );
};

export default UserRegistrationForm;
