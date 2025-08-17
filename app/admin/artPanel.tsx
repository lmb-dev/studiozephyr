import { useState, ChangeEvent } from 'react';
import { IoAddCircle, IoCloudUpload, IoClose } from 'react-icons/io5';

interface ArtPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function ArtPanel({ settings, setSettings }: ArtPanelProps) {
  const [newArtwork, setNewArtwork] = useState<Artwork>({name: '', collection: '', category: '',  imageURL: ''});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/r2Image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      setNewArtwork(prev => ({ ...prev, imageURL: url }));
    } else {
      alert('Failed to upload image');
      URL.revokeObjectURL(localUrl);
      setPreviewUrl(null);
    }
  };

  // #region Edit Form Functions
  const addArtwork = () => {
    const { name, collection, category, imageURL } = newArtwork;
    if (name && collection && category && imageURL) {
      setSettings(prev => ({ ...prev, art: [...prev.art, newArtwork] }));
      setNewArtwork({ name: '', collection: '', category: '', imageURL: '' });
      setPreviewUrl(null);
    }
  };

  const removeArtwork = (index: number) => {
    setSettings(prev => ({...prev, art: prev.art.filter((_, i) => i !== index)}));
  };

  const updateField = (field: keyof Artwork, value: string) => {
    setNewArtwork(prev => field === 'category' && value !== prev.category 
      ? {...prev, category: value, collection: ''} //clear collection for category
      : {...prev, [field]: value}
    );
  };
  // #endregion

  return (
    <div className="admin-grid">

      <div className="admin-box-l">
        <h3 className="admin-title">Add New Artwork</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Artwork name"
            value={newArtwork.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="admin-input"
          />
          <select
            value={newArtwork.category}
            onChange={(e) => updateField('category', e.target.value)}
            className="admin-input"
          >
            <option value="" className="bg-gray-800">Select category</option>
            {Object.keys(settings.categories).map(cat => (
              <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
            ))}
          </select>
          <select
            value={newArtwork.collection}
            onChange={(e) => updateField('collection', e.target.value)}
            className="admin-input"
          >
            <option value="" className="bg-gray-800 ">Select collection</option>
            {newArtwork.category && settings.categories[newArtwork.category]?.map(collection => (
              <option key={collection} value={collection} className="bg-gray-800">{collection}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Image URL"
              value={newArtwork.imageURL}
              onChange={(e) => updateField('imageURL', e.target.value)}
              className="admin-input"
            />
            <label className="admin-btn-blue">
              <IoCloudUpload size={16} />
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          {previewUrl && (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="Thumbnail preview"
                className="w-32 h-32 object-cover rounded-md border border-gray-600"
              />
            </div>
          )}
          <button onClick={addArtwork} className="w-full admin-btn-green">
            <IoAddCircle size={16} />
            Add Artwork
          </button>
        </div>
      </div>

      <div className="admin-box-r">
        <h3 className="admin-title">Current Artworks ({settings.art.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {settings.art.map((artwork, index) => (
            <div key={index} className="relative group">
              <img
                src={artwork.imageURL}
                alt={artwork.name}
                className="w-32 h-28 object-cover rounded-md border border-gray-600"
              />
              <button onClick={() => removeArtwork(index)} className="admin-btn-red absolute top-1 right-1 z-10 !p-1">
                <IoClose size={16} />
              </button>
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75 rounded-md flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity p-2 z-0">
                <p className="text-sm font-medium text-gray-100">{artwork.name}</p>
                <p className="text-xs text-gray-400">{artwork.category}</p>
                <p className="text-xs text-gray-400">{artwork.collection}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}