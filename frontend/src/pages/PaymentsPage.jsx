import React from 'react';
import styles from './PaymentsPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PaymentsPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remover o token do localStorage e redirecionar para a página de login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handlePay = (id) => {
        alert(`Pagamento realizado para o item de ID: ${id}`);
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
                        <h1>Pagamentos e Faturamento</h1>
                    </header>

                    {/* Tabela de Pagamentos */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Status</th>
                                <th>Conta Bancária</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Exemplo de linha de dados */}
                            <tr>
                                <td>001</td>
                                <td>João Silva</td>
                                <td>25/11/2024</td>
                                <td>Serviço</td>
                                <td>Pendente</td>
                                <td>12345-6</td>
                                <td>R$ 500,00</td>
                                <td>
                                    <button
                                        onClick={() => handlePay(1)}
                                        className={styles.payButton}
                                    >
                                        Pagar
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Maria Oliveira</td>
                                <td>20/11/2024</td>
                                <td>Produto</td>
                                <td>Pendente</td>
                                <td>54321-0</td>
                                <td>R$ 1.200,00</td>
                                <td>
                                    <button
                                        onClick={() => handlePay(2)}
                                        className={styles.payButton}
                                    >
                                        Pagar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default PaymentsPage;
