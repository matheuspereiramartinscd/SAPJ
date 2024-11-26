import React, { useState } from 'react';
import styles from './ProcessPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaDownload, FaTrash, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function DocumentManagementPage() {
    const [documents, setDocuments] = useState([
        {
            code: '001',
            name: 'Documento Exemplo 1',
            extension: '.pdf',
            creationDate: '2024-11-26',
            description: 'Exemplo de documento',
        },
        {
            code: '002',
            name: 'Documento Exemplo 2',
            extension: '.docx',
            creationDate: '2024-11-25',
            description: 'Outro exemplo de documento',
        }
    ]);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remover o token do localStorage e redirecionar para a página de login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleUploadDocument = () => {
        // Lógica para o upload de documentos (a ser implementada)
        console.log('Upload de documento');
    };

    const handleDownload = (doc) => {
        // Lógica para o download de documentos (a ser implementada)
        console.log(`Baixar: ${doc.name}`);
    };

    const handleDelete = (docCode) => {
        // Deletar documento
        setDocuments(documents.filter(doc => doc.code !== docCode));
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
                        <h1>Gestão de Documentos</h1>
                    </header>

                    {/* Top Section: Botões à esquerda */}
                    <div className={styles.topSection}>
                        <div className={styles.buttonContainer}>
                            <button onClick={handleUploadDocument} className={styles.uploadButton}>
                                <FaUpload /> Upload de Documento
                            </button>
                        </div>
                    </div>

                    {/* Tabela */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Extensão</th>
                                <th>Data de Criação</th>
                                <th>Descrição</th>
                                <th>Download</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc.code}>
                                    <td>{doc.code}</td>
                                    <td>{doc.name}</td>
                                    <td>{doc.extension}</td>
                                    <td>{doc.creationDate}</td>
                                    <td>{doc.description}</td>
                                    <td>
                                        <button onClick={() => handleDownload(doc)} className={styles.downloadButton}>
                                            <FaDownload />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(doc.code)} className={styles.deleteButton}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default DocumentManagementPage;
