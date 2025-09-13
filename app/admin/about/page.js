"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import AdminLayout from "../../../components/admin/AdminLayout"
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload"
import ClientLoader from "@/components/ui/ClientLoader"
import toast from 'react-hot-toast';

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [about, setAbout] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about")
        const data = await res.json()
        if (data) setAbout(data) // single about doc
      } catch (err) {
        console.error("Failed to fetch about:", err)
        toast.error('Failed to fetch about please try again')
      } finally {
        setIsLoading(false)
      }
    }
    fetchAbout()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/about/`, {
        method: about?._id ? "POST" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      })

      if (!res.ok) throw new Error("Failed to save about")
      toast.success("About updated successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update about")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <ClientLoader />
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage About</h1>
          <p className="text-gray-600 mt-2">
            Update the About section content for your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={about?.title || ""}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              value={about?.description || ""}
              onChange={(e) =>
                setAbout({ ...about, description: e.target.value })
              }
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <CloudinaryUpload
              onUpload={(url) => setAbout({ ...about, image: url })}
            />
            {about?.image && (
              <img
                src={about.image}
                alt="About Preview"
                className="mt-3 w-40 h-40 rounded-lg object-cover shadow"
              />
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
