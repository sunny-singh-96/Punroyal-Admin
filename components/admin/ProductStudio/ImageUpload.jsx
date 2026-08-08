const ImageUpload = ({ label }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Instant Preview (10x Faster feel)
    setPreview(URL.createObjectURL(file));

    // 2. Background Upload
    const formData = new FormData();
    formData.append("media", file);
    try {
      await axios.post("/api/product/upload-media", formData);
    } catch (err) {
      console.error("Upload failed");
    }
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center">
      {preview ? <img src={preview} className="w-full h-32 object-contain" /> : <span>{label}</span>}
      <input type="file" onChange={handleFile} className="hidden" id={label} />
      <label htmlFor={label} className="cursor-pointer mt-2 text-blue-600 text-xs">Upload</label>
    </div>
  );
};