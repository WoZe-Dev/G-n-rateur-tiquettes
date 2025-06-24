# Générateur d'étiquettes PDF

![Aperçu du projet](public/img.PNG)

Ce projet React a été développé dans le cadre d’un besoin en entreprise afin de faciliter la création, la gestion et l’impression d’étiquettes de production au format PDF. Il vise à optimiser le suivi des stocks et l'organisation des rayonnages, tout en simplifiant les processus d’étiquetage.

## ✨ Fonctionnalités

- **Ajout d'étiquettes** : Saisie de l'ID produit, description, prix HT avec calcul automatique du prix TTC.
- **Gestion des doublons** : Notification si un ID produit existe déjà.
- **Suppression d'étiquettes** : Retrait facile d'une étiquette de la liste.
- **Prévisualisation** : Affichage en temps réel des étiquettes créées.
- **Génération PDF** : Téléchargement d’un PDF prêt à imprimer (4 étiquettes par page).
- **Notifications** : Utilisation de pop-ups pour les erreurs et confirmations.

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone url-du-repo
   cd project
   npm install
   npm run dev
   
Rendez-vous sur http://localhost:5173 dans votre navigateur.

📁 Structure du projet

src/
├── components/      # Composants React (formulaire, PDF template, etc.)
├── types/           # Types TypeScript pour les produits et étiquettes
├── utils/           # Styles PDF et fonctions utilitaires
public/              # Images (img.png, logos) et fichiers statiques

🛠️ Technologies utilisées
React
TypeScript
Vite
