import React, { useState, useEffect } from 'react';

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [filters, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = products;

    if (filters.brand) {
      result = result.filter(product => product.brand && product.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    if (filters.product_type) {
      result = result.filter(product => product.product_type && product.product_type.toLowerCase() === filters.product_type.toLowerCase());
    }

    if (filters.tag) {
      result = result.filter(product =>
        product.tag_list && Array.isArray(product.tag_list) && product.tag_list.some(tag => tag.toLowerCase() === filters.tag.toLowerCase())
      );
    }

    setFilteredProducts(result);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProducts.map(product => (
        <div key={product.id} className="border p-4 rounded-lg">
          <img src={product.image_link} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h3 className="font-bold">{product.name || 'Unnamed Product'}</h3>
          <p>{product.brand || 'Unknown Brand'}</p>
          <p>${product.price || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
