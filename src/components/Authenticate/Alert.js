// src/components/Alert.js
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import './Alertemail.css'; // Assurez-vous que ce fichier CSS existe pour le style de l'alerte

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-popup">
            <FaExclamationCircle className="icon" />
            {message}
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Alert;
