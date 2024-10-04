import React, { useState } from 'react';
import { Search, Sunset } from 'lucide-react';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Discover your island glow..."
          className="w-full px-6 py-3 pr-12 text-sm text-gray-700 placeholder-gray-400 bg-white bg-opacity-80 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Sunset className="h-5 w-5 text-pink-400" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white p-2 rounded-full hover:from-pink-600 hover:to-orange-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
