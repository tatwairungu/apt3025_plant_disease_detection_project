# Plant Disease Detection App Deployment Guide

This guide explains how to deploy the full-stack plant disease detection app so you can share it with others.

## ✅ App Structure

- **Backend:** Flask API (`app.py`, `best_model.h5`)
- **Frontend:** React (`plant-disease-frontend`)
- **Goal:** Publicly accessible web app with image upload and prediction

---

## ✅ Recommended Deployment Stack

### 1. Render (for Flask API)
- Simple and free
- Automatically builds from GitHub
- Public API URL generated

### 2. Netlify or Vercel (for React Frontend)
- Designed for frontend hosting
- Free plans available
- GitHub auto-deploy support

---

## 🚀 Deployment Plan

### Step 1: Deploy Flask API to Render

1. Push your backend files (`app.py`, `best_model.h5`, etc.) to a new GitHub repo.
2. Add these files:

**requirements.txt**  
Generated with:  
```
pip freeze > requirements.txt
```

**Procfile**
```
web: gunicorn app:app
```

3. Go to [https://render.com](https://render.com)
4. Click **"New Web Service"**
5. Connect your backend repo
6. Set build command: `pip install -r requirements.txt`
7. Set start command: `gunicorn app:app`
8. Choose Free tier and deploy
9. Note your public API URL (e.g., `https://plant-api.onrender.com/predict`)

---

### Step 2: Deploy React Frontend to Netlify or Vercel

1. Push the `plant-disease-frontend` folder to GitHub
2. Go to [https://netlify.com](https://netlify.com) or [https://vercel.com](https://vercel.com)
3. Connect your GitHub account
4. Set:
   - **Build command:** `npm run build`
   - **Output folder:** `build`
5. Deploy and get your public site URL

---

### Step 3: Connect Frontend to Backend

In your React code (e.g. `App.js` or `ImageUpload.js`), replace:

```js
const API_URL = "http://127.0.0.1:5000/predict"
```

With:

```js
const API_URL = "https://your-flask-api.onrender.com/predict"
```

---

## ✅ Result

Once deployed:
- Users can visit your frontend (Netlify/Vercel)
- Upload a leaf image
- Get real-time disease prediction from the backend

No local setup or Postman needed.
