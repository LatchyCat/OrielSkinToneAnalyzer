import React, { createContext, useContext, useState } from 'react';
import { searchProducts } from '../utils/makeupApi';

const MakeupSearchContext = createContext();

export const MakeupSearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (criteria) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchProducts(criteria);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MakeupSearchContext.Provider value={{ searchResults, loading, error, search }}>
      {children}
    </MakeupSearchContext.Provider>
  );
};

export const useMakeupSearch = () => {
  const context = useContext(MakeupSearchContext);
  if (!context) {
    throw new Error('useMakeupSearch must be used within a MakeupSearchProvider');
  }
  return context;
};
