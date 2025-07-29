import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrediction = (predictionData) => {
    setPrediction(predictionData);
    if (predictionData) {
      setIsModalOpen(true);
      // Prevent body scroll when modal is open
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scroll when modal is closed
    document.body.classList.remove('modal-open');
  };

  const clearPrediction = () => {
    setPrediction(null);
    closeModal();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🌿 Plant Disease Detection System</h1>
          <p>Powered by AI - Detect plant diseases with 86% accuracy</p>
        </div>
      </header>
      
      <main className="App-main">
        <ImageUpload 
          onPrediction={handlePrediction}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {prediction && (
            <PredictionResult 
              prediction={prediction} 
              onClose={closeModal}
              onClear={clearPrediction}
            />
          )}
        </Modal>
      </main>
      
      <footer className="App-footer">
        <div className="footer-content">
          <p>© 2025 Plant Disease Detection System</p>
          <p>Developed by Group 2 Apt 3025-VA | Powered by TensorFlow & React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
