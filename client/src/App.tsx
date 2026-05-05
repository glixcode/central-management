import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { SyncLoader } from 'react-spinners';

// Public Pages
import HomePage from './pages/HomePage';
import Services from "./pages/Services";
import Login from './pages/Login/login';
import Register from './pages/Register/register';

// Protected Pages
import AdminDashboard from './pages/admin/Dashboard';
import ResidentPortal from './pages/resident/Portal';

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><SyncLoader color="#3b82f6" /></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect based on their role if they don't have access
    if (user.role === 'RESIDENT') return <Navigate to="/portal" replace />;
    return <Navigate to="/admin" replace />;
  }

  return children;
};

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><SyncLoader color="#3b82f6" /></div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={user ? (user.role === 'RESIDENT' ? <Navigate to="/portal" replace /> : <Navigate to="/admin" replace />) : <HomePage />} />
      <Route path='/services' element={<Services />} />
      <Route path='/login' element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path='/register' element={user ? <Navigate to="/" replace /> : <Register />} />

      {/* Admin/Staff Routes */}
      <Route
        path='/admin/*'
        element={
          <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'BARANGAY_ADMIN', 'STAFF']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Resident Routes */}
      <Route
        path='/portal/*'
        element={
          <ProtectedRoute allowedRoles={['RESIDENT']}>
            <ResidentPortal />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;