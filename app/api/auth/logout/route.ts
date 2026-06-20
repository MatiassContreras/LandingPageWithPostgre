import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return Response.json({ ok: true })
}
