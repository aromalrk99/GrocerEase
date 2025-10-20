import { Link } from "react-router-dom"
import { ShoppingCart, Package, Heart, Zap } from "lucide-react"
import { useAuthStore } from "../../store/authStore"

export default function CustomerDashboard() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mb-12">Here's what's happening with your account today.</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Package className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Wishlist Items</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <Heart className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Offers</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <Zap className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Cart Items</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Start Shopping</h2>
            <p className="text-muted-foreground mb-6">
              Browse our wide selection of fresh groceries and household items.
            </p>
            <Link to="/products" className="btn-primary inline-block">
              Shop Now
            </Link>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">View Your Orders</h2>
            <p className="text-muted-foreground mb-6">Track your orders and view your order history.</p>
            <Link to="/orders" className="btn-primary inline-block">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
