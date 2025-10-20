"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<"customer" | "staff">("customer")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signup(email, password, name, role)
      navigate(role === "customer" ? "/customer/dashboard" : "/staff/dashboard")
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Join Grocerease</h1>

        {error && <div className="bg-destructive text-white p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="John Doe"
              required
            />
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

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
