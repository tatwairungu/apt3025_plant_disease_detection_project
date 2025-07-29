import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onPrediction, isLoading, setIsLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Clear any previous prediction when new image is selected
      onPrediction(null);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      onPrediction(data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(`Failed to get prediction: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
    onPrediction(null);
  };

  return (
    <div className="image-upload-container">
      <div className="upload-card">
        <h2>🌱 Plant Disease Detection</h2>
        <p>Upload an image of a plant leaf to detect diseases</p>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={handleImageSelect}
              className="file-input"
              disabled={isLoading}
            />
            <label htmlFor="image-input" className="file-input-label">
              📷 Choose Image
            </label>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Selected" className="preview-image" />
              <p className="image-name">{selectedImage.name}</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="button-group">
            <button
              type="submit"
              disabled={!selectedImage || isLoading}
              className="predict-button"
            >
              {isLoading ? '🔄 Analyzing...' : '🔍 Detect Disease'}
            </button>
            
            {(selectedImage || imagePreview) && (
              <button
                type="button"
                onClick={handleReset}
                className="reset-button"
                disabled={isLoading}
              >
                🗑️ Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload; 