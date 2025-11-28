"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import DoctorCard from "@/components/cards/doctor-card"
import type { Doctor } from "@/utilspark/types"
import { ChevronRight } from "lucide-react"

export default function DoctorFeatures() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors?limit=6")
        const data = await response.json()
        setDoctors(data.data || [])
      } catch (err) {
        console.error("Failed to fetch doctors:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 bg-muted">
        <div className="text-center text-muted-foreground">Loading doctors...</div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-muted">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Featured Doctors</h2>
        <p className="text-muted-foreground">Connect with experienced medical professionals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Explore All Doctors
        <ChevronRight className="w-5 h-5" />
      </Link>
    </section>
  )
}
