import React, { useState, useEffect } from 'react';
import styles from './TaskManagementPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt as FaFileAltIcon } from 'react-icons/fa';

function TaskManagementPage() {
    const [tasks, setTasks] = useState([]);
    const [peopleDetails, setPeopleDetails] = useState([]); // Para armazenar os detalhes das pessoas
    const [processDetails, setProcessDetails] = useState([]); // Para armazenar os detalhes dos processos
    const navigate = useNavigate();

    // Fetch tasks from the backend API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/tasks/');
                const tasksData = await response.json();
                setTasks(tasksData);
                fetchProcessAndPeopleDetails(tasksData); // Fetch process and people details after tasks are fetched
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        fetchTasks();
    }, []);

    // Fetch process and people details based on task data
    const fetchProcessAndPeopleDetails = async (tasks) => {
        try {
            // Fetch process details
            const processIds = [...new Set(tasks.map((task) => task.processo))]; // Evitar duplicação dos IDs dos processos
            const processRequests = processIds.map((id) =>
                fetch(`http://localhost:8000/api/processes/details/${id}`).then((res) => res.json())
            );
            const processes = await Promise.all(processRequests);
            setProcessDetails(processes);

            // Fetch people details
            const peopleIds = tasks.flatMap((task) => task.pessoas); // Flatten the array of people IDs
            const uniquePeopleIds = [...new Set(peopleIds)]; // Garantir que não hajam duplicatas
            const peopleRequests = uniquePeopleIds.map((id) =>
                fetch(`http://localhost:8000/api/pessoas/${id}`).then((res) => res.json())
            );
            const people = await Promise.all(peopleRequests);
            setPeopleDetails(people);
        } catch (error) {
            console.error('Erro ao buscar detalhes do processo ou pessoas:', error);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Delete task by ID
    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTasks(tasks.filter((task) => task.id !== id)); // Atualiza o estado local para refletir a exclusão
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Only return the date part (YYYY-MM-DD)
    };

    // Navigate to the task creation page
    const handleAddTask = () => {
        navigate('/taskregister');
    };

    // Find the process details by process ID
    const getProcessDetails = (processId) => {
        const process = processDetails.find((process) => process.id === processId);
        return process ? `${process.codigo} - ${process.numero} - ${process.tipo}` : 'Dados do processo não disponíveis';
    };

    // Get people's names by IDs
    const getPeopleNames = (peopleIds) => {
        const peopleNames = peopleIds.map((id) => {
            const person = peopleDetails.find((person) => person.id === id);
            return person ? person.nome : null;
        }).filter(name => name !== null);

        return peopleNames.length > 0 ? peopleNames.join(', ') : 'Nenhuma pessoa associada';
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
                        {/* Pendente Column */}
                        <div className={styles.taskColumn}>
                            <h2>
                                <FaClock /> Pendente
                            </h2>
                            <div className={styles.taskColumnContent}>
                                {tasks
                                    .filter((task) => task.status === 'pendente')
                                    .map((task) => (
                                        <div key={task.id} className={styles.taskCard}>
                                            <h3>{task.titulo}</h3>
                                            <p><strong>Processo:</strong> {getProcessDetails(task.processo)}</p>
                                            <p><strong>Pessoas:</strong> {getPeopleNames(task.pessoas)}</p>
                                            <p>
                                                <strong>Criado em:</strong> {formatDate(task.criado_em)} |{' '}

                                            </p>
                                            <p><strong>Conclusão:</strong> {task.data_conclusao}</p>
                                            <div className={styles.buttonContainer}>
                                                <button
                                                    onClick={() => navigate(`/taskdetails/${task.id}`)}
                                                    className={styles.detailsButton}
                                                >
                                                    Ver Detalhes
                                                </button>

                                            </div>
                                            <div className={styles.buttonContainer}>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className={styles.deleteButton}
                                                >
                                                    <FaTrash /> Excluir
                                                </button>
                                            </div>
                                        </div>

                                    ))}
                            </div>
                        </div>

                        {/* Em andamento Column */}
                        <div className={styles.taskColumn}>
                            <h2>
                                <FaClock /> Em andamento
                            </h2>
                            <div className={styles.taskColumnContent}>
                                {tasks
                                    .filter((task) => task.status === 'em_andamento')
                                    .map((task) => (
                                        <div key={task.id} className={styles.taskCard}>
                                            <h3>{task.titulo}</h3>
                                            <p><strong>Processo:</strong> {getProcessDetails(task.processo)}</p>
                                            <p><strong>Pessoas:</strong> {getPeopleNames(task.pessoas)}</p>
                                            <p>
                                                <strong>Criado em:</strong> {formatDate(task.criado_em)} |{' '}
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

                        {/* Concluída Column */}
                        <div className={styles.taskColumn}>
                            <h2>
                                <FaClock /> Concluída
                            </h2>
                            <div className={styles.taskColumnContent}>
                                {tasks
                                    .filter((task) => task.status === 'concluida')
                                    .map((task) => (
                                        <div key={task.id} className={styles.taskCard}>
                                            <h3>{task.titulo}</h3>
                                            <p><strong>Processo:</strong> {getProcessDetails(task.processo)}</p>
                                            <p><strong>Pessoas:</strong> {getPeopleNames(task.pessoas)}</p>
                                            <p>
                                                <strong>Criado em:</strong> {formatDate(task.criado_em)} |{' '}
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
