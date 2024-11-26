import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaCogs, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import styles from './ProcessRegisterPage.module.css';

function ProcessRegisterPage() {
    const [processData, setProcessData] = useState({
        codigo: '',
        numero: '',
        tipo: '',
        acao: '',
        comarca: '',
        cliente: '',
        status: 'Em andamento', // Default status
    });

    const navigate = useNavigate();

    // Atualiza o estado do processo conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProcessData({
            ...processData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar os dados do processo para a API de cadastro
            const response = await fetch('http://localhost:8000/api/processes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(processData),
            });

            if (response.ok) {
                alert('Processo cadastrado com sucesso!');
                navigate('/process'); // Redireciona para a página de processos
            } else {
                throw new Error('Erro ao cadastrar o processo');
            }
        } catch (error) {
            alert(error.message);
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
                    <button className={styles.logoutButton}>Sair</button>
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
                        <h1>Cadastrar Processo</h1>
                    </header>

                    {/* Formulário de cadastro */}
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.processForm}>
                            <label>
                                Código:
                                <input
                                    type="text"
                                    name="codigo"
                                    value={processData.codigo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Número:
                                <input
                                    type="text"
                                    name="numero"
                                    value={processData.numero}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Tipo:
                                <input
                                    type="text"
                                    name="tipo"
                                    value={processData.tipo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Ação do Processo:
                                <input
                                    type="text"
                                    name="acao"
                                    value={processData.acao}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Comarca:
                                <input
                                    type="text"
                                    name="comarca"
                                    value={processData.comarca}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Cliente:
                                <input
                                    type="text"
                                    name="cliente"
                                    value={processData.cliente}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={processData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Arquivado">Arquivado</option>
                                </select>
                            </label>

                            <button type="submit" className={styles.submitButton}>
                                Cadastrar Processo
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProcessRegisterPage;
