interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    totalOrders: 12,
    totalSpent: 456.78,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    totalOrders: 8,
    totalSpent: 234.56,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 (555) 345-6789",
    totalOrders: 15,
    totalSpent: 678.9,
  },
]

export default function CustomerManagementPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Customer Management</h1>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Name</th>
                <th className="px-6 py-4 text-left font-bold">Email</th>
                <th className="px-6 py-4 text-left font-bold">Phone</th>
                <th className="px-6 py-4 text-left font-bold">Total Orders</th>
                <th className="px-6 py-4 text-left font-bold">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted transition">
                  <td className="px-6 py-4 font-bold">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.totalOrders}</td>
                  <td className="px-6 py-4">${customer.totalSpent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
