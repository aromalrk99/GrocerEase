"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CustomerProfile({ onLogout, dashboard = false }) {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile/")
      setProfile(response.data)
      setFormData(response.data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSave = async () => {
    try {
      await api.put("/profile/update/", {
        first_name: formData.first_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      })
      fetchProfile()
      setIsEditing(false)
      alert("Profile updated successfully")
    } catch (error) {
      alert("Failed to update profile")
    }
  }

  if (!profile) return <div className="text-center py-20">Loading...</div>

  return (
    <div className={!dashboard ? "min-h-screen bg-surface" : ""}>
      {!dashboard && (
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
              Grocerease
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/shop")}
                className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
              >
                Shop
              </button>
              <button
                onClick={() => {
                  onLogout()
                  navigate("/")
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      <div className={!dashboard ? "max-w-2xl mx-auto px-8 py-12" : ""}>
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-xl font-bold">{profile.first_name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-xl font-bold">{profile.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="text-xl font-bold">{profile.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Address</p>
                <p className="text-xl font-bold">{profile.address}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-primary-green text-white py-3 rounded-lg hover:bg-dark-green font-bold"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
                  rows="4"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary-green text-white py-3 rounded-lg hover:bg-dark-green font-bold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
