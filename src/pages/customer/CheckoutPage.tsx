"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"
import { useAuthStore } from "../../store/authStore"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock order placement
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      navigate("/orders")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <button onClick={() => navigate("/products")} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const total = getTotalPrice() + 5 + getTotalPrice() * 0.1

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        {orderPlaced && (
          <div className="bg-primary text-white p-6 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p>Your order has been confirmed. Redirecting to orders page...</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Address */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-lg">
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
