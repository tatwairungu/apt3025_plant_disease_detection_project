import React from 'react';
import './PredictionResult.css';

// Disease information mapping
const diseaseInfo = {
  'Pepper__bell___Bacterial_spot': {
    plant: '🌶️ Bell Pepper',
    disease: 'Bacterial Spot',
    description: 'A bacterial infection causing dark spots on leaves and fruits.',
    tips: [
      'Remove affected leaves immediately',
      'Improve air circulation around plants',
      'Avoid watering leaves directly',
      'Apply copper-based fungicides',
      'Rotate crops annually'
    ],
    severity: 'moderate'
  },
  'Pepper__bell___healthy': {
    plant: '🌶️ Bell Pepper',
    disease: 'Healthy',
    description: 'Your bell pepper plant appears to be healthy!',
    tips: [
      'Continue regular watering',
      'Ensure adequate sunlight',
      'Monitor for early signs of diseases',
      'Maintain proper spacing between plants',
      'Regular fertilization with balanced nutrients'
    ],
    severity: 'none'
  },
  'Potato___Early_blight': {
    plant: '🥔 Potato',
    disease: 'Early Blight',
    description: 'A fungal disease causing brown spots with concentric rings.',
    tips: [
      'Remove infected foliage',
      'Apply fungicides preventively',
      'Ensure proper plant spacing',
      'Water at soil level to avoid leaf wetness',
      'Rotate crops to break disease cycle'
    ],
    severity: 'high'
  },
  'Potato___Late_blight': {
    plant: '🥔 Potato',
    disease: 'Late Blight',
    description: 'A serious fungal disease that can destroy entire crops quickly.',
    tips: [
      'Act immediately - remove all infected plants',
      'Apply protective fungicides',
      'Improve air drainage',
      'Avoid overhead watering',
      'Monitor weather conditions (cool, wet weather favors disease)'
    ],
    severity: 'critical'
  },
  'Potato___healthy': {
    plant: '🥔 Potato',
    disease: 'Healthy',
    description: 'Your potato plant looks great and healthy!',
    tips: [
      'Maintain consistent soil moisture',
      'Hill soil around stems as they grow',
      'Monitor for pest activity',
      'Ensure good soil drainage',
      'Harvest when foliage begins to die back'
    ],
    severity: 'none'
  },
  'Tomato___Bacterial_spot': {
    plant: '🍅 Tomato',
    disease: 'Bacterial Spot',
    description: 'Bacterial infection causing small dark spots on leaves and fruits.',
    tips: [
      'Remove infected plant parts',
      'Use drip irrigation instead of sprinklers',
      'Apply copper-based bactericides',
      'Ensure good air circulation',
      'Use disease-resistant varieties'
    ],
    severity: 'moderate'
  },
  'Tomato___Early_blight': {
    plant: '🍅 Tomato',
    disease: 'Early Blight',
    description: 'Fungal disease causing brown spots with target-like rings.',
    tips: [
      'Remove lower leaves that touch the ground',
      'Apply mulch around plants',
      'Use fungicides as needed',
      'Provide adequate plant support',
      'Water at the base of plants'
    ],
    severity: 'moderate'
  },
  'Tomato___Late_blight': {
    plant: '🍅 Tomato',
    disease: 'Late Blight',
    description: 'Devastating fungal disease that can kill plants rapidly.',
    tips: [
      'Remove infected plants immediately',
      'Apply protective fungicides',
      'Ensure excellent air circulation',
      'Avoid watering late in the day',
      'Use resistant varieties when possible'
    ],
    severity: 'critical'
  },
  'Tomato___Leaf_Mold': {
    plant: '🍅 Tomato',
    disease: 'Leaf Mold',
    description: 'Fungal disease causing yellowing and moldy growth on leaves.',
    tips: [
      'Improve greenhouse ventilation',
      'Reduce humidity levels',
      'Space plants properly',
      'Remove infected leaves',
      'Use resistant varieties'
    ],
    severity: 'moderate'
  },
  'Tomato___Septoria_leaf_spot': {
    plant: '🍅 Tomato',
    disease: 'Septoria Leaf Spot',
    description: 'Fungal disease causing small circular spots with gray centers.',
    tips: [
      'Remove infected lower leaves',
      'Mulch around plants',
      'Water at soil level',
      'Apply preventive fungicides',
      'Ensure good air circulation'
    ],
    severity: 'moderate'
  },
  'Tomato___Spider_mites_Two_spotted_spider_mite': {
    plant: '🍅 Tomato',
    disease: 'Spider Mites',
    description: 'Tiny pests causing stippling and webbing on leaves.',
    tips: [
      'Increase humidity around plants',
      'Use predatory mites as biological control',
      'Spray with insecticidal soap',
      'Remove heavily infested leaves',
      'Avoid over-fertilizing with nitrogen'
    ],
    severity: 'moderate'
  },
  'Tomato___Target_Spot': {
    plant: '🍅 Tomato',
    disease: 'Target Spot',
    description: 'Fungal disease causing brown spots with concentric rings.',
    tips: [
      'Remove infected plant debris',
      'Apply fungicides preventively',
      'Ensure proper plant spacing',
      'Use drip irrigation',
      'Rotate crops annually'
    ],
    severity: 'moderate'
  },
  'Tomato___Tomato_YellowLeaf__Curl_Virus': {
    plant: '🍅 Tomato',
    disease: 'Yellow Leaf Curl Virus',
    description: 'Viral disease causing yellowing and curling of leaves.',
    tips: [
      'Remove infected plants immediately',
      'Control whitefly vectors',
      'Use virus-resistant varieties',
      'Keep area weed-free',
      'Use reflective mulch to deter whiteflies'
    ],
    severity: 'high'
  },
  'Tomato___Tomato_mosaic_virus': {
    plant: '🍅 Tomato',
    disease: 'Mosaic Virus',
    description: 'Viral disease causing mottled patterns on leaves.',
    tips: [
      'Remove infected plants',
      'Disinfect tools between plants',
      'Control aphid vectors',
      'Use virus-free seeds',
      'Avoid handling plants when wet'
    ],
    severity: 'high'
  },
  'Tomato___healthy': {
    plant: '🍅 Tomato',
    disease: 'Healthy',
    description: 'Your tomato plant is healthy and thriving!',
    tips: [
      'Continue regular deep watering',
      'Provide support for growing plants',
      'Prune suckers for better fruit production',
      'Monitor for pests regularly',
      'Harvest fruits when fully ripe'
    ],
    severity: 'none'
  }
};

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  const info = diseaseInfo[prediction.prediction] || {
    plant: '🌱 Plant',
    disease: 'Unknown',
    description: 'Disease information not available.',
    tips: ['Consult with a plant pathologist', 'Monitor plant closely'],
    severity: 'unknown'
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'none': return '#28a745';
      case 'moderate': return '#ffc107';
      case 'high': return '#fd7e14';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'none': return '✅';
      case 'moderate': return '⚠️';
      case 'high': return '⚡';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  const confidencePercentage = Math.round(prediction.confidence * 100);

  return (
    <div className="prediction-result-container">
      <div className="result-card">
        <div className="result-header">
          <h3>🔍 Analysis Complete</h3>
          <div className="confidence-badge">
            <span className="confidence-label">Confidence:</span>
            <span className="confidence-value">{confidencePercentage}%</span>
          </div>
        </div>

        <div className="plant-info">
          <div className="plant-title">
            <h4>{info.plant}</h4>
            <div 
              className="severity-badge"
              style={{ backgroundColor: getSeverityColor(info.severity) }}
            >
              {getSeverityIcon(info.severity)} {info.disease}
            </div>
          </div>
          
          <p className="disease-description">{info.description}</p>
        </div>

        <div className="treatment-tips">
          <h5>💡 Recommended Actions:</h5>
          <ul className="tips-list">
            {info.tips.map((tip, index) => (
              <li key={index} className="tip-item">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {confidencePercentage < 70 && (
          <div className="low-confidence-warning">
            <p>
              ⚠️ <strong>Note:</strong> The confidence level is below 70%. 
              Consider taking a clearer photo or consulting with an expert for accurate diagnosis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResult; 