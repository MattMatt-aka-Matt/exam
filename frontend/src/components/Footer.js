// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 E-Commerce. Tous droits réservés.</p>
          <nav className="flex gap-4 text-sm">
            <Link to="/privacy" className="hover:underline">Politique de confidentialité</Link>
            <Link to="/legal" className="hover:underline">Mentions légales</Link>
            <Link to="/terms" className="hover:underline">CGV</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;