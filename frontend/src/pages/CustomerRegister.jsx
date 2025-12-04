"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CustomerRegister({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    phone: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")
    try {
      const response = await api.post("/auth/register/", {
        username: formData.email,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        phone: formData.phone,
        address: formData.address,
      })
      onLogin(response.data.access, "customer", response.data.user_id)
      navigate("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary-green mb-2">Grocerease</h1>
        <p className="text-center text-gray-600 mb-8">Create Account</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green text-sm"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green text-sm"
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green text-sm"
              placeholder="Your phone"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green text-sm"
              placeholder="Your address"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green text-sm"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green text-sm"
              placeholder="Confirm password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-green text-white py-3 rounded-lg font-bold hover:bg-dark-green disabled:opacity-50 mt-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <button onClick={() => navigate("/customer-login")} className="text-primary-green font-bold hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  )
}
