"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"
import { toast } from "sonner"

export interface Idea {
  id: string
  content: string
  created_at: string
}

export function useIdeas() {
  const { user } = useAuth()
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchIdeas()
    } else {
      setIdeas([])
      setLoading(false)
    }
  }, [user])

  const fetchIdeas = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setIdeas(data || [])
    } catch (error) {
      console.error("Error fetching ideas:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveIdea = async (content: string) => {
    if (!user) {
      toast.error("Necesitas iniciar sesión para guardar ideas.")
      return false
    }

    try {
      const { error } = await supabase.from("ideas").insert([{ user_id: user.id, content }])

      if (error) {
        console.error("Error al guardar idea en Supabase:", error)
        toast.error(`Error al guardar idea: ${error.message}`)
        throw error // Re-throw to ensure catch block is hit if needed
      }

      // Refresh ideas
      await fetchIdeas() // Use await to ensure ideas are fetched before returning
      toast.success("¡Idea guardada con éxito en tu Vault!")
      return true
    } catch (error) {
      console.error("Error inesperado al guardar idea:", error)
      return false
    }
  }

  const deleteIdea = async (id: string) => {
    if (!user) {
      toast.error("Necesitas iniciar sesión para eliminar ideas.")
      return false
    }

    try {
      const { error } = await supabase.from("ideas").delete().eq("id", id).eq("user_id", user.id)

      if (error) {
        console.error("Error al eliminar idea en Supabase:", error)
        toast.error(`Error al eliminar idea: ${error.message}`)
        throw error
      }

      await fetchIdeas()
      toast.success("Idea eliminada de tu Vault.")
      return true
    } catch (error) {
      console.error("Error inesperado al eliminar idea:", error)
      return false
    }
  }

  return {
    ideas,
    loading,
    saveIdea,
    deleteIdea,
    refetch: fetchIdeas,
  }
}
