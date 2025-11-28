"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import type { Doctor, Hospital } from "@/utilspark/types"
import { Star, Briefcase, Award } from "lucide-react"
import { formatCurrency, formatExperience } from "@/utilspark/formatter"
import Link from "next/link"

export default function DoctorDetailPage() {
  const params = useParams()
  const doctorId = params.id as string
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorRes = await fetch(`http://localhost:5000/api/doctors/${doctorId}`)
        const doctorData = await doctorRes.json()
        setDoctor(doctorData)

        const hospitalsRes = await fetch(`http://localhost:5000/api/hospitals?limit=100`)
        const hospitalsData = await hospitalsRes.json()
        const associatedHospitals = hospitalsData.data.filter((h: Hospital) => doctorData.hospitalIds?.includes(h.id))
        setHospitals(associatedHospitals)
      } catch (err) {
        console.error("Failed to fetch doctor details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [doctorId])

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-muted-foreground">Loading doctor details...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!doctor) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-destructive">Doctor not found</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <img
              src={doctor.imageUrl || "/placeholder.svg"}
              alt={doctor.name}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Specialty</p>
                  <p className="font-bold">{doctor.specialty}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Experience</p>
                  <p className="font-bold">{formatExperience(doctor.experience)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Consultation Fee</p>
                  <p className="font-bold text-primary">{formatCurrency(doctor.fee)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Availability</p>
                  <p className="font-bold">{doctor.availability}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Dr. {doctor.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span className="font-bold text-lg">{doctor.rating.toFixed(1)}</span>
                </div>
                <p className="text-muted-foreground">{doctor.specialty}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Experience</span>
                </div>
                <p className="text-2xl font-bold">{doctor.experience}+ Years</p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Award className="w-5 h-5" />
                  <span>Gender</span>
                </div>
                <p className="text-2xl font-bold capitalize">{doctor.gender}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <ul className="space-y-2">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Treatments Performed</h2>
              <div className="flex flex-wrap gap-2">
                {doctor.treatments.map((treatment) => (
                  <span
                    key={treatment}
                    className="bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {treatment.replace(/_/g, " ").toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {hospitals.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Hospital Affiliations</h2>
                <div className="grid gap-3">
                  {hospitals.map((hospital) => (
                    <Link
                      key={hospital.id}
                      href={`/hospitals/${hospital.id}`}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold">{hospital.name}</h3>
                          <p className="text-sm text-muted-foreground">{hospital.area}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-warning text-warning" />
                            <span className="font-bold">{hospital.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-primary-light p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Contact Information</h3>
              <p className="text-muted-foreground">
                For appointments and inquiries, please contact the hospital directly.
              </p>
              <p className="text-muted-foreground mt-3">Phone: +91-80-XXXX-XXXX</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
