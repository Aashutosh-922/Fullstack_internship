// client/src/components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Image uploaded successfully:', response.data.imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
