"use client"

import type React from "react"

import { useState } from "react"
import { useAuthStore } from "../../store/authStore"

export default function StaffProfilePage() {
  const { user } = useAuthStore()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated:", formData)
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Staff Profile</h1>

        <div className="max-w-2xl">
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Inventory, Sales"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
