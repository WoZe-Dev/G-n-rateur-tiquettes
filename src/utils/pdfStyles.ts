import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Avenir Next Arabic',
  fonts: [
    { src: '/fonts/avenir-next-bold.ttf', fontWeight: 'normal' },
    { src: '/fonts/avenir-next-bold.ttf', fontWeight: 'bold' }
  ]
});

const BLUE_BAND = '#00335F';   // couleur des bandes bleues
const WHITE     = '#ffffff';   // fond blanc des étiquettes
const GREY_TEXT = '#8f9796';   // couleur du texte gris

export const styles = StyleSheet.create({
  /* ——————————— page ——————————— */
  page: {
    flexDirection: 'column',
    backgroundColor: WHITE,
    padding: 0,
    margin: 0,
  },

  /* ——————————— bande bleue du haut (40px) ——————————— */
  topBand: {
    height: 40,
    backgroundColor: BLUE_BAND,
    width: '100%',
  },

  /* ——————————— conteneur principal des étiquettes ——————————— */
  mainContent: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: WHITE,
  },

  /* ——————————— première ligne d'étiquettes ——————————— */
  firstRowContainer: {
    flexDirection: 'row',
    height: 190,
    backgroundColor: WHITE,
    marginBottom: 2,
    alignItems: 'center', // Ajouté pour centrer verticalement
    justifyContent: 'center', // Ajouté pour centrer horizontalement
    marginTop: 20, 
  },

  /* ——————————— bande bleue du milieu (40px) ——————————— */
  middleBand: {
    height: 40,
    backgroundColor: BLUE_BAND,
    width: '100%',
    marginTop: 30,    // même valeur
    marginBottom: 30, // même valeur
  },

  /* ——————————— deuxième ligne d'étiquettes ——————————— */
  secondRowContainer: {
    flexDirection: 'row',
    height: 190,
    backgroundColor: WHITE,
    alignItems: 'center', // Ajouté pour centrer verticalement
    justifyContent: 'center', // Ajouté pour centrer horizontalement
    marginTop: -10, // Remonte la ligne pour un meilleur centrage
  },

  /* ——————————— bande bleue du bas (40px) ——————————— */
  bottomBand: {
    height: 40,
    backgroundColor: BLUE_BAND,
    width: '100%',
  },

  /* ——————————— conteneur étiquette ——————————— */
  baseLabel: {
    width: '50%',
    height: '100%',
    backgroundColor: WHITE,
    paddingTop: 1,
    paddingBottom: 0,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center', // centrer verticalement tout le contenu
    alignItems: 'center',     // centrer horizontalement tout le contenu
  },

  /* ——————————— logo ——————————— */
  logoContainer: { 
    alignItems: 'center',
    justifyContent: 'center', // Ajouté pour centrer le logo
    marginBottom: 2,
    width: '100%',
  },
  logo: { 
    width: 150, 
    height: 75, 
    objectFit: 'contain' 
  },

  /* ——————————— prix ——————————— */
  pricesContainer: { 
    alignItems: 'center',
    justifyContent: 'center', // Ajouté pour centrer les prix
    marginBottom: 8,
    width: '100%',
  },
  priceHT: { 
    fontFamily: 'Avenir Next Arabic',
    fontSize: 40, 
    fontWeight: 'bold',
    color: '#0e4775',
    textAlign: 'center',
    lineHeight: 1.0,
  },
  priceTTC: { 
    fontFamily: 'Avenir Next Arabic',
    fontSize: 34, 
    fontWeight: 'bold',
    color: '#086ba5',
    textAlign: 'center',
    lineHeight: 1.0,
    marginTop: 1,
  },

  /* ——————————— description ——————————— */
  descriptionContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centrer horizontalement dans la colonne
    width: '100%',
    marginTop: 30, // Augmente l'espace entre le prix TTC et la description
  },
  productId: { 
    fontSize: 15, 
    fontWeight: 'normal', // <- change ici
    marginBottom: 0,
    color: GREY_TEXT,
    textAlign: 'center',
    marginRight: 4,
  },
  description: { 
    fontSize: 15, 
    fontWeight: 'normal', // <- ajoute ici pour être sûr
    textAlign: 'center', 
    lineHeight: 1.1,
    color: GREY_TEXT,
    maxWidth: '90%',
    marginLeft: 0,
  },
});