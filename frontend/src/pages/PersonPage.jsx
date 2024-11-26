import React, { useState } from 'react';
import styles from './PersonPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaCogs, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PersonPage() {
    const [isFisica, setIsFisica] = useState(false);
    const [isJuridica, setIsJuridica] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remover o token do localStorage e redirecionar para a página de login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelectFisica = (e) => {
        setIsFisica(e.target.checked);
    };

    const handleSelectJuridica = (e) => {
        setIsJuridica(e.target.checked);
    };

    return (
        <div className={styles.homeContainer}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf8cfc4bab45b308fd4e0ac7bc915d27628c057eafc8bc12295629c46bb755ba?apiKey=6dd5f1c07ca94a1fb6a78e1e56b45e51&"
                        alt="Company Logo"
                        className={styles.logo}
                    />
                    <div className={styles.logoText}>
                        <div className={styles.sapjText}>SAPJ</div>
                        <div className={styles.lawSoftwareText}>Law Software</div>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <button className={styles.editButton}>Editar</button>
                    <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
                    <div className={styles.userInfo}>
                        <FaUser className={styles.userIcon} />
                        <span>Usuário</span>
                    </div>
                    <FaPhoneAlt className={styles.contactIcon} />
                </div>
            </header>

            {/* Main Layout */}
            <div className={styles.mainLayout}>
                {/* Sidebar */}
                <nav className={styles.sidebar}>
                    <div className={styles.sidebarIcon}>
                        <FaHome className={styles.icon} />
                        <span>Home</span>
                    </div>
                    <div className={styles.sidebarIcon}>
                        <FaRegFileAlt className={styles.icon} />
                        <span>Casos</span>
                    </div>
                    <div className={styles.sidebarIcon}>
                        <FaTasks className={styles.icon} />
                        <span>Tarefas</span>
                    </div>
                    <div className={styles.sidebarIcon}>
                        <FaChartLine className={styles.icon} />
                        <span>Dashboard</span>
                    </div>
                    <div className={styles.sidebarIcon}>
                        <FaUser className={styles.icon} />
                        <span>Usuário</span>
                    </div>
                    <div className={styles.sidebarIcon}>
                        <FaHandshake className={styles.icon} />
                        <span>Automação</span>
                    </div>
                    <div className={styles.sidebarIcon}>
                        <FaFileInvoiceDollar className={styles.icon} />
                        <span>Pagamentos</span>
                    </div>
                </nav>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Gestão de Pessoas</h1>
                    </header>

                    {/* Top Section: Botões à esquerda e filtros à direita */}
                    <div className={styles.topSection}>
                        <div className={styles.buttonContainer}>
                            <button className={styles.addButton}>Cadastrar Pessoa</button>
                            <button className={styles.reportButton}>Gerar Relatório</button>
                        </div>

                        <div className={styles.filters}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isFisica}
                                    onChange={handleSelectFisica}
                                />
                                Física
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isJuridica}
                                    onChange={handleSelectJuridica}
                                />
                                Jurídica
                            </label>
                        </div>
                    </div>

                    {/* Tabela */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome/Razão Social</th>
                                <th>Tipo</th>
                                <th>Contato</th>
                                <th>Cidade/UF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Exemplo de linha de dados */}
                            <tr>
                                <td>001</td>
                                <td>João Silva</td>
                                <td>Física</td>
                                <td>(11) 1234-5678</td>
                                <td>São Paulo/SP</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Empresa X Ltda.</td>
                                <td>Jurídica</td>
                                <td>(21) 9876-5432</td>
                                <td>Rio de Janeiro/RJ</td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default PersonPage;
