import React, { useState } from 'react';
import ColorVariantCard from './ColorVariantCard';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', base_price: '', category_id: '' });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value || value.toString().trim() === "") {
      setErrors(prev => ({ ...prev, [name]: "This field is mandatory" }));
    } else {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <input 
            className={`w-full p-3 border rounded ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            placeholder="Product Name"
            onBlur={(e) => validateField("name", e.target.value)}
            onChange={(e) => setProduct({...product, name: e.target.value})}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">! {errors.name}</p>}
        </div>
        {/* Category and Price fields similarly with errors.field check */}
      </div>

      <ColorVariantCard errors={errors} setErrors={setErrors} />

      <button 
        className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold mt-8 disabled:bg-gray-400"
        disabled={Object.keys(errors).length > 0 || !product.name}
      >
        FINALIZE & SAVE PRODUCT
      </button>
    </div>
  );
};
export default ProductForm;