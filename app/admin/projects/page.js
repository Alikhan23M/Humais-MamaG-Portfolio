"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import AdminLayout from "../../../components/admin/AdminLayout"
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload"
import ClientLoader from "@/components/ui/ClientLoader"
import toast from "react-hot-toast"
import ConfirmDialog from "@/components/ui/ConfirmDialog"

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)
  const router = useRouter()

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        const data = await res.json()
        if (data) setProjects(data)
      } catch (err) {
        console.error("Failed to fetch projects:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [router])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const method = editingProject._id ? "PUT" : "POST"
      const url = editingProject._id
        ? `/api/projects/${editingProject._id}`
        : `/api/projects`

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      })

      if (!res.ok){
        toast.error('Failed to Save Project')
      }

      toast.success("Project saved successfully!")
      setEditingProject(null)

      // Refresh projects
      const refreshed = await fetch("/api/projects").then((r) => r.json())
      setProjects(refreshed)
    } catch (err) {
      console.error(err)
      toast.error("Failed to save project")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true)
  }

  const confirmDelete = async ()=>{
    try {
      const res = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      })
      if(res.ok){
        toast.success('Project Deleted Successfully');
        setProjects(projects.filter((p) => p._id !== deleteId))
      }
      else{
        toast.error('Failed to delte project');
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete project")
    }
    finally{
       setShowConfirm(false);
      setDeleteId(null);
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
        title="Delete Project"
        message="Are you sure you want to delete this Prject? This action cannot be undone."
      />
      <div className="space-y-8">
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
          <button
            onClick={() =>
              setEditingProject({
                title: "",
                description: "",
                category: "",
                image: "",
                link: "",
                tags: [],
                isActive: true,
                isFeatured: false,
                order: 0,
              })
            }
            className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700"
          >
            + Add Project
          </button>
        </div>

        {/* Form (Add/Edit) */}
        {editingProject && (
          <form
            onSubmit={handleSave}
            className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingProject._id ? "Edit Project" : "Add Project"}
            </h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows="3"
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={editingProject.category}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    category: e.target.value,
                  })
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
                onUpload={(url) =>
                  setEditingProject({ ...editingProject, image: url })
                }
              />
              {editingProject.image && (
                <img
                  src={editingProject.image}
                  alt="Preview"
                  className="mt-3 w-40 h-28 object-cover rounded shadow"
                />
              )}
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="text"
                value={editingProject.link}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, link: e.target.value })
                }
                placeholder="https://example.com/project"
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={editingProject.tags?.join(", ") || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
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
                  checked={editingProject.isActive}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingProject.isFeatured}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      isFeatured: e.target.checked,
                    })
                  }
                />
                Featured
              </label>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Order
              </label>
              <input
                type="number"
                value={editingProject.order}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
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
                {saving ? "Saving..." : "Save Project"}
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p._id}
              className="border border-gray-200 rounded-lg shadow-sm bg-white p-4 flex flex-col"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="mt-2 font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setEditingProject(p)}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
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
