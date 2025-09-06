'use client'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function Footer() {
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

  if (!profile) return null

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            Made with <Heart className="text-red-500 fill-current" size={16} /> and coffee
          </div>
        </div>
      </div>
    </footer>
  )
}