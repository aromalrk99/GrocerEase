"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ShopPage from "./ShopPage"
import CartPage from "./CartPage"
import CustomerOrders from "./CustomerOrders"
import CustomerProfile from "./CustomerProfile"

export default function CustomerDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("shop")
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
            Grocerease
          </h1>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2 px-8 py-6 bg-white border-b">
          {[
            { id: "shop", label: "Shop" },
            { id: "cart", label: "Cart" },
            { id: "orders", label: "Orders" },
            { id: "profile", label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id ? "bg-primary-green text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-8 py-8">
          {activeTab === "shop" && <ShopPage dashboard={true} />}
          {activeTab === "cart" && <CartPage dashboard={true} />}
          {activeTab === "orders" && <CustomerOrders dashboard={true} />}
          {activeTab === "profile" && <CustomerProfile onLogout={onLogout} dashboard={true} />}
        </div>
      </div>
    </div>
  )
}
