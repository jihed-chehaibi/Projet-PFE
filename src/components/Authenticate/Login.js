// src/components/Login.js
import * as Components from './Styles';
import { useState } from 'react';
import { auth } from '../../Config-DB/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaExclamationCircle } from 'react-icons/fa'; // Importation de l'icône d'alerte
import './alert.css'; // Import du fichier CSS pour le style de l'alerte

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Ajout de l'état pour gérer les erreurs

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
                setError("Email Or Password incorrect"); // Message personnalisé pour l'erreur
            });
    };

    const handleCloseAlert = () => {
        setError(null); // Fermer l'alerte en réinitialisant l'état
    };

    return (
        <>
            {error && (
                <div className="alert-popupp">
                    <FaExclamationCircle className="icon" />
                    {error}
                    <button className="close-btn" onClick={handleCloseAlert}>&times;</button>
                </div>
            )}
            <Components.Form onSubmit={signIn}>
                <Components.Title>Sign in</Components.Title>
                <Components.Input
                    type='email'
                    placeholder='Email'
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Components.Input
                    type='password'
                    placeholder='Password'
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="/ForgotPassword" style={{ marginTop: '10px', marginLeft: '45%' , marginBottom: '10px' }}>
                    <Components.Anchor>Forgot your password ?</Components.Anchor>
                </a>
                <Components.Button type='submit'>Sign In</Components.Button>
            </Components.Form>
        </>
    );
}
