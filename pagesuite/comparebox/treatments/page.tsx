"use client"

import { useState } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import type { Treatment } from "@/utilspark/types"
import { formatCurrency } from "@/utilspark/formatter"
import { X } from "lucide-react"

export default function CompareTreatmentsPage() {
  const [treatmentIds, setTreatmentIds] = useState<string[]>([])
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [inputValue, setInputValue] = useState("")

  const addTreatment = async () => {
    if (treatmentIds.includes(inputValue) || inputValue.length === 0) return
    if (treatmentIds.length >= 3) {
      alert("Maximum 3 treatments can be compared")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/treatments/${inputValue}`)
      if (response.ok) {
        const treatment = await response.json()
        setTreatmentIds([...treatmentIds, inputValue])
        setTreatments([...treatments, treatment])
        setInputValue("")
      }
    } catch (err) {
      alert("Treatment not found")
    }
  }

  const removeTreatment = (id: string) => {
    setTreatmentIds(treatmentIds.filter((t) => t !== id))
    setTreatments(treatments.filter((t) => t.id !== id))
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Compare Treatments</h1>
        <p className="text-muted-foreground mb-8">Compare costs, risks, and recovery times side-by-side</p>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter treatment ID (t001, t002, etc.)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTreatment()}
              className="flex-1 px-4 py-2 border border-border rounded bg-background"
            />
            <button
              onClick={addTreatment}
              disabled={treatmentIds.length >= 3}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
            >
              Add Treatment
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{treatmentIds.length}/3 treatments selected</p>
        </div>

        {treatments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 text-left font-bold">Feature</th>
                  {treatments.map((treatment) => (
                    <th key={treatment.id} className="px-4 py-3 text-left font-bold">
                      <div className="flex items-center justify-between">
                        <span>{treatment.name}</span>
                        <button
                          onClick={() => removeTreatment(treatment.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Specialty</td>
                  {treatments.map((treatment) => (
                    <td key={treatment.id} className="px-4 py-3">
                      {treatment.specialty}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Average Cost</td>
                  {treatments.map((treatment) => (
                    <td key={treatment.id} className="px-4 py-3 text-primary font-bold">
                      {formatCurrency(treatment.avg)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Cost Range</td>
                  {treatments.map((treatment) => (
                    <td key={treatment.id} className="px-4 py-3 text-sm">
                      {formatCurrency(treatment.min)} - {formatCurrency(treatment.max)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Recovery Time</td>
                  {treatments.map((treatment) => (
                    <td key={treatment.id} className="px-4 py-3">
                      {treatment.recoveryTime}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Risk Factors</td>
                  {treatments.map((treatment) => (
                    <td key={treatment.id} className="px-4 py-3 text-sm">
                      {treatment.riskFactors.join(", ")}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Available Hospitals</td>
                  {treatments.map((treatment) => (
                    <td key={treatment.id} className="px-4 py-3">
                      {treatment.availableAt.length} hospitals
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">Add treatments to start comparing</div>
        )}
      </div>
      <Footer />
    </>
  )
}
