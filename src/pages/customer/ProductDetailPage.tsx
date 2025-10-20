"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "../../store/cartStore"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product data
  const product = {
    id: id || "1",
    name: "Fresh Organic Apples",
    price: 4.99,
    rating: 4.5,
    reviews: 128,
    category: "Fruits",
    description:
      "Crisp, sweet, and delicious organic apples sourced directly from local farms. Perfect for snacking or baking.",
    image: "/images/apples.png",
    inStock: true,
    details: {
      origin: "Local Farm",
      weight: "1 lb",
      expiry: "7 days",
      organic: true,
    },
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <button onClick={() => navigate("/products")} className="text-primary hover:underline mb-8">
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>

            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Product Details */}
            <div className="bg-white p-6 rounded-lg mb-8">
              <h3 className="font-bold text-lg mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin</span>
                  <span className="font-medium">{product.details.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{product.details.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shelf Life</span>
                  <span className="font-medium">{product.details.expiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organic</span>
                  <span className="font-medium">{product.details.organic ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted">
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-lg border-2 transition ${
                    isWishlisted ? "bg-primary border-primary text-white" : "border-border hover:border-primary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mt-8 p-4 bg-primary bg-opacity-10 rounded-lg">
              <p className="text-primary font-medium">{product.inStock ? "✓ In Stock" : "✗ Out of Stock"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
