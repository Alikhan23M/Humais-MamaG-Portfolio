"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import AdminLayout from "../../../components/admin/AdminLayout"
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload"
import ClientLoader from "@/components/ui/ClientLoader"


export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile")
        const data = await res.json()
        if (data) setProfile(data) // single profile doc
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/profile/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      if (!res.ok) throw new Error("Failed to save profile")
      alert("✅ Profile updated successfully!")
    } catch (err) {
      console.error(err)
      alert("❌ Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
          <ClientLoader/>
          </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Profile</h1>
          <p className="text-gray-600 mt-2">
            Update your personal information, contact details, and socials.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={profile?.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={profile?.title || ""}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows="3"
              value={profile?.bio || ""}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={profile?.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={profile?.phone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={profile?.location || ""}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <CloudinaryUpload
              onUpload={(url) => setProfile({ ...profile, profileImage: url })}
            />
            {profile?.profileImage && (
              <img
                src={profile.profileImage}
                alt="Profile Preview"
                className="mt-3 w-32 h-32 rounded-full object-cover shadow"
              />
            )}
          </div>

          {/* Resume URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resume URL
            </label>
            <input
              type="text"
              value={profile?.resumeUrl || ""}
              onChange={(e) =>
                setProfile({ ...profile, resumeUrl: e.target.value })
              }
              placeholder="https://example.com/resume.pdf"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["linkedin", "twitter", "instagram", "website"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  value={profile?.social?.[field] || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social: { ...profile.social, [field]: e.target.value },
                    })
                  }
                  className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
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
