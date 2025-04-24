import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return '/login';
    return userRole === 'admin' ? '/admin' : '/dashboard';
  };

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Dumbbell className="h-8 w-8 text-red-500 mr-2" />
              <span className="text-white font-bold text-xl">FlexFit</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/#plans" className="text-gray-300 hover:text-white px-3 py-2">
              Plans
            </Link>
            <Link to="/#calculator" className="text-gray-300 hover:text-white px-3 py-2">
              BMR Calculator
            </Link>
            <Link to="/#shop" className="text-gray-300 hover:text-white px-3 py-2">
              Shop
            </Link>
            <Link to="/#locations" className="text-gray-300 hover:text-white px-3 py-2">
              Locations
            </Link>
            
            {user ? (
              <button
                onClick={() => navigate(getDashboardLink())}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-4 flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-4 flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-900 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/#plans" 
            className="block text-gray-300 hover:text-white px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            Plans
          </Link>
          <Link 
            to="/#calculator" 
            className="block text-gray-300 hover:text-white px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            BMR Calculator
          </Link>
          <Link 
            to="/#shop" 
            className="block text-gray-300 hover:text-white px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/#locations" 
            className="block text-gray-300 hover:text-white px-3 py-2"
            onClick={() => setIsOpen(false)}
          >
            Locations
          </Link>
          
          {user ? (
            <button
              onClick={() => {
                navigate(getDashboardLink());
                setIsOpen(false);
              }}
              className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
                setIsOpen(false);
              }}
              className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;