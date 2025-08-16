import { useState, ChangeEvent, useEffect } from 'react';
import { IoAddCircle, IoCloudUpload, IoClose } from 'react-icons/io5';

interface ArtPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function ArtPanel({ settings, setSettings }: ArtPanelProps) {
  const [newArtwork, setNewArtwork] = useState<Artwork>({name: '', collection: '', category: '',  imageURL: ''});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/r2Image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data: { url: string } = await response.json();
      return data.url;
    } else {
      alert('Failed to upload image');
      return null;
    } 
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      // Set local preview
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // Upload to R2
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setNewArtwork(prev => ({ ...prev, imageURL: imageUrl }));
      } else {
        URL.revokeObjectURL(localUrl);
        setPreviewUrl(null); // Clear preview if upload fails
      }
    }
  };

  const addArtwork = (): void => {
    if (newArtwork.name && newArtwork.collection && newArtwork.category && newArtwork.imageURL) {
      setSettings(prev => ({
        ...prev,
        art: [...prev.art, newArtwork]
      }));
      setNewArtwork({ name: '', collection: '', category: '', imageURL: '' });
      setPreviewUrl(null); // Clear preview after adding
    }
  };

  const removeArtwork = (index: number): void => {
    setSettings(prev => ({
      ...prev,
      art: prev.art.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Artwork Form */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Add New Artwork</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Artwork name"
              value={newArtwork.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewArtwork(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400"
            />
            <select
              value={newArtwork.category}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewArtwork(prev => ({ ...prev, category: e.target.value, collection: '' }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100"
            >
              <option value="" className="bg-gray-800">Select category</option>
              {Object.keys(settings.categories).map(cat => (
                <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
              ))}
            </select>
            <select
              value={newArtwork.collection}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewArtwork(prev => ({ ...prev, collection: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100"
              disabled={!newArtwork.category}
            >
              <option value="" className="bg-gray-800">Select collection</option>
              {newArtwork.category && settings.categories[newArtwork.category]?.map(collection => (
                <option key={collection} value={collection} className="bg-gray-800">{collection}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Image URL"
                value={newArtwork.imageURL}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewArtwork(prev => ({ ...prev, imageURL: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400"
              />
              <label className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors cursor-pointer flex items-center gap-2">
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
            {/* Thumbnail Preview */}
            {previewUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-400 mb-1">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Thumbnail preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-600"
                />
              </div>
            )}
            <button
              onClick={addArtwork}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
            >
              <IoAddCircle size={16} />
              Add Artwork
            </button>
          </div>
        </div>

        {/* Artworks List */}
        <div className="bg-gray-700 p-4 rounded-lg max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Current Artworks ({settings.art.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {settings.art.map((artwork, index) => (
              <div key={index} className="relative group">
                <img
                  src={artwork.imageURL}
                  alt={artwork.name}
                  className="w-full h-32 object-cover rounded-md border border-gray-600"
                />
                {/* Delete Button */}
                <button
                  onClick={() => removeArtwork(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10 opacity-75 hover:opacity-100 transition-opacity"
                  title="Remove artwork"
                >
                  <IoClose size={16} />
                </button>
                {/* Hover Overlay */}
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
    </div>
  );
}