import express, { type Request, type Response } from "express"
import { login, signup } from "../api/auth"

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await login(email, password, role)
    res.json(result)
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await signup(email, password, name, role)
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router
