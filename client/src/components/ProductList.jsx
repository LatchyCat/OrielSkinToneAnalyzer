// src/components/ProductList.jsx

import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const placeholderImage = '/Users/latchy/OrielSkinToneAnalyzer/client/src/assets/AiGucciman.jpg';

const ProductImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src) return null;

  return (
    <div className="relative mt-2 w-full h-48 overflow-hidden rounded-lg shadow-md">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-200 to-orange-200">
          <Loader className="animate-spin text-pink-500" size={24} />
        </div>
      )}
      <img
        src={src}
        alt={alt || 'Product Image'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setError(true);
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-200 to-orange-200 text-pink-600">
          Image not available
        </div>
      )}
    </div>
  );
};

const ProductList = ({ products, filters }) => {
  const filteredProducts = products.filter(product => {
    if (!product || !product.image_link) return false;
    const brandMatch = !filters.brand || (product.brand && product.brand.toLowerCase() === filters.brand.toLowerCase());
    const typeMatch = !filters.product_type || (product.product_type && product.product_type.toLowerCase() === filters.product_type.toLowerCase());
    return brandMatch && typeMatch;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <ProductImage src={product.image_link} alt={product.name} />
          <div className="p-4">
            <h3 className="font-bold text-lg text-pink-600 mb-2">{product.name || 'Unnamed Product'}</h3>
            <p className="text-sm text-gray-600 mb-1">Brand: <span className="font-semibold text-orange-500">{product.brand || 'Unknown'}</span></p>
            <p className="text-sm text-gray-600 mb-1">Price: <span className="font-semibold text-green-500">${product.price || 'N/A'}</span></p>
            <p className="text-sm text-gray-600">Category: <span className="font-semibold text-purple-500">{product.category || 'N/A'}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
