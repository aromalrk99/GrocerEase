import { z } from "zod"

export const HospitalSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number().min(0).max(5),
  area: z.string(),
  accreditation: z.array(z.string()),
  beds: z.number().positive(),
  specialties: z.array(z.string()),
  doctors: z.array(z.string()),
  costs: z.record(
    z.object({
      min: z.number().positive(),
      max: z.number().positive(),
      avg: z.number().positive(),
    }),
  ),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  contact: z.string().optional(),
  emergencyAvailable: z.boolean().optional(),
  established: z.number().optional(),
})

export const DoctorSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialty: z.string(),
  experience: z.number().nonnegative(),
  gender: z.enum(["male", "female", "other"]),
  rating: z.number().min(0).max(5),
  hospitalIds: z.array(z.string()),
  fee: z.number().positive(),
  treatments: z.array(z.string()),
  education: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
})

export const TreatmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialty: z.string(),
  avg: z.number().positive(),
  min: z.number().positive(),
  max: z.number().positive(),
  availableAt: z.array(z.string()),
  recoveryDays: z.number().nonnegative().optional(),
  riskFactors: z.array(z.string()).optional(),
})

export type Hospital = z.infer<typeof HospitalSchema>
export type Doctor = z.infer<typeof DoctorSchema>
export type Treatment = z.infer<typeof TreatmentSchema>
