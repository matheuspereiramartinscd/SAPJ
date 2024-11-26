import React, { useState } from 'react';
import styles from './ProcessDetailsPage.module.css';
import { FaEdit, FaArchive, FaTrashAlt, FaFileUpload, FaArrowLeft, FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProcessDetailsPage() {
    const navigate = useNavigate();
    const [annotations, setAnnotations] = useState('');
    const [savedAnnotations, setSavedAnnotations] = useState('');

    const handleChangeAnnotations = (e) => {
        setAnnotations(e.target.value);
    };

    const handleSaveAnnotations = () => {
        // Simular envio de anotações
        setSavedAnnotations(annotations);
        console.log('Anotações enviadas:', annotations);
    };

    const handleEdit = () => {
        console.log('Editando processo...');
    };

    const handleArchive = () => {
        console.log('Arquivando processo...');
    };

    const handleDelete = () => {
        console.log('Excluindo processo...');
    };

    const handleAttachFiles = () => {
        console.log('Anexando arquivos...');
    };

    const handleGoBack = () => {
        navigate('/processpage');
    };

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
                                    <p><strong>ID:</strong> 001</p>
                                    <p><strong>Cliente:</strong> João Silva</p>
                                    <p><strong>Número Atual:</strong> 12345</p>
                                    <p><strong>Número Original:</strong> 54321</p>
                                    <p><strong>Procedimento:</strong> Ação de Cobrança</p>
                                    <p><strong>Tribunal:</strong> Tribunal de Justiça</p>
                                    <p><strong>Foro:</strong> Foro de São Paulo</p>
                                    <p><strong>Comarca:</strong> São Paulo</p>
                                    <p><strong>Vara:</strong> 3ª Vara Cível</p>
                                    <p><strong>Pastas Ativas:</strong> 5</p>
                                    <p><strong>Pastas Arquivadas:</strong> 2</p>
                                    <p><strong>Honorários:</strong> R$ 2.000,00</p>
                                    <p><strong>Porcentagem:</strong> 10%</p>
                                    <p><strong>Valor da Causa:</strong> R$ 50.000,00</p>
                                </div>
                            </div>

                            <div className={styles.statusDataSection}>
                                <div className={styles.statusSection}>
                                    <h2>Status</h2>
                                    <p><strong>Status:</strong> Em andamento</p>
                                    <p><strong>Desfecho:</strong> Pendente</p>
                                    <p><strong>Resultado do Recurso:</strong> Aguardando julgamento</p>
                                    <p><strong>Último Evento:</strong> Audiência agendada para 01/12/2024</p>
                                    <p><strong>Últimos Andamentos:</strong> Documento enviado ao juiz</p>
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
                            <button onClick={handleEdit} className={styles.editButton}><FaEdit /> Editar</button>
                            <button onClick={handleArchive} className={styles.archiveButton}><FaArchive /> Arquivar Processo</button>
                            <button onClick={handleDelete} className={styles.deleteButton}><FaTrashAlt /> Excluir</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProcessDetailsPage;
