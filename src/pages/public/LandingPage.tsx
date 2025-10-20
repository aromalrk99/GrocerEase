import { Link } from "react-router-dom"
import { ShoppingCart, Truck, Shield, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Fresh Groceries, Delivered Fast</h1>
            <p className="text-xl mb-8 text-gray-100">
              Shop from thousands of fresh products and get them delivered to your doorstep in minutes.
            </p>
            <div className="flex gap-4">
              <Link
                to="/signup"
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Grocerease?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card p-6 text-center">
              <ShoppingCart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">Browse thousands of fresh groceries and household items.</p>
            </div>
            <div className="card p-6 text-center">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your groceries delivered within 30 minutes.</p>
            </div>
            <div className="card p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">All products are fresh and quality checked.</p>
            </div>
            <div className="card p-6 text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-muted-foreground">Competitive prices with regular discounts and offers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of happy customers shopping with Grocerease.
          </p>
          <Link to="/signup" className="btn-primary inline-block">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}
