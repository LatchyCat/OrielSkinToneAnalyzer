import React, { useState, useEffect, useCallback } from 'react';
import { Camera } from 'lucide-react';
import { detectSkinTone, generateAIMakeup, transferMakeup } from '../utils/perfectAiApi';
import { analyzeSkin } from '../utils/skinAnalyzeApi';
import { useMakeupSearch } from '../contexts/useMakeupSearchContext';
import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import ProductFilters from '../components/ProductFilters';
import CameraComponent from '../components/CameraComponent';
import Loader from '../components/Loader';

const HomeView = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const { searchResults, loading, error: searchError, search } = useMakeupSearch();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setIsProductsLoading(true);
    try {
      const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
    }
    setIsProductsLoading(false);
  };

  const handleCapture = useCallback(async (imageDataUrl) => {
    setCapturedImage(imageDataUrl);
    setIsCameraOpen(false);
    setIsLoading(true);
    try {
      const skinTone = await detectSkinTone(imageDataUrl);
      const analysis = await analyzeSkin(imageDataUrl);
      const makeupRecommendations = await generateAIMakeup(imageDataUrl);

      setSkinAnalysis({ ...analysis, skinTone });

      // Use the makeup API search with the detected skin tone and makeup recommendations
      search({ skinTone, ...makeupRecommendations });

      // Filter existing products based on skin analysis (as a fallback)
      const recommendations = allProducts.filter(product =>
        product.product_type === 'foundation' &&
        product.name.toLowerCase().includes(analysis.result.skin_type.skin_type.toLowerCase())
      );
      setRecommendedProducts(recommendations);
    } catch (error) {
      setError("An error occurred while analyzing the image. Please try again.");
    }
    setIsLoading(false);
  }, [allProducts, search]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [allProducts]);

  const handleFilter = useCallback((newFilters) => {
    setFilters(newFilters);
    const filtered = allProducts.filter(product =>
      (!newFilters.brand || (product.brand && product.brand.toLowerCase() === newFilters.brand.toLowerCase())) &&
      (!newFilters.product_type || (product.product_type && product.product_type.toLowerCase() === newFilters.product_type.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6 sm:p-8 md:p-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-pink-600 animate-fade-in-down">
          Welcome to Oriel x Guarapari Minha
        </h1>

        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <Camera className="mr-2" />
            Scan Face for Recommendations
          </button>
        </div>

        {isCameraOpen && (
          <CameraComponent
            onCapture={handleCapture}
            onClose={() => setIsCameraOpen(false)}
          />
        )}

        {(error || searchError) && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg animate-pulse">
            {error || searchError}
          </div>
        )}

        {(isLoading || loading) && (
          <div className="mt-4 flex items-center justify-center text-orange-500">
            <Loader className="animate-spin mr-2" />
            <p>Analyzing image and searching products...</p>
          </div>
        )}

        {capturedImage && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">Your Captured Image</h2>
            <img src={capturedImage} alt="Captured face" className="max-w-md mx-auto mb-4 rounded-lg shadow-sm" />
          </div>
        )}

        {skinAnalysis && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">Your Skin Analysis</h2>
            <p className="mb-4 text-lg">Skin Type: <span className="font-semibold text-orange-500">{skinAnalysis.result.skin_type.skin_type}</span></p>
            <p className="mb-4 text-lg">Skin Tone: <span className="font-semibold text-orange-500">{skinAnalysis.skinTone}</span></p>
            {/* Add more skin analysis details as needed */}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">Your Personalized Recommendations</h2>
            <ProductList products={searchResults} filters={filters} />
          </div>
        )}

        {recommendedProducts.length > 0 && searchResults.length === 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">Fallback Recommendations</h2>
            <ProductList products={recommendedProducts} filters={filters} />
          </div>
        )}

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">Search Products</h2>
          <ProductSearch onSearch={handleSearch} />
          <ProductFilters onFilter={handleFilter} />
          {isProductsLoading ? (
            <div className="mt-4 flex items-center justify-center text-orange-500">
              <Loader className="animate-spin mr-2" />
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductList products={filteredProducts} filters={filters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
