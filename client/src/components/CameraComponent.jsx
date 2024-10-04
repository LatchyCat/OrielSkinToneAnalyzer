// src/components/CameraComponent.jsx
import React, { useRef, useState, useCallback } from 'react';
import { Camera, X, Sun } from 'lucide-react';

const CameraComponent = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  }, [stream, onClose]);

  const captureImage = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      onCapture(imageDataUrl);
      stopCamera();
    }
  }, [onCapture, stopCamera]);

  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-500 to-orange-500 bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-80 p-6 rounded-2xl max-w-lg w-full shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600 flex items-center">
            <Sun className="mr-2 text-yellow-400" size={28} />
            Island Glow Scan
          </h2>
          <button onClick={stopCamera} className="text-gray-500 hover:text-red-500 transition duration-300">
            <X size={28} />
          </button>
        </div>
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-auto mb-4 rounded-lg shadow-inner"
            style={{ maxHeight: '60vh' }}
          />
          <div className="absolute inset-0 border-4 border-yellow-300 opacity-50 rounded-lg pointer-events-none"></div>
        </div>
        <button
          onClick={captureImage}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full w-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg"
        >
          <Camera className="inline-block mr-2" size={24} />
          Capture Your Island Glow
        </button>
      </div>
    </div>
  );
};

export default CameraComponent;
