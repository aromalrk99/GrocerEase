"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([])
  const [address, setAddress] = useState("42 Elm Street")
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart/")
      setCartItems(response.data.items || [])
    } catch (error) {
      console.error("Error fetching cart:", error)
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

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post("/checkout/", {
        shipping_address: address,
        payment_method: paymentMethod,
      })
      navigate(`/order-confirmation/${response.data.order_id}`)
    } catch (error) {
      alert("Failed to place order")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
            Grocerease
          </h1>
          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
          >
            Back to Cart
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <form onSubmit={handlePlaceOrder} className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
                rows="4"
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "credit_card", label: "Credit Card" },
                  { id: "debit_card", label: "Debit Card" },
                  { id: "paypal", label: "PayPal" },
                  { id: "apple_pay", label: "Apple Pay" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-green"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-green text-white py-4 rounded-lg hover:bg-dark-green font-bold text-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                  <span>
                    {item.product_name} x{item.quantity}
                  </span>
                  <span>${(item.product_price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${calculateTax()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary-green">
                <span>Total:</span>
                <span>${calculateGrandTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
