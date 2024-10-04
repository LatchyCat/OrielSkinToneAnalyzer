import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronDown, User } from 'lucide-react';
import SearchBar from './SearchBar';
import MakeupOptionsModal from './MakeupOptionsModal';

const TopNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionSelect = (type, value) => {
    console.log(`Selected ${type}: ${value}`);
    // Here you can add logic to handle the selection, such as updating a search filter
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Home Button */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              <Home size={24} />
            </Link>
          </div>

          {/* SearchBar Component */}
          <SearchBar />

          {/* Makeup Options Button */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              Makeup Options
              <ChevronDown size={20} className="ml-1" />
            </button>
          </div>

          {/* Login and Register Buttons */}
          <div className="flex items-center">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Makeup Options Modal */}
      <MakeupOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleOptionSelect}
      />
    </nav>
  );
};

export default TopNav;
