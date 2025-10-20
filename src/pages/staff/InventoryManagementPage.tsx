import { AlertCircle } from "lucide-react"

interface InventoryItem {
  id: string
  product: string
  stock: number
  reorderLevel: number
  status: "in-stock" | "low-stock" | "out-of-stock"
}

const MOCK_INVENTORY: InventoryItem[] = [
  { id: "1", product: "Fresh Apples", stock: 150, reorderLevel: 50, status: "in-stock" },
  { id: "2", product: "Organic Carrots", stock: 30, reorderLevel: 50, status: "low-stock" },
  { id: "3", product: "Whole Milk", stock: 0, reorderLevel: 50, status: "out-of-stock" },
]

export default function InventoryManagementPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-primary text-white"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-destructive text-white"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Inventory Management</h1>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Product</th>
                <th className="px-6 py-4 text-left font-bold">Current Stock</th>
                <th className="px-6 py-4 text-left font-bold">Reorder Level</th>
                <th className="px-6 py-4 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVENTORY.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted transition">
                  <td className="px-6 py-4">{item.product}</td>
                  <td className="px-6 py-4 font-bold">{item.stock}</td>
                  <td className="px-6 py-4">{item.reorderLevel}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === "low-stock" && <AlertCircle className="w-5 h-5" />}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace("-", " ").toUpperCase()}
                      </span>
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
