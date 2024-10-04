import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useMakeupSearch } from '../contexts/useMakeupSearchContext';
import debounce from 'lodash/debounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [productType, setProductType] = useState('');
  const [brand, setBrand] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { search, loading, error } = useMakeupSearch();

  const productTypes = useMemo(() => [
    "Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", "Foundation",
    "Lip liner", "Lipstick", "Mascara", "Nail polish"
  ], []);

  const brands = useMemo(() => [
    "maybelline", "covergirl", "nyx", "revlon", "l'oreal", "almay", "annabelle", "benefit"
  ], []);

  const debouncedSearch = useCallback(
    debounce((searchParams) => {
      search(searchParams);
    }, 300),
    [search]
  );

  const handleInputChange = useCallback((e, setter) => {
    const value = e.target.value;
    setter(value);
    debouncedSearch({ productType, brand, tags: value });
  }, [productType, brand, debouncedSearch]);

  useEffect(() => {
    if (query.length > 1) {
      const matchedSuggestions = [...productTypes, ...brands]
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, productTypes, brands]);

  return (
    <div className="max-w-2xl mx-auto mt-8 relative p-6 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => handleInputChange(e, setQuery)}
            placeholder="Search makeup products..."
            className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out placeholder-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-pink-200 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-pink-100 cursor-pointer transition-colors duration-150 ease-in-out"
                  onClick={() => {
                    setQuery(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          name="productType"
          value={productType}
          onChange={(e) => handleInputChange(e, setProductType)}
          className="w-full md:w-auto px-4 py-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out"
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
          className="w-full md:w-auto px-4 py-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b.toLowerCase()}>{b}</option>
          ))}
        </select>
        <button
          onClick={() => debouncedSearch({ productType, brand, tags: query })}
          disabled={loading}
          className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        >
          <Search size={20} className="inline mr-2" />
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 animate-pulse">{error}</p>}
    </div>
  );
};

export default React.memo(SearchBar);
