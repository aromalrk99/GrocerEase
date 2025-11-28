"use client"

import { useEffect, useState } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import type { Treatment } from "@/utilspark/types"
import { formatCurrency } from "@/utilspark/formatter"
import CostChart from "@/components/charts/cost-chart"

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const specialties = [
    "Cardiology",
    "Orthopedics",
    "Gastroenterology",
    "Urology",
    "Oncology",
    "Neurosurgery",
    "Ophthalmology",
    "Dentistry",
  ]

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const params = selectedSpecialty ? `?specialty=${selectedSpecialty}` : "?limit=100"
        const response = await fetch(`http://localhost:5000/api/treatments${params}`)
        const data = await response.json()
        setTreatments(data.data || data || [])
      } catch (err) {
        console.error("Failed to fetch treatments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTreatments()
  }, [selectedSpecialty])

  const chartData = treatments
    .map((t) => ({
      name: t.name,
      min: t.min,
      max: t.max,
      avg: t.avg,
    }))
    .slice(0, 6)

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Treatment Directory</h1>
        <p className="text-muted-foreground mb-8">Explore costs and availability of common medical procedures</p>

        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Filter by Specialty</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSpecialty("")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedSpecialty === ""
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-muted-foreground/10"
              }`}
            >
              All
            </button>
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedSpecialty === spec
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted-foreground/10"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="mb-12">
            <CostChart data={chartData} />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading treatments...</div>
        ) : treatments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No treatments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Treatment</th>
                  <th className="px-4 py-3 text-left font-bold">Specialty</th>
                  <th className="px-4 py-3 text-left font-bold">Avg Cost</th>
                  <th className="px-4 py-3 text-left font-bold">Range</th>
                  <th className="px-4 py-3 text-left font-bold">Recovery Time</th>
                  <th className="px-4 py-3 text-left font-bold">Available At</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment, idx) => (
                  <tr key={treatment.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted"}>
                    <td className="px-4 py-3 font-bold">{treatment.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{treatment.specialty}</td>
                    <td className="px-4 py-3 text-primary font-bold">{formatCurrency(treatment.avg)}</td>
                    <td className="px-4 py-3 text-sm">
                      {formatCurrency(treatment.min)} - {formatCurrency(treatment.max)}
                    </td>
                    <td className="px-4 py-3 text-sm">{treatment.recoveryTime}</td>
                    <td className="px-4 py-3 text-sm">{treatment.availableAt.length} hospitals</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
