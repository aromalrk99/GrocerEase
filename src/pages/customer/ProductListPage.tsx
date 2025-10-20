"use client"

import { useState, useEffect } from "react"
import { Star, ShoppingCart } from "lucide-react"
import { useCartStore } from "../../store/cartStore"

interface Product {
  id: string
  name: string
  price: number
  category: string
  rating: number
  image: string
  inStock: boolean
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fresh Apples",
    price: 4.99,
    category: "Fruits",
    rating: 4.5,
    image: "/fresh-apples.png",
    inStock: true,
  },
  {
    id: "2",
    name: "Organic Carrots",
    price: 2.99,
    category: "Vegetables",
    rating: 4.8,
    image: "/organic-carrots.png",
    inStock: true,
  },
  {
    id: "3",
    name: "Whole Milk",
    price: 3.49,
    category: "Dairy",
    rating: 4.6,
    image: "/whole-milk.jpg",
    inStock: true,
  },
  {
    id: "4",
    name: "Whole Wheat Bread",
    price: 2.49,
    category: "Bakery",
    rating: 4.7,
    image: "/whole-wheat-bread.png",
    inStock: true,
  },
  {
    id: "5",
    name: "Tomatoes",
    price: 3.99,
    category: "Vegetables",
    rating: 4.4,
    image: "/fresh-tomatoes.png",
    inStock: true,
  },
  {
    id: "6",
    name: "Bananas",
    price: 1.99,
    category: "Fruits",
    rating: 4.9,
    image: "/fresh-bananas.jpg",
    inStock: true,
  },
  {
    id: "7",
    name: "Cheddar Cheese",
    price: 5.99,
    category: "Dairy",
    rating: 4.5,
    image: "/cheddar-cheese.png",
    inStock: true,
  },
  {
    id: "8",
    name: "Olive Oil",
    price: 8.99,
    category: "Oils",
    rating: 4.8,
    image: "/olive-oil-still-life.png",
    inStock: true,
  },
]

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const { addItem } = useCartStore()

  const categories = ["All", ...new Set(products.map((p) => p.category))]

  useEffect(() => {
    let filtered = products
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, sortBy, products])

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Shop Groceries</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="card p-6 sticky top-20">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat ? "bg-primary text-white" : "hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-lg mb-4">Sort By</h3>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card overflow-hidden hover:shadow-lg transition">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.category}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.rating})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
