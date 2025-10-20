"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { useCartStore } from "../../store/cartStore"
import { ShoppingCart, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const { items } = useCartStore()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">Grocerease</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {!user ? (
            <>
              <Link to="/about" className="text-foreground hover:text-primary transition">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition">
                Contact
              </Link>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </>
          ) : user.role === "customer" ? (
            <>
              <Link to="/products" className="text-foreground hover:text-primary transition">
                Shop
              </Link>
              <Link to="/offers" className="text-foreground hover:text-primary transition">
                Offers
              </Link>
              <Link to="/orders" className="text-foreground hover:text-primary transition">
                Orders
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary transition" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-primary transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/staff/dashboard" className="text-foreground hover:text-primary transition">
                Dashboard
              </Link>
              <Link to="/staff/products" className="text-foreground hover:text-primary transition">
                Products
              </Link>
              <Link to="/staff/orders" className="text-foreground hover:text-primary transition">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-primary transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border p-4 space-y-4">
          {!user ? (
            <>
              <Link to="/about" className="block text-foreground hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="block text-foreground hover:text-primary">
                Contact
              </Link>
              <Link to="/login" className="block btn-primary text-center">
                Login
              </Link>
            </>
          ) : user.role === "customer" ? (
            <>
              <Link to="/products" className="block text-foreground hover:text-primary">
                Shop
              </Link>
              <Link to="/offers" className="block text-foreground hover:text-primary">
                Offers
              </Link>
              <Link to="/orders" className="block text-foreground hover:text-primary">
                Orders
              </Link>
              <Link to="/cart" className="block text-foreground hover:text-primary">
                Cart ({items.length})
              </Link>
              <button onClick={handleLogout} className="block w-full text-left text-foreground hover:text-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/staff/dashboard" className="block text-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link to="/staff/products" className="block text-foreground hover:text-primary">
                Products
              </Link>
              <Link to="/staff/orders" className="block text-foreground hover:text-primary">
                Orders
              </Link>
              <button onClick={handleLogout} className="block w-full text-left text-foreground hover:text-primary">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
