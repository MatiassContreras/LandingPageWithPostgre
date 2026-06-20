import Navbar from "./components/Navbar"
import { Geist, Geist_Mono } from "next/font/google"
import { getSesion } from "@/lib/session"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sesion = await getSesion()

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar sesion={sesion} />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  )
}