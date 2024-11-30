import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentRegisterPage.module.css';
import { FaRegFileAlt, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import { FaHome, FaTasks, FaUser, FaChartLine } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

function PaymentRegisterPage() {
    const [paymentData, setPaymentData] = useState({
        codigo: '',
        nome: '',
        data: '',
        tipo: 'Credito', // Padrão para "Credito"
        status: 'Pendente', // Padrão para "Pendente"
        conta_bancaria: '',
        valor: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/pagamentos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert('Pagamento cadastrado com sucesso!');
                navigate('/payments');
            } else {
                const errorData = await response.json();
                console.error('Erro ao cadastrar pagamento:', errorData);
                throw new Error('Erro ao cadastrar o pagamento');
            }
        } catch (error) {
            alert(error.message);
        }
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

                {/* Formulário de Cadastro de Pagamento */}
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Cadastrar Pagamento</h1>
                    </header>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.personForm}>
                            {/* Código */}
                            <label>
                                Código:
                                <input
                                    type="text"
                                    name="codigo"
                                    value={paymentData.codigo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Nome */}
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    name="nome"
                                    value={paymentData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Data */}
                            <label>
                                Data:
                                <input
                                    type="date"
                                    name="data"
                                    value={paymentData.data}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Tipo */}
                            <label>
                                Tipo:
                                <select
                                    name="tipo"
                                    value={paymentData.tipo}
                                    onChange={handleChange}
                                    required
                                    className={styles.selectInput} // Adicionando classe personalizada
                                >
                                    <option value="Credito">Crédito</option>
                                    <option value="Debito">Débito</option>
                                </select>
                            </label>

                            {/* Status */}
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={paymentData.status}
                                    onChange={handleChange}
                                    required
                                    className={styles.selectInput} // Adicionando classe personalizada
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Pago">Pago</option>
                                </select>
                            </label>

                            {/* Conta Bancária */}
                            <label>
                                Conta Bancária:
                                <input
                                    type="text"
                                    name="conta_bancaria"
                                    value={paymentData.conta_bancaria}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            {/* Valor */}
                            <label>
                                Valor:
                                <input
                                    type="number"
                                    name="valor"
                                    value={paymentData.valor}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    placeholder="Ex: 1500.00"
                                />
                            </label>

                            {/* Botões */}
                            <button type="submit" className={styles.submitButton}>
                                Cadastrar Pagamento
                            </button>
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={() => navigate('/payments')}
                            >
                                Voltar
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PaymentRegisterPage;
