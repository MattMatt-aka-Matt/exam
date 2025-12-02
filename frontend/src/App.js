// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Order from './pages/Order';
import Admin from './pages/Admin';
import ShippingPayment from './pages/ShippingPayment';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
// Nouvelles pages RGPD
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import CookieBanner from './components/CookieBanner.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <CookieBanner />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/shipping-payment" element={<ProtectedRoute><ShippingPayment /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          {/* Pages RGPD */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/terms" element={<Terms />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;