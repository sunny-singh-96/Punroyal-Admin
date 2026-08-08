const SizeRow = ({ sizeData, selectedSizes, onUpdate, errors, vIdx, sIdx }) => {
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  // Jo sizes pehle se select hain, unhe dropdown se hata do
  const availableOptions = allSizes.filter(s => s === sizeData.size || !selectedSizes.includes(s));

  return (
    <div className="flex gap-4 mb-2 items-center">
      <select 
        value={sizeData.size}
        className="p-2 border rounded border-gray-300"
        onChange={(e) => onUpdate('size', e.target.value)}
      >
        {availableOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>

      <div className="flex-1">
        <input 
          placeholder="SKU"
          className={`w-full p-2 border rounded ${errors[`sku_${vIdx}_${sIdx}`] ? 'border-red-500' : 'border-gray-200'}`}
          onBlur={(e) => !e.target.value && onUpdate('error', 'sku', vIdx, sIdx)}
        />
      </div>
    </div>
  );
};