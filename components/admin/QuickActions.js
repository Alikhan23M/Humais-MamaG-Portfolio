'use client'
import { Plus, Edit, Eye, MessageSquare } from 'lucide-react'

export default function QuickActions() {
  const actions = [
    {
      name: 'Add New Project',
      description: 'Create a new portfolio project',
      href: '/admin/projects',
      icon: Plus,
      color: 'success'
    },
    {
      name: 'Update Profile',
      description: 'Edit your profile information',
      href: '/admin/profile',
      icon: Edit,
      color: 'success'
    },
    {
      name: 'View Portfolio',
      description: 'See your live portfolio',
      href: '/',
      icon: Eye,
      color: 'success'
    },
    {
      name: 'Check Messages',
      description: 'View contact form messages',
      href: '/admin/messages',
      icon: MessageSquare,
      color: 'success'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700',
      secondary: 'from-secondary-400 to-secondary-600 hover:from-secondary-500 hover:to-secondary-700',
      accent: 'from-accent-400 to-accent-600 hover:from-accent-500 hover:to-accent-700',
      success: 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
    }
    return colorMap[color] || colorMap.primary
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => {
          const IconComponent = action.icon
          return (
            <a
              key={action.name}
              href={action.href}
              className="group block p-6 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${getColorClasses(action.color)} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.name}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}