'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import CountUp from 'react-countup'

// Merge all icons
const iconMap = { ...FiIcons, ...AiIcons, ...BsIcons }

export default function About() {
  const [profile, setProfile] = useState(null)
  const [about, setAbout] = useState(null)
  const [stats, setStats] = useState([])

  // inView hook for triggering animation
  const { ref, inView } = useInView({
    triggerOnce: false, // run only every time it comes into view
    threshold: 0.2,    // start when 20% visible
  })

  useEffect(() => {
    fetchProfile()
    fetchAbout()
    fetchStats()
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

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchAbout = async () => {
    try {
      const response = await fetch('/api/about')
      if (response.ok) {
        const data = await response.json()
        setAbout(data)
      }
    } catch (error) {
      console.error('Error fetching about:', error)
    }
  }

  if (!about) return null

  if (!profile) return null

  return (
    <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Passionate about creating impactful digital experiences that blend clean design with powerful functionality.
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col-reverse md:flex-row gap-12 justify-between items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{about?.title}</h3>
            {/* <p className="text-gray-400 mb-6 leading-relaxed">{profile.bio}</p> */}
            <p className="text-gray-400 mb-8 leading-relaxed">
              {about?.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-white">Name:</span>
                <span className="text-gray-400">{profile.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-white">Email:</span>
                <span className="text-gray-400">{profile.email}</span>
              </div>
              {profile.location && (
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-white">Location:</span>
                  <span className="text-gray-400">{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-30 blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={about?.image || profile.profileImage}
                alt={profile.name}
                className="h-80 w-full object-cover md:h-[28rem] rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || FiIcons.FiBarChart
            const number = parseInt(stat.value.replace(/\D/g, '')) || 0
            const suffix = stat.value.replace(/\d/g, '')
            return (
              <motion.div
                key={stat._id}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <IconComponent size={22} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {inView ? (
                    <CountUp end={number} duration={2.5} suffix={suffix} />
                  ) : (
                    0 + suffix
                  )}+
                </div>
                <div className="text-gray-400">{stat.text}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
