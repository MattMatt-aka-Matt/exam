// src/pages/Terms.js
import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales de Vente</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Article 1 - Objet</h2>
        <p>Les présentes CGV régissent les ventes de produits sur notre site e-commerce.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Article 2 - Prix</h2>
        <p>Les prix sont indiqués en euros TTC. Ils peuvent être modifiés à tout moment.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Article 3 - Commande</h2>
        <p>La validation de la commande implique l'acceptation des présentes CGV.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Article 4 - Livraison</h2>
        <p>Les délais de livraison sont donnés à titre indicatif.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Article 5 - Droit de rétractation</h2>
        <p>Conformément à la loi, vous disposez d'un délai de 14 jours pour vous rétracter.</p>
      </section>
    </div>
  );
};

export default Terms;