"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${orderId}/`)
      setOrder(response.data)
    } catch (error) {
      console.error("Error fetching order:", error)
    }
  }

  if (!order) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
            Grocerease
          </h1>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-primary-green mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your order</p>

          <div className="bg-green-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-2">Order ID</p>
            <p className="text-2xl font-bold text-primary-green">{order.order_id}</p>
          </div>

          <div className="text-left space-y-6 mb-8">
            <div>
              <p className="text-gray-600">Delivery Estimate</p>
              <p className="text-lg font-semibold">2-3 business days</p>
            </div>

            <div>
              <p className="text-gray-600 mb-4 font-bold">Ordered Items</p>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div className="flex gap-4 flex-1">
                      <img
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.product_name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary-green">${order.total}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-primary-green text-white py-3 rounded-lg hover:bg-dark-green font-bold"
          >
            Go to Orders
          </button>
        </div>
      </div>
    </div>
  )
}
