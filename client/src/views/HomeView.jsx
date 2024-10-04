import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Search } from 'lucide-react';
import { detectSkinTone } from '../utils/perfectAiApi';
import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import ProductFilters from '../components/ProductFilters';

const HomeView = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [skinTone, setSkinTone] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
    }
    setIsLoading(false);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (err) {
      setError("Unable to access the camera. Please make sure you've granted the necessary permissions.");
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      closeCamera();
      analyzeImage(imageDataUrl);
    }
  };

  const analyzeImage = async (imageDataUrl) => {
    setIsLoading(true);
    try {
      const tone = await detectSkinTone(imageDataUrl);
      setSkinTone(tone);
      // Here you would typically call an API to get product recommendations based on skin tone
      // For now, we'll just filter the existing products as an example
      const recommendations = allProducts.filter(product =>
        product.product_type === 'foundation' && product.name.toLowerCase().includes(tone.toLowerCase())
      );
      setRecommendedProducts(recommendations);
    } catch (error) {
      setError("An error occurred while analyzing the image. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.brand.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (filters) => {
    // Implement filtering logic here
    // This is a simple example, you might want to expand this based on your needs
    const filtered = allProducts.filter(product =>
      (!filters.brand || product.brand === filters.brand) &&
      (!filters.product_type || product.product_type === filters.product_type)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to MakeupMatcher</h1>

      <div className="mb-8">
        <button
          onClick={openCamera}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center mr-4"
        >
          <Camera className="mr-2" />
          Scan Face for Recommendations
        </button>
      </div>

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Face Scan</h2>
              <button onClick={closeCamera} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto mb-4"
              style={{ maxHeight: '60vh' }}
            />
            <button
              onClick={captureImage}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Capture
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading && <p>Loading...</p>}

      {skinTone && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Personalized Recommendations</h2>
          <p className="mb-4">Based on your detected skin tone: {skinTone}</p>
          <ProductList products={recommendedProducts} />
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Products</h2>
        <ProductSearch onSearch={handleSearch} />
        <ProductFilters onFilter={handleFilter} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default HomeView;
