import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { styles } from '../utils/pdfStyles';
import { LabelData } from '../types/product';

interface LabelsTemplateProps {
  labels: LabelData[];
}

const LabelsTemplate: React.FC<LabelsTemplateProps> = ({ labels }) => {
  /* ——— 4 étiquettes → 1 page ——— */
  const perPage = 4;
  const pages: LabelData[][] = [];
  for (let i = 0; i < labels.length; i += perPage) {
    pages.push(labels.slice(i, i + perPage));
  }
  if (pages.length === 0) pages.push([]);

  /* ——— rendu d'une étiquette ——— */
  const renderLabel = (label: LabelData | null) => {
    return (
      <View style={styles.baseLabel}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src="/logo1-Photoroom.png" />
        </View>

        {/* Prix */}
        <View style={styles.pricesContainer}>
          <Text style={styles.priceHT}>
            {label ? label.priceHT.toFixed(2).replace('.', ',') : '--,--'} € HT
          </Text>
          <Text style={styles.priceTTC}>
            {label ? label.priceTTC.toFixed(2).replace('.', ',') : '--,--'} € TTC
          </Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.productId}>
            {label ? label.id : '---'}
          </Text>
          <Text style={styles.description}>
            {label ? label.description : 'Étiquette vide – ajoutez un produit'}
          </Text>
        </View>
      </View>
    );
  };

  /* ——— rendu des pages ——— */
  return (
    <Document>
      {pages.map((pageLabels, pageIdx) => (
        <Page
          key={pageIdx}
          size="A4"
          orientation="landscape"
          style={styles.page}
        >
          {/* Bande bleue du haut */}
          <View style={styles.topBand} />
          
          {/* Contenu principal */}
          <View style={styles.mainContent}>
            {/* Première ligne d'étiquettes */}
            <View style={styles.firstRowContainer}>
              {renderLabel(pageLabels[0] ?? null)}
              {renderLabel(pageLabels[1] ?? null)}
            </View>
            
            {/* Bande bleue du milieu */}
            <View style={styles.middleBand} />
            
            {/* Deuxième ligne d'étiquettes */}
            <View style={styles.secondRowContainer}>
              {renderLabel(pageLabels[2] ?? null)}
              {renderLabel(pageLabels[3] ?? null)}
            </View>
          </View>
          
          {/* Bande bleue du bas */}
          <View style={styles.bottomBand} />
        </Page>
      ))}
    </Document>
  );
};

export default LabelsTemplate;