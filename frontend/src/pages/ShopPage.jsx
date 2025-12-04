"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function ShopPage({ dashboard = false }) {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const categories = [
    "All",
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

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/customer-login")
        return
      }
      await api.post("/cart/add/", {
        product_id: productId,
        quantity: 1,
      })
      alert("Added to cart!")
    } catch (error) {
      alert("Failed to add to cart")
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div className={!dashboard ? "min-h-screen bg-surface" : ""}>
      {!dashboard && (
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
              Grocerease
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/cart")}
                className="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-dark-green"
              >
                Cart
              </button>
              <button
                onClick={() => navigate("/customer-login")}
                className="px-6 py-2 border-2 border-primary-green text-primary-green rounded-lg hover:bg-green-50"
              >
                Login
              </button>
            </div>
          </div>
        </nav>
      )}

      <div className={!dashboard ? "max-w-7xl mx-auto px-8 py-8" : ""}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-primary-green text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 my-2">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary-green font-bold text-lg">${product.price}</span>
                  <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full mt-4 bg-primary-green text-white py-2 rounded-lg hover:bg-dark-green font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
