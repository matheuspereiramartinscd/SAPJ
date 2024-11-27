import React, { useState, useEffect } from 'react';
import styles from './ProcessPage.module.css';
import {
    FaHome,
    FaRegFileAlt,
    FaTasks,
    FaChartLine,
    FaUser,
    FaHandshake,
    FaFileInvoiceDollar,
    FaPhoneAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProcessPage() {
    const [processes, setProcesses] = useState([]); // Armazenar os processos
    const [isArchived, setIsArchived] = useState(false);
    const [isOngoing, setIsOngoing] = useState(false);
    const navigate = useNavigate();

    // Buscar os processos da API com base nos filtros
    useEffect(() => {
        const fetchProcesses = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const filters = {
                archived: isArchived,
                ongoing: isOngoing,
            };

            try {
                const response = await fetch('http://localhost:8000/api/processes/list/', {  // Nova URL para lista de processos
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProcesses(data);
                } else {
                    alert('Erro ao buscar processos');
                }
            } catch (error) {
                console.error('Erro ao buscar processos:', error);
            }
        };

        fetchProcesses();
    }, [isArchived, isOngoing, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelectArchived = (e) => {
        setIsArchived(e.target.checked);
    };

    const handleSelectOngoing = (e) => {
        setIsOngoing(e.target.checked);
    };

    const handleEdit = (id) => {
        console.log(`Editar processo com ID: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/processes/${id}/`, {
                method: 'DELETE',  // Certifique-se de que o método é 'DELETE'
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Processo excluído com sucesso');
                // Atualiza a lista de processos removendo o processo excluído diretamente do estado
                setProcesses((prevProcesses) =>
                    prevProcesses.filter((process) => process.id !== id)
                );
            } else {
                alert('Erro ao excluir processo');
            }
        } catch (error) {
            console.error('Erro ao excluir processo:', error);
        }
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
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Sair
                    </button>
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

                    {/* Tabela de Processos */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Número</th>
                                <th>Tipo</th>
                                <th>Ação do Processo</th>
                                <th>Comarca</th>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.length > 0 ? (
                                processes.map((process) => (
                                    <tr key={process.id}>
                                        <td>{process.codigo}</td>
                                        <td>{process.numero}</td>
                                        <td>{process.tipo}</td>
                                        <td>{process.acao}</td>
                                        <td>{process.comarca}</td>
                                        <td>{process.cliente}</td>
                                        <td>{process.status}</td>
                                        <td>
                                            <button
                                                className={styles.editButton}
                                                onClick={() => handleEdit(process.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(process.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Nenhum processo encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default ProcessPage;
