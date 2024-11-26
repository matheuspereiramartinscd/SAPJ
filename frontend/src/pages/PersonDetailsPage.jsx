import React, { useState } from 'react';
import styles from './PersonDetailsPage.module.css';
import {
    FaEdit, FaTrashAlt, FaFileUpload, FaArrowLeft, FaHome, FaRegFileAlt, FaTasks,
    FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PersonDetailsPage() {
    const navigate = useNavigate();
    const [annotations, setAnnotations] = useState('');
    const [savedAnnotations, setSavedAnnotations] = useState('');

    const handleChangeAnnotations = (e) => setAnnotations(e.target.value);
    const handleSaveAnnotations = () => {
        setSavedAnnotations(annotations);
        console.log('Anotações enviadas:', annotations);
    };

    const handleEdit = () => console.log('Editando dados da pessoa...');
    const handleDelete = () => console.log('Excluindo dados da pessoa...');
    const handleAttachFiles = () => console.log('Anexando arquivos...');
    const handleGoBack = () => navigate('/peoplepage');

    return (
        <div className={styles.personDetailsContainer}>
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

            <div className={styles.mainLayout}>
                {/* Sidebar */}
                <nav className={styles.sidebar}>
                    <div className={styles.sidebarIcon}><FaHome className={styles.icon} /><span>Home</span></div>
                    <div className={styles.sidebarIcon}><FaRegFileAlt className={styles.icon} /><span>Casos</span></div>
                    <div className={styles.sidebarIcon}><FaTasks className={styles.icon} /><span>Tarefas</span></div>
                    <div className={styles.sidebarIcon}><FaChartLine className={styles.icon} /><span>Dashboard</span></div>
                    <div className={styles.sidebarIcon}><FaUser className={styles.icon} /><span>Usuário</span></div>
                    <div className={styles.sidebarIcon}><FaHandshake className={styles.icon} /><span>Automação</span></div>
                    <div className={styles.sidebarIcon}><FaFileInvoiceDollar className={styles.icon} /><span>Pagamentos</span></div>
                </nav>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Detalhes da Pessoa</h1>
                    </header>

                    <div className={styles.contentBox}>
                        {/* Dados da Pessoa */}
                        <div className={styles.detailsWrapper}>
                            <div className={styles.personDataSection}>
                                <div className={styles.detailsSection}>
                                    <h2>Dados do Usuário</h2>
                                    <img
                                        src="https://www.example.com/user-photo.jpg"
                                        alt="Foto do Usuário"
                                        className={styles.userPhoto}
                                    />
                                    <p><strong>ID:</strong> 001</p>
                                    <p><strong>CPF:</strong> 123.456.789-00</p>
                                    <p><strong>RG:</strong> 12.345.678-9</p>
                                    <p><strong>Telefone:</strong> (11) 98765-4321</p>
                                    <p><strong>Email:</strong> joao.silva@email.com</p>
                                    <p><strong>Cidade/UF:</strong> São Paulo/SP</p>
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


                        {/* Ações */}
                        <div className={styles.actions}>
                            <button onClick={handleGoBack} className={styles.backButton}><FaArrowLeft /> Voltar</button>
                            <button onClick={handleEdit} className={styles.editButton}><FaEdit /> Editar</button>
                            <button onClick={handleDelete} className={styles.deleteButton}><FaTrashAlt /> Excluir</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PersonDetailsPage;
