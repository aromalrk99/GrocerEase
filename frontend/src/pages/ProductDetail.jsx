"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}/`)
      setProduct(response.data)

      const allProducts = await api.get("/products/")
      const products = allProducts.data.results || allProducts.data
      const related = products.filter((p) => p.category === response.data.category && p.id !== id).slice(0, 6)
      setRelatedProducts(related)
    } catch (error) {
      console.error("Error fetching product:", error)
    }
  }

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/customer-login")
        return
      }
      await api.post("/cart/add/", {
        product_id: id,
        quantity: quantity,
      })
      alert("Added to cart!")
      navigate("/cart")
    } catch (error) {
      alert("Failed to add to cart")
    }
  }

  if (!product) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-green cursor-pointer" onClick={() => navigate("/")}>
            Grocerease
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
            >
              Shop
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-dark-green"
            >
              Cart
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="bg-green-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold mb-3">Nutritional Info</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>Calories: 100</div>
                <div>Protein: 5g</div>
                <div>Carbs: 15g</div>
                <div>Fat: 2g</div>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-600 mb-2">Stock: {product.stock}</p>
              <p className="text-3xl font-bold text-primary-green mb-4">${product.price}</p>
            </div>
            <div className="flex gap-4 items-center mb-6">
              <label className="font-semibold">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-green text-white py-4 rounded-lg font-bold text-lg hover:bg-dark-green"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image_url || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-primary-green font-bold mt-2">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
