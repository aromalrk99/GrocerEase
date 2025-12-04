"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function StaffProfile({ onLogout }) {
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile/")
      setProfile(response.data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  if (!profile) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1
            className="text-3xl font-bold text-primary-green cursor-pointer"
            onClick={() => navigate("/staff-dashboard")}
          >
            Grocerease Staff
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/staff-dashboard")}
              className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
            >
              Dashboard
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

      <div className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Staff Profile</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
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
            <p className="text-gray-600 text-sm">Role</p>
            <p className="text-xl font-bold text-primary-green">{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
