import * as faceapi from 'face-api.js';

export const loadModels = async () => {
    const MODEL_URL = '/models'; // You need to host these models yourself
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
};