import React from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';

function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
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
                    <div className={styles.cardsContainer}>
                        <div className={`${styles.card} ${styles.homeCard}`}>
                            <FaHome className={styles.cardIcon} />
                            <h3>Home</h3>
                            <p>Visão geral do sistema.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                        <div className={`${styles.card} ${styles.casosCard}`}>
                            <FaRegFileAlt className={styles.cardIcon} />
                            <h3>Casos</h3>
                            <p>Gerenciar casos pendentes.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                        <div className={`${styles.card} ${styles.tarefasCard}`}>
                            <FaTasks className={styles.cardIcon} />
                            <h3>Tarefas</h3>
                            <p>Acompanhe suas tarefas diárias.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                        <div className={`${styles.card} ${styles.dashboardCard}`}>
                            <FaChartLine className={styles.cardIcon} />
                            <h3>Dashboard</h3>
                            <p>Relatórios e gráficos do sistema.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                        <div className={`${styles.card} ${styles.usuarioCard}`}>
                            <FaUser className={styles.cardIcon} />
                            <h3>Pessoas</h3>
                            <p>Gerenciar informações do usuário.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                        <div className={`${styles.card} ${styles.automacaoCard}`}>
                            <FaHandshake className={styles.cardIcon} style={{ fontSize: '1000px' }} />
                            <h3>Automação</h3>
                            <p>Configurações de automação de processos.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                        <div className={`${styles.card} ${styles.pagamentosCard}`}>
                            <FaFileInvoiceDollar className={styles.cardIcon} />
                            <h3>Pagamentos</h3>
                            <p>Gerenciar pagamentos e transações.</p>
                            <button className={styles.cardButton}>Entrar</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HomePage;
