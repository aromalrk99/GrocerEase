import { CheckCircle, Clock, Truck } from "lucide-react"

interface Order {
  id: string
  customer: string
  total: number
  status: "pending" | "processing" | "shipped"
  date: string
}

const MOCK_ORDERS: Order[] = [
  { id: "ORD001", customer: "John Doe", total: 45.99, status: "shipped", date: "2024-01-15" },
  { id: "ORD002", customer: "Jane Smith", total: 32.5, status: "processing", date: "2024-01-14" },
  { id: "ORD003", customer: "Bob Johnson", total: 58.75, status: "pending", date: "2024-01-13" },
]

export default function OrderManagementPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-primary" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Order ID</th>
                <th className="px-6 py-4 text-left font-bold">Customer</th>
                <th className="px-6 py-4 text-left font-bold">Total</th>
                <th className="px-6 py-4 text-left font-bold">Status</th>
                <th className="px-6 py-4 text-left font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted transition">
                  <td className="px-6 py-4 font-bold">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
