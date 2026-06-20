"use client"
import "../globals.css"

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout")
    window.location.href = "/"
  }

  return (
     <button onClick={handleLogout} className="zn-logout">
      Logout
    </button>
  )
}
    
  

