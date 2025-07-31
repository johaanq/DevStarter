import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/components/AuthProvider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevStarter Wars - Ideas Inútiles para Devs",
  description: "La app que te da ideas absurdas para proyectos que nunca terminarás",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-zinc-900 text-white min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Toaster richColors position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
