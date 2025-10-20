"use client"

import { Link } from "react-router-dom"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCartStore } from "../../store/cartStore"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some groceries to get started!</p>
          <Link to="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 p-6 border-b border-border last:border-b-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-primary font-bold mb-4">${item.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 bg-muted rounded">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold mb-4">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-destructive hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-bold">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-bold">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${(getTotalPrice() + 5 + getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block mb-4">
                Proceed to Checkout
              </Link>

              <button onClick={() => clearCart()} className="btn-secondary w-full">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
