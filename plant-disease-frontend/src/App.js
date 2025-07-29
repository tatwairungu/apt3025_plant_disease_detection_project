import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = (predictionData) => {
    setPrediction(predictionData);
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
        
        {prediction && (
          <PredictionResult prediction={prediction} />
        )}
      </main>
      
      <footer className="App-footer">
        <div className="footer-content">
          <p>© 2025 Plant Disease Detection System</p>
          <p>Developed for APT 3025 Project | Powered by TensorFlow & React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
