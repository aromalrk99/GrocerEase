"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin } from "lucide-react"
import Header from "@/components/navigation/header"

export default function HomeHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("hospitals")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`
    }
  }

  return (
    <>
      <Header />
      <div className="relative bg-gradient-to-br from-primary to-secondary min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Your Health, Our Priority</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Discover, compare, and connect with the best hospitals and doctors in Bangalore
            </p>
          </div>

          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 max-w-2xl">
            <div className="flex gap-2 mb-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-2 border border-border rounded bg-background"
              >
                <option value="hospitals">Hospitals</option>
                <option value="doctors">Doctors</option>
                <option value="treatments">Treatments</option>
              </select>
              <input
                type="text"
                placeholder="Search by name, specialty, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded bg-background"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="/hospitals" className="hover:text-primary transition">
                Browse Hospitals
              </Link>
              <Link href="/doctors" className="hover:text-primary transition">
                Find Doctors
              </Link>
              <Link href="/treatments" className="hover:text-primary transition">
                Treatment Costs
              </Link>
              <Link href="/map" className="hover:text-primary transition flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                View on Map
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
