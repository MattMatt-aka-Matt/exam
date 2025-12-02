// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Composant de connexion utilisateur
 * Gère l'authentification et le stockage du token JWT
 */
const Login = () => {
  // État local pour les identifiants du formulaire
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  
  const navigate = useNavigate();
  
  // URL de l'API depuis les variables d'environnement (fallback localhost)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  /**
   * Gère la soumission du formulaire de connexion
   * @param {Event} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Appel API pour l'authentification
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials
      );
      const { token, role, username } = response.data;

      // Stockage des informations de session dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      // Redirection vers la page d'accueil
      navigate("/");
    } catch (error) {
      // Gestion des erreurs avec message utilisateur
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        
        {/* Champ nom d'utilisateur */}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        
        {/* Champ mot de passe */}
        <input
          type="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;