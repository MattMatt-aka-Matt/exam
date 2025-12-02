// src/pages/Profile.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/auth/delete-account`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.clear();
      alert('Compte supprimé avec succès');
      navigate('/');
    } catch (error) {
      alert('Erreur lors de la suppression du compte');
    }
  };

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/auth/export-data`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dataStr = JSON.stringify(response.data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mes-donnees.json';
      link.click();
    } catch (error) {
      alert('Erreur lors de l\'export des données');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
      
      <div className="bg-white p-6 rounded shadow mb-6">
        <p className="text-lg"><strong>Nom d'utilisateur :</strong> {username}</p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleExportData}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          📥 Exporter mes données (RGPD)
        </button>

        <button 
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          🗑️ Supprimer mon compte
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
            <div className="flex gap-4">
              <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded">
                Confirmer
              </button>
              <button onClick={() => setShowConfirm(false)} className="bg-gray-300 px-4 py-2 rounded">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;