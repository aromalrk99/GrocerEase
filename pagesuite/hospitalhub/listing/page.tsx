"use client"

import { useEffect, useState, useCallback } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import HospitalCard from "@/components/cards/hospital-card"
import HospitalFilters from "@/components/filters/hospital-filters"
import type { Hospital } from "@/utilspark/types"
import { ChevronDown } from "lucide-react"

export default function HospitalsListPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState("rating")
  const [filters, setFilters] = useState({})

  const fetchHospitals = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        sortBy,
        ...filters,
      })
      const response = await fetch(`http://localhost:5000/api/hospitals?${params}`)
      const data = await response.json()
      setHospitals(data.data || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error("Failed to fetch hospitals:", err)
    } finally {
      setLoading(false)
    }
  }, [page, sortBy, filters])

  useEffect(() => {
    fetchHospitals()
  }, [fetchHospitals])

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Hospitals in Bangalore</h1>
        <p className="text-muted-foreground mb-8">Browse and compare hospitals near you</p>

        <div className="grid md:grid-cols-4 gap-6">
          <aside>
            <HospitalFilters onFilter={handleFilter} />
          </aside>

          <main className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {hospitals.length} of {total} hospitals
              </p>
              <div className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-border rounded bg-background text-sm"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="beds">Most Beds</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading hospitals...</div>
            ) : hospitals.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No hospitals found</div>
            ) : (
              <div className="grid gap-6">
                {hospitals.map((hospital) => (
                  <div key={hospital.id} className="flex">
                    <HospitalCard hospital={hospital} />
                  </div>
                ))}
              </div>
            )}

            {total > page * 12 && (
              <button
                onClick={() => setPage(page + 1)}
                className="w-full mt-8 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary-light transition"
              >
                Load More
              </button>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
