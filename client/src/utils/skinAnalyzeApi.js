// src/utils/skinAnalyzeApi.js
const SKIN_ANALYZE_API_URL = 'https://skin-analyze.p.rapidapi.com/facebody/analysis/skinanalyze';
const API_KEY = '29d6e1023emsh0716acfd3c36b7ep1ccbf5jsn2f2b4a83a6b3';

export const analyzeSkin = async (imageDataUrl) => {
  const blob = await fetch(imageDataUrl).then(r => r.blob());
  const formData = new FormData();
  formData.append('image', blob, 'image.jpg');

  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'skin-analyze.p.rapidapi.com'
    },
    body: formData
  };

  try {
    const response = await fetch(SKIN_ANALYZE_API_URL, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing skin:', error);
    throw error;
  }
};
