"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function StaffDashboard({ onLogout }) {
  const [stats, setStats] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get("/staff/dashboard/")
      setStats(response.data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  if (!stats) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-green">Grocerease Staff</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/staff-profile")}
              className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
            >
              Profile
            </button>
            <button onClick={handleLogout} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-4 mb-8">
          {[
            { id: "products", label: "Products" },
            { id: "orders", label: "Orders" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id === "products" ? "/product-management" : "/staff-orders")}
              className="px-6 py-2 rounded-lg font-semibold transition bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Total Products</p>
            <p className="text-4xl font-bold text-primary-green">{stats.total_products}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="text-4xl font-bold text-primary-green">{stats.total_orders}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Pending Orders</p>
            <p className="text-4xl font-bold text-yellow-600">{stats.pending_orders}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Out of Stock</p>
            <p className="text-4xl font-bold text-red-600">{stats.out_of_stock}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
