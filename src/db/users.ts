import type { User } from "../types/auth"

// In-memory storage - replace with actual database
const users: Map<string, User & { password: string }> = new Map()

export function findUserByEmail(email: string) {
  for (const user of users.values()) {
    if (user.email === email) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
  }
  return null
}

export function findUserById(id: string) {
  const user = users.get(id)
  if (user) {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export function createUser(
  id: string,
  email: string,
  name: string,
  role: "customer" | "staff",
  hashedPassword: string,
) {
  const user = {
    id,
    email,
    name,
    role,
    password: hashedPassword,
    token: "",
  }
  users.set(id, user)
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export function getUserWithPassword(email: string) {
  for (const user of users.values()) {
    if (user.email === email) {
      return user
    }
  }
  return null
}

export function updateUserToken(id: string, token: string) {
  const user = users.get(id)
  if (user) {
    user.token = token
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}
