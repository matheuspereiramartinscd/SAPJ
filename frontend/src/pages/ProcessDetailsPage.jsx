import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importação do axios
import styles from './ProcessDetailsPage.module.css';
import { FaEdit, FaArchive, FaTrashAlt, FaFileUpload, FaArrowLeft, FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function ProcessDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();  // Pega o ID do processo pela URL
    const [processo, setProcesso] = useState(null);
    const [annotations, setAnnotations] = useState('');
    const [savedAnnotations, setSavedAnnotations] = useState('');

    // Função que chama a API para carregar os detalhes do processo
    useEffect(() => {
        axios.get(`http://localhost:8000/api/processes/details/${id}/`)  // Substitua pela URL da sua API
            .then(response => {
                setProcesso(response.data);  // Armazena os dados do processo na variável de estado
                setAnnotations(response.data.anotacoes || '');  // Caso haja anotações, já carrega
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do processo:', error);
            });
    }, [id]);

    const handleChangeAnnotations = (e) => {
        setAnnotations(e.target.value);
    };

    const handleSaveAnnotations = () => {
        setSavedAnnotations(annotations);
        console.log('Anotações enviadas:', annotations);
    };

    const handleAttachFiles = () => {
        console.log('Anexando arquivos...');
    };

    const handleGoBack = () => {
        navigate('/processpage');  // Navega de volta para a página de processos
    };

    const handleEditProcess = () => {
        // Navega para a página de edição do processo
        navigate(`/process/edit/${id}/`);
    };


    // Função para arquivar o processo
    const handleArchiveProcess = () => {
        const updatedProcess = { ...processo, status: 'Arquivado' };

        // Envia a requisição para a API para atualizar o status do processo
        axios.put(`http://localhost:8000/api/processes/details/${id}/`, updatedProcess)
            .then(response => {
                setProcesso(response.data);  // Atualiza o processo com o status "Arquivado"
                alert('Processo arquivado com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao arquivar o processo:', error);
                alert('Erro ao arquivar o processo.');
            });
    };

    if (!processo) {
        return <div>Carregando...</div>;  // Exibe "Carregando..." enquanto os dados não estão disponíveis
    }

    return (
        <div className={styles.processDetailsContainer}>
            {/* Header e Sidebar - Copiados de ProcessPage */}
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
                        <h1>Detalhes do Processo</h1>
                    </header>

                    {/* Caixa em volta do conteúdo principal */}
                    <div className={styles.contentBox}>
                        {/* Dados do Processo */}
                        <div className={styles.detailsWrapper}>
                            <div className={styles.processDataSection}>
                                <div className={styles.detailsSection}>
                                    <h2>Dados do Processo</h2>
                                    <p><strong>ID:</strong> {processo.id}</p>
                                    <p><strong>Cliente:</strong> {processo.cliente}</p>
                                    <p><strong>Número Atual:</strong> {processo.numeroAtual}</p>
                                    <p><strong>Número Original:</strong> {processo.numeroOriginal}</p>
                                    <p><strong>Procedimento:</strong> {processo.procedimento}</p>
                                    <p><strong>Tribunal:</strong> {processo.tribunal}</p>
                                    <p><strong>Foro:</strong> {processo.foro}</p>
                                    <p><strong>Comarca:</strong> {processo.comarca}</p>
                                    <p><strong>Vara:</strong> {processo.vara}</p>
                                    <p><strong>Pastas Ativas:</strong> {processo.pastasAtivas}</p>
                                    <p><strong>Pastas Arquivadas:</strong> {processo.pastasArquivadas}</p>
                                    <p><strong>Honorários:</strong> {processo.honorarios}</p>
                                    <p><strong>Porcentagem:</strong> {processo.porcentagem}</p>
                                    <p><strong>Valor da Causa:</strong> {processo.valorCausa}</p>
                                </div>
                            </div>

                            <div className={styles.statusDataSection}>
                                <div className={styles.statusSection}>
                                    <h2>Status</h2>
                                    <p><strong>Status:</strong> {processo.status}</p>
                                    <p><strong>Desfecho:</strong> {processo.desfecho}</p>
                                    <p><strong>Resultado do Recurso:</strong> {processo.resultadoRecurso}</p>
                                    <p><strong>Último Evento:</strong> {processo.ultimoEvento}</p>
                                    <p><strong>Últimos Andamentos:</strong> {processo.ultimosAndamentos}</p>
                                </div>
                            </div>

                            <div className={styles.notesSection}>
                                <div className={styles.attachmentsSection}>
                                    <h2>Anexos</h2>
                                    <button onClick={handleAttachFiles} className={styles.uploadButton}>
                                        <FaFileUpload /> Anexar Arquivos
                                    </button>
                                    <div className={styles.notesWrapper}>
                                        <h2>Anotações</h2>
                                        <textarea
                                            value={annotations}
                                            onChange={handleChangeAnnotations}
                                            placeholder="Facilite sua rotina com o SAPJ: Adicione suas anotações"
                                            className={styles.textArea}
                                        />
                                        <button onClick={handleSaveAnnotations} className={styles.saveButton}>
                                            Salvar Anotações
                                        </button>
                                        {savedAnnotations && (
                                            <div className={styles.savedAnnotations}>
                                                <h3>Anotações Salvas:</h3>
                                                <p>{savedAnnotations}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ações do Processo */}
                        <div className={styles.actions}>
                            <button onClick={handleGoBack} className={styles.backButton}>
                                <FaArrowLeft /> Voltar
                            </button>
                            <button onClick={handleEditProcess} className={styles.editButton}><FaEdit /> Editar</button>


                            <button className={styles.deleteButton}><FaTrashAlt /> Excluir</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProcessDetailsPage;
