'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Email Enquiry from ${formData.name} sent via Studio Zephyr`
    const mailtoLink = `mailto:studiozephyruk@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formData.message)}`
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
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="input-box"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="input-box"
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="input-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={8}
            value={formData.message}
            onChange={handleInputChange}
            className="input-box"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="cta-button">
          SUBMIT
        </button>
      </form>
    </div>
  )
}