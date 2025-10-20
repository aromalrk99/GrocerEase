import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Grocerease</h3>
            <p className="text-gray-300">
              Your trusted online grocery store for fresh, quality products delivered to your door.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@grocerease.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Market St, City, State</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Grocerease. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
