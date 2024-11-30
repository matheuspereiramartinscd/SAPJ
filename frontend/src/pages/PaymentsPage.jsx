import React, { useState, useEffect } from 'react';
import styles from './PaymentsPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

// Função para obter o token CSRF do cookie
const getCSRFToken = () => {
    const csrfToken = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('csrftoken='))?.split('=')[1];
    return csrfToken;
};

function PaymentsPage() {
    const navigate = useNavigate();
    const [pagamentos, setPagamentos] = useState([]);

    // Carregar os pagamentos ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:8000/api/pagamentos/', {
            headers: {
                'X-CSRFToken': getCSRFToken(),  // Incluindo o token CSRF no cabeçalho
            }
        })
            .then(response => {
                setPagamentos(response.data);  // Atualiza o estado com os dados recebidos
            })
            .catch(error => {
                console.error("Erro ao carregar os pagamentos:", error);
            });
    }, []);  // O array vazio faz com que a requisição seja feita apenas uma vez ao montar o componente.

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este pagamento?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8000/api/pagamentos/${id}/`, {
                headers: {
                    'X-CSRFToken': getCSRFToken(),  // Incluindo o token CSRF no cabeçalho
                }
            })
                .then(() => {
                    setPagamentos(pagamentos.filter(pagamento => pagamento.id !== id)); // Remove o pagamento da lista
                    alert('Pagamento excluído com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao excluir pagamento:', error);
                    alert('Erro ao excluir pagamento');
                });
        }
    };

    const handleCreatePayment = () => {
        navigate('/paymentregister'); // Redireciona para a página de criação de pagamento
    };

    const handlePay = (id) => {
        // Atualiza o status do pagamento para 'Pago'
        axios.patch(`http://localhost:8000/api/pagamentos/${id}/`, { status: 'Pago' }, {
            headers: {
                'X-CSRFToken': getCSRFToken(),  // Incluindo o token CSRF no cabeçalho
            }
        })
            .then(() => {
                // Atualiza o estado local com o pagamento atualizado
                setPagamentos(pagamentos.map(pagamento =>
                    pagamento.id === id ? { ...pagamento, status: 'Pago' } : pagamento
                ));
                alert('Pagamento realizado com sucesso!');
            })
            .catch((error) => {
                console.error("Erro ao atualizar o status do pagamento:", error);
                alert('Erro ao atualizar o status do pagamento');
            });
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
                        <h1>Pagamentos e Faturamento</h1>
                    </header>

                    {/* Botão para criar pagamento */}
                    <button
                        onClick={handleCreatePayment}
                        className={styles.createPaymentButton}
                    >
                        Criar Pagamento
                    </button>

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
                            {/* Renderiza as linhas com base nos dados da API */}
                            {pagamentos.map((pagamento) => (
                                <tr key={pagamento.id}>
                                    <td>{pagamento.id}</td>
                                    <td>{pagamento.nome}</td>
                                    <td>{new Date(pagamento.data).toLocaleDateString()}</td>
                                    <td>{pagamento.tipo}</td>
                                    <td>{pagamento.status}</td>
                                    <td>{pagamento.conta_bancaria}</td>
                                    <td>R$ {pagamento.valor}</td>
                                    <td>
                                        <button
                                            onClick={() => handlePay(pagamento.id)}
                                            className={styles.payButton}
                                        >
                                            Pagar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pagamento.id)}
                                            className={styles.deleteButton}
                                        >
                                            Excluir
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

export default PaymentsPage;
