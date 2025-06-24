import React from 'react';
import { useForm } from 'react-hook-form';
import { Package, Euro, FileText, Plus, Trash2 } from 'lucide-react';
import { ProductFormData, LabelData } from '../types/product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductFormProps {
  labels: LabelData[];
  onDataChange: (labels: LabelData[]) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ labels, onDataChange }) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<ProductFormData>({
    defaultValues: {
      id: '',
      description: '',
      priceHT: '',
      priceTTC: ''
    }
  });

  // Auto-calculate TTC when HT changes (assuming 20% VAT)
  const handleHTChange = (value: string) => {
    const htPrice = parseFloat(value);
    if (!isNaN(htPrice)) {
      const ttcPrice = htPrice * 1.2;
      setValue('priceTTC', ttcPrice.toFixed(2));
    }
  };

  const addLabel = (data: ProductFormData) => {
    if (labels.some(label => label.id === data.id)) {
      toast.error("Cet ID produit existe déjà dans la liste des étiquettes.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const newLabel: LabelData = {
      id: data.id,
      description: data.description,
      priceHT: parseFloat(data.priceHT),
      priceTTC: parseFloat(data.priceTTC)
    };
    const updatedLabels = [...labels, newLabel];
    onDataChange(updatedLabels);
    reset();
  };

  const removeLabel = (id: string) => {
    const updatedLabels = labels.filter(label => label.id !== id);
    onDataChange(updatedLabels);
    toast.success("Étiquette supprimée avec succès !");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Gestion des Étiquettes</h2>
      </div>

      {/* Form for adding new labels */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Ajouter une étiquette</h3>
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Package className="h-4 w-4" />
              ID Produit
            </label>
            <input
              {...register('id', { required: 'L\'ID produit est requis' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: ART4407"
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4" />
              Description
            </label>
            <textarea
              {...register('description', { required: 'La description est requise' })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Description complète du produit (ex: Chaise visiteur ENEA Lottus)"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Euro className="h-4 w-4" />
                Prix HT
              </label>
              <div className="relative">
                <input
                  {...register('priceHT', { 
                    required: 'Le prix HT est requis',
                    pattern: {
                      value: /^\d+(\.\d{2})?$/,
                      message: 'Format invalide (ex: 79.00)'
                    }
                  })}
                  type="text"
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="79.00"
                  onChange={(e) => {
                    handleHTChange(e.target.value);
                  }}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">€</span>
              </div>
              {errors.priceHT && (
                <p className="text-red-500 text-sm mt-1">{errors.priceHT.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Euro className="h-4 w-4" />
                Prix TTC
              </label>
              <div className="relative">
                <input
                  {...register('priceTTC', { 
                    required: 'Le prix TTC est requis',
                    pattern: {
                      value: /^\d+(\.\d{2})?$/,
                      message: 'Format invalide (ex: 94.80)'
                    }
                  })}
                  type="text"
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="94.80"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">€</span>
              </div>
              {errors.priceTTC && (
                <p className="text-red-500 text-sm mt-1">{errors.priceTTC.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit(addLabel)}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter l'étiquette
        </button>
      </div>

      {/* List of current labels */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Étiquettes créées ({labels.length})
        </h3>
        
        {labels.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune étiquette créée</p>
          </div>
        ) : (
          <div className="space-y-3">
            {labels.map((label, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-600">{label.id}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{label.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-700">HT: {label.priceHT.toFixed(2)}€</span>
                    <span className="text-green-600 font-medium">TTC: {label.priceTTC.toFixed(2)}€</span>
                  </div>
                </div>
                <button
                  onClick={() => removeLabel(label.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Info :</strong> Les étiquettes sont organisées par groupes de 4 par page selon votre template. 
          Le système génère automatiquement de nouvelles pages selon le nombre d'étiquettes.
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductForm;