import { Zap } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  discount: number
  code: string
  expiry: string
}

const MOCK_OFFERS: Offer[] = [
  {
    id: "1",
    title: "Fresh Produce Sale",
    description: "20% off on all fruits and vegetables",
    discount: 20,
    code: "FRESH20",
    expiry: "2024-02-15",
  },
  {
    id: "2",
    title: "Dairy Discount",
    description: "15% off on all dairy products",
    discount: 15,
    code: "DAIRY15",
    expiry: "2024-02-10",
  },
  {
    id: "3",
    title: "Free Delivery",
    description: "Free delivery on orders above $50",
    discount: 5,
    code: "FREEDEL",
    expiry: "2024-02-20",
  },
]

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Current Offers</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_OFFERS.map((offer) => (
            <div key={offer.id} className="card p-6 border-l-4 border-primary">
              <div className="flex items-start justify-between mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold text-primary">{offer.discount}%</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{offer.description}</p>
              <div className="bg-muted p-3 rounded-lg mb-4">
                <p className="text-xs text-muted-foreground mb-1">Code</p>
                <p className="font-bold text-lg">{offer.code}</p>
              </div>
              <p className="text-xs text-muted-foreground">Expires: {new Date(offer.expiry).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
