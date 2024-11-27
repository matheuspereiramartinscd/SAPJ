import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Adicionado useParams
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaCogs, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import styles from './EditProcessPage.module.css';

function EditProcessPage() {
    const [processData, setProcessData] = useState({
        codigo: '',
        numero: '',
        tipo: '',
        acao: '',
        comarca: '',
        cliente: '',
        tribunal: '',
        foro: '',
        vara: '',
        honorarios: '',
        porcentagem: '',
        valorCausa: '',
        status: 'Em andamento',
        desfecho: '',
        resultadoRecurso: '',
        ultimoEvento: '',
        ultimosAndamentos: '',
        anotacoes: '',
    });

    const { id } = useParams();  // Obter o ID da URL
    const navigate = useNavigate();

    // Carregar os dados do processo ao montar o componente
    useEffect(() => {
        const fetchProcessData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/processes/details/${id}/`);
                const data = await response.json();
                setProcessData(data);  // Preencher os dados no estado
            } catch (error) {
                console.error('Erro ao carregar dados do processo:', error);
            }
        };

        if (id) {
            fetchProcessData();  // Buscar dados se o id for válido
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProcessData({
            ...processData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const processedData = {
            ...processData,
            desfecho: processData.desfecho || '',
            resultadoRecurso: processData.resultadoRecurso || '',
            ultimoEvento: processData.ultimoEvento || '',
            ultimosAndamentos: processData.ultimosAndamentos || '',
            anotacoes: processData.anotacoes || '',
        };

        console.log('Dados enviados para a API:', processedData);

        try {
            const response = await fetch(`http://localhost:8000/api/processes/${processData.id}/`, {  // Alterado para incluir o ID do processo
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(processedData),
            });

            if (response.ok) {
                alert('Processo atualizado com sucesso!');
                navigate('/processpage'); // Redireciona para a página de processos
            } else {
                throw new Error('Erro ao atualizar o processo');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.pageContainer}>
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
                <nav className={styles.sidebar}>
                    {/* Your Sidebar */}
                </nav>

                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Editar Processo</h1>
                    </header>

                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.processForm}>
                            <label>
                                Código:
                                <input
                                    type="text"
                                    name="codigo"
                                    value={processData.codigo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            {/* Other form fields here */}
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={processData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Arquivado">Arquivado</option>
                                </select>
                            </label>

                            <button type="submit" className={styles.submitButton}>
                                Atualizar Processo
                            </button>

                            {/* Button to go back */}
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={() => navigate('/processpage')}
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

export default EditProcessPage;
