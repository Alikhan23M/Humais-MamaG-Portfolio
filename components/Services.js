'use client'

import { useState, useEffect } from 'react'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'

// Merge all imported icons into one map
const iconMap = { ...FiIcons, ...AiIcons, ...BsIcons }

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  // Convert services into HoverEffect items
  const serviceItems = services.map((service) => {
    // dynamically pick icon based on admin selection
    const IconComponent = iconMap[service.icon] || FiIcons.FiPenTool

    return {
      link: '#', // optional: can be replaced with actual service page link
      title: (
        <div className="flex items-center gap-3 border border-white/10 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500/20 shadow-lg">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
            <IconComponent size={20} />
          </div>
          <span>{service.title}</span>
        </div>
      ),
      description: (
        <div>
          <p>{service.description}</p>
          {service.features && service.features.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    }
  })

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            My Services
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4 leading-relaxed">
            Comprehensive solutions to help your business grow and engage with your audience.
          </p>
        </div>

        {/* Hover Effect Grid */}
        <HoverEffect items={serviceItems} className="gap-8" />
      </div>
    </section>
  )
}
