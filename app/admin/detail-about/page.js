"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import AdminLayout from "../../../components/admin/AdminLayout"
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload"
import ClientLoader from "@/components/ui/ClientLoader"
import toast from "react-hot-toast"


export default function AboutPage() {
  const defaultAbout = {
    title: 'Heading',
    description: 'Main Page Description Here',
    imagePosition: 'left',
    sections: [{
      title: 'Section1',
      description: 'Description for section',
      image: 'defaultimage.com'
    }
    ]
  }
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
        const res = await fetch("/api/detail-about")
        if (!res.ok) {
          // Handle cases where no about document exists
          setAbout({ title: "", description: "", sections: [] })
          return
        }
        const data = await res.json()
        if (data.length > 0) {
          setAbout(data[0])
        }
        else {
          setAbout(defaultAbout);
        }
      } catch (err) {
        console.error("Failed to fetch about:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAbout()
  }, [router])

  const handleAddSection = () => {
    setAbout(prevAbout => ({
      ...prevAbout,
      sections: [
        ...prevAbout.sections,
        { title: "", description: "", image: "", imagePosition: "left" },
      ],
    }))
  }

  const handleSectionChange = (index, field, value) => {
    const newSections = [...about?.sections]
    newSections[index][field] = value
    setAbout(prevAbout => ({ ...prevAbout, sections: newSections }))
  }

  const handleRemoveSection = (index) => {
    const newSections = about?.sections?.filter((_, i) => i !== index)
    setAbout(prevAbout => ({ ...prevAbout, sections: newSections }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // const method = about?._id ? "PUT" : "POST" // Correctly determine method
      // const url = about?._id ? `/api/detail-about/${about._id}` : "/api/detail-about"

      const res = await fetch('/api/detail-about', {
        method: 'POST',
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
          <h1 className="text-3xl font-bold text-gray-900">Manage About Page</h1>
          <p className="text-gray-600 mt-2">
            Update the About Page Sections for your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
        >
          {/* Main Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Title
            </label>
            <input
              type="text"
              value={about?.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Main Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Description
            </label>
            <textarea
              rows="4"
              value={about?.description}
              onChange={(e) =>
                setAbout({ ...about, description: e.target.value })
              }
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Sections
              </label>
              <button
                type="button"
                onClick={handleAddSection}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 disabled:opacity-50 text-sm"
              >
                + Add Section
              </button>
            </div>

            {about?.sections?.map((section, index) => (
              <div
                key={index}
                className="space-y-4 p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Section {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                {/* Section Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                    className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Section Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    value={section.description}
                    onChange={(e) => handleSectionChange(index, "description", e.target.value)}
                    className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Cloudinary Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <CloudinaryUpload
                    onUpload={(url) => handleSectionChange(index, "image", url)}
                    value={section.image}
                  />
                </div>

                {/* Image Position Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image Position
                  </label>
                  <select
                    value={section.imagePosition}
                    onChange={(e) => handleSectionChange(index, "imagePosition", e.target.value)}
                    className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            ))}
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



