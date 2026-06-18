import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col mt-6">

        {/* NAVBAR — aparece en todas las páginas */}
        <nav className="bg-white text-black p-4 flex gap-6 font-bold ">
          <Link href="/" className="hover:underline mx-auto">
            Home
          </Link>
          <Link href="/inicio" className="hover:underline mx-auto">
            Inicio
          </Link>
        </nav>

        {/* CONTENIDO — cambia según la ruta */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </body>
    </html>
  )
}