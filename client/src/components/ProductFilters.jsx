import React, { useState } from 'react';

const ProductFilters = ({ onFilter }) => {
  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [tag, setTag] = useState('');

  const handleFilter = () => {
    onFilter({ brand, product_type: productType, tag });
  };

  const brands = [
    "almay", "alva", "anna sui", "annabelle", "benefit", "boosh", "burt's bees",
    "butter london", "c'est moi", "cargo cosmetics", "china glaze", "clinique",
    "coastal classic creation", "colourpop", "covergirl", "dalish", "deciem",
    "dior", "dr. hauschka", "e.l.f.", "essie", "fenty", "glossier", "green people",
    "iman", "l'oreal", "lotus cosmetics usa", "maia's mineral galaxy", "marcelle",
    "marienatie", "maybelline", "milani", "mineral fusion", "misa", "mistura",
    "moov", "nudus", "nyx", "orly", "pacifica", "penny lane organics",
    "physicians formula", "piggy paint", "pure anada", "rejuva minerals",
    "revlon", "sally b's skin yummies", "salon perfect", "sante", "sinful colours",
    "smashbox", "stila", "suncoat", "w3llpeople", "wet n wild", "zorah",
    "zorah biocosmetiques"
  ];

  const tags = [
    "Canadian", "CertClean", "Chemical Free", "Dairy Free", "EWG Verified",
    "EcoCert", "Fair Trade", "Gluten Free", "Hypoallergenic", "Natural",
    "No Talc", "Non-GMO", "Organic", "Peanut Free Product", "Sugar Free",
    "USDA Organic", "Vegan", "alcohol free", "cruelty free", "oil free",
    "purpicks", "silicone free", "water free"
  ];

  const productTypes = [
    "Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", "Foundation",
    "Lip liner", "Lipstick", "Mascara", "Nail polish"
  ];

  return (
    <div className="mb-4 space-y-2">
      <div>
        <label htmlFor="brand-select" className="block text-sm font-medium text-gray-700">Brand</label>
        <select
          id="brand-select"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b.toLowerCase()}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="product-type-select" className="block text-sm font-medium text-gray-700">Product Type</label>
        <select
          id="product-type-select"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
        >
          <option value="">All Types</option>
          {productTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tag-select" className="block text-sm font-medium text-gray-700">Tag</label>
        <select
          id="tag-select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
        >
          <option value="">All Tags</option>
          {tags.map((t) => (
            <option key={t} value={t.toLowerCase()}>{t}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;
