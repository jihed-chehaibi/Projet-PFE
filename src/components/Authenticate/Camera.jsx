import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon from react-icons

const CameraInput = ({ setImageUrl }) => {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrlState] = useState(null);
    const [showButton, setShowButton] = useState(true); // New state for button visibility

    const handleCapture = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrlState(e.target.result);
            setImageUrl(e.target.result); // Set image URL in parent state
            saveImageToFirebaseStorage(file);
            setShowButton(false); // Hide the button after capturing the image
        };
        reader.readAsDataURL(file);
    };

    const saveImageToFirebaseStorage = (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Image uploaded successfully');
        }).catch((error) => {
            console.error('Error uploading image:', error);
        });
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleEditClick = () => {
        setShowButton(true); // Show the button to take a new selfie
        setImageUrlState(null); // Clear the current image
        setImageUrl(null); // Clear the image URL in parent state
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleCapture}
                ref={fileInputRef}
            />
            {imageUrl && (
                <div className='im' style={{ position: 'relative' , width: '80px', height: '80px' ,  marginBottom: '20%'}}>
                    <img
                        src={imageUrl}
                        alt="Captured selfie"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', marginTop: '5px' }}
                    />
                    <FaEdit
                        onClick={handleEditClick}
                        style={{ position: 'absolute', top: '10px', right: '1px', cursor: 'pointer', color: 'black', backgroundColor: 'white', borderRadius: '50%', padding: '5px' }}
                    />
                </div>
            )}
            {showButton && (
                <button onClick={handleClick} className='take-selfie-button'>Take Selfie</button>
            )}
        </div>
    );
};

export default CameraInput;
