import React, { useState, useEffect } from 'react';
import styles from './ProcessPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

function ProcessPage() {
    const [processes, setProcesses] = useState([]); // Armazenar os processos
    const [filteredProcesses, setFilteredProcesses] = useState([]); // Armazenar processos filtrados
    const [isArchived, setIsArchived] = useState(false);
    const [isOngoing, setIsOngoing] = useState(false);
    const navigate = useNavigate();

    // Buscar os processos da API
    useEffect(() => {
        const fetchProcesses = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/processes/list/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProcesses(data);
                    setFilteredProcesses(data); // Inicializa a lista filtrada com todos os processos
                } else {
                    alert('Erro ao buscar processos');
                }
            } catch (error) {
                console.error('Erro ao buscar processos:', error);
            }
        };

        fetchProcesses();
    }, []);

    // Filtros para processos arquivados ou em andamento
    useEffect(() => {
        let filtered = processes;

        if (isArchived && isOngoing) {
            // Mostrar apenas processos que estão arquivados ou em andamento
            filtered = processes.filter(
                (process) => process.status === 'Arquivado' || process.status === 'Em andamento'
            );
        } else if (isArchived) {
            // Mostrar apenas processos arquivados
            filtered = processes.filter((process) => process.status === 'Arquivado');
        } else if (isOngoing) {
            // Mostrar apenas processos em andamento
            filtered = processes.filter((process) => process.status === 'Em andamento');
        }

        setFilteredProcesses(filtered);
    }, [isArchived, isOngoing, processes]); // Atualiza os filtros sempre que mudar

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
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
                method: 'DELETE',
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
                setFilteredProcesses((prevProcesses) =>
                    prevProcesses.filter((process) => process.id !== id)
                );
            } else {
                alert('Erro ao excluir processo');
            }
        } catch (error) {
            console.error('Erro ao excluir processo:', error);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/processdetails/${id}`);
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
                    {/* Novo ícone de Documentos na sidebar */}
                    <div className={styles.sidebarIcon} onClick={() => navigate('/documents')}>
                        <FaFileAltIcon className={styles.icon} />
                        <span>Documentos</span>
                    </div>
                </nav>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Gestão de Processos</h1>
                    </header>

                    <div className={styles.topSection}>
                        <div className={styles.buttonContainer}>
                            <button onClick={() => navigate('/processregister')} className={styles.addButton}>Cadastrar Processo</button>

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
                            {filteredProcesses.length > 0 ? (
                                filteredProcesses.map((process) => (
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
                                                className={styles.logoutButton}
                                                onClick={() => handleViewDetails(process.id)}
                                            >
                                                Detalhes
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
