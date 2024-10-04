import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-r-lg">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
