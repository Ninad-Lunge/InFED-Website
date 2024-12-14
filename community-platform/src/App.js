import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import JoinCommunityPage from './Pages/Join';
import HomeDashboard from './Pages/Home';
import ProfilePage from './Pages/ProfilePage';

// Protected Route Wrapper
const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login-page" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/join-page" element={<JoinCommunityPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login-page" replace />} />
      </Routes>
    </Router>
  );
}

export default App;