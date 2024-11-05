
import { imgDB, firestore } from '../../Config-DB/firebase-config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { minLenghtimages } from '../../Logique/constantes';
import { addDoc, collection } from "firebase/firestore";

const useHandleClick = () => {
    const handleUpload = async (image) => {
        const imageRef = ref(imgDB, `Images_Room_Buddy/${uuidv4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };

    const handleClick = async (formData, selectedImages,userId, setShowAlert, setShowSuccessAlert, setFormData, setSelectedImages, setMessage) => {
        console.log(formData, selectedImages.length, formData.Type,userId);
        setShowAlert(false);
        setShowSuccessAlert(false);
        if (!formData.Title || formData.Title.trim().length === 0) {
            setShowAlert(true);
            setMessage('Title cannot be empty');
            return;
        }
        
        if (!formData.Address || formData.Address.trim().length === 0) {
            setShowAlert(true);
            setMessage('Address cannot be empty');
            return;
        }

        if (!formData.City || formData.City.trim().length === 0) {
            setShowAlert(true);
            setMessage('City cannot be empty');
            return;
        }

        if (!formData.PostalCode || formData.PostalCode.trim().length === 0) {
            setShowAlert(true);
            setMessage('Postal Code cannot be empty');
            return;
        }

        if (!formData.Country || formData.Country.trim().length === 0) {
            setShowAlert(true);
            setMessage('Country cannot be empty');
            return;
        }

        if (!formData.Type_of_Accommodation || formData.Type_of_Accommodation.trim().length === 0) { 
            setShowAlert(true);
            setMessage('Type of Accommodation cannot be empty');
            return;
        }

        if (!formData.rooms_available || formData.rooms_available.trim().length === 0) {
            setShowAlert(true);
            setMessage('Rooms available cannot be empty');
            return;
        }

        if (!formData.Monthly_Rent || formData.Monthly_Rent.trim().length === 0) {
            setShowAlert(true);
            setMessage('Monthly Rent cannot be empty');
            return;
        }

        if (!formData.Monthly_Charges || formData.Monthly_Charges.trim().length === 0) {
            setShowAlert(true);
            setMessage('Monthly Charges cannot be empty');
            return;
        }

        if (!formData.Full_Name || formData.Full_Name.trim().length === 0) {
            setShowAlert(true);
            setMessage('Full Name cannot be empty');
            return;
        }

        if (!formData.Email || formData.Email.trim().length === 0) {
            setShowAlert(true); 
            setMessage('Email cannot be empty');
            return;
        }

        if (!formData.Phone || formData.Phone.trim().length === 0) {
            setShowAlert(true);
            setMessage('Phone cannot be empty');
            return;
        }

        if (selectedImages.length < minLenghtimages) {
            setShowAlert(true);
            setMessage('Please select at least ' + minLenghtimages + ' image');
            return;
        }
        const imageUrls = await Promise.all(selectedImages.map(handleUpload));

        const BuddyData = {
           
            Title: formData.Title,
            Address: formData.Address,
            City: formData.City,
            PostalCode: formData.PostalCode,
            Country: formData.Country,
            Type_of_Accommodation: formData.Type_of_Accommodation,
            rooms_available: formData.rooms_available,
            Monthly_Rent: formData.Monthly_Rent,
            Monthly_Charges: formData.Monthly_Charges,
            Minimum_Age_of_Desired_Roommates: formData.Minimum_Age_of_Desired_Roommates,
            Gender_of_Desired_Roommates: formData.Gender_of_Desired_Roommates,
            Language: formData.Language,
            Preferences_in_Terms_of_Behavior: formData.Preferences_in_Terms_of_Behavior,
            Hobbies: formData.Hobbies,
            Occupation: formData.Occupation,
            Other_Details: formData.Other_Details,
            Full_Name: formData.Full_Name,
            Email: formData.Email,
            Phone: formData.Phone,
            imageUrls,
            userId
        };

        try {
            await addDoc(collection(firestore, 'Buddy'), BuddyData);
            setShowSuccessAlert(true);
            setFormData({ Title: '',
            Address: '',
            City: '',
            PostalCode: '',
            Country: '',
            Type_of_Accommodation: '',
            rooms_available: '',
            Monthly_Rent: '',
            Monthly_Charges: '',
            Minimum_Age_of_Desired_Roommates: '',
            Gender_of_Desired_Roommates: '',
            Language: '',
            Preferences_in_Terms_of_Behavior: '',
            Hobbies: '',
            Occupation: '',
            Other_Details: '',
            Full_Name: '',
            Email: '',
            Phone: '' });
            setSelectedImages([]);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return { handleClick };
};

export default useHandleClick;

