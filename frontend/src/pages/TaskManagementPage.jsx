import React, { useState, useEffect } from 'react';
import styles from './TaskManagementPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt as FaFileAltIcon } from 'react-icons/fa';

function TaskManagementPage() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    // Fetch tasks from the backend API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tasks/');
                const data = await response.json();
                console.log('Tasks:', data); // Check if tasks are fetched properly
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Delete task by ID
    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTasks(tasks.filter((task) => task.id !== id)); // Update local state to reflect deletion
                alert('Tarefa excluída com sucesso!');
            } else {
                const errorData = await response.json();
                console.error('Erro ao excluir tarefa:', errorData);
                throw new Error('Erro ao excluir tarefa');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // Navigate to the task creation page
    const handleAddTask = () => {
        navigate('/taskregister');
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
                        <h1>Gestão de Tarefas</h1>
                    </header>

                    {/* Task Columns */}
                    <div className={styles.taskColumns}>
                        {['pendente', 'em andamento', 'concluída'].map((status, index) => (
                            <div key={index} className={styles.taskColumn}>
                                <h2>
                                    <FaClock /> {status === 'pendente' ? 'Pendente' : status === 'em andamento' ? 'Em andamento' : 'Concluída'}
                                </h2>
                                <div className={styles.taskColumnContent}>
                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((task) => (
                                            <div key={task.id} className={styles.taskCard}>
                                                <h3>{task.titulo}</h3> {/* Use task.titulo instead of task.name */}
                                                <p><strong>Processo:</strong> {task.processo}</p>
                                                <p><strong>Pessoas:</strong> {task.pessoas.join(', ')}</p>
                                                <p>
                                                    <strong>Criado em:</strong> {task.data_criacao || 'N/A'} |{' '}
                                                    <strong>Conclusão:</strong> {task.data_conclusao}
                                                </p>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className={styles.deleteButton}
                                                >
                                                    <FaTrash /> Excluir
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Único botão para criar tarefa */}
                    <div className={styles.createTaskButtonContainer}>
                        <button onClick={handleAddTask} className={styles.addButton}>
                            <FaPlus /> Criar Tarefa
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TaskManagementPage;
