import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDashboard from './pages/user/Dashboard';
import UserPlans from './pages/user/Plans';
import UserAttendance from './pages/user/Attendance';
import UserWorkout from './pages/user/Workout';
import UserDiet from './pages/user/Diet';
import UserShop from './pages/user/Shop';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminInventory from './pages/admin/Inventory';
import AdminOrders from './pages/admin/Orders';
import AdminPlans from './pages/admin/Plans';
import AdminAttendance from './pages/admin/Attendance';
import AdminFinance from './pages/admin/Finance';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* User protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<UserDashboard />} />
            <Route path="plans" element={<UserPlans />} />
            <Route path="attendance" element={<UserAttendance />} />
            <Route path="workout" element={<UserWorkout />} />
            <Route path="diet" element={<UserDiet />} />
            <Route path="shop" element={<UserShop />} />
          </Route>

          {/* Admin protected routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="plans" element={<AdminPlans />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="finance" element={<AdminFinance />} />
          </Route>

          {/* Fallback routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;