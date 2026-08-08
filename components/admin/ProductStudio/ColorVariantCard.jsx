import ColorHeader from './ColorHeader';
import ImageUpload from './ImageUpload';
import SizeRow from './SizeRow';

const ColorVariantCard = ({ errors, setErrors }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border mb-6 overflow-hidden">
      <ColorHeader />
      <div className="p-6 grid grid-cols-12 gap-8">
        <div className="col-span-7 grid grid-cols-5 gap-2">
           <ImageUpload label="FRONT" />
           <ImageUpload label="BACK" />
           <ImageUpload label="SIDE" />
           <ImageUpload label="CHART" />
           <ImageUpload label="CLOSEUP" />
        </div>
        <div className="col-span-5">
           <SizeRow vIdx={0} sIdx={0} errors={errors} selectedSizes={[]} />
           {/* Add Size button logic here */}
        </div>
      </div>
    </div>
  );
};