const API_SERVER = 'https://yce-api-01.perfectcorp.com';
const CLIENT_ID = 'BMIL1PIJjCV96JlSl64RlVksHK1cD0PQ';
const ID_TOKEN = 'dMtD+7WpLVe8Z1sdJAQ6GhuJBI+YeR79+FVNspLjEsfMIpfiXmdyskjAPEFgCwseJJozqZeIPjtZi8f5ttSHjCYjnZaYI5mhGU4IGdGofAVcwIBA5UJ/FQcoXh29S2ZG66uKUcnyNnbEW9iu1vha/juy7IRvafOQ3Yx4nxbmrEM=';

let accessToken = null;
let tokenExpirationTime = 0;

const getAccessToken = async () => {
  console.log('Getting access token...');
  const currentTime = Date.now();
  if (accessToken && currentTime < tokenExpirationTime) {
    console.log('Using cached access token');
    return accessToken;
  }

  console.log('Fetching new access token');
  const response = await fetch(`${API_SERVER}/s2s/v1.0/client/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      id_token: ID_TOKEN,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to obtain access token:', errorData);
    throw new Error(`Failed to obtain access token: ${errorData.error_code}`);
  }

  const data = await response.json();
  accessToken = data.result.access_token;
  tokenExpirationTime = currentTime + 3600000; // Assuming token is valid for 1 hour
  console.log('New access token obtained');
  return accessToken;
};

const dataUrlToBlob = async (dataUrl) => {
  console.log('Converting data URL to Blob...');
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  console.log('Data URL converted to Blob');
  return blob;
};

export const detectSkinTone = async (imageDataUrl) => {
  console.log('Detecting skin tone...');
  try {
    const accessToken = await getAccessToken();
    const blob = await dataUrlToBlob(imageDataUrl);

    const formData = new FormData();
    formData.append('file', blob, 'face.jpg');

    console.log('Sending skin tone detection request...');
    const skinToneResponse = await fetch(`${API_SERVER}/skincare/v1.0/detect-skin-tone`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!skinToneResponse.ok) {
      const errorData = await skinToneResponse.json();
      console.error('Skin tone detection failed:', errorData);
      throw new Error(`Failed to detect skin tone: ${errorData.error_code}`);
    }

    const skinToneData = await skinToneResponse.json();
    console.log('Skin tone detected:', skinToneData);
    return skinToneData.skin_tone; // Adjust this based on the actual API response structure
  } catch (error) {
    console.error('Error in detectSkinTone:', error);
    throw error;
  }
};

export const generateAIMakeup = async (imageDataUrl) => {
  console.log('Generating AI makeup...');
  try {
    const accessToken = await getAccessToken();
    const blob = await dataUrlToBlob(imageDataUrl);

    const formData = new FormData();
    formData.append('file', blob, 'face.jpg');

    console.log('Sending AI makeup generation request...');
    const makeupResponse = await fetch(`${API_SERVER}/s2s/v1.0/file/mu-trans-rec`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: [
          {
            content_type: 'image/jpeg',
            file_name: 'face.jpg',
          },
        ],
      }),
    });

    if (!makeupResponse.ok) {
      const errorData = await makeupResponse.json();
      console.error('AI makeup generation failed:', errorData);
      throw new Error(`Failed to generate AI makeup: ${errorData.error_code}`);
    }

    const makeupData = await makeupResponse.json();
    console.log('AI makeup generated:', makeupData);
    return makeupData; // This will contain the makeup recommendations
  } catch (error) {
    console.error('Error in generateAIMakeup:', error);
    throw error;
  }
};

export const transferMakeup = async (faceImageDataUrl, makeupImageDataUrl) => {
  console.log('Transferring makeup...');
  try {
    const accessToken = await getAccessToken();
    const faceBlob = await dataUrlToBlob(faceImageDataUrl);
    const makeupBlob = await dataUrlToBlob(makeupImageDataUrl);

    const formData = new FormData();
    formData.append('face', faceBlob, 'face.jpg');
    formData.append('makeup', makeupBlob, 'makeup.jpg');

    console.log('Sending makeup transfer request...');
    const transferResponse = await fetch(`${API_SERVER}/s2s/v1.0/file/mu-transfer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!transferResponse.ok) {
      const errorData = await transferResponse.json();
      console.error('Makeup transfer failed:', errorData);
      throw new Error(`Failed to transfer makeup: ${errorData.error_code}`);
    }

    console.log('Makeup transfer successful, processing response...');
    const imageBlob = await transferResponse.blob();
    const resultUrl = URL.createObjectURL(imageBlob);
    console.log('Makeup transfer result URL created');
    return resultUrl;
  } catch (error) {
    console.error('Error in transferMakeup:', error);
    throw error;
  }
};
