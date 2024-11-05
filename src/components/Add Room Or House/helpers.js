
import { imgDB, firestore } from '../../Config-DB/firebase-config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { minLenghtimages } from '../../Logique/constantes';
import { addDoc, collection } from "firebase/firestore";

const useHandleClick = () => {
    const handleUpload = async (image) => {
        const imageRef = ref(imgDB, `ImagesRoom/${uuidv4()}`);
        try {
            const snapshot = await uploadBytes(imageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };

    const handleClick = async (formData, selectedImages, userId ,setShowAlert, setShowSuccessAlert, setFormData, setSelectedImages,setMessage) => {
        console.log(formData, selectedImages.length, formData.Type ,userId);
        setShowAlert(false);
        setShowSuccessAlert(false);
        if (!formData.Title||formData.Title.trim().length ===0) {
            setShowAlert(true);
            setMessage('Title cannot be empty');
            return;
        }
        if (!formData.Title||formData.Title.trim().length ===0) {
            setShowAlert(true);
            setMessage('Title cannot be empty');
            return;
        }if (!formData.numero||formData.numero.trim().length ===0) {
            setShowAlert(true);
            setMessage('Numero cannot be empty');
            return;
        }if (!formData.Location||formData.Location.trim().length ===0) {
            setShowAlert(true);
            setMessage('Location cannot be empty');
            return;
        }if (!formData.Price||formData.Price.trim().length ===0) {
            setShowAlert(true);
            setMessage('Price cannot be empty');
            return;
        }if (!formData.Type||formData.Type.trim().length ===0) {
            console.log(formData.Type);
            setShowAlert(true);
            setMessage('Type cannot be empty');
            return;
        }if (!formData.currency||formData.currency.trim().length ===0) {
            setShowAlert(true);
            setMessage('Currency cannot be empty');
            return;
        }

        if (selectedImages.length < minLenghtimages) {
            setShowAlert(true);
            setMessage('Please select at least '+minLenghtimages+' image');
            return;
        }
        const imageUrls = await Promise.all(selectedImages.map(handleUpload));

        const roomData = {
            Title: formData.Title,
            numero: formData.numero,
            Location: formData.Location,
            description: formData.description,
            Price: `${formData.Price} ${formData.currency}`,
            Type: formData.Type,
            imageUrls ,
            userId
        };

        try {
            await addDoc(collection(firestore, 'Rooms'), roomData);
            setShowSuccessAlert(true);
            setFormData({ Title: '', numero: '', Location: '', description: '', Price: '', Type: '', currency: '$' });
            setSelectedImages([]);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return { handleClick };
};

export default useHandleClick;

