"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "./AuthProvider"
import SignInModal from "./SignInModal"
import UserMenu from "./UserMenu"
import { useState } from "react"
import { LogIn } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/vault", label: "Vault", icon: "🗄️" },
    { href: "/commitwars", label: "Commit Wars", icon: "⚔️" },
    { href: "/profile", label: "Perfil", icon: "👤" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-200"
            >
              DevStarter Wars
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-zinc-800 text-white shadow-lg"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="flex items-center">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin"></div>
                ) : user ? (
                  <UserMenu />
                ) : (
                  <button
                    onClick={() => setIsSignInModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 transform hover:scale-[1.02]"
                  >
                    <LogIn size={18} />
                    <span>Iniciar sesión</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </>
  )
}
