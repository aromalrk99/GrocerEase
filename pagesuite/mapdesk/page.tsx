"use client"

import { useEffect, useState } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import type { Hospital } from "@/utilspark/types"
import { MapPin } from "lucide-react"

export default function MapPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hospitals?limit=100")
        const data = await response.json()
        setHospitals(data.data || [])
      } catch (err) {
        console.error("Failed to fetch hospitals:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHospitals()
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Hospital Locator</h1>
        <p className="text-muted-foreground mb-8">Find healthcare providers near you</p>

        <div className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
              <h3 className="font-bold mb-4">Hospitals</h3>
              {loading ? (
                <div className="text-sm text-muted-foreground">Loading...</div>
              ) : (
                <ul className="space-y-2">
                  {hospitals.map((hospital) => (
                    <li key={hospital.id}>
                      <button
                        onClick={() => setSelectedHospital(hospital)}
                        className={`w-full text-left p-2 rounded text-sm transition ${
                          selectedHospital?.id === hospital.id ? "bg-primary text-white" : "hover:bg-muted"
                        }`}
                      >
                        <p className="font-semibold truncate">{hospital.name}</p>
                        <p className="text-xs">{hospital.area}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="bg-muted border border-border rounded-lg h-96 flex flex-col items-center justify-center">
              {selectedHospital ? (
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h2 className="font-bold text-lg">{selectedHospital.name}</h2>
                      <p className="text-muted-foreground text-sm">{selectedHospital.area}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="font-bold ml-2">{selectedHospital.rating.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Beds:</span>
                      <span className="font-bold ml-2">{selectedHospital.beds}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accreditation:</span>
                      <span className="font-bold ml-2">{selectedHospital.accreditation.join(", ")}</span>
                    </div>
                  </div>

                  <a
                    href={`/hospitals/${selectedHospital.id}`}
                    className="block w-full bg-primary text-white text-center py-2 rounded font-semibold hover:bg-primary/90 transition"
                  >
                    View Details
                  </a>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a hospital to view details</p>
                  <p className="text-sm mt-2">Interactive map visualization would display here</p>
                </div>
              )}
            </div>

            <div className="mt-6 bg-primary-light rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Note: Full map integration with Leaflet can be added for production deployment.
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
