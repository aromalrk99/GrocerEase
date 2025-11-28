"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import TreatmentCard from "@/components/cards/treatment-card"
import type { Treatment } from "@/utilspark/types"
import { ChevronRight } from "lucide-react"

export default function TreatmentHighlights() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/treatments?limit=6")
        const data = await response.json()
        setTreatments(data.data || [])
      } catch (err) {
        console.error("Failed to fetch treatments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTreatments()
  }, [])

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center text-muted-foreground">Loading treatments...</div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Common Treatments</h2>
        <p className="text-muted-foreground">Understand costs and availability of popular medical procedures</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {treatments.map((treatment) => (
          <TreatmentCard key={treatment.id} treatment={treatment} />
        ))}
      </div>

      <Link
        href="/treatments"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        View All Treatments
        <ChevronRight className="w-5 h-5" />
      </Link>
    </section>
  )
}
