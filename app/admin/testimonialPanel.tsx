import { useState, ChangeEvent } from 'react';
import { IoAddCircle, IoTrash } from 'react-icons/io5';

interface TestimonialsPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function TestimonialsPanel({ settings, setSettings }: TestimonialsPanelProps) {
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    id: 0,
    name: '',
    text: '',
    project: ''
  });

  const addTestimonial = (): void => {
    if (newTestimonial.name && newTestimonial.text && newTestimonial.project) {
      const testimonial: Testimonial = {
        ...newTestimonial,
        id: Math.max(...settings.testimonies.map(t => t.id), 0) + 1
      };
      setSettings(prev => ({
        ...prev,
        testimonies: [...prev.testimonies, testimonial]
      }));
      setNewTestimonial({ id: 0, name: '', text: '', project: '' });
    }
  };

  const removeTestimonial = (id: number): void => {
    setSettings(prev => ({
      ...prev,
      testimonies: prev.testimonies.filter(t => t.id !== id)
    }));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Testimonial Form */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Add New Testimonial</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Client name"
              value={newTestimonial.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Project name"
              value={newTestimonial.project}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTestimonial(prev => ({ ...prev, project: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400"
            />
            <textarea
              placeholder="Testimonial text"
              value={newTestimonial.text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewTestimonial(prev => ({ ...prev, text: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 h-24"
            />
            <button
              onClick={addTestimonial}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
            >
              <IoAddCircle size={16} />
              Add Testimonial
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="bg-gray-700 p-4 rounded-lg max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Current Testimonials ({settings.testimonies.length})</h3>
          <div className="space-y-2">
            {settings.testimonies.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800 p-3 rounded border border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">{testimonial.name}</div>
                    <div className="text-sm text-gray-400 mb-2">{testimonial.project}</div>
                    <div className="text-sm text-gray-300">{testimonial.text.substring(0, 100)}...</div>
                  </div>
                  <button
                    onClick={() => removeTestimonial(testimonial.id)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <IoTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}