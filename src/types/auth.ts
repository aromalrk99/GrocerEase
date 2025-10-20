export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "staff"
  token: string
}

export interface AuthRequest {
  email: string
  password: string
  name?: string
  role: "customer" | "staff"
}

export interface AuthResponse {
  user: User
  token: string
}
