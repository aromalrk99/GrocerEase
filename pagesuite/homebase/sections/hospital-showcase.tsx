"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import HospitalCard from "@/components/cards/hospital-card"
import type { Hospital } from "@/utilspark/types"
import { ChevronRight } from "lucide-react"

export default function HospitalShowcase() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hospitals?limit=6")
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

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center text-muted-foreground">Loading hospitals...</div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Top Hospitals</h2>
        <p className="text-muted-foreground">Explore the finest healthcare providers in Bangalore</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>

      <Link
        href="/hospitals"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        View All Hospitals
        <ChevronRight className="w-5 h-5" />
      </Link>
    </section>
  )
}
