import { useState, useCallback } from 'react';

const API_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

const useMakeupSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        brand: params.brand || '',
        product_type: params.productType || '',
        product_tags: params.query || '',
      }).toString();

      const response = await fetch(`${API_URL}?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
};

export default useMakeupSearch;
