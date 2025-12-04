"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function StaffOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingOrder, setUpdatingOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get("/staff/orders/")
      setOrders(response.data || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingOrder(orderId)
    try {
      await api.put(`/staff/orders/${orderId}/update/`, {
        status: newStatus,
      })
      fetchOrders()
      alert("Order status updated")
    } catch (error) {
      alert("Failed to update order")
    } finally {
      setUpdatingOrder(null)
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  const statuses = ["Pending", "Packed", "Shipped", "Delivered"]

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
          <button
            onClick={() => navigate("/staff-dashboard")}
            className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
          >
            Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Order Management</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-bold">{order.order_id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Customer</p>
                  <p className="font-bold">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="font-bold text-primary-green">${order.total}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-bold mb-3">Items</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center text-center text-sm">
                      <img
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded mb-2"
                      />
                      <p>{item.product_name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-bold mb-3">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(order.order_id, status)}
                      disabled={updatingOrder === order.id}
                      className={`px-4 py-2 rounded font-semibold transition ${
                        order.status === status
                          ? "bg-primary-green text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } disabled:opacity-50`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
