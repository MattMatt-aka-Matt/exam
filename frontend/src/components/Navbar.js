// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">E-Commerce</Link>
        
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">Produits</Link>
          <Link to="/cart" className="hover:underline">Panier</Link>
          
          {token ? (
            <>
              <Link to="/profile" className="hover:underline">Profil</Link>
              {role === 'admin' && (
                <Link to="/admin" className="hover:underline">Admin</Link>
              )}
              <span className="text-sm">Bonjour, {username}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Connexion</Link>
              <Link to="/register" className="hover:underline">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;