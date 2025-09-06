'use client'
import { useState, useEffect } from 'react'
import { User, Briefcase, FolderOpen, Star, TrendingUp } from 'lucide-react'

export default function DashboardStats() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    testimonials: 0,
    messages: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [servicesRes, projectsRes, testimonialsRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/projects'),
        fetch('/api/testimonials')
      ])

      const [services, projects, testimonials] = await Promise.all([
        servicesRes.json(),
        projectsRes.json(),
        testimonialsRes.json()
      ])

      setStats({
        services: services.length,
        projects: projects.length,
        testimonials: testimonials.length,
        messages: 12 // Placeholder since we don't have a messages endpoint yet
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statCards = [
    {
      name: 'Services',
      value: stats.services,
      icon: Briefcase,
      color: 'primary',
      change: '+2',
      changeType: 'positive'
    },
    {
      name: 'Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'secondary',
      change: '+5',
      changeType: 'positive'
    },
    {
      name: 'Testimonials',
      value: stats.testimonials,
      icon: Star,
      color: 'accent',
      change: '+3',
      changeType: 'positive'
    },
    {
      name: 'Messages',
      value: stats.messages,
      icon: TrendingUp,
      color: 'success',
      change: '+8',
      changeType: 'positive'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'from-primary-400 to-primary-600',
      secondary: 'from-secondary-400 to-secondary-600',
      accent: 'from-accent-400 to-accent-600',
      success: 'from-green-400 to-green-600'
    }
    return colorMap[color] || colorMap.primary
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card) => {
        const IconComponent = card.icon
        return (
          <div key={card.name} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{card.name}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-green-600">{card.change}</span>
                  <span className="text-sm text-gray-500 ml-1">this month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${getColorClasses(card.color)}`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}