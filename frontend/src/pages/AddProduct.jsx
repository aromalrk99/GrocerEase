"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "Example Product",
    description: "Placeholder description for new product",
    price: 4.99,
    stock: 10,
    category: "Fruits",
    image_url: "https://via.placeholder.com/300?text=New+Product",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const categories = [
    "Fruits",
    "Vegetables",
    "Meat",
    "Dairy",
    "Bakery",
    "Beverages",
    "Snacks",
    "Frozen Food",
    "Essentials",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/staff/products/create/", {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })
      alert("Product created successfully")
      navigate("/product-management")
    } catch (error) {
      alert("Failed to create product")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1
            className="text-3xl font-bold text-primary-green cursor-pointer"
            onClick={() => navigate("/staff-dashboard")}
          >
            Grocerease Staff
          </h1>
          <button
            onClick={() => navigate("/product-management")}
            className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
          >
            Back
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
            />
          </div>

          {formData.image_url && (
            <div>
              <p className="text-gray-700 font-semibold mb-2">Preview</p>
              <img
                src={formData.image_url || "/placeholder.svg"}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-green text-white py-3 rounded-lg hover:bg-dark-green font-bold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  )
}
