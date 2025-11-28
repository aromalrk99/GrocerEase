"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import CostChart from "@/components/charts/cost-chart"
import type { Hospital, Doctor } from "@/utilspark/types"
import { Star, MapPin, Bed, Calendar, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/utilspark/formatter"

export default function HospitalDetailPage() {
  const params = useParams()
  const hospitalId = params.id as string
  const [hospital, setHospital] = useState<Hospital | null>(null)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [costChartData, setCostChartData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalRes = await fetch(`http://localhost:5000/api/hospitals/${hospitalId}`)
        const hospitalData = await hospitalRes.json()
        setHospital(hospitalData)

        const doctorsRes = await fetch(`http://localhost:5000/api/doctors?limit=100`)
        const doctorsData = await doctorsRes.json()
        const hospitalDoctors = doctorsData.data.filter((d: Doctor) => hospitalData.doctors?.includes(d.id))
        setDoctors(hospitalDoctors)

        const costData = Object.entries(hospitalData.costs || {}).map(([name, costs]: any) => ({
          name: name.replace(/_/g, " ").toUpperCase(),
          min: costs.min,
          max: costs.max,
          avg: costs.avg,
        }))
        setCostChartData(costData)
      } catch (err) {
        console.error("Failed to fetch hospital details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [hospitalId])

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-muted-foreground">Loading hospital details...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!hospital) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-destructive">Hospital not found</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <img
            src={hospital.imageUrl || "/placeholder.svg"}
            alt={hospital.name}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{hospital.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span className="font-bold">{hospital.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  {hospital.area}
                </div>
              </div>
            </div>
            <div className="text-right">
              {hospital.emergency && (
                <span className="inline-block bg-danger text-white px-4 py-2 rounded-lg font-semibold mb-2">
                  24/7 Emergency
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Bed className="w-5 h-5" />
                <span>Total Beds</span>
              </div>
              <p className="text-2xl font-bold">{hospital.beds}</p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-5 h-5" />
                <span>Founded</span>
              </div>
              <p className="text-2xl font-bold">{hospital.founded}</p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <AlertCircle className="w-5 h-5" />
                <span>Accreditation</span>
              </div>
              <p className="text-lg font-bold">{hospital.accreditation.join(", ")}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-muted-foreground">{hospital.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((spec) => (
                <span key={spec} className="bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {doctors.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Doctors at This Hospital</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-card border border-border rounded-lg p-4">
                    <img
                      src={doctor.imageUrl || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-bold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <p className="text-primary font-bold mt-2">{formatCurrency(doctor.fee)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {costChartData.length > 0 && (
            <div className="mb-8">
              <CostChart data={costChartData} />
            </div>
          )}

          <div className="bg-primary-light p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Contact Information</h3>
            <p className="text-muted-foreground">Phone: +91-80-XXXX-XXXX</p>
            <p className="text-muted-foreground">Email: contact@{hospital.name.toLowerCase().replace(/\s+/g, "")}.in</p>
            <p className="text-muted-foreground mt-3">Location: {hospital.area}, Bangalore</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
