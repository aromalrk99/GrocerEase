export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-600 mb-4">Grocerease</h1>
          <p className="text-xl text-gray-600 mb-8">Full-Stack Grocery Delivery Application</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            Grocerease is a complete full-stack grocery delivery web application with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>React.js + Tailwind CSS frontend with Vite</li>
            <li>Django REST Framework backend with SQLite</li>
            <li>JWT authentication with role-based access (Customer & Staff)</li>
            <li>50+ grocery products across 9 categories</li>
            <li>Complete shopping cart and checkout flow</li>
            <li>Order management and tracking system</li>
            <li>Staff dashboard with product management</li>
            <li>17 fully functional pages</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-600 mb-4">Backend Setup</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto mb-4">
              {`cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python setup_data.py
python manage.py runserver`}
            </pre>
            <p className="text-sm text-gray-600">Runs on: http://localhost:8000</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-600 mb-4">Frontend Setup</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto mb-4">
              {`cd frontend
npm install
npm run dev`}
            </pre>
            <p className="text-sm text-gray-600">Runs on: http://localhost:5173</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Sample Credentials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-600 mb-3">Customer Login</h3>
              <p className="text-sm">
                <strong>Email:</strong> customer@example.com
              </p>
              <p className="text-sm">
                <strong>Password:</strong> 123456
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-600 mb-3">Staff Login</h3>
              <p className="text-sm">
                <strong>Email:</strong> staff@example.com
              </p>
              <p className="text-sm">
                <strong>Password:</strong> staff123
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Customer Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ User registration & JWT login</li>
                <li>✓ Browse 50+ products with filtering</li>
                <li>✓ Shopping cart management</li>
                <li>✓ Checkout with address & payment</li>
                <li>✓ Order tracking & history</li>
                <li>✓ Profile management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Staff Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Dashboard with statistics</li>
                <li>✓ Product management (CRUD)</li>
                <li>✓ Order management system</li>
                <li>✓ Order status tracking</li>
                <li>✓ Inventory monitoring</li>
                <li>✓ Staff profile</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Project Structure</h2>
          <div className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
            <pre className="text-gray-700">{`Grocerease/
├── backend/
│   ├── grocerease/
│   │   ├── settings.py      (Django configuration)
│   │   ├── urls.py          (API routes)
│   │   └── wsgi.py
│   ├── api/
│   │   ├── models.py        (Database models)
│   │   ├── serializers.py   (API serializers)
│   │   ├── views.py         (API endpoints)
│   │   ├── urls.py          (API paths)
│   │   └── admin.py
│   ├── manage.py
│   ├── setup_data.py        (Database seeding)
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── pages/           (17 page components)
    │   │   ├── LandingPage.jsx
    │   │   ├── CustomerLogin.jsx
    │   │   ├── StaffLogin.jsx
    │   │   ├── CustomerRegister.jsx
    │   │   ├── CustomerDashboard.jsx
    │   │   ├── ShopPage.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── CartPage.jsx
    │   │   ├── CheckoutPage.jsx
    │   │   ├── OrderConfirmation.jsx
    │   │   ├── CustomerOrders.jsx
    │   │   ├── CustomerProfile.jsx
    │   │   ├── StaffDashboard.jsx
    │   │   ├── ProductManagement.jsx
    │   │   ├── AddProduct.jsx
    │   │   ├── StaffOrders.jsx
    │   │   └── StaffProfile.jsx
    │   ├── api/
    │   │   └── axios.js     (API client)
    │   ├── App.jsx          (Router setup)
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── index.html`}</pre>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Database Schema</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-bold mb-2">Core Models</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>UserProfile:</strong> Stores user role (customer/staff), phone, address
                </li>
                <li>
                  <strong>Product:</strong> 50+ grocery items with price, stock, category, image
                </li>
                <li>
                  <strong>Order:</strong> Order records with status tracking
                </li>
                <li>
                  <strong>OrderItem:</strong> Individual items in each order
                </li>
                <li>
                  <strong>Cart:</strong> Shopping cart per user
                </li>
                <li>
                  <strong>CartItem:</strong> Items in cart with quantity
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-green-600 mb-6">API Endpoints</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">Authentication</h3>
              <p className="text-gray-700">POST /api/auth/register/ - Register customer</p>
              <p className="text-gray-700">POST /api/auth/login/ - Login (returns JWT token)</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Products</h3>
              <p className="text-gray-700">GET /api/products/ - List all products</p>
              <p className="text-gray-700">GET /api/products/{"{id}"}/ - Product details</p>
              <p className="text-gray-700">POST /api/staff/products/create/ - Create product (staff)</p>
              <p className="text-gray-700">PUT /api/staff/products/{"{id}"}/update/ - Update product (staff)</p>
              <p className="text-gray-700">DELETE /api/staff/products/{"{id}"}/delete/ - Delete product (staff)</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Cart & Orders</h3>
              <p className="text-gray-700">GET /api/cart/ - Get user cart</p>
              <p className="text-gray-700">POST /api/cart/add/ - Add item to cart</p>
              <p className="text-gray-700">POST /api/checkout/ - Create order</p>
              <p className="text-gray-700">GET /api/orders/ - Customer orders</p>
              <p className="text-gray-700">GET /api/staff/orders/ - All orders (staff)</p>
              <p className="text-gray-700">PUT /api/staff/orders/{"{order_id}"}/update/ - Update status (staff)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
