import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaRegFileAlt,
    FaTasks,
    FaChartLine,
    FaUser,
    FaHandshake,
    FaFileInvoiceDollar,
    FaPhoneAlt,
    FaFileAlt as FaFileAltIcon,
    FaSearch,
} from 'react-icons/fa';

function HomePage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Recupera o nome do usuário do localStorage
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName'); // Remove o nome do usuário no logout
        navigate('/');
    };

    return (
        <div className={styles.homeContainer}>
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

                    <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
                    <div className={styles.userInfo}>


                    </div>

                </div>
            </header>


            {/* Main Layout */}
            <div className={styles.mainLayout}>
                {/* Sidebar */}
                <nav className={styles.sidebar}>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/home')}>
                        <FaHome className={styles.icon} />
                        <span>Home</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/processpage')}>
                        <FaRegFileAlt className={styles.icon} />
                        <span>Casos</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/tasks')}>
                        <FaTasks className={styles.icon} />
                        <span>Tarefas</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/dashboard')}>
                        <FaChartLine className={styles.icon} />
                        <span>Dashboard</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/personpage')}>
                        <FaUser className={styles.icon} />
                        <span>Pessoas</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/automation')}>
                        <FaHandshake className={styles.icon} />
                        <span>Automação</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/payments')}>
                        <FaFileInvoiceDollar className={styles.icon} />
                        <span>Pagamentos</span>
                    </div>
                    {/* Novo ícone de Consultas na sidebar */}
                    <div className={styles.sidebarIcon} onClick={() => navigate('/search')}>
                        <FaSearch className={styles.icon} />
                        <span>Consultas</span>
                    </div>
                    {/* Novo ícone de Documentos na sidebar */}
                    <div className={styles.sidebarIcon} onClick={() => navigate('/documents')}>
                        <FaFileAltIcon className={styles.icon} />
                        <span>Documentos</span>
                    </div>
                </nav>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <div className={styles.cardsContainer}>
                        <div className={`${styles.card} ${styles.homeCard}`} onClick={() => navigate('/home')}>
                            <FaHome className={styles.cardIcon} />
                            <h3>Home</h3>
                            <p>Visão geral do sistema.</p>
                        </div>
                        <div className={`${styles.card} ${styles.casosCard}`} onClick={() => navigate('/processpage')}>
                            <FaRegFileAlt className={styles.cardIcon} />
                            <h3>Casos</h3>
                            <p>Gerenciar casos pendentes.</p>
                        </div>
                        <div className={`${styles.card} ${styles.tarefasCard}`} onClick={() => navigate('/tasks')}>
                            <FaTasks className={styles.cardIcon} />
                            <h3>Tarefas</h3>
                            <p>Acompanhe suas tarefas diárias.</p>
                        </div>
                        <div className={`${styles.card} ${styles.dashboardCard}`} onClick={() => navigate('/dashboard')}>
                            <FaChartLine className={styles.cardIcon} />
                            <h3>Dashboard</h3>
                            <p>Relatórios e gráficos do sistema.</p>
                        </div>
                        <div className={`${styles.card} ${styles.usuarioCard}`} onClick={() => navigate('/personpage')}>
                            <FaUser className={styles.cardIcon} />
                            <h3>Pessoas</h3>
                            <p>Gerenciar informações do usuário.</p>
                        </div>
                        <div className={`${styles.card} ${styles.automacaoCard}`} onClick={() => navigate('/automation')}>
                            <FaHandshake className={styles.cardIcon} />
                            <h3>Automação</h3>
                            <p>Configurações de automação de processos.</p>
                        </div>
                        <div className={`${styles.card} ${styles.pagamentosCard}`} onClick={() => navigate('/payments')}>
                            <FaFileInvoiceDollar className={styles.cardIcon} />
                            <h3>Pagamentos</h3>
                            <p>Gerenciar pagamentos e transações.</p>
                        </div>
                        {/* Novo Card - Consultas */}
                        <div className={`${styles.card} ${styles.consultasCard}`} onClick={() => navigate('/search')}>
                            <FaSearch className={styles.cardIcon} />
                            <h3>Consultas</h3>
                            <p>Realizar consultas no sistema.</p>
                        </div>

                        {/* Novo Card - Documentos */}
                        <div className={`${styles.card} ${styles.documentosCard}`} onClick={() => navigate('/documents')}>
                            <FaFileAltIcon className={styles.cardIcon} />
                            <h3>Documentos</h3>
                            <p>Gerenciar documentos relacionados.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HomePage;
