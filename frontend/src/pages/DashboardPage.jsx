import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon, FaSearch } from 'react-icons/fa';

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
    const [advogados, setAdvogados] = useState([]); // Estado para armazenar dados dos advogados
    const [processData, setProcessData] = useState({
        totalProcesses: 0, // Inicializado com 0, pois o valor será obtido da API
        totalRevenue: 0, // Inicializado com 0, o valor será obtido da API
        processesByLawyer: [40, 30, 20, 30],
        revenueByLawyer: [150000, 120000, 80000, 50000],
        winLoseRatioByLawyer: [70, 80, 60, 50], // Exemplo de dados para a razão de vitórias/derrotas
        revenueWinLossByLawyer: [100000, 90000, 60000, 40000], // Exemplo de faturamento ganho/perdido
    });
    const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

    // Buscar dados dos advogados, processos, faturamento total e tarefas ao carregar a página
    useEffect(() => {
        const fetchAdvogados = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/people/list/');
                setAdvogados(response.data); // Atualiza os advogados com os dados da API
            } catch (error) {
                console.error('Erro ao buscar advogados:', error);
            }
        };

        const fetchProcessData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/processes/count/');
                setProcessData((prevData) => ({
                    ...prevData,
                    totalProcesses: response.data.total_processos, // Atualiza o total de processos
                }));
            } catch (error) {
                console.error('Erro ao buscar dados de processos:', error);
            }
        };

        const fetchTotalRevenue = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/total-faturamento/');
                setProcessData((prevData) => ({
                    ...prevData,
                    totalRevenue: response.data.total_faturamento, // Atualiza o faturamento total
                }));
            } catch (error) {
                console.error('Erro ao buscar total de faturamento:', error);
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tasks/'); // Supondo que a API de tarefas esteja em /api/tasks/
                setTasks(response.data); // Atualiza as tarefas com os dados da API
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        // Chama as funções de fetch
        fetchAdvogados();
        fetchProcessData();
        fetchTotalRevenue(); // Chama a função para buscar o faturamento total
        fetchTasks();
    }, []);

    // Função para calcular o faturamento total das tarefas concluídas
    const calculateCompletedTasksRevenue = () => {
        // Verifica se as tarefas estão definidas e se são um array
        if (!Array.isArray(tasks)) return 0;

        return tasks
            .filter((task) => task.status === 'concluida') // Filtra as tarefas concluídas
            .reduce((total, task) => {
                const valor = parseFloat(task.valor); // Converte o valor para número
                return isNaN(valor) ? total : total + valor; // Se o valor não for um número válido, ignora
            }, 0); // Começa a soma do faturamento com 0
    };

    // Exibindo o faturamento total na renderização
    const totalRevenue = processData.totalRevenue + calculateCompletedTasksRevenue();

    const handleLogout = () => {
        localStorage.removeItem('token');
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
                    <div className={styles.sidebarIcon} onClick={() => navigate('/search')}>
                        <FaSearch className={styles.icon} />
                        <span>Consultas</span>
                    </div>
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
                            <p>R$ {totalRevenue.toFixed(2)}</p> {/* Exibe o faturamento total com as tarefas concluídas */}
                        </div>
                    </div>

                    {/* Cards dos Advogados */}
                    <div className={styles.lawyerCards}>
                        {advogados.map((advogado, index) => (
                            <div className={styles.lawyerCard} key={advogado.id}>
                                <img
                                    src={`http://localhost:8000/${advogado.foto}`} // URL da imagem
                                    alt={advogado.nome}
                                />
                                <h3>{advogado.nome}</h3>
                            </div>
                        ))}
                    </div>

                    <div className={styles.charts}>
                        <div className={styles.chart}>
                            <h3>Processos por Advogado</h3>
                            <Bar
                                data={{
                                    labels: advogados.map(advogado => advogado.nome), // Usando os nomes dos advogados
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
                                    labels: advogados.map(advogado => advogado.nome), // Usando os nomes dos advogados
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
                                    labels: advogados.map(advogado => advogado.nome),
                                    datasets: [
                                        {
                                            label: 'Causas Ganhadas (%)',
                                            data: processData.winLoseRatioByLawyer,
                                            backgroundColor: '#27ae60',
                                        },
                                        {
                                            label: 'Causas Perdidas (%)',
                                            data: processData.revenueByLawyer, // Troquei para revenueByLawyer para corresponder aos dados
                                            backgroundColor: '#c0392b',
                                        }
                                    ],
                                }}
                            />
                        </div>

                        <div className={styles.chart}>
                            <h3>Faturamento Ganho vs Perdido</h3>
                            <Bar
                                data={{
                                    labels: advogados.map(advogado => advogado.nome),
                                    datasets: [
                                        {
                                            label: 'Faturamento Ganhado (R$)',
                                            data: processData.revenueWinLossByLawyer,
                                            backgroundColor: '#27ae60',
                                        },
                                        {
                                            label: 'Faturamento Perdido (R$)',
                                            data: processData.revenueByLawyer, // Usei revenueByLawyer como exemplo
                                            backgroundColor: '#c0392b',
                                        }
                                    ],
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
