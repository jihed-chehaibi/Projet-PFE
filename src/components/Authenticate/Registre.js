// src/components/Registre.js
import React, { useState, useEffect } from 'react';
import CameraInput from "./Camera";
import ImageUploader from "./ImageUploader";
import * as Components from './Styles';
import { firestore } from '../../Config-DB/firebase-config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import * as faceapi from 'face-api.js';
import { loadModels } from './loadModels';
import Alert from './Alert'; // Import du composant Alert

export default function Registre() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [phone, setPhone] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [idImage, setIdImage] = useState(null);
    const [error, setError] = useState(null); // Ajout de l'état pour gérer les erreurs

    useEffect(() => {
        loadModels();
    }, []);

    const signup = async (e) => {
        e.preventDefault();
        
        try {
            // Perform face comparison
            const isFaceMatched = await compareFaces(imageUrl, idImage);
            if (!isFaceMatched) {
                setError('Selfie doesn\'t match the ID.');
                return;
            }

            // Create user in Firebase Auth
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user data to Firestore
            const userData = {
                userId: user.uid,
                name: name,
                profession: profession,
                phone: phone,
                password: password,
                email: email,
                SelfieUrl: imageUrl,
            };
            const docRef = await addDoc(collection(firestore, "users"), userData);

            console.log("User registered with ID: ", docRef.id);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("The email address is already in use."); // Message personnalisé pour l'erreur
            } else {
                console.error("Error registering user: ", error);
                
            }
        }
    };

    const compareFaces = async (selfie, idImage) => {
        console.log("Comparing faces...");
        const img1 = await faceapi.fetchImage(selfie);
        const img2 = await faceapi.fetchImage(idImage);
        const detection1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
        const detection2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor();
        console.log(detection1);
        console.log(detection2);
        if (!detection1 || !detection2) {
            return false;
        }

        const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);
        console.log(distance);
        return distance < 0.5; // Adjust threshold as needed
    };

    const handleCloseAlert = () => {
        setError(null); // Fermer l'alerte en réinitialisant l'état
    };

    return (
        <>
            {error && (
                <Alert message={error} onClose={handleCloseAlert} />
            )}
            <Components.Form onSubmit={signup}>
                <Components.Title>Create Account</Components.Title>
                <CameraInput setImageUrl={setImageUrl} />
                <Components.Input type='text' placeholder='Name' id="name" onChange={(e) => setName(e.target.value)} />
                <Components.Input type='email' placeholder='Email' id="email" onChange={(e) => setEmail(e.target.value)} />
                <Components.Input type='password' placeholder='Password' id="password" onChange={(e) => setPassword(e.target.value)} />
                <Components.Input type='text' placeholder='Profession' id="profession" onChange={(e) => setProfession(e.target.value)} />                                                                                                                    
                <Components.Input type='tel' placeholder='Phone' id="phone" onChange={(e) => setPhone(e.target.value)} />
                <ImageUploader setIdImage={setIdImage} />
                <Components.Button type='submit'>Sign Up</Components.Button>
            </Components.Form>
        </>
    );
}
