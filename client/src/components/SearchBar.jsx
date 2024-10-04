import React, { useState, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useMakeupSearch } from '../contexts/useMakeupSearchContext'; // Updated import
import debounce from 'lodash/debounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [productType, setProductType] = useState('');
  const [brand, setBrand] = useState('');
  const { search, loading, error } = useMakeupSearch(); // Updated to use useMakeupSearch

  // Memoized product types and brands
  const productTypes = useMemo(() => [
    "Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", "Foundation",
    "Lip liner", "Lipstick", "Mascara", "Nail polish"
  ], []);

  const brands = useMemo(() => [
    "maybelline", "covergirl", "nyx", "revlon", "l'oreal", "almay", "annabelle", "benefit"
    // Add more brands as needed
  ], []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchParams) => {
      search(searchParams);
    }, 300),
    [search]
  );

  // Handle input changes
  const handleInputChange = useCallback((e, setter) => {
    const value = e.target.value;
    setter(value);
    debouncedSearch({ productType, brand, tags: query, [e.target.name]: value });
  }, [productType, brand, query, debouncedSearch]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => handleInputChange(e, setQuery)}
          placeholder="Search makeup products..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="productType"
          value={productType}
          onChange={(e) => handleInputChange(e, setProductType)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {productTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
        <select
          name="brand"
          value={brand}
          onChange={(e) => handleInputChange(e, setBrand)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b.toLowerCase()}>{b}</option>
          ))}
        </select>
        <button
          onClick={() => debouncedSearch({ productType, brand, tags: query })}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 transition duration-150 ease-in-out"
        >
          <Search size={20} />
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default React.memo(SearchBar);
