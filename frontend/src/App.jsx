"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import LandingPage from "./pages/LandingPage"
import CustomerLogin from "./pages/CustomerLogin"
import StaffLogin from "./pages/StaffLogin"
import CustomerRegister from "./pages/CustomerRegister"
import CustomerDashboard from "./pages/CustomerDashboard"
import ShopPage from "./pages/ShopPage"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderConfirmation from "./pages/OrderConfirmation"
import CustomerOrders from "./pages/CustomerOrders"
import CustomerProfile from "./pages/CustomerProfile"
import StaffDashboard from "./pages/StaffDashboard"
import ProductManagement from "./pages/ProductManagement"
import AddProduct from "./pages/AddProduct"
import StaffOrders from "./pages/StaffOrders"
import StaffProfile from "./pages/StaffProfile"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [role, setRole] = useState(localStorage.getItem("role"))
  const [userId, setUserId] = useState(localStorage.getItem("userId"))

  const handleLogin = (accessToken, userRole, id) => {
    localStorage.setItem("token", accessToken)
    localStorage.setItem("role", userRole)
    localStorage.setItem("userId", id)
    setToken(accessToken)
    setRole(userRole)
    setUserId(id)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    setToken(null)
    setRole(null)
    setUserId(null)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer-login" element={<CustomerLogin onLogin={handleLogin} />} />
        <Route path="/staff-login" element={<StaffLogin onLogin={handleLogin} />} />
        <Route path="/register" element={<CustomerRegister onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            token && role === "customer" ? (
              <CustomerDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/customer-login" />
            )
          }
        />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={token ? <CartPage /> : <Navigate to="/customer-login" />} />
        <Route path="/checkout" element={token ? <CheckoutPage /> : <Navigate to="/customer-login" />} />
        <Route
          path="/order-confirmation/:orderId"
          element={token ? <OrderConfirmation /> : <Navigate to="/customer-login" />}
        />
        <Route
          path="/orders"
          element={token && role === "customer" ? <CustomerOrders /> : <Navigate to="/customer-login" />}
        />
        <Route
          path="/profile"
          element={
            token && role === "customer" ? (
              <CustomerProfile onLogout={handleLogout} />
            ) : (
              <Navigate to="/customer-login" />
            )
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            token && role === "staff" ? <StaffDashboard onLogout={handleLogout} /> : <Navigate to="/staff-login" />
          }
        />
        <Route
          path="/product-management"
          element={token && role === "staff" ? <ProductManagement /> : <Navigate to="/staff-login" />}
        />
        <Route
          path="/add-product"
          element={token && role === "staff" ? <AddProduct /> : <Navigate to="/staff-login" />}
        />
        <Route
          path="/staff-orders"
          element={token && role === "staff" ? <StaffOrders /> : <Navigate to="/staff-login" />}
        />
        <Route
          path="/staff-profile"
          element={
            token && role === "staff" ? <StaffProfile onLogout={handleLogout} /> : <Navigate to="/staff-login" />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
