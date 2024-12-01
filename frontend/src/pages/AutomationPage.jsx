import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importação do axios
import styles from './AutomationPage.module.css';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';  // Importando o FileSaver

function AutomationPage() {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [processes, setProcesses] = useState([]);
    const [documentContent, setDocumentContent] = useState('');  // Estado para armazenar o conteúdo gerado
    const navigate = useNavigate();

    // Buscar os processos ao carregar o componente
    useEffect(() => {
        axios.get('http://localhost:8000/api/processes/list/')  // URL da sua API para listar os processos
            .then(response => {
                setProcesses(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar os processos:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
    };

    const handleProcessChange = (e) => {
        setSelectedProcess(e.target.value);
    };

    const handleGenerateDocument = () => {
        const selectedProcessData = processes.find(process => process.id === parseInt(selectedProcess, 10));  // Convertendo para número
        if (!selectedProcessData) {
            alert('Selecione um processo válido.');
            return;
        }

        // Faz a chamada para pegar os detalhes completos do processo
        axios.get(`http://localhost:8000/api/processes/details/${selectedProcessData.id}/`)
            .then(response => {
                const processDetails = response.data;  // Dados detalhados do processo

                let documentContent = '';

                if (selectedTemplate === 'template1') {
                    documentContent = `Cliente: ${processDetails.cliente}

                    Processo nº ${processDetails.numero}

                    Excelentíssimo(a) Senhor(a) Juiz(a) de Direito da ${processDetails.tribunal} - ${processDetails.comarca}

                    A presente demanda é movida por ${processDetails.cliente}, com a finalidade de [descrição da ação], em face de [réu]. O valor da causa é de ${processDetails.valorCausa}, conforme apurado nos autos.

                    Ante o exposto, requer-se a citação do réu e a procedência da ação, conforme os pedidos a seguir.

                    [Assinatura]

                    ${processDetails.cliente}`;
                } else if (selectedTemplate === 'template2') {
                    documentContent = `Cliente: ${processDetails.cliente}
                    
                    Processo nº ${processDetails.numero}

                    Egrégio Tribunal de ${processDetails.tribunal}

                    Em razão do desfecho desfavorável proferido na sentença, vem o apelante, ${processDetails.cliente}, interpor o presente recurso de apelação, com fulcro no artigo [XX] da Lei [YY], para que seja reavaliada a decisão no sentido de [fundamentação do recurso].

                    O recurso visa alterar a decisão para que se reconheça. Requer, portanto, o provimento do recurso.

                    ${processDetails.cliente}`;
                } else if (selectedTemplate === 'template3') {
                    documentContent = `Relatório de Andamento Processual
                
                    Processo nº ${processDetails.numero || 'Não informado'} 
                    
                    Tribunal: ${processDetails.tribunal || 'Não informado'}
                    Comarca: ${processDetails.comarca || 'Não informado'}
                    Vara: ${processDetails.vara || 'Não informado'}
                
                    Cliente: ${processDetails.cliente || 'Não informado'}
                
                    Andamentos mais recentes:
                    ${processDetails.ultimosAndamentos || 'Nenhum andamento recente.'}
                
                    Status atual do processo: ${processDetails.status || 'Não informado'}
                    Desfecho: ${processDetails.desfecho || 'Sem desfecho.'}
                    Resultado do Recurso: ${processDetails.resultadoRecurso || 'Sem resultado.'}
                    Último Evento: ${processDetails.ultimoEvento || 'Sem evento.'}
                
                    Valor da causa: R$ ${processDetails.valorCausa || 'Não informado'}
            
                    ${processDetails.cliente || 'Não informado'}`;
                }

                // Atualiza o estado com o conteúdo gerado
                setDocumentContent(documentContent);
            })
            .catch(error => {
                console.error('Erro ao buscar os detalhes do processo:', error);
                alert('Erro ao carregar os detalhes do processo.');
            });
    };

    // Função para salvar o conteúdo como .txt
    const handleSaveTxt = () => {
        // Gerar o conteúdo do arquivo de texto
        const content = documentContent || 'Conteúdo não gerado';

        // Criar um Blob com o conteúdo gerado
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

        // Salvar o arquivo .txt
        saveAs(blob, 'documento_gerado.txt');
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

                <div className={styles.automacao}>
                    <h1>Automação de Documentos</h1>

                    <main className={styles.mainContent}>
                        <div className={styles.topSection}>
                            <div className={styles.selectionContainer}>
                                <label>Selecione um Processo</label>
                                <select value={selectedProcess} onChange={handleProcessChange} title="Escolha um processo da lista para gerar o documento">
                                    <option value="">Selecione um processo</option>
                                    {processes.map((process) => (
                                        <option key={process.id} value={process.id}>
                                            {process.numero} - {process.cliente}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.selectionContainer}>
                                <label>Selecione um Template</label>
                                <select value={selectedTemplate} onChange={handleTemplateChange} title="Escolha o template desejado para gerar o documento">
                                    <option value="">Selecione um template</option>
                                    <option value="template1">Petição Inicial</option>
                                    <option value="template2">Recurso de Apelação</option>
                                    <option value="template3">Relatório de Andamento Processual</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button onClick={handleGenerateDocument} className={styles.generateButton}>Gerar Documento</button>
                            <button onClick={handleSaveTxt} className={styles.generateButton}>Salvar como TXT</button>
                        </div>

                        {documentContent && (
                            <div className={styles.documentPreview}>
                                <h2>Documento Gerado:</h2>
                                <pre>{documentContent}</pre>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AutomationPage;
