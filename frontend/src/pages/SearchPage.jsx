import React, { useState } from 'react';
import styles from './SearchPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrgaos, setSelectedOrgaos] = useState([]);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSearch = () => {
        // Simulação de pesquisa
        const sampleResults = [
            {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/TJMG.svg/1200px-TJMG.svg.png', // Exemplo de logo
                RE: '001234',
                orgaoJulgador: 'TJMG',
                relator: 'Des. João Silva',
                redator: 'Dr. Ana Pereira',
                julgamento: '2024-11-20',
                publicacao: '2024-11-25',
                ementa: 'Exemplo de texto descritivo da ementa do caso.',
            },
            // Adicione outros resultados se necessário
        ];
        setResults(sampleResults);
    };

    const toggleOrgao = (orgao) => {
        if (selectedOrgaos.includes(orgao)) {
            setSelectedOrgaos(selectedOrgaos.filter((o) => o !== orgao));
        } else {
            setSelectedOrgaos([...selectedOrgaos, orgao]);
        }
    };

    return (
        <div className={styles.homeContainer}>
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
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Sair
                    </button>
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
                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Pesquisar Jurisprudências</h1>
                    </header>

                    <div className={styles.searchSection}>
                        <input
                            type="text"
                            placeholder="Digite o termo da pesquisa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button onClick={handleSearch} className={styles.searchButton}>
                            Buscar
                        </button>
                    </div>

                    <div className={styles.filterSection}>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => toggleOrgao('TJMG')}
                                checked={selectedOrgaos.includes('TJMG')}
                            />
                            TJMG
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => toggleOrgao('STF')}
                                checked={selectedOrgaos.includes('STF')}
                            />
                            STF
                        </label>
                        {/* Adicione mais opções de órgãos aqui */}
                    </div>

                    <div className={styles.resultsSection}>
                        {results.map((result, index) => (
                            <div key={index} className={styles.resultCard}>
                                <img src={result.logo} alt={result.orgaoJulgador} className={styles.resultLogo} />
                                <div className={styles.resultDetails}>
                                    <p><strong>RE:</strong> {result.RE}</p>
                                    <p><strong>Órgão Julgador:</strong> {result.orgaoJulgador}</p>
                                    <p><strong>Relator(a):</strong> {result.relator}</p>
                                    <p><strong>Redator(a):</strong> {result.redator}</p>
                                    <p><strong>Julgamento:</strong> {result.julgamento}</p>
                                    <p><strong>Publicação:</strong> {result.publicacao}</p>
                                    <p><strong>Ementa:</strong> {result.ementa}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SearchPage;
