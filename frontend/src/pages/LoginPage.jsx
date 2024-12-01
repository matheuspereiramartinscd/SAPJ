import React, { useState } from "react";
import styles from './LoginPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado para indicar carregamento
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Indica início do carregamento
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                login,
                password,
            });

            // Ajuste conforme a resposta do backend
            const { token, user } = response.data; // Supondo que 'user' contém os detalhes do usuário
            const userName = user?.name || 'Usuário'; // Verifica se 'name' existe, senão usa um fallback

            // Salva o token e o nome do usuário no localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);

            // Redireciona para a página inicial
            navigate('/home');
        } catch (err) {
            // Define mensagem de erro apropriada
            if (err.response && err.response.status === 400) {
                setError('Credenciais inválidas. Verifique o login e a senha.');
            } else {
                setError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false); // Indica fim do carregamento
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
                    Sistema de Automação de Processos Jurídicos - &copy; Criado por Matheus Pereira Martins - 2024
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
                        <label htmlFor="login">Login</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Email ou nome de usuário"
                            aria-label="Login"
                            aria-describedby="loginHelp"
                        />
                        <small id="loginHelp" className={styles.helperText}>
                            Insira seu e-mail ou nome de usuário.
                        </small>
                    </div>

                    <div className={styles.inputField}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="***********"
                            aria-label="Senha"
                            aria-describedby="passwordHelp"
                        />
                        <small id="passwordHelp" className={styles.helperText}>
                            Insira sua senha.
                        </small>
                    </div>

                    {error && <p className={styles.errorText}>{error}</p>}

                    {loading && <p className={styles.loadingText}>Carregando...</p>} {/* Indicador de carregamento */}

                    <a href="#" className={styles.forgotPassword}>
                        Esqueceu sua senha?
                    </a>

                    <button type="submit" className={styles.loginButton} disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className={styles.signupPrompt}>
                    <p className={styles.signupText}>
                        Não possui conta?
                        <a
                            href="#"
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
