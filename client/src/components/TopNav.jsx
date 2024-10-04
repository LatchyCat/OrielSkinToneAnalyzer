import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronDown, User, Sun } from 'lucide-react';
import SearchBar from './SearchBar';
import MakeupOptionsModal from './MakeupOptionsModal';

const TopNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionSelect = (type, value) => {
    console.log(`Selected ${type}: ${value}`);
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-400 to-orange-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Home Button */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white hover:text-yellow-200 transition duration-300">
              <Sun size={32} />
            </Link>
          </div>

          {/* SearchBar Component */}
          <div className="flex-grow mx-4">
            <SearchBar />
          </div>

          {/* Makeup Options Button */}
          <div className="mr-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-white hover:text-yellow-200 transition duration-300 font-semibold"
            >
              Makeup Options
              <ChevronDown size={20} className="ml-1" />
            </button>
          </div>

          {/* Login and Register Buttons */}
          <div className="flex items-center space-x-2">
            <Link to="/login" className="bg-white text-pink-500 hover:bg-yellow-100 font-bold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Login
            </Link>
            <Link to="/register" className="bg-yellow-400 text-white hover:bg-yellow-500 font-bold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
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
