import { useState } from 'react';
import { IoTrash, IoClose } from 'react-icons/io5';


interface CategoriesPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function CategoriesPanel({ settings, setSettings }: CategoriesPanelProps) {
  const [newCategory, setNewCategory] = useState<string>('');
  const [newCollection, setNewCollection] = useState<string>('');
  const [selectedCategoryForCollection, setSelectedCategoryForCollection] = useState<string>('');

  // #region Edit Form Functions
  const addCategory = () => {
    if (newCategory && !settings.categories[newCategory]) {
      setSettings(prev => ({...prev, categories: { ...prev.categories, [newCategory]: [] }}));
      setNewCategory('');
    }
  };

  const addCollection = () => {
    if (newCollection && selectedCategoryForCollection && settings.categories[selectedCategoryForCollection]) {
      setSettings(prev => ({...prev, categories: {...prev.categories, [selectedCategoryForCollection]: [...prev.categories[selectedCategoryForCollection], newCollection]}}));
      setNewCollection('');
    }
  };

  const removeCategory = (category: string) => {
    const newCategories = { ...settings.categories };
    delete newCategories[category];
    setSettings(prev => ({...prev, categories: newCategories}));
  };

  const removeCollection = (category: string, collection: string) => {
    const filtered = settings.categories[category].filter(c => c !== collection);
    setSettings(prev => ({...prev, categories: {...prev.categories, [category]: filtered}}));
  };
  // #endregion

  return (
    <div className="admin-grid">
      
      <div className="space-y-6">
        <div className="admin-box-l">
          <h3 className="admin-title">Add New Category</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="admin-input"
            />
            <button onClick={addCategory} className="admin-btn-green">
              Add
            </button>
          </div>
        </div>

        <div className="admin-box-l">
          <h3 className="admin-title">Add Collection to Category</h3>
          <div className="space-y-2">
            <select
              value={selectedCategoryForCollection}
              onChange={(e) => setSelectedCategoryForCollection(e.target.value)}
              className="admin-input"
            >
              <option value="" className="bg-gray-800">Select category</option>
              {Object.keys(settings.categories).map(cat => (
                <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Collection name"
                value={newCollection}
                onChange={(e) => setNewCollection(e.target.value)}
                className="admin-input"
              />
              <button onClick={addCollection} className="admin-btn-green">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-box-r">
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Categories & Collections</h3>
        <div className="space-y-3">
          {Object.entries(settings.categories).map(([category, collections]) => (
            <div key={category} className="admin-display">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-lg text-gray-100">{category}</div>
                <button onClick={() => removeCategory(category)} className="admin-btn-red">
                  <IoTrash size={16} />
                </button>
              </div>
              <div className="pl-4 space-y-1">
                {collections.map((collection) => (
                  <div key={collection} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{collection}</span>
                    <button onClick={() => removeCollection(category, collection)}className="admin-btn-red">
                      <IoClose size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}