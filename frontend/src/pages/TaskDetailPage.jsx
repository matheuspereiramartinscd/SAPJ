import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    FaHome,
    FaTasks,
    FaUser,
    FaChartLine,
    FaRegFileAlt,
    FaHandshake,
    FaFileInvoiceDollar,
    FaArrowLeft,
    FaEdit,
    FaPhoneAlt,
    FaFileAlt as FaFileAltIcon,
} from 'react-icons/fa';
import axios from 'axios';
import styles from './TaskDetailPage.module.css';
import { FaSearch } from 'react-icons/fa';

function TaskDetailPage() {
    const navigate = useNavigate();
    const { taskId } = useParams(); // Obtém o ID da tarefa pela URL
    const [task, setTask] = useState(null);

    // Carrega os detalhes da tarefa
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/tasks/${taskId}/`)
            .then((response) => {
                setTask(response.data);
            })
            .catch((error) => {
                console.error('Erro ao carregar os dados da tarefa:', error);
            });
    }, [taskId]);

    const handleGoBack = () => {
        navigate('/tasks'); // Volta para a lista de tarefas
    };

    const handleEditTask = () => {
        navigate(`/tasks/edit/${taskId}`); // Navega para a página de edição da tarefa
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!task) {
        return <div>Carregando...</div>;
    }

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
                <header className={styles.pageHeader}>
                    <h1>Detalhes da Tarefa</h1>
                </header>
                <div className={styles.contentBox}>
                    <div className={styles.detailsWrapper}>
                        <div className={styles.detailsSection}>
                            <h2>Informações da Tarefa</h2>
                            <p><strong>Título:</strong> {task.titulo}</p>
                            <p><strong>Processo:</strong> {task.processo}</p>
                            <p><strong>Data de Conclusão:</strong> {task.data_conclusao}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                            <p><strong>Descrição:</strong> {task.descricao}</p>
                            <p><strong>Valor Total do Processo:</strong> R$ {task.valor_total_processo}</p>
                            <p><strong>Valor do Advogado:</strong> R$ {task.valor_advogado}</p>
                            <p><strong>Pessoas Envolvidas</strong>  <ul>
                                {task.pessoas.map((personId) => (
                                    <li key={personId}>Pessoa ID: {personId}</li>
                                ))}
                            </ul></p>
                        </div>


                    </div>

                    <div className={styles.actions}>
                        <button onClick={handleGoBack} className={styles.backButton}>
                            <FaArrowLeft /> Voltar
                        </button>
                        <button onClick={handleEditTask} className={styles.editButton}>
                            <FaEdit /> Editar
                        </button>
                    </div>
                </div>
            </main>
        </div>


    );
}

export default TaskDetailPage;
