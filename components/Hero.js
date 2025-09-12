'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail, Phone, MapPin } from 'lucide-react'
import Navbar from './Navbar'

export default function Hero() {
  const [profile, setProfile] = useState(null)

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

  if (!profile) return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950"></div>

  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 relative overflow-hidden text-gray-200"
    >

      <Navbar />
      {/* Background glowing blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-10">
        <div className="flex flex-col-reverse pt lg:flex-row items-center justify-between min-h-screen py-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 lg:pr-12 text-center lg:text-left"
          >
            <div className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-purple-400 font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping "></span>
              Available for new projects
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-400 font-medium mb-6">
              {profile.title}
            </h2>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.bio}
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-purple-400" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-purple-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-purple-400" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                Let's Work Together
              </motion.a>
              {profile.resumeUrl && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-gray-200 px-8 py-3 rounded-full font-medium backdrop-blur-sm transition-all shadow-lg"
                >
                  <Download size={20} />
                  Download Resume
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex-1 lg:pl-12 mt-12 lg:mt-0"
          >
          <div className="relative max-w-md mx-auto flex items-center justify-center">
  {/* Glowing background */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-72 h-72 md:w-[28rem] md:h-[28rem] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
  </div>

  {/* Profile image wrapper */}
  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-full shadow-2xl">
    <img
      src={profile.profileImage}
      alt={profile.name}
      className="h-64 w-64 md:h-96 md:w-96 object-cover rounded-full border-4 border-gray-700"
    />
  </div>
</div>

          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
          <ArrowDown size={28} />
        </a>
      </motion.div>
    </section>
  )
}
