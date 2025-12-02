# CHANGELOG

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

## [1.1.0] - 2024-12-02

### 🔒 Sécurité

- **Ajout de Helmet.js** : Protection des headers HTTP contre XSS, clickjacking et sniffing
- **Ajout de express-rate-limit** : Limitation à 100 requêtes/15min sur `/api/auth` pour contrer le brute-force
- **Ajout de express-mongo-sanitize** : Protection contre les injections NoSQL
- **Configuration CORS restrictive** : Remplacement du CORS permissif par une liste blanche d'origines autorisées
- **Limitation payload JSON** : Taille maximale de 10kb pour éviter les attaques DoS
- **Messages d'erreur génériques** : "Identifiants incorrects" au lieu de messages révélateurs (énumération d'utilisateurs)
- **Validation des entrées avec Joi** : Schémas de validation pour login et register avec règles de complexité mot de passe

### 🐛 Corrections de bugs

- **Suppression des logs sensibles** : Retrait des `console.log()` qui exposaient mots de passe et tokens
- **Appel notification asynchrone** : L'envoi d'email ne bloque plus la réponse client dans `createOrder`
- **URL gateway dynamique** : Utilisation de `process.env.GATEWAY_URL` au lieu d'une URL en dur
- **Vérification username à l'inscription** : Ajout de la vérification du nom d'utilisateur en plus de l'email
- **Gestion d'erreurs globale** : Middleware de capture des erreurs + handler 404

### ⚖️ Conformité RGPD

#### Pages légales
- **Page Mentions Légales (`/legal`)** : Informations sur l'éditeur du site, l'hébergeur (Render) et la propriété intellectuelle
- **Page Politique de Confidentialité (`/privacy`)** : Détail des données collectées, leur utilisation et les droits des utilisateurs
- **Page CGV (`/terms`)** : Conditions générales de vente avec articles sur les prix, commandes, livraison et droit de rétractation

#### Consentement cookies
- **Composant CookieBanner** : Bannière de consentement aux cookies affichée au premier accès
  - Bouton "Accepter" pour donner son consentement
  - Bouton "Refuser" pour refuser les cookies non essentiels
  - Stockage du choix dans le localStorage
  - Lien vers la politique de confidentialité

#### Droits des utilisateurs
- **Route DELETE `/api/auth/delete-account`** : Permet à l'utilisateur de supprimer son compte et toutes ses données (droit à l'effacement)
- **Route GET `/api/auth/export-data`** : Permet à l'utilisateur d'exporter ses données personnelles en JSON (droit à la portabilité)
- **Case à cocher CGV à l'inscription** : L'utilisateur doit accepter les conditions générales pour s'inscrire

#### Footer
- **Composant Footer** : Pied de page avec liens vers les pages légales obligatoires
  - Lien vers Politique de confidentialité
  - Lien vers Mentions légales
  - Lien vers CGV

### ✨ Nouvelles fonctionnalités

- **Route GET /health** : Endpoint de health check pour le monitoring
- **Système de logging Winston** : Logs structurés avec timestamps, sans données sensibles

### 📝 Documentation

- Ajout de commentaires JSDoc sur les fonctions backend
- Commentaires explicatifs dans les composants React
- Création du fichier CHANGELOG.md

### 🔧 Améliorations techniques

- Ajout du fichier `logger.js` pour centraliser les logs
- Ajout du fichier `validators/authValidator.js` pour la validation des entrées
- Configuration `trust proxy` pour le bon fonctionnement du rate limiting derrière un reverse proxy

---

## [1.0.0] - Version initiale

- Authentification basique (login/register)
- Gestion des produits
- Gestion des commandes
- Interface React avec Tailwind CSS