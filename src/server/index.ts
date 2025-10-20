import express from "express"
import cors from "cors"
import authRoutes from "./auth-routes"

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
