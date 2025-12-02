// src/pages/Legal.js
import React from 'react';

const Legal = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Mentions Légales</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Éditeur du site</h2>
        <p>Raison sociale : [Nom de l'entreprise]</p>
        <p>Adresse : [Adresse complète]</p>
        <p>SIRET : [Numéro SIRET]</p>
        <p>Email : contact@example.com</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Hébergeur</h2>
        <p>Nom : Render</p>
        <p>Adresse : 525 Brannan St, San Francisco, CA 94107, USA</p>
        <p>Site : <a href="https://render.com" className="text-blue-500">render.com</a></p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site est protégé par le droit d'auteur.</p>
      </section>
    </div>
  );
};

export default Legal;