import React, { useState } from "react";
import styles from './LoginPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [login, setLogin] = useState('');  // Use 'login' em vez de 'email'
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Envia o 'login' (que pode ser email ou nome de usuário) e 'password'
            const response = await axios.post('http://localhost:8000/api/token/', {
                username: login,  // 'login' pode ser email ou nome de usuário
                password,
            });

            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.access);

            // Redireciona para a página /home
            navigate('/home');
        } catch (err) {
            setError('Credenciais inválidas');
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/registration');
    };

    return (
        <main className={styles.loginContainer}>
            {/* Faixa preta com o título da página */}
            <div className={styles.pageTitleContainer}>
                <h1 className={styles.pageTitle}>
                    Sistema de Automação de Processos Jurídicos com IA
                </h1>
            </div>

            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8de09df5cd71e5a77b2610f7b96db56d62ec29effe8d422d63105ff79014a307?apiKey=6dd5f1c07ca94a1fb6a78e1e56b45e51&"
                className={styles.backgroundImage}
                alt="Background"
            />

            <section className={styles.loginFormContainer}>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/86ab5ce7b797c61145a72ab5b56780f68a0a5132d69ff3c41990bd6c8c69b121?apiKey=6dd5f1c07ca94a1fb6a78e1e56b45e51&"
                    className={styles.backgroundImage}
                    alt="Form background"
                />

                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf8cfc4bab45b308fd4e0ac7bc915d27628c057eafc8bc12295629c46bb755ba?apiKey=6dd5f1c07ca94a1fb6a78e1e56b45e51&"
                    className={styles.logoImage}
                    alt="Company Logo"
                />

                <h2 className={styles.loginTitle}>Iniciar sessão</h2>

                <p className={styles.loginSubtitle}>
                    Faça login com o seu e-mail ou nome de usuário
                </p>

                <form onSubmit={handleLogin}>
                    <div className={styles.inputField}>
                        <label htmlFor="login" className={styles['visually-hidden']}>Login</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Email ou nome de usuário"
                            aria-label="Login"
                        />
                    </div>

                    <div className={styles.inputField}>
                        <label htmlFor="password" className={styles['visually-hidden']}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="***********"
                            aria-label="Password"
                        />
                    </div>

                    {error && <p className={styles.errorText}>{error}</p>}

                    <a href="#" className={styles.forgotPassword}>
                        Esqueceu sua senha?
                    </a>

                    <button type="submit" className={styles.loginButton}>
                        Entrar
                    </button>
                </form>

                <div className={styles.signupPrompt}>
                    <p className={styles.signupText}>
                        Não possui conta?
                        <a
                            href=""
                            className={styles.signupLink}
                            onClick={handleSignUpRedirect}
                        >
                            Cadastre-se!
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;
