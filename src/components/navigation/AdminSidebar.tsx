import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Home, 
  Users, 
  ShoppingCart, 
  Package, 
  Calendar, 
  TrendingUp,
  LogOut, 
  User,
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
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
          <Link to="/admin" className="flex items-center">
            <Dumbbell className="h-7 w-7 text-red-500 mr-2" />
            <span className="font-bold text-lg">FlexFit Admin</span>
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
            <div className="bg-red-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-red-400">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link 
            to="/admin/users" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/users') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Users className="h-5 w-5 mr-3" />
            Users
          </Link>

          <Link 
            to="/admin/inventory" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/inventory') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Package className="h-5 w-5 mr-3" />
            Inventory
          </Link>

          <Link 
            to="/admin/orders" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/orders') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="h-5 w-5 mr-3" />
            Orders
          </Link>

          <Link 
            to="/admin/plans" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/plans') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Dumbbell className="h-5 w-5 mr-3" />
            Plans
          </Link>

          <Link 
            to="/admin/attendance" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/attendance') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Attendance
          </Link>

          <Link 
            to="/admin/finance" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/admin/finance') 
                ? 'bg-red-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Finance
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

export default AdminSidebar;