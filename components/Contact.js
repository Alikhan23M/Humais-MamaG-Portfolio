'use client'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Instagram, Globe } from 'lucide-react'

export default function Contact() {
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
      }
    } catch {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
    }

    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!profile) return null

  const socialIcons = { linkedin: Linkedin, twitter: Twitter, instagram: Instagram, website: Globe }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Let's Work Together</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your next project? Reach out and let's create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
              <div className="space-y-6">
                <ContactCard icon={<Mail className="text-purple-500" />} title="Email" value={profile.email} />
                {profile.phone && <ContactCard icon={<Phone className="text-pink-500" />} title="Phone" value={profile.phone} />}
                {profile.location && <ContactCard icon={<MapPin className="text-blue-500" />} title="Location" value={profile.location} />}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {Object.entries(profile.social || {}).map(([platform, url]) => {
                  if (!url) return null
                  const Icon = socialIcons[platform]
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-gray-400 hover:text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/60 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
              <TextareaField label="Message" name="message" value={formData.message} onChange={handleChange} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-transform duration-200 flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Message</>}
              </button>

              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg ${submitMessage.includes('success') ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper Components
const ContactCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 bg-gray-800/40 p-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
    <div className="p-3 bg-gray-900 rounded-full">{icon}</div>
    <div>
      <p className="font-medium text-white">{title}</p>
      <p className="text-gray-400">{value}</p>
    </div>
  </div>
)

const InputField = ({ label, name, value, type = 'text', onChange }) => (
  <div>
    <label htmlFor={name} className="block text-gray-300 font-medium mb-2">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
    />
  </div>
)

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-gray-300 font-medium mb-2">{label}</label>
    <textarea
      id={name}
      name={name}
      rows={6}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
    />
  </div>
)
