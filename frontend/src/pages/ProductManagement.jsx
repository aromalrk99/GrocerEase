"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/")
      setProducts(response.data.results || response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/staff/products/${productId}/delete/`)
        fetchProducts()
        alert("Product deleted successfully")
      } catch (error) {
        alert("Failed to delete product")
      }
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

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
            onClick={() => navigate("/add-product")}
            className="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-dark-green"
          >
            Add Product
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Product Management</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-6 py-3 text-left font-bold">Image</th>
                  <th className="px-6 py-3 text-left font-bold">Name</th>
                  <th className="px-6 py-3 text-left font-bold">Category</th>
                  <th className="px-6 py-3 text-left font-bold">Price</th>
                  <th className="px-6 py-3 text-left font-bold">Stock</th>
                  <th className="px-6 py-3 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 text-primary-green font-bold">${product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => navigate(`/product-management`)}
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
