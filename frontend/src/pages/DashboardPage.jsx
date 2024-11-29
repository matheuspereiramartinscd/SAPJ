import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa'; import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaSearch } from 'react-icons/fa';
// Registrar as escalas e outros componentes necessários
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardPage() {
    const navigate = useNavigate();
    const [processData, setProcessData] = useState({
        totalProcesses: 120,
        totalRevenue: 500000,
        processesByLawyer: [40, 30, 20, 30],
        revenueByLawyer: [150000, 120000, 80000, 50000],
        winLoseRatioByLawyer: [80, 70, 90, 60],
        revenueWinLossByLawyer: [200000, 150000, 100000, 50000],
    });

    useEffect(() => {
        setProcessData({
            totalProcesses: 120,
            totalRevenue: 500000,
            processesByLawyer: [40, 30, 20, 30],
            revenueByLawyer: [150000, 120000, 80000, 50000],
            winLoseRatioByLawyer: [80, 70, 90, 60],
            revenueWinLossByLawyer: [200000, 150000, 100000, 50000],
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
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

            <div className={styles.dash}>
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


                {/* Dashboard Content */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Dashboard</h1>
                    </header>

                    {/* Painel de Informações */}
                    <div className={styles.dashboardPanel}>
                        <div className={styles.card}>
                            <h2>Total de Processos</h2>
                            <p>{processData.totalProcesses}</p>
                        </div>
                        <div className={styles.card}>
                            <h2>Faturamento Total</h2>
                            <p>R$ {processData.totalRevenue}</p>
                        </div>
                    </div>

                    {/* Cards dos Advogados */}
                    <div className={styles.lawyerCards}>
                        {['Advogado 1', 'Advogado 2', 'Advogado 3', 'Advogado 4'].map((lawyer, index) => (
                            <div className={styles.lawyerCard} key={index}>
                                <img src={`https://randomuser.me/api/portraits/men/${index + 1}.jpg`} alt="Advogado" />
                                <h3>{lawyer}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Gráficos */}
                    <div className={styles.charts}>
                        <div className={styles.chart}>
                            <h3>Processos por Advogado</h3>
                            <Bar
                                data={{
                                    labels: ['Advogado 1', 'Advogado 2', 'Advogado 3', 'Advogado 4'],
                                    datasets: [{
                                        label: 'Número de Processos',
                                        data: processData.processesByLawyer,
                                        backgroundColor: '#e67e22',
                                    }],
                                }}
                            />
                        </div>

                        <div className={styles.chart}>
                            <h3>Faturamento por Advogado</h3>
                            <Bar
                                data={{
                                    labels: ['Advogado 1', 'Advogado 2', 'Advogado 3', 'Advogado 4'],
                                    datasets: [{
                                        label: 'Faturamento (R$)',
                                        data: processData.revenueByLawyer,
                                        backgroundColor: '#e67e22',
                                    }],
                                }}
                            />
                        </div>

                        <div className={styles.chart}>
                            <h3>Causas Ganhadas vs Perdidas</h3>
                            <Bar
                                data={{
                                    labels: ['Advogado 1', 'Advogado 2', 'Advogado 3', 'Advogado 4'],
                                    datasets: [{
                                        label: 'Causas Ganhadas (%)',
                                        data: processData.winLoseRatioByLawyer,
                                        backgroundColor: '#27ae60',
                                    }, {
                                        label: 'Causas Perdidas (%)',
                                        data: processData.winLoseRatioByLawyer.map(val => 100 - val),
                                        backgroundColor: '#c0392b',
                                    }],
                                }}
                            />
                        </div>

                        <div className={styles.chart}>
                            <h3>Faturamento Ganho vs Perdido</h3>
                            <Bar
                                data={{
                                    labels: ['Advogado 1', 'Advogado 2', 'Advogado 3', 'Advogado 4'],
                                    datasets: [{
                                        label: 'Faturamento Ganhado (R$)',
                                        data: processData.revenueWinLossByLawyer,
                                        backgroundColor: '#27ae60',
                                    }, {
                                        label: 'Faturamento Perdido (R$)',
                                        data: processData.revenueWinLossByLawyer.map(val => processData.totalRevenue - val),
                                        backgroundColor: '#c0392b',
                                    }],
                                }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;
