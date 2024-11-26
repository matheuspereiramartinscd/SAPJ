import React from 'react';
import styles from './UserRegistrationForm.module.css';
import axios from 'axios';
export const UserRegistrationForm = () => {


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
        } catch (error) {
            console.error(error.response.data);
            alert('Erro ao cadastrar usuário!');
        }
    };


    return (
        <main className={styles.container}>
            {/* Header da página */}

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
                        {/* Campo: Nome completo */}
                        <div className={styles.formField}>

                            <input
                                id="fullName"
                                type="text"
                                className={styles.input}
                                placeholder="Insira seu nome..."
                            />
                        </div>
                        <label htmlFor="login">Login *</label>
                        {/* Campo: Login */}
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
                        {/* Campo: CPF */}
                        <div className={styles.formField}>

                            <input
                                id="cpf"
                                type="text"
                                className={styles.input}
                                placeholder="Insira seu cpf..."
                            />
                        </div>
                        <label htmlFor="birthDate">Nascimento</label>
                        {/* Campo: Data de nascimento */}
                        <div className={styles.formField}>

                            <input
                                id="birthDate"
                                type="date"
                                className={styles.input}
                            />
                        </div>
                        <label htmlFor="password">Senha *</label>
                        {/* Campo: Senha */}
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
