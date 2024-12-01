import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import styles from './EditPersonPage.module.css';
import { FaSearch } from 'react-icons/fa';

function EditPersonPage() {
    const [personData, setPersonData] = useState({
        codigo: '',
        nome: '',
        cpf: '',
        rg: '',
        telefone: '',
        email: '',
        cidade: '',
        estado: '',
        tipo: 'Fisica',
        foto: null,  // Campo para a foto
    });

    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch person data when the component mounts
    useEffect(() => {
        const fetchPersonData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/pessoas/${id}/`);
                const data = await response.json();
                setPersonData(data);
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };

        if (id) {
            fetchPersonData();
        }
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setPersonData((prevData) => ({
                ...prevData,
                [name]: files[0], // Atualiza o estado com o arquivo selecionado
            }));
        } else {
            setPersonData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Handle form submission (editing the person)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in personData) {
            formData.append(key, personData[key]);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/pessoas/edit/${id}/`, {
                method: 'PUT',
                body: formData,  // Envia os dados como FormData
            });

            if (response.ok) {
                alert('Pessoa atualizada com sucesso!');
                navigate('/personpage');
            } else {
                const errorData = await response.json();
                alert('Erro: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Erro ao atualizar a pessoa:', error);
            alert('Erro ao atualizar a pessoa');
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


                <main className={styles.mainContent}>
                    <header className={styles.pageHeader}>
                        <h1>Editar Pessoa</h1>
                    </header>

                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.personForm}>
                            <label>
                                Código:
                                <input
                                    type="text"
                                    name="codigo"
                                    value={personData.codigo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    name="nome"
                                    value={personData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                CPF:
                                <input
                                    type="text"
                                    name="cpf"
                                    value={personData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                RG:
                                <input
                                    type="text"
                                    name="rg"
                                    value={personData.rg}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Telefone:
                                <input
                                    type="text"
                                    name="telefone"
                                    value={personData.telefone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={personData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Cidade:
                                <input
                                    type="text"
                                    name="cidade"
                                    value={personData.cidade}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Estado:
                                <input
                                    type="text"
                                    name="estado"
                                    value={personData.estado}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className={styles.tipoPessoa}>
                                Tipo de Pessoa:
                                <select
                                    name="tipo"
                                    value={personData.tipo}
                                    onChange={handleChange}
                                    className={styles.tipoSelect}
                                    required
                                >
                                    <option value="Fisica">Fisica</option>
                                    <option value="Juridica">Juridica</option>
                                </select>
                            </label>

                            <label>
                                Foto:
                                <input
                                    type="file"
                                    name="foto"
                                    onChange={handleChange}
                                />
                            </label>

                            <button type="submit" className={styles.submitButton}>
                                Atualizar Pessoa
                            </button>

                            {/* Back button */}
                            <button
                                type="button"
                                className={styles.submitButton}
                                onClick={() => navigate('/personpage')}
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

export default EditPersonPage;
