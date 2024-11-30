import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PersonDetailPage.module.css';
import {
    FaEdit,
    FaArrowLeft,
    FaHome,
    FaRegFileAlt,
    FaTasks,
    FaChartLine,
    FaUser,
    FaHandshake,
    FaFileInvoiceDollar,
    FaPhoneAlt,
    FaSearch,
    FaFileAlt as FaFileAltIcon
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function PersonDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtém o ID da pessoa pela URL
    const [person, setPerson] = useState(null);
    const [photo, setPhoto] = useState(null); // Armazena a URL da foto

    // Carrega os detalhes da pessoa
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/pessoas/${id}/`)
            .then(response => {
                setPerson(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados da pessoa:', error);
            });
    }, [id]);

    // Manipula o envio da foto


    // Navegar de volta
    const handleGoBack = () => {
        navigate('/personpage'); // Volta para a lista de pessoas
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Faz upload da foto para a URL com o ID da pessoa
            const response = await axios.post(`http://127.0.0.1:8000/api/pessoas/${id}/upload-photo/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.file_name) {
                // Atualiza a foto com a URL retornada do backend (supondo que o backend retorne a URL ou nome do arquivo)
                alert('Foto enviada com sucesso!');
                setPhoto(`http://127.0.0.1:8000/media/${response.data.file_name}`); // Atualiza o estado com a URL da foto
            } else {
                alert('Erro ao enviar a foto.');
            }
        } catch (error) {
            console.error('Erro ao enviar a foto:', error);
            alert('Erro ao enviar a foto.');
        }
    };





    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Logout e navega para a página inicial
    };

    const handleEditProcess = () => {
        navigate(`/pessoas/edit/${id}/`); // Navega para a página de edição do processo
    };

    if (!person) {
        return <div>Carregando...</div>; // Exibe "Carregando..." enquanto os dados não estão disponíveis
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
                    <div className={styles.sidebarIcon} onClick={() => navigate('/search')}>
                        <FaSearch className={styles.icon} />
                        <span>Consultas</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/documents')}>
                        <FaFileAltIcon className={styles.icon} />
                        <span>Documentos</span>
                    </div>
                </nav>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Detalhes da Pessoa</h1>
                    </header>

                    <div className={styles.contentBox}>
                        {/* Dados da Pessoa */}
                        <div className={styles.detailsWrapper}>
                            <div className={styles.detailsSection}>
                                <h2>Dados Pessoais</h2>
                                <p><strong>Nome:</strong> {person.nome}</p>
                                <p><strong>CPF:</strong> {person.cpf}</p>
                                <p><strong>RG:</strong> {person.rg}</p>
                                <p><strong>Telefone:</strong> {person.telefone}</p>
                                <p><strong>Email:</strong> {person.email}</p>
                                <p><strong>Cidade:</strong> {person.cidade}</p>
                                <p><strong>Estado:</strong> {person.estado}</p>
                                <p><strong>Tipo:</strong> {person.tipo}</p>
                            </div>

                            {/* Upload de Foto */}
                            <div className={styles.photoUpload}>
                                <h2>Foto</h2>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className={styles.photoInput}
                                />
                            </div>

                        </div>

                        {/* Ações */}
                        <div className={styles.actions}>
                            <button onClick={handleGoBack} className={styles.backButton}>
                                <FaArrowLeft /> Voltar
                            </button>
                            <button onClick={handleEditProcess} className={styles.editButton}><FaEdit /> Editar</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PersonDetailPage;
