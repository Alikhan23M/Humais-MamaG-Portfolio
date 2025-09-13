"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import AdminLayout from "../../../components/admin/AdminLayout"
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload"
import ClientLoader from "@/components/ui/ClientLoader"
import toast from "react-hot-toast"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

export default function TestimonialsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const router = useRouter()

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials")
        const data = await res.json()
        if (data) setTestimonials(data)
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTestimonials()
  }, [router])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const method = editingTestimonial._id ? "PUT" : "POST"
      const url = editingTestimonial._id
        ? `/api/testimonials/${editingTestimonial._id}`
        : `/api/testimonials`

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTestimonial),
      })

      if (!res.ok) throw new Error("Failed to save testimonial")

      toast.success("Testimonial saved successfully!")
      setEditingTestimonial(null)

      // Refresh testimonials
      const refreshed = await fetch("/api/testimonials").then((r) => r.json())
      setTestimonials(refreshed)
    } catch (err) {
      console.error(err)
      toast.error("Failed to save testimonial")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true);

  }

  const confirmDelete = async()=>{
      try {
      const res = await fetch(`/api/testimonials/${deleteId}`, {
        method: "DELETE",
      })
      if (!res.ok){
        toast.error('Failed to delete the testimonial')
      }
      setTestimonials(testimonials.filter((t) => t._id !== deleteId))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete testimonial")
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
      <ConfirmDialog
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this Testimonial? This action cannot be undone."
      />
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Manage Testimonials</h1>
          <button
            onClick={() =>
              setEditingTestimonial({
                name: "",
                position: "",
                company: "",
                content: "",
                avatar: "",
                rating: 5,
                isActive: true,
                order: 0,
              })
            }
            className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700"
          >
            + Add Testimonial
          </button>
        </div>

        {/* Form (Add/Edit) */}
        {editingTestimonial && (
          <form
            onSubmit={handleSave}
            className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingTestimonial._id ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingTestimonial.name}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={editingTestimonial.position}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, position: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={editingTestimonial.company}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                rows="3"
                value={editingTestimonial.content}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Avatar</label>
              <CloudinaryUpload
                onUpload={(url) =>
                  setEditingTestimonial({ ...editingTestimonial, avatar: url })
                }
              />
              {editingTestimonial.avatar && (
                <img
                  src={editingTestimonial.avatar}
                  alt="Preview"
                  className="mt-3 w-20 h-20 rounded-full object-cover shadow"
                />
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editingTestimonial.rating}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    rating: parseInt(e.target.value) || 1,
                  })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingTestimonial.isActive}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active
              </label>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Order</label>
              <input
                type="number"
                value={editingTestimonial.order}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Save + Cancel */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Testimonial"}
              </button>
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {/* List */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="border border-gray-200 rounded-lg shadow-sm bg-white p-4 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{t.name}</h2>
                  <p className="text-sm text-gray-600">
                    {t.position} @ {t.company}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{t.content}</p>
              <p className="mt-2 text-yellow-500 text-sm">
                ⭐ {t.rating}/5
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setEditingTestimonial(t)}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  )
}
