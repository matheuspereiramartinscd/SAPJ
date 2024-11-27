import React, { useState } from 'react';
import styles from './ProcessDetailsPage.module.css';
import { FaEdit, FaArchive, FaTrashAlt, FaFileUpload, FaArrowLeft, FaHome, FaRegFileAlt, FaTasks, FaChartLine, FaUser, FaHandshake, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProcessDetailsPage() {
    const navigate = useNavigate();
    const [annotations, setAnnotations] = useState('');
    const [savedAnnotations, setSavedAnnotations] = useState('');

    const handleChangeAnnotations = (e) => {
        setAnnotations(e.target.value);
    };

    const handleSaveAnnotations = () => {
        // Simular envio de anotações
        setSavedAnnotations(annotations);
        console.log('Anotações enviadas:', annotations);
    };

    const handleEdit = () => {
        console.log('Editando processo...');
    };

    const handleArchive = () => {
        console.log('Arquivando processo...');
    };

    const handleDelete = () => {
        console.log('Deletando processo...');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <h1>Detalhes do Processo</h1>
            <div className={styles.actions}>
                <button onClick={handleBack} className={styles.actionBtn}>
                    <FaArrowLeft /> Voltar
                </button>
                <button onClick={handleEdit} className={styles.actionBtn}>
                    <FaEdit /> Editar
                </button>
                <button onClick={handleArchive} className={styles.actionBtn}>
                    <FaArchive /> Arquivar
                </button>
                <button onClick={handleDelete} className={styles.actionBtn}>
                    <FaTrashAlt /> Deletar
                </button>
            </div>
            <div className={styles.details}>
                <h2>Processo: Código 12345</h2>
                <div className={styles.annotationSection}>
                    <h3>Anotações:</h3>
                    <textarea
                        value={annotations}
                        onChange={handleChangeAnnotations}
                        placeholder="Digite suas anotações aqui"
                    ></textarea>
                    <button onClick={handleSaveAnnotations}>Salvar Anotações</button>
                </div>
            </div>
        </div>
    );
}

export default ProcessDetailsPage;
