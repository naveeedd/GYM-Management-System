import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  isAdmin?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, isAdmin = false }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="hidden md:block text-xl font-semibold text-gray-800 ml-4">
            {isAdmin ? 'Admin Dashboard' : 'Member Dashboard'}
          </h1>
        </div>

        <div className="flex items-center">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <button className="ml-4 p-1 text-gray-600 hover:text-gray-900 focus:outline-none">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;