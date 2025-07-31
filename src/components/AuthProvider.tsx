"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (provider: 'github' | 'google' | 'email') => Promise<void>
  signOut: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error("Error getting session:", error)
          toast.error("Error al cargar la sesión")
        }
        
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Unexpected error getting session:", error)
        toast.error("Error inesperado al cargar la sesión")
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            toast.success(`¡Bienvenido, ${session?.user?.user_metadata?.full_name || session?.user?.email}!`)
            break
          case 'SIGNED_OUT':
            toast.success("Sesión cerrada correctamente")
            break
          case 'TOKEN_REFRESHED':
            console.log("Token refreshed")
            break
          case 'USER_UPDATED':
            toast.success("Perfil actualizado")
            break
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (provider: 'github' | 'google' | 'email') => {
    try {
      setLoading(true)
      
      if (provider === 'email') {
        toast.error("Inicio de sesión con email no implementado aún")
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Error signing in:", error)
        toast.error(`Error al iniciar sesión con ${provider}: ${error.message}`)
        setLoading(false)
      } else {
        toast.loading(`Redirigiendo a ${provider}...`)
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error)
      toast.error("Error inesperado al iniciar sesión")
      setLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Error signing in with email:", error)
        toast.error(`Error al iniciar sesión: ${error.message}`)
      }
    } catch (error) {
      console.error("Unexpected error during email sign in:", error)
      toast.error("Error inesperado al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Error signing up with email:", error)
        toast.error(`Error al registrarse: ${error.message}`)
      } else {
        toast.success("Verifica tu email para completar el registro")
      }
    } catch (error) {
      console.error("Unexpected error during email sign up:", error)
      toast.error("Error inesperado al registrarse")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error("Error signing out:", error)
        toast.error(`Error al cerrar sesión: ${error.message}`)
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error)
      toast.error("Error inesperado al cerrar sesión")
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    signInWithEmail,
    signUpWithEmail,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 