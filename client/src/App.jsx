import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './utils/ProtectedRoutes';
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
