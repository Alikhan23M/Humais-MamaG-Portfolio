'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminLayout from '../../../components/admin/AdminLayout'
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import ClientLoader from '@/components/ui/ClientLoader'

// Merge all icons
const iconMap = { ...FiIcons, ...AiIcons, ...BsIcons }

export default function StatsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState([])
  const [editingStat, setEditingStat] = useState(null)
  const [form, setForm] = useState({ icon: '', value: '', text: '' })
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [iconSearch, setIconSearch] = useState('')

  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }
    fetchStats()
  }, [router])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleIconSelect = (iconName) => {
    setForm({ ...form, icon: iconName })
    setShowIconPicker(false)
    setIconSearch('')
  }

  const resetForm = () => {
    setForm({ icon: '', value: '', text: '' })
    setEditingStat(null)
    setShowIconPicker(false)
    setIconSearch('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const method = editingStat ? 'PUT' : 'POST'
      const url = editingStat ? `/api/stats/${editingStat._id}` : '/api/stats'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Failed to save stat')
      alert(editingStat ? '✅ Stat updated' : '✅ Stat created')
      resetForm()
      fetchStats()
    } catch (err) {
      console.error(err)
      alert('❌ Failed to save stat')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this stat?')) return
    try {
      const res = await fetch(`/api/stats/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      alert('✅ Stat deleted')
      setStats(stats.filter((s) => s._id !== id))
    } catch (err) {
      console.error(err)
      alert('❌ Failed to delete stat')
    }
  }

  const handleEdit = (stat) => {
    setEditingStat(stat)
    setForm({ icon: stat.icon, value: stat.value, text: stat.text })
  }

  if (isLoading) {
    return (
      <AdminLayout>
          <ClientLoader/>
          </AdminLayout>
    )
  }

  // Filter icons based on search
  const filteredIcons = Object.keys(iconMap).filter((name) =>
    name.toLowerCase().includes(iconSearch.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Stats</h1>
          <p className="text-gray-600 mt-2">
            Add, edit or delete stats displayed on your About section.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {editingStat ? 'Edit Stat' : 'Add New Stat'}
          </h2>

          {/* Icon Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <div
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between px-3 py-2 cursor-pointer"
              onClick={() => setShowIconPicker(!showIconPicker)}
            >
              <span className="flex items-center gap-2">
                {form.icon && iconMap[form.icon] ? (
                  (() => {
                    const SelectedIcon = iconMap[form.icon]
                    return <SelectedIcon size={20} />
                  })()
                ) : (
                  <span className="text-gray-400">Select an icon</span>
                )}
                {form.icon || ''}
              </span>
              <span className="text-gray-500">▼</span>
            </div>

            {showIconPicker && (
              <div className="mt-2 max-h-64 overflow-y-auto grid grid-cols-6 gap-3 border p-3 rounded-lg bg-gray-50 shadow-inner">
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  className="col-span-6 mb-2 p-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
                />
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((iconName) => {
                    const IconComponent = iconMap[iconName]
                    return (
                      <div
                        key={iconName}
                        onClick={() => handleIconSelect(iconName)}
                        className="p-2 rounded cursor-pointer hover:bg-purple-100 flex items-center justify-center"
                      >
                        <IconComponent size={20} />
                      </div>
                    )
                  })
                ) : (
                  <p className="col-span-6 text-center text-gray-400">No icons found</p>
                )}
              </div>
            )}
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Value</label>
            <input
              type="text"
              name="value"
              value={form.value}
              onChange={handleChange}
              placeholder="e.g. 500+"
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <input
              type="text"
              name="text"
              value={form.text}
              onChange={handleChange}
              placeholder="e.g. Happy Clients"
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingStat ? 'Update Stat' : 'Create Stat'}
            </button>
            {editingStat && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Stats List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || FiIcons.FiBarChart
            return (
              <div
                key={stat._id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200 flex items-center gap-4"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.text}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => handleEdit(stat)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stat._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
