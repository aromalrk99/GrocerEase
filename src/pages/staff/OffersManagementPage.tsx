"use client"

import { Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface Offer {
  id: string
  title: string
  discount: number
  code: string
  expiry: string
}

const MOCK_OFFERS: Offer[] = [
  { id: "1", title: "Fresh Produce Sale", discount: 20, code: "FRESH20", expiry: "2024-02-15" },
  { id: "2", title: "Dairy Discount", discount: 15, code: "DAIRY15", expiry: "2024-02-10" },
]

export default function OffersManagementPage() {
  const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS)
  const [showForm, setShowForm] = useState(false)

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter((o) => o.id !== id))
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Offers Management</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Offer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="card p-6">
              <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{offer.discount}% OFF</p>
              <p className="text-muted-foreground text-sm mb-4">Code: {offer.code}</p>
              <p className="text-xs text-muted-foreground mb-4">
                Expires: {new Date(offer.expiry).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="flex-1 bg-destructive text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
