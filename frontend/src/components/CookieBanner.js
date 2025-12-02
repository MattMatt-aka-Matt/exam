// src/components/CookieBanner.js
import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const refuseCookies = () => {
    localStorage.setItem('cookieConsent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Nous utilisons des cookies pour améliorer votre expérience. 
          <a href="/privacy" className="underline ml-1">En savoir plus</a>
        </p>
        <div className="flex gap-2">
          <button onClick={refuseCookies} className="bg-gray-600 px-4 py-2 rounded text-sm">
            Refuser
          </button>
          <button onClick={acceptCookies} className="bg-blue-500 px-4 py-2 rounded text-sm">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;