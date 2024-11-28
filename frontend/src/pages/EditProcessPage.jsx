import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams para pegar o ID do processo

import styles from './EditProcessPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';




function EditProcessPage() {
    const [processData, setProcessData] = useState({
        codigo: '',
        numero: '',
        tipo: '',
        acao: '',
        comarca: '',
        cliente: '',
        tribunal: '',
        foro: '',
        vara: '',
        honorarios: '',
        porcentagem: '',
        valorCausa: '',
        status: 'Em andamento',
        desfecho: '',
        resultadoRecurso: '',
        ultimoEvento: '',
        ultimosAndamentos: '',
        anotacoes: '',
    });

    const { id } = useParams();  // Obter o ID do processo a partir da URL
    const navigate = useNavigate();

    // Carregar os dados do processo ao montar o componente
    useEffect(() => {
        const fetchProcessData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/processes/details/${id}/`);
                const data = await response.json();
                setProcessData(data);  // Preencher os dados no estado com a resposta da API
            } catch (error) {
                console.error('Erro ao carregar dados do processo:', error);
            }
        };

        if (id) {
            fetchProcessData();  // Buscar os dados do processo ao carregar o componente
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProcessData({
            ...processData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Garantir que campos opcionais não estejam vazios
        const processedData = {
            ...processData,
            desfecho: processData.desfecho || '',
            resultadoRecurso: processData.resultadoRecurso || '',
            ultimoEvento: processData.ultimoEvento || '',
            ultimosAndamentos: processData.ultimosAndamentos || '',
            anotacoes: processData.anotacoes || '',
        };

        try {
            const response = await fetch(`http://localhost:8000/api/processes/edit/${id}/`, {  // URL com ID
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(processedData),
            });

            if (response.ok) {
                alert('Processo atualizado com sucesso!');
                navigate('/processpage');  // Redireciona para a página de processos
            } else {
                throw new Error('Erro ao atualizar o processo');
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
                    <button className={styles.logoutButton}>Sair</button>
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
                    {/* Novo ícone de Documentos na sidebar */}
                    <div className={styles.sidebarIcon} onClick={() => navigate('/documents')}>
                        <FaFileAltIcon className={styles.icon} />
                        <span>Documentos</span>
                    </div>
                </nav>

                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Editar Processo</h1>
                    </header>

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
                                Tribunal:
                                <input
                                    type="text"
                                    name="tribunal"
                                    value={processData.tribunal}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Foro:
                                <input
                                    type="text"
                                    name="foro"
                                    value={processData.foro}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Vara:
                                <input
                                    type="text"
                                    name="vara"
                                    value={processData.vara}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Honorários:
                                <input
                                    type="text"
                                    name="honorarios"
                                    value={processData.honorarios}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Porcentagem:
                                <input
                                    type="text"
                                    name="porcentagem"
                                    value={processData.porcentagem}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Valor da Causa:
                                <input
                                    type="text"
                                    name="valorCausa"
                                    value={processData.valorCausa}
                                    onChange={handleChange}
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
                            <label>
                                Desfecho:
                                <input
                                    type="text"
                                    name="desfecho"
                                    value={processData.desfecho}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Resultado Recurso:
                                <input
                                    type="text"
                                    name="resultadoRecurso"
                                    value={processData.resultadoRecurso}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Último Evento:
                                <input
                                    type="text"
                                    name="ultimoEvento"
                                    value={processData.ultimoEvento}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Últimos Andamentos:
                                <input
                                    type="text"
                                    name="ultimosAndamentos"
                                    value={processData.ultimosAndamentos}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Anotações:
                                <input
                                    type="text"
                                    name="anotacoes"
                                    value={processData.anotacoes}
                                    onChange={handleChange}
                                />
                            </label>




                            <button type="submit" className={styles.submitButton}>
                                Atualizar Processo
                            </button>

                            {/* Botão para voltar */}
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={() => navigate('/processpage')}
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

export default EditProcessPage;
