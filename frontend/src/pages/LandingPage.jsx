"use client"

import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-primary-green">Grocerease</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/customer-login")}
            className="px-6 py-2 text-primary-green border-2 border-primary-green rounded-lg hover:bg-green-50"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-dark-green"
          >
            Register
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Grocerease</h2>
          <p className="text-xl text-gray-600 mb-8">Fresh groceries delivered to your doorstep in minutes</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-primary-green text-white rounded-lg hover:bg-dark-green text-lg font-semibold"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/customer-login")}
              className="px-8 py-3 border-2 border-primary-green text-primary-green rounded-lg hover:bg-green-50 text-lg font-semibold"
            >
              Login
            </button>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Fruits", "Vegetables", "Meat", "Dairy", "Snacks", "Bakery"].map((cat) => (
              <div
                key={cat}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate("/shop")}
              >
                <img
                  src={`https://via.placeholder.com/300?text=${cat}`}
                  alt={cat}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900">{cat}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Popular Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Apples", price: "$3.99", img: "https://via.placeholder.com/300?text=Apples" },
              { name: "Milk", price: "$3.49", img: "https://via.placeholder.com/300?text=Milk" },
              { name: "Bread", price: "$2.99", img: "https://via.placeholder.com/300?text=Bread" },
              { name: "Carrots", price: "$2.99", img: "https://via.placeholder.com/300?text=Carrots" },
              { name: "Chicken Breast", price: "$8.99", img: "https://via.placeholder.com/300?text=ChickenBreast" },
              { name: "Cheese", price: "$6.99", img: "https://via.placeholder.com/300?text=Cheese" },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={item.img || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                  <p className="text-primary-green font-bold text-lg mt-2">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
