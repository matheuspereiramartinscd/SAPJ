import React, { useState } from 'react';
import styles from './ProcessPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaCogs, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProcessPage() {
    const [isArchived, setIsArchived] = useState(false);
    const [isOngoing, setIsOngoing] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remover o token do localStorage e redirecionar para a página de login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelectArchived = (e) => {
        setIsArchived(e.target.checked);
    };

    const handleSelectOngoing = (e) => {
        setIsOngoing(e.target.checked);
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
                        <h1>Gestão de Processos</h1>
                    </header>

                    {/* Top Section: Botões à esquerda e filtros à direita */}
                    <div className={styles.topSection}>
                        <div className={styles.buttonContainer}>
                            <button className={styles.addButton}>Cadastrar Processo</button>
                            <button className={styles.reportButton}>Gerar Relatório</button>
                        </div>

                        <div className={styles.filters}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isArchived}
                                    onChange={handleSelectArchived}
                                />
                                Arquivados
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isOngoing}
                                    onChange={handleSelectOngoing}
                                />
                                Em andamento
                            </label>
                        </div>
                    </div>

                    {/* Tabela */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Número</th>
                                <th>Tipos</th>
                                <th>Ação do Processo</th>
                                <th>Comarca</th>
                                <th>Cliente</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Exemplo de linha de dados */}
                            <tr>
                                <td>001</td>
                                <td>12345</td>
                                <td>Tipo 1</td>
                                <td>Ação Exemplo</td>
                                <td>Comarca X</td>
                                <td>Cliente Y</td>
                                <td>Em andamento</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>67890</td>
                                <td>Tipo 2</td>
                                <td>Ação Exemplo 2</td>
                                <td>Comarca Y</td>
                                <td>Cliente Z</td>
                                <td>Arquivado</td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default ProcessPage;
