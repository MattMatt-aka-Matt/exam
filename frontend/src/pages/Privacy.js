// src/pages/Privacy.js
import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. Collecte des données</h2>
        <p>Nous collectons les données suivantes :</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Nom d'utilisateur</li>
          <li>Adresse email</li>
          <li>Adresse de livraison</li>
          <li>Historique des commandes</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. Utilisation des données</h2>
        <p>Vos données sont utilisées pour :</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Traiter vos commandes</li>
          <li>Vous envoyer des notifications par email</li>
          <li>Améliorer nos services</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. Vos droits (RGPD)</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Droit d'accès</strong> : consulter vos données</li>
          <li><strong>Droit de rectification</strong> : modifier vos données</li>
          <li><strong>Droit à l'effacement</strong> : supprimer votre compte</li>
          <li><strong>Droit à la portabilité</strong> : exporter vos données</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">4. Contact</h2>
        <p>Pour exercer vos droits : <a href="mailto:contact@example.com" className="text-blue-500">contact@example.com</a></p>
      </section>

      <p className="text-sm text-gray-500 mt-8">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
    </div>
  );
};

export default Privacy;