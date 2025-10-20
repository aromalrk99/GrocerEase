"use client"

import type React from "react"

import { useState } from "react"
import { Edit, Trash2, Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Fresh Apples", category: "Fruits", price: 4.99, stock: 150 },
  { id: "2", name: "Organic Carrots", category: "Vegetables", price: 2.99, stock: 200 },
  { id: "3", name: "Whole Milk", category: "Dairy", price: 3.49, stock: 100 },
]

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "" })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
    }
    setProducts([...products, newProduct])
    setFormData({ name: "", category: "", price: "", stock: "" })
    setShowForm(false)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Product Management</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {showForm && (
          <div className="card p-6 mb-8">
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  Add Product
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Product Name</th>
                <th className="px-6 py-4 text-left font-bold">Category</th>
                <th className="px-6 py-4 text-left font-bold">Price</th>
                <th className="px-6 py-4 text-left font-bold">Stock</th>
                <th className="px-6 py-4 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted transition">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded transition">
                        <Edit className="w-5 h-5 text-primary" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
