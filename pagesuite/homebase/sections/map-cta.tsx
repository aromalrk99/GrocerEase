"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"

export default function MapCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-secondary to-primary rounded-lg p-12 text-white text-center">
        <MapPin className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Find Nearby Healthcare Providers</h2>
        <p className="text-lg mb-8 opacity-90">Discover hospitals and clinics near you with our interactive map</p>
        <Link
          href="/map"
          className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-opacity-90 transition"
        >
          Open Interactive Map
        </Link>
      </div>
    </section>
  )
}
