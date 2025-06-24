import React, { useState } from 'react';
import { FileText, Zap } from 'lucide-react';
import ProductForm from './components/ProductForm';
import ProductPreview from './components/ProductPreview';
import { LabelData } from './types/product';

function App() {
  const [labels, setLabels] = useState<LabelData[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Générateur d'Étiquettes 
                </h1>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Form Section */}
          <div className="flex flex-col">
            <ProductForm labels={labels} onDataChange={setLabels} />
          </div>

          {/* Preview Section */}
          <div className="flex flex-col">
            <ProductPreview labels={labels} />
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default App;