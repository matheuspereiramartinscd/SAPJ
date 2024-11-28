import React, { useState } from 'react';
import styles from './TaskManagementPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt as FaFileAltIcon } from 'react-icons/fa';


function TaskManagementPage() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Revisar documentos',
            process: '12345 - Ação Trabalhista',
            people: ['João Silva', 'Maria Oliveira'],
            createdDate: '2024-11-20',
            dueDate: '2024-11-30',
            status: 'Pendente',
        },
        {
            id: 2,
            name: 'Preparar audiência',
            process: '67890 - Ação Civil',
            people: ['Ana Costa', 'Carlos Souza'],
            createdDate: '2024-11-18',
            dueDate: '2024-11-25',
            status: 'Em andamento',
        },
        {
            id: 3,
            name: 'Enviar documentação',
            process: '11223 - Ação Penal',
            people: ['Fernanda Lima'],
            createdDate: '2024-11-10',
            dueDate: '2024-11-15',
            status: 'Concluída',
        },
    ]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleAddTask = () => {
        // Função para adicionar nova tarefa (exemplo para implementar no futuro)
        alert('Adicionar nova tarefa');
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
                        {['Pendente', 'Em andamento', 'Concluída'].map((status, index) => (
                            <div key={index} className={styles.taskColumn}>
                                <h2>
                                    <FaClock /> {status}
                                </h2>
                                <div className={styles.taskColumnContent}>
                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((task) => (
                                            <div key={task.id} className={styles.taskCard}>
                                                <h3>{task.name}</h3>
                                                <p><strong>Processo:</strong> {task.process}</p>
                                                <p><strong>Pessoas:</strong> {task.people.join(', ')}</p>
                                                <p>
                                                    <strong>Criado em:</strong> {task.createdDate} |{' '}
                                                    <strong>Conclusão:</strong> {task.dueDate}
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
