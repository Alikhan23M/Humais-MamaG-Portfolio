"use client"
import { useState } from "react"

export default function CloudinaryUpload({ onUpload }) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)

    try {
      // Get signature from backend
      const sigRes = await fetch("/api/cloudinary-sign")
      const { timestamp, signature, apiKey, cloudName } = await sigRes.json()

      const formData = new FormData()
      formData.append("file", file)
      formData.append("api_key", apiKey)
      formData.append("timestamp", timestamp)
      formData.append("signature", signature)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await uploadRes.json()
      onUpload(data.secure_url) // send URL back to parent form
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  )
}
