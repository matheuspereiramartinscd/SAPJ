import React, { useState } from 'react';
import styles from './AutomationPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AutomationPage() {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
    };

    const handleProcessChange = (e) => {
        setSelectedProcess(e.target.value);
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
                <div class={styles.automacao}>
                    <h1>Automação de Documentos</h1>

                    <main className={styles.mainContent}>
                        <div className={styles.pageHeader}>

                        </div>

                        <div className={styles.topSection}>
                            <div className={styles.selectionContainer}>
                                <label>Selecione um Processo</label>
                                <select value={selectedProcess} onChange={handleProcessChange}>
                                    <option value="">Selecione um processo</option>
                                    <option value="process1">Processo 1</option>
                                    <option value="process2">Processo 2</option>
                                    <option value="process3">Processo 3</option>
                                </select>
                            </div>

                            <div className={styles.selectionContainer}>
                                <label>Selecione um Template</label>
                                <select value={selectedTemplate} onChange={handleTemplateChange}>
                                    <option value="">Selecione um template</option>
                                    <option value="template1">Template 1</option>
                                    <option value="template2">Template 2</option>
                                    <option value="template3">Template 3</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.generateButton}>Gerar Documento</button>
                            <button className={styles.createTemplateButton}>Criar Template</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AutomationPage;
