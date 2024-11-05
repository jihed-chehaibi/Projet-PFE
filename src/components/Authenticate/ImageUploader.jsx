import React, { useState } from 'react';
import './ImageUploader.css'; 

const ImageUploader = ({ setIdImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setIdImage(e.target.result); // Set image URL in parent state
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="image-uploader">
      <label htmlFor="PassportOrId" className="custom-file-upload">
        <input type="file" id="PassportOrId" onChange={handleImageChange} accept="image/*" className="hidden" />
        Passport Or ID
        {selectedImage && (
          <div>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="preview-imagee" />
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;