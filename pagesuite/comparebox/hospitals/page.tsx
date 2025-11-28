"use client"

import { useState } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import type { Hospital } from "@/utilspark/types"
import { X } from "lucide-react"

export default function CompareHospitalsPage() {
  const [hospitalIds, setHospitalIds] = useState<string[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [inputValue, setInputValue] = useState("")

  const addHospital = async () => {
    if (hospitalIds.includes(inputValue) || inputValue.length === 0) return
    if (hospitalIds.length >= 3) {
      alert("Maximum 3 hospitals can be compared")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/hospitals/${inputValue}`)
      if (response.ok) {
        const hospital = await response.json()
        setHospitalIds([...hospitalIds, inputValue])
        setHospitals([...hospitals, hospital])
        setInputValue("")
      }
    } catch (err) {
      alert("Hospital not found")
    }
  }

  const removeHospital = (id: string) => {
    setHospitalIds(hospitalIds.filter((h) => h !== id))
    setHospitals(hospitals.filter((h) => h.id !== id))
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Compare Hospitals</h1>
        <p className="text-muted-foreground mb-8">Compare facilities, accreditations, and services side-by-side</p>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter hospital ID (h001, h002, etc.)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addHospital()}
              className="flex-1 px-4 py-2 border border-border rounded bg-background"
            />
            <button
              onClick={addHospital}
              disabled={hospitalIds.length >= 3}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
            >
              Add Hospital
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{hospitalIds.length}/3 hospitals selected</p>
        </div>

        {hospitals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 text-left font-bold">Feature</th>
                  {hospitals.map((hospital) => (
                    <th key={hospital.id} className="px-4 py-3 text-left font-bold">
                      <div className="flex items-center justify-between">
                        <span>{hospital.name}</span>
                        <button
                          onClick={() => removeHospital(hospital.id)}
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
                  <td className="px-4 py-3 font-bold">Rating</td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3">
                      {hospital.rating.toFixed(1)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Beds</td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3">
                      {hospital.beds}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Accreditations</td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3">
                      {hospital.accreditation.join(", ")}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Area</td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3">
                      {hospital.area}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Emergency Available</td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3">
                      {hospital.emergency ? "Yes" : "No"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Specialties</td>
                  {hospitals.map((hospital) => (
                    <td key={hospital.id} className="px-4 py-3 text-sm">
                      {hospital.specialties.join(", ")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">Add hospitals to start comparing</div>
        )}
      </div>
      <Footer />
    </>
  )
}
