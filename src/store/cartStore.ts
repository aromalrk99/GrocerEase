import { create } from "zustand"

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [],

  addItem: (item: CartItem) => {
    const items = get().items
    const existingItem = items.find((i) => i.productId === item.productId)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      items.push(item)
    }
    localStorage.setItem("cart", JSON.stringify(items))
    set({ items })
  },

  removeItem: (productId: string) => {
    const items = get().items.filter((i) => i.productId !== productId)
    localStorage.setItem("cart", JSON.stringify(items))
    set({ items })
  },

  updateQuantity: (productId: string, quantity: number) => {
    const items = get().items
    const item = items.find((i) => i.productId === productId)
    if (item) {
      item.quantity = quantity
    }
    localStorage.setItem("cart", JSON.stringify(items))
    set({ items })
  },

  clearCart: () => {
    localStorage.removeItem("cart")
    set({ items: [] })
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))
