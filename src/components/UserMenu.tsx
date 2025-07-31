"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "./AuthProvider"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, User, Settings, LogOut, Github } from "lucide-react"

export default function UserMenu() {
  const { user, signOut, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    setIsOpen(false)
    await signOut()
  }

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:bg-zinc-800/50 rounded-xl px-3 py-2 transition-colors"
      >
        {/* User Avatar */}
        <div className="flex items-center gap-2">
          {user.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full border-2 border-purple-500"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-sm font-bold border-2 border-purple-500">
              {user.user_metadata?.full_name?.[0] || user.email?.[0] || "?"}
            </div>
          )}
          
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">
              {user.user_metadata?.full_name || user.email}
            </p>
            <p className="text-xs text-zinc-400">
              {user.user_metadata?.full_name ? user.email : "Usuario"}
            </p>
          </div>
        </div>
        
        <ChevronDown 
          size={16} 
          className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-purple-500"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-sm font-bold border-2 border-purple-500">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || "?"}
                </div>
              )}
              
              <div>
                <p className="font-medium text-white">
                  {user.user_metadata?.full_name || "Usuario"}
                </p>
                <p className="text-sm text-zinc-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <User size={18} />
              <span>Mi Perfil</span>
            </Link>
            
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Settings size={18} />
              <span>Configuración</span>
            </Link>

            {/* Provider Info */}
            {user.app_metadata?.provider && (
              <div className="flex items-center gap-3 px-3 py-2 text-zinc-400">
                <Github size={18} />
                <span className="text-sm">Conectado con {user.app_metadata.provider}</span>
              </div>
            )}
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-zinc-800">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={18} />
              <span>{loading ? "Cerrando sesión..." : "Cerrar sesión"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 