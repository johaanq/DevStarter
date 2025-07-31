"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("useAuth: useEffect - Initializing auth listener...")

    const getInitialSession = async () => {
      console.log("useAuth: getInitialSession - Fetching session...")
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.error("useAuth: getInitialSession - Error fetching session:", error)
      }
      setUser(session?.user ?? null)
      setLoading(false)
      console.log(
        "useAuth: getInitialSession - Session loaded. User:",
        session?.user ? "Logged In" : "Logged Out",
        "Loading:",
        false,
      )
      if (session?.user) {
        console.log(
          "useAuth: getInitialSession - User details:",
          session.user.id,
          session.user.email,
          session.user.user_metadata?.full_name,
        )
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("useAuth: onAuthStateChange - Event:", event, "Session:", session ? "Exists" : "Null")
      console.log("useAuth: onAuthStateChange - Full session object:", session)
      
      setUser(session?.user ?? null)
      setLoading(false) // Asegurarse de que loading se ponga en false en cada cambio de estado
      
      console.log(
        "useAuth: onAuthStateChange - State updated. User:",
        session?.user ? "Logged In" : "Logged Out",
        "Loading:",
        false,
      )
      
      if (session?.user) {
        console.log(
          "useAuth: onAuthStateChange - User details:",
          session.user.id,
          session.user.email,
          session.user.user_metadata?.full_name,
        )
        console.log("useAuth: onAuthStateChange - User metadata:", session.user.user_metadata)
      }
    })

    return () => {
      console.log("useAuth: useEffect cleanup - Unsubscribing from auth changes.")
      subscription.unsubscribe()
    }
  }, []) // Dependencias vacías para que se ejecute solo una vez al montar

  const signInWithGitHub = async () => {
    console.log("useAuth: signInWithGitHub - Attempting GitHub sign-in...")
    console.log("useAuth: Current URL:", window.location.origin)
    console.log("useAuth: Redirect URL:", `${window.location.origin}/auth/callback`)
    
    setLoading(true) // Opcional: mostrar loading mientras se redirige
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    console.log("useAuth: OAuth response data:", data)
    
    if (error) {
      console.error("useAuth: signInWithGitHub - Error signing in:", error)
      setLoading(false) // Si hay error, quitar loading
    } else {
      console.log("useAuth: signInWithGitHub - GitHub sign-in initiated. Redirecting...")
      // No se pone setLoading(false) aquí porque la página se redirigirá
    }
  }

  const signOut = async () => {
    console.log("useAuth: signOut - Attempting sign-out...")
    setLoading(true) // Mostrar loading mientras se cierra sesión
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("useAuth: signOut - Error signing out:", error)
      setLoading(false) // Si hay error, quitar loading
    } else {
      console.log("useAuth: signOut - Signed out successfully. User should be null now.")
      setUser(null) // Asegurarse de limpiar el usuario localmente
      setLoading(false) // Quitar loading
    }
  }

  return {
    user,
    loading,
    signInWithGitHub,
    signOut,
  }
}
