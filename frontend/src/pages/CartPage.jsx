"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CartPage({ dashboard = false }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart/")
      setCartItems(response.data.items || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching cart:", error)
      setLoading(false)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/cart/remove/${itemId}/`)
      fetchCart()
    } catch (error) {
      alert("Failed to remove item")
    }
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    try {
      await api.put(`/cart/update/${itemId}/`, {
        quantity: newQuantity,
      })
      fetchCart()
    } catch (error) {
      alert("Failed to update quantity")
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0).toFixed(2)
  }

  const calculateTax = () => {
    return (calculateTotal() * 0.1).toFixed(2)
  }

  const calculateGrandTotal = () => {
    return (Number.parseFloat(calculateTotal()) + Number.parseFloat(calculateTax())).toFixed(2)
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
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-primary-green text-white rounded-lg hover:bg-dark-green font-bold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex gap-6">
                  <img
                    src={item.product_image || "/placeholder.svg"}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.product_name}</h3>
                    <p className="text-primary-green font-bold">${item.product_price}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 bg-gray-100 rounded">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <h3 className="font-bold text-xl mb-6">Order Summary</h3>
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${calculateTax()}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span className="text-primary-green">${calculateGrandTotal()}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary-green text-white py-3 rounded-lg hover:bg-dark-green font-bold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
