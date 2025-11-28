"use client"

import { useState } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import type { Doctor } from "@/utilspark/types"
import { formatCurrency, formatExperience } from "@/utilspark/formatter"
import { X } from "lucide-react"

export default function CompareDoctorsPage() {
  const [doctorIds, setDoctorIds] = useState<string[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [inputValue, setInputValue] = useState("")

  const addDoctor = async () => {
    if (doctorIds.includes(inputValue) || inputValue.length === 0) return
    if (doctorIds.length >= 3) {
      alert("Maximum 3 doctors can be compared")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${inputValue}`)
      if (response.ok) {
        const doctor = await response.json()
        setDoctorIds([...doctorIds, inputValue])
        setDoctors([...doctors, doctor])
        setInputValue("")
      }
    } catch (err) {
      alert("Doctor not found")
    }
  }

  const removeDoctor = (id: string) => {
    setDoctorIds(doctorIds.filter((d) => d !== id))
    setDoctors(doctors.filter((d) => d.id !== id))
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Compare Doctors</h1>
        <p className="text-muted-foreground mb-8">Compare experience, fees, and specialties side-by-side</p>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter doctor ID (d001, d002, etc.)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addDoctor()}
              className="flex-1 px-4 py-2 border border-border rounded bg-background"
            />
            <button
              onClick={addDoctor}
              disabled={doctorIds.length >= 3}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
            >
              Add Doctor
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{doctorIds.length}/3 doctors selected</p>
        </div>

        {doctors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 text-left font-bold">Feature</th>
                  {doctors.map((doctor) => (
                    <th key={doctor.id} className="px-4 py-3 text-left font-bold">
                      <div className="flex items-center justify-between">
                        <span>{doctor.name}</span>
                        <button
                          onClick={() => removeDoctor(doctor.id)}
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
                  {doctors.map((doctor) => (
                    <td key={doctor.id} className="px-4 py-3">
                      {doctor.specialty}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Experience</td>
                  {doctors.map((doctor) => (
                    <td key={doctor.id} className="px-4 py-3">
                      {formatExperience(doctor.experience)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Consultation Fee</td>
                  {doctors.map((doctor) => (
                    <td key={doctor.id} className="px-4 py-3 text-primary font-bold">
                      {formatCurrency(doctor.fee)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-muted">
                  <td className="px-4 py-3 font-bold">Rating</td>
                  {doctors.map((doctor) => (
                    <td key={doctor.id} className="px-4 py-3">
                      {doctor.rating.toFixed(1)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-bold">Gender</td>
                  {doctors.map((doctor) => (
                    <td key={doctor.id} className="px-4 py-3 capitalize">
                      {doctor.gender}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">Add doctors to start comparing</div>
        )}
      </div>
      <Footer />
    </>
  )
}
