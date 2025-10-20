import type React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/authStore"

// Public Pages
import LandingPage from "./pages/public/LandingPage"
import LoginPage from "./pages/public/LoginPage"
import SignupPage from "./pages/public/SignupPage"
import AboutPage from "./pages/public/AboutPage"
import ContactPage from "./pages/public/ContactPage"

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard"
import ProductListPage from "./pages/customer/ProductListPage"
import ProductDetailPage from "./pages/customer/ProductDetailPage"
import CartPage from "./pages/customer/CartPage"
import CheckoutPage from "./pages/customer/CheckoutPage"
import OrderHistoryPage from "./pages/customer/OrderHistoryPage"
import WishlistPage from "./pages/customer/WishlistPage"
import OffersPage from "./pages/customer/OffersPage"
import ReviewPage from "./pages/customer/ReviewPage"
import CustomerProfilePage from "./pages/customer/CustomerProfilePage"

// Staff Pages
import StaffDashboard from "./pages/staff/StaffDashboard"
import ProductManagementPage from "./pages/staff/ProductManagementPage"
import CategoryManagementPage from "./pages/staff/CategoryManagementPage"
import OrderManagementPage from "./pages/staff/OrderManagementPage"
import InventoryManagementPage from "./pages/staff/InventoryManagementPage"
import CustomerManagementPage from "./pages/staff/CustomerManagementPage"
import OffersManagementPage from "./pages/staff/OffersManagementPage"
import AnalyticsPage from "./pages/staff/AnalyticsPage"
import StaffProfilePage from "./pages/staff/StaffProfilePage"
import FeedbackPage from "./pages/staff/FeedbackPage"

// Layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default function App() {
  const { user } = useAuthStore()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Customer Routes */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute requiredRole="customer">
                <ProductListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute requiredRole="customer">
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="customer">
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute requiredRole="customer">
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiredRole="customer">
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute requiredRole="customer">
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute requiredRole="customer">
                <OffersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute requiredRole="customer">
                <ReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff/dashboard"
            element={
              <ProtectedRoute requiredRole="staff">
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/products"
            element={
              <ProtectedRoute requiredRole="staff">
                <ProductManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/categories"
            element={
              <ProtectedRoute requiredRole="staff">
                <CategoryManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/orders"
            element={
              <ProtectedRoute requiredRole="staff">
                <OrderManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/inventory"
            element={
              <ProtectedRoute requiredRole="staff">
                <InventoryManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/customers"
            element={
              <ProtectedRoute requiredRole="staff">
                <CustomerManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/offers"
            element={
              <ProtectedRoute requiredRole="staff">
                <OffersManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/analytics"
            element={
              <ProtectedRoute requiredRole="staff">
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/profile"
            element={
              <ProtectedRoute requiredRole="staff">
                <StaffProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/feedback"
            element={
              <ProtectedRoute requiredRole="staff">
                <FeedbackPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
