"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function StaffLogin({ onLogin }) {
  const [email, setEmail] = useState("staff@example.com")
  const [password, setPassword] = useState("staff123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await api.post("/auth/login/", {
        username: email,
        password: password,
      })
      if (response.data.role === "staff") {
        onLogin(response.data.access, response.data.role, response.data.user_id)
        navigate("/staff-dashboard")
      } else {
        setError("This account is not a staff account")
      }
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary-green mb-2">Grocerease</h1>
        <p className="text-center text-gray-600 mb-8">Staff Login</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-green text-white py-3 rounded-lg font-bold hover:bg-dark-green disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Are you a customer?{" "}
          <button onClick={() => navigate("/customer-login")} className="text-primary-green font-bold hover:underline">
            Customer Login
          </button>
        </p>
      </div>
    </div>
  )
}
