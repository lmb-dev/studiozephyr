import React, { useState, ChangeEvent } from 'react';
import { IoAddCircle, IoTrash, IoClose } from 'react-icons/io5';


interface CategoriesPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function CategoriesPanel({ settings, setSettings }: CategoriesPanelProps) {
  const [newCategory, setNewCategory] = useState<string>('');
  const [newCollection, setNewCollection] = useState<string>('');
  const [selectedCategoryForCollection, setSelectedCategoryForCollection] = useState<string>('');

  const addCategory = (): void => {
    if (newCategory && !settings.categories[newCategory]) {
      setSettings(prev => ({
        ...prev,
        categories: { ...prev.categories, [newCategory]: [] }
      }));
      setNewCategory('');
    }
  };

  const addCollection = (): void => {
    if (newCollection && selectedCategoryForCollection && settings.categories[selectedCategoryForCollection]) {
      setSettings(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [selectedCategoryForCollection]: [
            ...prev.categories[selectedCategoryForCollection],
            newCollection
          ]
        }
      }));
      setNewCollection('');
    }
  };

  const removeCategory = (category: string): void => {
    const { [category]: removed, ...rest } = settings.categories;
    setSettings(prev => ({
      ...prev,
      categories: rest
    }));
  };

  const removeCollection = (category: string, collection: string): void => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: prev.categories[category].filter(c => c !== collection)
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Category/Collection */}
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Add New Category</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400"
              />
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Add Collection to Category</h3>
            <div className="space-y-2">
              <select
                value={selectedCategoryForCollection}
                onChange={(e) => setSelectedCategoryForCollection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100"
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
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400"
                />
                <button
                  onClick={addCollection}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-gray-700 p-4 rounded-lg max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Categories & Collections</h3>
          <div className="space-y-3">
            {Object.entries(settings.categories).map(([category, collections]) => (
              <div key={category} className="bg-gray-800 p-3 rounded border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-lg text-gray-100">{category}</div>
                  <button
                    onClick={() => removeCategory(category)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <IoTrash size={16} />
                  </button>
                </div>
                <div className="pl-4 space-y-1">
                  {collections.map((collection) => (
                    <div key={collection} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">• {collection}</span>
                      <button
                        onClick={() => removeCollection(category, collection)}
                        className="text-red-400 hover:text-red-300"
                      >
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
    </div>
  );
}