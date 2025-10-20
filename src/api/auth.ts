import { generateToken, type TokenPayload } from "../utils/jwt"
import { hashPassword, comparePassword } from "../utils/password"
import { findUserByEmail, createUser, getUserWithPassword, updateUserToken } from "../db/users"
import type { AuthResponse } from "../types/auth"
import { v4 as uuidv4 } from "uuid"

export async function login(email: string, password: string, role: "customer" | "staff"): Promise<AuthResponse> {
  const user = getUserWithPassword(email)

  if (!user) {
    throw new Error("Invalid email or password")
  }

  if (user.role !== role) {
    throw new Error("Invalid role for this account")
  }

  const isPasswordValid = await comparePassword(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  }

  const token = generateToken(payload)
  updateUserToken(user.id, token)

  const { password: _, ...userWithoutPassword } = user
  return {
    user: {
      ...userWithoutPassword,
      token,
    },
    token,
  }
}

export async function signup(
  email: string,
  password: string,
  name: string,
  role: "customer" | "staff",
): Promise<AuthResponse> {
  const existingUser = findUserByEmail(email)
  if (existingUser) {
    throw new Error("Email already registered")
  }

  const hashedPassword = await hashPassword(password)
  const userId = uuidv4()

  const user = createUser(userId, email, name, role, hashedPassword)

  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  }

  const token = generateToken(payload)
  updateUserToken(user.id, token)

  return {
    user: {
      ...user,
      token,
    },
    token,
  }
}
