import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Dumbbell, 
  Utensils, 
  ShoppingCart,
  Clock,
  CheckCircle
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const stats = {
    workoutsCompleted: 12,
    attendanceStreak: 5,
    nextWorkout: 'Tomorrow at 10:00 AM',
    dietPlanStatus: 'On Track',
    points: 150
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Workouts Completed</p>
              <p className="text-2xl font-bold">{stats.workoutsCompleted}</p>
            </div>
            <Dumbbell className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Attendance Streak</p>
              <p className="text-2xl font-bold">{stats.attendanceStreak} days</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Points Earned</p>
              <p className="text-2xl font-bold">{stats.points}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/dashboard/workout" 
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <Dumbbell className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-semibold">Workout</h3>
            <p className="text-sm text-gray-500">View your workout plan</p>
          </div>
        </Link>

        <Link 
          to="/dashboard/attendance" 
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <Calendar className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-semibold">Attendance</h3>
            <p className="text-sm text-gray-500">Track your visits</p>
          </div>
        </Link>

        <Link 
          to="/dashboard/diet" 
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <Utensils className="h-8 w-8 text-red-500 mb-2" />
            <h3 className="font-semibold">Diet Plan</h3>
            <p className="text-sm text-gray-500">View your nutrition</p>
          </div>
        </Link>

        <Link 
          to="/dashboard/shop" 
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <ShoppingCart className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-semibold">Shop</h3>
            <p className="text-sm text-gray-500">Browse products</p>
          </div>
        </Link>
      </div>

      {/* Next Workout */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Next Workout</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">{stats.nextWorkout}</p>
            <p className="text-sm text-gray-500">Status: {stats.dietPlanStatus}</p>
          </div>
          <Link 
            to="/dashboard/workout" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
