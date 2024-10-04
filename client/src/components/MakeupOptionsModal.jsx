import React from 'react';
import { X } from 'lucide-react';

const MakeupOptionsModal = ({ isOpen, onClose, onSelect }) => {
  const brands = [
    'Maybelline', 'L\'Oreal', 'Covergirl', 'NYX', 'Revlon',
    'Almay', 'Physicians Formula', 'e.l.f.', 'Wet n Wild'
  ];

  const products = [
    'Lipstick', 'Foundation', 'Mascara', 'Eyeshadow', 'Blush',
    'Eyeliner', 'Concealer', 'Bronzer', 'Nail Polish', 'Lip Gloss'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Makeup Options</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Brands</h3>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => onSelect('brand', brand)}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-2 px-4 rounded"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <div className="grid grid-cols-2 gap-2">
              {products.map((product) => (
                <button
                  key={product}
                  onClick={() => onSelect('product', product)}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold py-2 px-4 rounded"
                >
                  {product}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupOptionsModal;
