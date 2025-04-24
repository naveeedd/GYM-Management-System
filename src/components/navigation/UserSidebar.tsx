import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Home, 
  Calendar, 
  ShoppingCart, 
  Utensils, 
  Calculator, 
  LogOut, 
  User,
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link to="/dashboard" className="flex items-center">
            <Dumbbell className="h-7 w-7 text-red-500 mr-2" />
            <span className="font-bold text-lg">FlexFit</span>
          </Link>
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-gray-300" />
            </div>
            <div>
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-gray-400">Member</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/dashboard') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link 
            to="/dashboard/plans" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/dashboard/plans') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Calculator className="h-5 w-5 mr-3" />
            My Plans
          </Link>

          <Link 
            to="/dashboard/attendance" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/dashboard/attendance') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Attendance
          </Link>

          <Link 
            to="/dashboard/workout" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/dashboard/workout') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Dumbbell className="h-5 w-5 mr-3" />
            Workout
          </Link>

          <Link 
            to="/dashboard/diet" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/dashboard/diet') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Utensils className="h-5 w-5 mr-3" />
            Diet Plan
          </Link>

          <Link 
            to="/dashboard/shop" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/dashboard/shop') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="h-5 w-5 mr-3" />
            Protein Shop
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
          <button 
            onClick={handleSignOut}
            className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;