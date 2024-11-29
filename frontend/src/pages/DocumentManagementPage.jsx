import React, { useState, useEffect } from 'react';
import styles from './DocumentManagementPage.module.css';
import { FaUpload, FaDownload, FaTrash, FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function DocumentManagementPage() {
    const [documents, setDocuments] = useState([]);
    const [newDocument, setNewDocument] = useState({ file: null, description: '' });
    const navigate = useNavigate();

    // Função para carregar documentos
    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await fetch('http://localhost:8000/api/documents/');
            const data = await response.json();
            setDocuments(data);
        };

        fetchDocuments();
    }, []);

    // Função para fazer o upload de documentos
    const handleUploadDocument = async () => {
        if (!newDocument.file) {
            alert('Por favor, selecione um arquivo!');
            return;
        }

        const formData = new FormData();
        formData.append('file', newDocument.file);  // Certifique-se de que o campo é 'file'
        formData.append('description', newDocument.description);
        formData.append('code', `doc-${new Date().getTime()}`);

        try {
            const response = await fetch('http://localhost:8000/api/documents/', {
                method: 'POST',
                body: formData,  // Envia os dados com FormData
            });

            if (response.ok) {
                const newDoc = await response.json();
                setDocuments([...documents, newDoc]);  // Adiciona o novo documento à lista
                alert('Documento carregado com sucesso!');
            } else {
                alert('Erro ao carregar o documento. Verifique os dados.');
            }
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            alert('Erro inesperado ao tentar enviar o documento.');
        }
    };

    // Função para fazer o download de um documento
    const handleDownload = (doc) => {
        const fileUrl = doc.file.startsWith('http') ? doc.file : `http://localhost:8000${doc.file}`;
        window.location.href = fileUrl;  // Baixar o arquivo
    };


    // Função para excluir um documento
    const handleDelete = async (docId) => {
        const response = await fetch(`http://localhost:8000/api/documents/${docId}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setDocuments(documents.filter(doc => doc.id !== docId));
            alert('Documento excluído com sucesso!');
        } else {
            alert('Erro ao excluir o documento.');
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
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
                    <h1>Gestão de Documentos</h1>

                    {/* Upload de Documento */}
                    <div className={styles.uploadSection}>
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setNewDocument({ ...newDocument, file });
                                } else {
                                    alert('Nenhum arquivo selecionado.');
                                }
                            }}
                        />
                        <textarea
                            placeholder="Descrição do documento"
                            value={newDocument.description}
                            onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                        />
                        <button onClick={handleUploadDocument} className={styles.uploadButton}>
                            <FaUpload /> Upload de Documento
                        </button>
                    </div>

                    {/* Lista de Documentos */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Extensão</th>
                                <th>Data de Criação</th>
                                <th>Descrição</th>
                                <th>Download</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc.id}>
                                    <td>{doc.id}</td>
                                    <td>{doc.name}</td>
                                    <td>{doc.file.split('.').pop()}</td> {/* Extensão do arquivo */}
                                    <td>{doc.created_at}</td> {/* Data de Criação */}
                                    <td>{doc.description}</td>
                                    <td>
                                        <button onClick={() => handleDownload(doc)} className={styles.downloadButton}>
                                            <FaDownload />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(doc.id)} className={styles.deleteButton}>
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
