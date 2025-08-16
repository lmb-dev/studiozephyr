'use client'
import  { useState, useEffect} from 'react';
import { IoSave } from 'react-icons/io5';
import ArtPanel from './artPanel';
import TestimonialsPanel from './testimonialPanel';
import CategoriesPanel from './categoriesPanel';


export default function AdminPanel() {
  const [settings, setSettings] = useState<Settings>({categories:{}, art:[], testimonies:[]});
  const [activeTab, setActiveTab] = useState<'art' | 'testimonials' | 'categories'>('art');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/settings.json`)
      .then(response => response.ok ? response.json() : null)
      .then(data => data && setSettings(data));
  }, []);

  const saveSettings = async (): Promise<void> => {
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

  return (
    <div className="container">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-bold uppercase">Admin Panel</h1>
        <button onClick={saveSettings} className=" flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:brightness-125 transition">
          <IoSave size={16}/> Save All
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[var(--bg2)] rounded-lg">
        <nav className="border-b border-gray-600">
          {(['art', 'testimonials', 'categories'] as const).map((tab) => (
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
        {activeTab === 'art' && (<ArtPanel settings={settings} setSettings={setSettings}/>)}
        {activeTab === 'testimonials' && (<TestimonialsPanel settings={settings} setSettings={setSettings}/>)}
        {activeTab === 'categories' && (<CategoriesPanel settings={settings} setSettings={setSettings}/>)}
      </div>
    </div>
  );
}