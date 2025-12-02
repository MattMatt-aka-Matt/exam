// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * Composant de navigation principal
 * Affiche les liens de navigation, le panier et les options utilisateur
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  // Récupération des infos utilisateur depuis le localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  // Calcul du nombre total d'articles dans le panier
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  /**
   * Déconnecte l'utilisateur en vidant le localStorage
   */
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Lien accueil */}
        <Link to="/" className="text-xl font-bold">E-Commerce</Link>
        
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">Produits</Link>
          
          {/* Panier avec badge indiquant le nombre d'articles */}
          <Link to="/cart" className="hover:underline relative">
            Panier
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Affichage conditionnel selon l'état de connexion */}
          {token ? (
            <>
              <Link to="/profile" className="hover:underline">Profil</Link>
              {/* Lien admin visible uniquement pour les administrateurs */}
              {role === 'admin' && (
                <Link to="/admin" className="hover:underline">Admin</Link>
              )}
              <span className="text-sm">Bonjour, {username}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
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