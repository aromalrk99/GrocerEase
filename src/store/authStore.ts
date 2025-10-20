import { create } from "zustand"

interface User {
  id: string
  email: string
  name: string
  role: "customer" | "staff"
  token: string
}

interface AuthStore {
  user: User | null
  login: (email: string, password: string, role: "customer" | "staff") => Promise<void>
  signup: (email: string, password: string, name: string, role: "customer" | "staff") => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,

  login: async (email: string, password: string, role: "customer" | "staff") => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await response.json()
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
        set({ user: data.user })
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  },

  signup: async (email: string, password: string, name: string, role: "customer" | "staff") => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      })
      const data = await response.json()
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
        set({ user: data.user })
      }
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem("user")
    set({ user: null })
  },

  setUser: (user: User | null) => set({ user }),
}))
