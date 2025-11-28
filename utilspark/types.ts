export interface Hospital {
  id: string
  name: string
  rating: number
  area: string
  accreditation: string[]
  beds: number
  specialties: string[]
  doctors: string[]
  costs: Record<string, { min: number; max: number; avg: number }>
  emergency: boolean
  founded: number
  location: { lat: number; lng: number }
  description: string
  imageUrl: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  gender: string
  rating: number
  hospitalIds: string[]
  fee: number
  education: string[]
  treatments: string[]
  availability: string
  imageUrl: string
}

export interface Treatment {
  id: string
  name: string
  specialty: string
  avg: number
  min: number
  max: number
  availableAt: string[]
  description: string
  recoveryTime: string
  riskFactors: string[]
}

export interface ComparisonData {
  hospitals?: Hospital[]
  doctors?: Doctor[]
  treatments?: Treatment[]
  fields: string[]
}
