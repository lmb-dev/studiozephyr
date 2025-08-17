'use client'
import  { useState, useEffect} from 'react';
import { IoSave } from 'react-icons/io5';
import ArtPanel from './artPanel';
import TestimonialsPanel from './testimonialPanel';
import CategoriesPanel from './categoriesPanel';


export default function AdminPanel() {
  const [settings, setSettings] = useState<Settings>({categories:{}, art:[], testimonials:[]});
  const [activeTab, setActiveTab] = useState<'art' | 'testimonials' | 'categories' | 'json'>('art');
  const [jsonText, setJsonText] = useState('');

  useEffect(() => {
    fetch(`https://${process.env.NEXT_PUBLIC_CDN_URL}/settings.json`)
      .then(response => response.ok ? response.json() : null)
      .then(data => data && setSettings(data));
  }, []);

  const saveSettings = async () => {
    const response = await fetch('/api/r2Json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (response.ok) {
      alert('Settings saved successfully');
    } else {
      alert('Failed to save settings');
    }
  };

  useEffect(() => {
    if (activeTab === 'json') {
      setJsonText(JSON.stringify(settings, null, 2));
    }
  }, [activeTab, settings]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonText = e.target.value;
    setJsonText(newJsonText);
    
    try {
      const parsedSettings = JSON.parse(newJsonText); //parse to validate
      setSettings(parsedSettings);
    } catch (err) {
      alert(`Invalid JSON Submitted:${err}`,);
    }
  };

  return (
    <div className="container">

      {/* Header */}
      <div className="flex justify-between items-center m-2">
        <h1 className="text-4xl font-bold uppercase">Admin Panel</h1>
        <button onClick={saveSettings} className="admin-btn-green">
          <IoSave size={16}/> Save All
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[var(--bg2)] rounded-lg">
        <nav className="border-b border-gray-600">
          {(['art', 'testimonials', 'categories', 'json'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm uppercase px-6 py-3 ${
                activeTab === tab
                  ? 'border-b-2 border-[var(--tx3)] text-[var(--tx3)]'
                  : 'text-[var(--tx2)] hover:brightness-125'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Panel Content */}
        <div className='p-6'>
          {activeTab === 'art' && (<ArtPanel settings={settings} setSettings={setSettings}/>)}
          {activeTab === 'testimonials' && (<TestimonialsPanel settings={settings} setSettings={setSettings}/>)}
          {activeTab === 'categories' && (<CategoriesPanel settings={settings} setSettings={setSettings}/>)}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Raw JSON Editor</h2>
              <textarea
                value={jsonText}
                onChange={handleJsonChange}
                className="w-full h-96 admin-box-l"
                placeholder="Edit the raw JSON here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
