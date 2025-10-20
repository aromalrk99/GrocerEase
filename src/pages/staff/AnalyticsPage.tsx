import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const revenueData = [
  { week: "Week 1", revenue: 4000 },
  { week: "Week 2", revenue: 3000 },
  { week: "Week 3", revenue: 2000 },
  { week: "Week 4", revenue: 2780 },
]

const topProducts = [
  { name: "Apples", sales: 450 },
  { name: "Carrots", sales: 380 },
  { name: "Milk", sales: 320 },
  { name: "Bread", sales: 290 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-6">Weekly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#22C55E" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold mb-6">Top Products</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
