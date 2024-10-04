import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import ProductFilters from '../components/ProductFilters';

const AllProductsView = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Makeup Search</h1>
      <SearchBar />
      <ProductFilters onFilter={handleFilterChange} />
      <ProductList filters={filters} />
    </div>
  );
};

export default AllProductsView;
