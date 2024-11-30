import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentRegisterPage.module.css';
import { FaRegFileAlt, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import { FaHome, FaTasks, FaUser, FaChartLine } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

function PaymentRegisterPage() {
    const [taskData, setTaskData] = useState({
        titulo: '',
        processo: '',
        pessoas: [],
        data_conclusao: '',
        status: 'pendente',
        descricao: '',
        valor_total_processo: '', // Novo campo
        valor_advogado: '', // Novo campo
    });

    const [processList, setProcessList] = useState([]);
    const [peopleList, setPeopleList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcesses = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/processes/list/');
                const data = await response.json();
                setProcessList(data);
            } catch (error) {
                console.error('Erro ao carregar processos', error);
            }
        };

        const fetchPeople = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/people/list/');
                const data = await response.json();
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handlePeopleChange = (e) => {
        const { options } = e.target;
        const selectedPeople = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => parseInt(option.value));

        setTaskData((prevData) => ({
            ...prevData,
            pessoas: selectedPeople,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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



                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Cadastrar Tarefa</h1>
                    </header>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.taskForm}>
                            {/* Título */}
                            <label>
                                Título:
                                <input
                                    type="text"
                                    name="titulo"
                                    value={taskData.titulo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Processo */}
                            <label>
                                Processo:
                                <select
                                    name="processo"
                                    value={taskData.processo}
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

                            {/* Pessoas */}
                            <label>Pessoas:</label>
                            <select
                                name="pessoas"
                                value={taskData.pessoas}
                                onChange={handlePeopleChange}
                                multiple
                                size={5}
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
                                    name="data_conclusao"
                                    value={taskData.data_conclusao}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Valor Total do Processo */}
                            <label>
                                Valor Total do Processo:
                                <input
                                    type="number"
                                    name="valor_total_processo"
                                    value={taskData.valor_total_processo}
                                    onChange={handleChange}
                                    step="0.01"
                                    placeholder="Ex: 1000.00"
                                    required
                                />
                            </label>

                            {/* Valor do Advogado */}
                            <label>
                                Valor do Advogado:
                                <input
                                    type="number"
                                    name="valor_advogado"
                                    value={taskData.valor_advogado}
                                    onChange={handleChange}
                                    step="0.01"
                                    placeholder="Ex: 300.00"
                                    required
                                />
                            </label>

                            {/* Descrição */}
                            <label>
                                Descrição:
                                <textarea
                                    name="descricao"
                                    value={taskData.descricao}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </label>

                            {/* Botões */}
                            <button type="submit" className={styles.submitButton}>
                                Cadastrar Tarefa
                            </button>
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

export default PaymentRegisterPage;
