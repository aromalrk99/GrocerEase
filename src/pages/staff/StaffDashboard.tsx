import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 221 },
  { month: "Mar", sales: 2000, orders: 229 },
  { month: "Apr", sales: 2780, orders: 200 },
  { month: "May", sales: 1890, orders: 229 },
  { month: "Jun", sales: 2390, orders: 200 },
]

const categoryData = [
  { name: "Fruits", value: 35 },
  { name: "Vegetables", value: 25 },
  { name: "Dairy", value: 20 },
  { name: "Bakery", value: 20 },
]

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444"]

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Staff Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">$45,678</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Products</p>
                <p className="text-3xl font-bold">456</p>
              </div>
              <Package className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Customers</p>
                <p className="text-3xl font-bold">789</p>
              </div>
              <Users className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-xl font-bold mb-6">Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#22C55E" />
                <Line type="monotone" dataKey="orders" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-6">Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
