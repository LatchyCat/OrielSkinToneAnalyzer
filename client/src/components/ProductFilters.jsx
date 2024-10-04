import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

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

  const SelectInput = ({ label, value, onChange, options, id }) => (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-pink-600 mb-1">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full pl-3 pr-10 py-2 text-base text-gray-700 bg-white bg-opacity-80 border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent rounded-full appearance-none transition duration-300 ease-in-out shadow-sm hover:shadow-md"
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>{option}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-500">
        <ChevronDown size={20} />
      </div>
    </div>
  );

  return (
    <div className="mb-6 space-y-4 bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center">
        <Filter className="mr-2" size={24} />
        Island Vibes Filter
      </h3>

      <SelectInput
        label="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        options={brands}
        id="brand-select"
      />

      <SelectInput
        label="Product Type"
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
        options={productTypes}
        id="product-type-select"
      />

      <SelectInput
        label="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        options={tags}
        id="tag-select"
      />

      <button
        onClick={handleFilter}
        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg font-bold text-lg"
      >
        Find Your Island Glow
      </button>
    </div>
  );
};

export default ProductFilters;
