import React, { useState } from 'react';
import styles from './Notifications.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaCogs, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Notifications() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelectRecipient = (e) => {
        setRecipient(e.target.value);
    };

    const handleSelectSubject = (e) => {
        setSubject(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendNotification = () => {
        // Lógica para enviar a notificação
        console.log('Notificação enviada:', { recipient, subject, message });
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
                        <span>Usuário</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/automation')}>
                        <FaHandshake className={styles.icon} />
                        <span>Automação</span>
                    </div>
                    <div className={styles.sidebarIcon} onClick={() => navigate('/payments')}>
                        <FaFileInvoiceDollar className={styles.icon} />
                        <span>Pagamentos</span>
                    </div>
                </nav>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Envio de Notificação</h1>
                    </header>

                    {/* Formulário para envio de notificação */}
                    <div className={styles.formContainer}>
                        <div className={styles.formField}>
                            <label htmlFor="recipient">Destinatário</label>
                            <select
                                id="recipient"
                                value={recipient}
                                onChange={handleSelectRecipient}
                            >
                                <option value="">Selecione o destinatário</option>
                                <option value="Cliente">Cliente</option>
                                <option value="Advogado">Advogado</option>
                                <option value="Juiz">Juiz</option>
                                {/* Adicione mais opções conforme necessário */}
                            </select>
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="subject">Assunto</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={handleSelectSubject}
                                placeholder="Digite o assunto"
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="message">Mensagem</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={handleMessageChange}
                                placeholder="Digite a mensagem"
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button onClick={handleSendNotification} className={styles.sendButton}>
                                Enviar Notificação
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Notifications;
