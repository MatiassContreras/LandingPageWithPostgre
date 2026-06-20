import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function getSesion() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) return null

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number
      username: string
      admin: boolean
    }
    return data
  } catch {
    return null
  }
}