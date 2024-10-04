import mockProducts from './mockProducts'; // You'll need to create this file

const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const fetchProducts = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${CORS_PROXY}${BASE_URL}?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    console.log('Using fallback data');
    return mockProducts; // You'll need to create this mock data
  }
};

export const getProductsByType = (productType, page = 1, limit = 10) => {
  return fetchProducts({ product_type: productType, page, limit });
};

export const getProductsByCategory = (category, page = 1, limit = 10) => {
  return fetchProducts({ product_category: category, page, limit });
};

export const getProductsByTags = (tags, page = 1, limit = 10) => {
  const tagsString = Array.isArray(tags) ? tags.join(',') : tags;
  return fetchProducts({ product_tags: tagsString, page, limit });
};

export const getProductsByBrand = (brand, page = 1, limit = 10) => {
  return fetchProducts({ brand, page, limit });
};

export const searchProducts = ({ productType, brand, tags, category, priceMin, priceMax, rating, page = 1, limit = 10 }) => {
  const params = { page, limit };
  if (productType) params.product_type = productType;
  if (brand) params.brand = brand;
  if (tags) params.product_tags = Array.isArray(tags) ? tags.join(',') : tags;
  if (category) params.product_category = category;
  if (priceMin) params.price_greater_than = priceMin;
  if (priceMax) params.price_less_than = priceMax;
  if (rating) params.rating_greater_than = rating;

  return fetchProducts(params);
};
