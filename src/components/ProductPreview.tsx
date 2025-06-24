import React, { useState, useMemo } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Eye, Printer } from 'lucide-react';
import LabelsTemplate from './LabelsTemplate';
import { LabelData } from '../types/product';

interface ProductPreviewProps {
  labels: LabelData[];
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ labels }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Memoize the PDF document to prevent re-rendering conflicts
  const pdfDocument = useMemo(() => {
    return <LabelsTemplate labels={labels} />;
  }, [labels]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Étiquettes Produits</title></head><body>');
      printWindow.document.write('<p>Impression en cours...</p>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Eye className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Aperçu PDF</h2>
            <p className="text-sm text-gray-600">{labels.length} étiquette(s)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {isFullscreen ? 'Normal' : 'Plein écran'}
          </button>
          

          
          <PDFDownloadLink
            document={pdfDocument}
            fileName={`etiquettes-produits-${new Date().toISOString().split('T')[0]}.pdf`}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
          >
            {({ loading }) => (
              <>
                <Download className="h-4 w-4" />
                {loading ? 'Génération...' : 'Télécharger'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className={`flex-1 ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
        {isFullscreen && (
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Aperçu PDF - Mode plein écran</h3>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              Fermer
            </button>
          </div>
        )}
        
        <div className={`${isFullscreen ? 'p-4 h-full' : 'h-full'}`}>
          {labels.length > 0 ? (
            <PDFViewer 
              key={JSON.stringify(labels)}
              width="100%" 
              height="100%" 
              className="border-0"
              showToolbar={isFullscreen}
            >
              {pdfDocument}
            </PDFViewer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Eye className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Aucune étiquette à afficher</p>
                <p className="text-sm">Ajoutez des étiquettes pour voir l'aperçu</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Mise à jour en temps réel</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Synchronisé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;