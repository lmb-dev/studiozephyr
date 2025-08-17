import { useState } from 'react';
import { IoAddCircle, IoTrash } from 'react-icons/io5';

interface TestimonialsPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function TestimonialsPanel({ settings, setSettings }: TestimonialsPanelProps) {
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({name: '', text: '', project: ''});

  // #region Edit Form Functions
  const addTestimonial = () => {
    const { name, text, project } = newTestimonial;
    if (name && text && project) {
      setSettings(prev => ({...prev, testimonials: [...prev.testimonials, newTestimonial]}));
      setNewTestimonial({ name: '', text: '', project: '' });
    }
  };

  const removeTestimonial = (index: number) => {
    setSettings(prev => ({...prev, testimonials: prev.testimonials.filter((_, i) => i !== index)}));
  };

  const updateField = (field: keyof Testimonial, value: string) => {
    setNewTestimonial(prev => ({...prev, [field]: value}));
  };
  // #endregion

return (
    <div className="admin-grid">

      <div className="admin-box-l">
        <h3 className="admin-title">Add New Testimonial</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Client name"
            value={newTestimonial.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="admin-input"
          />
          <input
            type="text"
            placeholder="Project name"
            value={newTestimonial.project}
            onChange={(e) => updateField('project', e.target.value)}
            className="admin-input"
          />
          <textarea
            placeholder="Testimonial text"
            value={newTestimonial.text}
            onChange={(e) => updateField('text', e.target.value)}
            className="admin-input h-32"
          />
          <button onClick={addTestimonial} className="w-full admin-btn-green">
            <IoAddCircle size={16} />
            Add Testimonial
          </button>
        </div>
      </div>

      <div className="admin-box-r">
        <h3 className="admin-title">Current Testimonials ({settings.testimonials.length})</h3>
        <div className="space-y-2">
          {settings.testimonials.map((testimonial, index) => (
            <div key={index} className="admin-display">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-100">{testimonial.name}</div>
                  <div className="text-sm text-gray-400 mb-2">{testimonial.project}</div>
                  <div className="text-sm text-gray-300">{testimonial.text.substring(0, 100)}...</div>
                </div>
                <button onClick={() => removeTestimonial(index)} className="admin-btn-red">
                  <IoTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}