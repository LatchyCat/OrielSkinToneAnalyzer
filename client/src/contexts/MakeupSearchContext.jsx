import React, { createContext, useContext, useState, useCallback } from 'react';
import useMakeupSearch from '../hooks/useMakeupSearch';

const MakeupSearchContext = createContext();

export const MakeupSearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    productType: '',
    brand: '',
  });

  const {
    products,
    loading,
    error,
    fetchProducts,
  } = useMakeupSearch();

  const search = useCallback(async (params) => {
    setSearchParams(params);
    await fetchProducts(params);
  }, [fetchProducts]);

  const resetSearch = useCallback(() => {
    setSearchParams({
      query: '',
      productType: '',
      brand: '',
    });
  }, []);

  const value = {
    searchParams,
    products,
    loading,
    error,
    search,
    resetSearch,
  };

  return (
    <MakeupSearchContext.Provider value={value}>
      {children}
    </MakeupSearchContext.Provider>
  );
};

export const useMakeupSearchContext = () => {
  const context = useContext(MakeupSearchContext);
  if (!context) {
    throw new Error('useMakeupSearchContext must be used within a MakeupSearchProvider');
  }
  return context;
};

export default MakeupSearchContext;
