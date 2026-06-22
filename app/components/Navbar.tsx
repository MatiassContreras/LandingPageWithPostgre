"use client"

import { useState } from "react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"

type Sesion = { username: string; admin: boolean } | null

export default function Navbar({ sesion }: { sesion: Sesion }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <nav className="zn">
      <a className="zn-logo" href="/">Zaragoza II</a>

      <button
        className="zn-burger"
        onClick={() => setAbierto(!abierto)}
        aria-label="Abrir menú"
      >
        {abierto ? "✕" : "☰"}
      </button>

      <ul className={`zn-links ${abierto ? "zn-links-open" : ""}`}>
        <li><Link href="/" onClick={() => setAbierto(false)}>Inicio</Link></li>
        <li><Link href="/productos" onClick={() => setAbierto(false)}>Productos</Link></li>
        <li><Link href="/locales" onClick={() => setAbierto(false)}>Locales</Link></li>
        <li><Link href="" onClick={() => setAbierto(false)}>Nosotros</Link></li>

        {sesion ? (
          <li><Link href="/carrito" onClick={() => setAbierto(false)} >Carrito</Link></li>
        ):
        null 
        }

        {sesion?.admin && (
          <li><Link href="/admin" onClick={() => setAbierto(false)}>Administrar</Link></li>
        )}

        {sesion ? (
          <>
            <li><span>Hola, {sesion.username}</span></li>
            <li><LogoutButton /></li>
          </>
        ) : (
          <li><Link href="/auth/login" onClick={() => setAbierto(false)}>Iniciar sesión</Link></li>
        )}
      </ul>
    </nav>
  )
}