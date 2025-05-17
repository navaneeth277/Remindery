import {  Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reminder from './pages/MyTasks';
import MyDiary from './pages/MyDiary';
import Login from './loginsigup/login';
import Signup from './loginsigup/signup';
import './index.css';

function App() {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'; // Check if the user is on login or signup page

  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isAuthPage ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={isAuthPage ? <Signup /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={token ? <Reminder /> : <Navigate to="/login" />} />
        <Route path="/diary" element={token ? <MyDiary /> : <Navigate to="/login" />} />

        {/* Default Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    
  );
}

export default App;
