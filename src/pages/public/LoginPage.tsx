"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"customer" | "staff">("customer")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password, role)
      navigate(role === "customer" ? "/customer/dashboard" : "/staff/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login to Grocerease</h1>

        {error && <div className="bg-destructive text-white p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "customer" | "staff")}
              className="input-field"
            >
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm font-bold mb-2">Demo Credentials:</p>
          <p className="text-xs text-muted-foreground mb-1">Customer: customer@demo.com / password123</p>
          <p className="text-xs text-muted-foreground">Staff: staff@demo.com / password123</p>
        </div>
      </div>
    </div>
  )
}
