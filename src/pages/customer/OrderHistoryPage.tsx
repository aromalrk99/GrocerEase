import { Package, Truck, CheckCircle } from "lucide-react"

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "shipped" | "delivered"
  items: number
}

const MOCK_ORDERS: Order[] = [
  { id: "ORD001", date: "2024-01-15", total: 45.99, status: "delivered", items: 5 },
  { id: "ORD002", date: "2024-01-10", total: 32.5, status: "delivered", items: 3 },
  { id: "ORD003", date: "2024-01-05", total: 58.75, status: "shipped", items: 7 },
]

export default function OrderHistoryPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="w-5 h-5 text-yellow-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-primary" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Order History</h1>

        {MOCK_ORDERS.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-muted-foreground text-lg">No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{order.id}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {new Date(order.date).toLocaleDateString()} • {order.items} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-2">${order.total.toFixed(2)}</p>
                    <div className="flex items-center gap-2 justify-end">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
