"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CustomerOrders({ dashboard = false }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/")
      setOrders(response.data || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div className={!dashboard ? "min-h-screen bg-surface" : ""}>
      {!dashboard && (
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
              Grocerease
            </h1>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
            >
              Continue Shopping
            </button>
          </div>
        </nav>
      )}

      <div className={!dashboard ? "max-w-7xl mx-auto px-8 py-12" : ""}>
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-6">No orders yet</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-primary-green text-white rounded-lg hover:bg-dark-green font-bold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-bold">{order.order_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="font-bold text-primary-green">${order.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p
                      className={`font-bold px-3 py-1 rounded w-fit ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Packed"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold mb-3">Items</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex flex-col items-center text-center">
                        <img
                          src={item.product_image || "/placeholder.svg"}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded mb-2"
                        />
                        <p className="text-sm">{item.product_name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
