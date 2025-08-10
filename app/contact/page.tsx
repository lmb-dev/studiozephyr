'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const mailtoLink = `mailto:studiozephyruk@outlook.com?subject=${encodeURIComponent(`Email Enquiry from ${formData.name} sent via Studio Zephyr`)}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
  }


  return (
    <div className="container">
      {/* Title Section */}
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          CONTACT ME
        </h2>
        <p>
          Feel free to send me any commission enquiries via the form, or email me at:<br/>
          <a href='mailto:studiozephyruk@outlook.com'>studiozephyruk@outlook.com</a>
        </p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-lg mb-3 font-medium" style={{ color: 'var(--tx1)' }}>
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-transparent border-2 rounded-none focus:outline-none transition-all duration-300"
              style={{ 
                borderColor: 'var(--tx2)', 
                color: 'var(--tx1)',
                backgroundColor: 'rgba(31, 31, 60, 0.3)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--tx1)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--tx2)'}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-lg mb-3 font-medium" style={{ color: 'var(--tx1)' }}>
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-transparent border-2 rounded-none focus:outline-none transition-all duration-300"
              style={{ 
                borderColor: 'var(--tx2)', 
                color: 'var(--tx1)',
                backgroundColor: 'rgba(31, 31, 60, 0.3)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--tx1)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--tx2)'}
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-lg mb-3 font-medium" style={{ color: 'var(--tx1)' }}>
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={8}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-transparent border-2 rounded-none focus:outline-none transition-all duration-300 resize-vertical"
            style={{ 
              borderColor: 'var(--tx2)', 
              color: 'var(--tx1)',
              backgroundColor: 'rgba(31, 31, 60, 0.3)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--tx1)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--tx2)'}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-12 py-4 bg-transparent border-2 text-lg font-semibold uppercase tracking-wider transition-all duration-300"
            style={{ 
              borderColor: 'var(--tx1)', 
              color: 'var(--tx1)'
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}