import React, { useState, useEffect } from 'react';
import styles from './PersonPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PersonPage() {
    const [people, setPeople] = useState([]); // Armazenar as pessoas
    const [filteredPeople, setFilteredPeople] = useState([]); // Armazenar as pessoas filtradas
    const [isFisica, setIsFisica] = useState(false);
    const [isJuridica, setIsJuridica] = useState(false);
    const navigate = useNavigate();

    // Buscar pessoas da API
    useEffect(() => {
        const fetchPeople = async () => {
            const token = localStorage.getItem('token'); // Obtém o token do localStorage (se houver)

            try {
                const response = await fetch('http://127.0.0.1:8000/api/pessoas/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPeople(data);
                    setFilteredPeople(data); // Inicializa a lista filtrada com todos os dados
                } else {
                    alert('Erro ao buscar pessoas');
                }
            } catch (error) {
                console.error('Erro ao buscar pessoas:', error);
            }
        };

        fetchPeople();
    }, []);

    // Filtros para pessoas físicas ou jurídicas
    useEffect(() => {
        let filtered = people;

        if (isFisica && isJuridica) {
            // Mostrar pessoas físicas ou jurídicas
            filtered = people;
        } else if (isFisica) {
            // Mostrar apenas pessoas físicas
            filtered = people.filter(person => person.tipo === 'Física');
        } else if (isJuridica) {
            // Mostrar apenas pessoas jurídicas
            filtered = people.filter(person => person.tipo === 'Jurídica');
        }

        setFilteredPeople(filtered);
    }, [isFisica, isJuridica, people]); // Atualiza os filtros sempre que mudar

    const handleLogout = () => {
        // Remover o token do localStorage e redirecionar para a página de login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelectFisica = (e) => {
        setIsFisica(e.target.checked);
    };



    const handleSelectJuridica = (e) => {
        setIsJuridica(e.target.checked);
    };

    const handleEdit = (id) => {
        console.log(`Editar pessoa com ID: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/people/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Pessoa excluída com sucesso');
                // Atualiza a lista de pessoas removendo a pessoa excluída diretamente do estado
                setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
                setFilteredPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
            } else {
                alert('Erro ao excluir pessoa');
            }
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/persondetails/${id}`);
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
                        <h1>Gestão de Pessoas</h1>
                    </header>

                    {/* Top Section */}
                    <div className={styles.topSection}>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.addButton}
                                onClick={() => navigate('/personregister')}>
                                Cadastrar Pessoa
                            </button>
                            <button className={styles.reportButton}>Gerar Relatório</button>
                        </div>

                        <div className={styles.filters}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isFisica}
                                    onChange={handleSelectFisica}
                                />
                                Física
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isJuridica}
                                    onChange={handleSelectJuridica}
                                />
                                Jurídica
                            </label>
                        </div>
                    </div>

                    {/* Tabela de Pessoas */}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome/Razão Social</th>
                                <th>Tipo</th>
                                <th>Contato</th>
                                <th>Cidade/UF</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPeople.length > 0 ? (
                                filteredPeople.map((person) => (
                                    <tr key={person.id}>
                                        <td>{person.codigo}</td>
                                        <td>{person.nome}</td>
                                        <td>{person.tipo}</td>
                                        <td>{person.telefone}</td>
                                        <td>{person.cidade}/{person.estado}</td>
                                        <td>
                                            <button
                                                className={styles.logoutButton}
                                                onClick={() => handleViewDetails(process.id)}
                                            >
                                                Detalhes
                                            </button>
                                            <button
                                                className={styles.logoutButton2}
                                                onClick={() => handleDelete(process.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhuma pessoa encontrada</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default PersonPage;
