import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams to get the person's ID
import { FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt, FaFileAlt as FaFileAltIcon } from 'react-icons/fa';
import styles from './EditPersonPage.module.css';  // Create a separate CSS file for the person edit page

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
        tipo: 'Fisica', // Default type
    });

    const { id } = useParams();  // Get the ID from the URL
    const navigate = useNavigate();

    // Fetch person data when the component mounts
    useEffect(() => {
        const fetchPersonData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/pessoas/${id}/`);  // API to fetch the person's data by ID
                const data = await response.json();
                setPersonData(data);  // Set the fetched data into state
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };

        if (id) {
            fetchPersonData();  // Fetch person data if ID is present
        }
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (editing the person)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/pessoas/edit/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personData),
            });

            if (response.ok) {
                alert('Pessoa atualizada com sucesso!');
                navigate('/personpage');  // Redirect to the person page after successful update
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
                    {/* Novo ícone de Documentos na sidebar */}
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
