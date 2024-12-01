import React, { useState } from 'react';
import styles from './SearchPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrgaos, setSelectedOrgaos] = useState([]);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSearch = async () => {
        try {
            const API_KEY = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';

            const response = await axios.post(
                'https://api-publica.datajud.cnj.jus.br/api_publica_tjmg/_search',
                {
                    query: {
                        match: {
                            numeroProcesso: searchQuery
                        }
                    }
                },
                {
                    headers: {
                        'Authorization': `APIKey ${API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setResults(response.data.hits.hits);
            setError(null);  // Limpar o erro se a requisição for bem-sucedida
        } catch (error) {
            setError('Erro ao buscar jurisprudência. Tente novamente mais tarde.');
            console.error('Erro ao buscar jurisprudência:', error);
        }
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

                    <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
                    <div className={styles.userInfo}>


                    </div>

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
                    {/* Novo ícone de Consultas na sidebar */}
                    <div className={styles.sidebarIcon} onClick={() => navigate('/search')}>
                        <FaSearch className={styles.icon} />
                        <span>Consultas</span>
                    </div>
                    {/* Novo ícone de Documentos na sidebar */}
                    <div className={styles.sidebarIcon} onClick={() => navigate('/documents')}>
                        <FaFileAltIcon className={styles.icon} />
                        <span>Documentos</span>
                    </div>
                </nav>

                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Pesquisar Jurisprudências</h1>
                    </header>

                    <div className={styles.searchSection}>
                        <input
                            type="text"
                            placeholder="Digite o número do processo..."
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
                    </div>

                    <div className={styles.resultsSection}>
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <div key={index} className={styles.resultCard}>
                                    <div className={styles.resultDetails}>
                                        <p><strong>RE:</strong> {result._source.numeroProcesso}</p>
                                        <p><strong>Classe:</strong> {result._source.classe.nome}</p>
                                        <p><strong>Tribunal:</strong> {result._source.tribunal}</p>
                                        <p><strong>Data Ajuizamento:</strong> {new Date(result._source.dataAjuizamento).toLocaleDateString()}</p>
                                        <p><strong>Última Atualização:</strong> {new Date(result._source.dataHoraUltimaAtualizacao).toLocaleDateString()}</p>
                                        <p><strong>Movimentos:</strong> {result._source.movimentos.map((mov, idx) => (
                                            <span key={idx}>{mov.nome} ({new Date(mov.dataHora).toLocaleDateString()})</span>
                                        ))}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default SearchPage;
