Step-by-Step Plan for apt_3025_project_plant_disease_detection
=============================================================

✅ NOTE: The Flask API has already been tested using Postman and is working correctly.

-------------------------------------------------------------
1. BACKEND SETUP (FLASK)
-------------------------------------------------------------
Files involved: app.py, best_model.h5, uploads/

Deliverables for Cursor:
- Load the model from best_model.h5.
- Create a '/' route that returns a simple message confirming the API is running.
- Create a '/predict' route that accepts POST requests:
    • Accept image via form-data.
    • Save the uploaded file to the 'uploads/' folder.
    • Preprocess the image (resize to 224x224, normalize).
    • Make prediction using the loaded model.
    • Return a JSON response: { "prediction": ..., "confidence": ... }

✅ This backend has already been implemented and confirmed working via Postman.

-------------------------------------------------------------
2. FRONTEND SETUP (REACT)
-------------------------------------------------------------
Deliverables for Cursor:
a. Scaffold a new React app:
    - Command: npx create-react-app plant-disease-frontend
    - Change directory: cd plant-disease-frontend

b. Inside /src, create the following components:
    - components/ImageUpload.js – for uploading and previewing images.
    - components/PredictionResult.js – for displaying the prediction and confidence.

c. Implement Upload UI:
    - Use <input type="file" /> to upload images.
    - Store image in state.
    - On submit, send the image to the Flask API using fetch("/predict").

d. Handle the Response:
    - Display the predicted disease class and confidence.
    - Display a static message/tip based on the predicted disease (map via object).

e. Make It Mobile Friendly:
    - Use CSS Grid or Flexbox.
    - Ensure the layout adjusts for small screen sizes (responsive).

-------------------------------------------------------------
3. API INTEGRATION
-------------------------------------------------------------
Deliverables for Cursor:
- Inside ImageUpload.js, send a POST request to the Flask backend:
-------------------------------------------------------------
const formData = new FormData();
formData.append("file", selectedImage);

const res = await fetch("http://127.0.0.1:5000/predict", {
  method: "POST",
  body: formData,
});
const data = await res.json();
-------------------------------------------------------------
- Pass the `data.prediction` and `data.confidence` to PredictionResult.js.

-------------------------------------------------------------
4. OPTIONAL ENHANCEMENTS
-------------------------------------------------------------
- Add Kiswahili ↔ English language toggle (using React context or state).
- Add basic disease descriptions/treatment tips mapped to each class.
- Allow camera capture using the 'react-webcam' package.

-------------------------------------------------------------
5. DEPLOYMENT SUGGESTIONS
-------------------------------------------------------------
- Deploy Flask API using Render or Railway.
- Deploy React frontend to Netlify or Vercel.
- Update React fetch() call to use deployed Flask URL (instead of localhost).
