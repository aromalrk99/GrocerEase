# Grocerease - Full Stack Grocery Delivery Application

A complete grocery delivery web application built with Django REST Framework backend and React.js frontend using JWT authentication.

## Project Structure

\`\`\`
Grocerease/
├── backend/
│   ├── grocerease/
│   ├── api/
│   ├── manage.py
│   ├── setup_data.py
│   └── requirements.txt
└── frontend/
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── index.html
\`\`\`

## Backend Setup (Django)

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Run migrations:
\`\`\`bash
python manage.py migrate
\`\`\`

5. Populate database with sample data:
\`\`\`bash
python manage.py shell < setup_data.py
\`\`\`

Or run the script directly:
\`\`\`bash
python setup_data.py
\`\`\`

6. Start the development server:
\`\`\`bash
python manage.py runserver
\`\`\`

The backend will run at: `http://localhost:8000`

## Frontend Setup (React)

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run at: `http://localhost:5173`

## Sample Login Credentials

### Customer Login
- Email: `customer@example.com`
- Password: `123456`

### Staff Login
- Email: `staff@example.com`
- Password: `staff123`

## Database

The application uses SQLite for the database. The database file is created automatically in the backend directory as `db.sqlite3`.

## Features

### Customer Features
- Register and login
- Browse products by category
- View product details
- Add items to cart
- Checkout and place orders
- Track order status
- View order history
- Manage profile

### Staff Features
- View dashboard statistics
- Manage products (add, edit, delete)
- Manage orders and update status
- View staff profile

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new customer
- `POST /api/auth/login/` - Login for customer and staff

### Products
- `GET /api/products/` - Get all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/staff/products/create/` - Create new product (staff only)
- `PUT /api/staff/products/{id}/update/` - Update product (staff only)
- `DELETE /api/staff/products/{id}/delete/` - Delete product (staff only)

### Cart
- `GET /api/cart/` - Get user cart
- `POST /api/cart/add/` - Add item to cart
- `PUT /api/cart/update/{item_id}/` - Update cart item quantity
- `DELETE /api/cart/remove/{item_id}/` - Remove item from cart

### Orders
- `POST /api/checkout/` - Create order from cart
- `GET /api/orders/` - Get customer orders
- `GET /api/orders/{order_id}/` - Get order details
- `GET /api/staff/orders/` - Get all orders (staff only)
- `PUT /api/staff/orders/{order_id}/update/` - Update order status (staff only)

### Profile
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/update/` - Update user profile

## Tech Stack

- **Frontend**: React.js, React Router, Axios, Tailwind CSS, Vite
- **Backend**: Django, Django REST Framework, Django JWT
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

## Features Implemented

- Full JWT authentication system with role-based access (Customer/Staff)
- 50+ grocery products with categories
- Complete shopping cart functionality
- Order management system
- Payment method selection
- Order tracking and status updates
- User profile management
- Staff dashboard with statistics
- Product management interface
- Responsive design with green theme
- CORS enabled for cross-origin requests

## Testing

The application comes pre-populated with:
- 50 grocery products across 9 categories
- 3 customer accounts
- 1 staff account
- 10 sample orders with items

All pages are fully populated with sample data and placeholder images.
