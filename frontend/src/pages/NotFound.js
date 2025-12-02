// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page non trouvée</p>
      <Link to="/" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;