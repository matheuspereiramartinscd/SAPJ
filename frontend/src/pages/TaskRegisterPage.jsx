import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaTasks, FaUser, FaChartLine } from 'react-icons/fa';
import { FaRegFileAlt, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';

import styles from './TaskRegisterPage.module.css';

function TaskRegisterPage() {
    const [taskData, setTaskData] = useState({
        titulo: '', // Alterado de title para titulo
        processo: '', // Alterado de processId para processo
        pessoas: [], // Array de ids de pessoas selecionadas
        data_conclusao: '', // Alterado de dueDate para data_conclusao
        status: 'pendente', // Mantido o valor padrão como "pendente"
        descricao: '', // Novo campo para descrição
    });

    const [processList, setProcessList] = useState([]);
    const [peopleList, setPeopleList] = useState([]);

    const navigate = useNavigate();

    // Função para carregar os processos e pessoas disponíveis
    useEffect(() => {
        // Carregar os processos
        const fetchProcesses = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/processes/list/');
                const data = await response.json();
                console.log('Processes:', data); // Verifique se os dados estão sendo recebidos corretamente
                setProcessList(data);
            } catch (error) {
                console.error('Erro ao carregar processos', error);
            }
        };

        // Carregar as pessoas
        const fetchPeople = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/people/list/');
                const data = await response.json();
                console.log('People:', data); // Verifique se os dados estão sendo recebidos corretamente
                setPeopleList(data);
            } catch (error) {
                console.error('Erro ao carregar pessoas', error);
            }
        };

        fetchProcesses();
        fetchPeople();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handlePeopleChange = (e) => {
        const { options } = e.target;
        const selectedPeople = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => parseInt(option.value)); // Certifique-se de que os IDs das pessoas sejam números inteiros

        console.log("Estado de pessoas atualizado:", selectedPeople);

        setTaskData((prevData) => ({
            ...prevData,
            pessoas: selectedPeople, // Atualiza o estado com os IDs das pessoas selecionadas
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifique o formato dos dados antes de enviar
        console.log('Dados da tarefa:', taskData);

        try {
            const response = await fetch('http://localhost:8000/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                alert('Tarefa cadastrada com sucesso!');
                navigate('/tasks');
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar tarefa:', errorData);
                throw new Error('Erro ao cadastrar a tarefa');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.pageContainer}>
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
                    <div className={styles.sidebarIcon} onClick={() => navigate('/documents')}>
                        <FaFileAltIcon className={styles.icon} />
                        <span>Documentos</span>
                    </div>
                </nav>

                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Cadastrar Tarefa</h1>
                    </header>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.taskForm}>
                            <label>
                                Título:
                                <input
                                    type="text"
                                    name="titulo" // Alterado para "titulo"
                                    value={taskData.titulo} // Alterado para "titulo"
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Processo (Select) */}
                            <label>
                                Processo:
                                <select
                                    name="processo" // Alterado para "processo"
                                    value={taskData.processo} // Alterado para "processo"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione um processo</option>
                                    {processList.map((process) => (
                                        <option key={process.id} value={process.id}>
                                            {process.codigo} - {process.numero} - {process.tipo}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Pessoas (Select Multiple) */}
                            <label>Pessoas:</label>
                            <select
                                name="pessoas" // Alterado para "pessoas"
                                value={taskData.pessoas} // Alterado para "pessoas"
                                onChange={handlePeopleChange}
                                multiple // Permite selecionar várias opções
                                size={5} // Tamanho da lista, você pode ajustar conforme necessário
                            >
                                {peopleList.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.nome}
                                    </option>
                                ))}
                            </select>

                            {/* Data de Conclusão */}
                            <label>
                                Data de Conclusão:
                                <input
                                    type="date"
                                    name="data_conclusao" // Alterado para "data_conclusao"
                                    value={taskData.data_conclusao} // Alterado para "data_conclusao"
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Data de Criação (exibido automaticamente) */}
                            <label>
                                Data de Criação:
                                <input
                                    type="text"
                                    name="data_criacao"
                                    value={new Date().toLocaleDateString()} // Mostra a data atual
                                    disabled
                                />
                            </label>

                            {/* Descrição */}
                            <label>
                                Descrição:
                                <textarea
                                    name="descricao" // Novo campo para descrição
                                    value={taskData.descricao} // Novo campo para descrição
                                    onChange={handleChange}
                                    rows="4" // Ajuste o número de linhas conforme necessário
                                    required
                                />
                            </label>


                            <button type="submit" className={styles.submitButton}> Cadastrar Tarefa</button>
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={() => navigate('/tasks')}
                            >
                                Voltar
                            </button>

                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TaskRegisterPage;
