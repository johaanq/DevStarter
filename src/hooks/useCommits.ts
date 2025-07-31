"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export interface Commit {
  id: string
  user_id: string
  content: string
  created_at: string
  reactions: {
    fire: number
    skull: number
    brain: number
  }
  user_reactions: {
    fire: boolean
    skull: boolean
    brain: boolean
  }
}

export function useCommits() {
  const { user } = useAuth()
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCommits()
  }, [user])

  const fetchCommits = async () => {
    try {
      // Fetch commits with reaction counts
      const { data: commitsData, error: commitsError } = await supabase
        .from("commits")
        .select(`
          id,
          user_id,
          content,
          created_at
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      if (commitsError) throw commitsError

      // Fetch all reactions
      const { data: reactionsData, error: reactionsError } = await supabase
        .from("commit_reactions")
        .select("commit_id, type, user_id")

      if (reactionsError) throw reactionsError

      // Process commits with reactions
      const processedCommits =
        commitsData?.map((commit) => {
          const commitReactions = reactionsData?.filter((r) => r.commit_id === commit.id) || []

          const reactions = {
            fire: commitReactions.filter((r) => r.type === "fire").length,
            skull: commitReactions.filter((r) => r.type === "skull").length,
            brain: commitReactions.filter((r) => r.type === "brain").length,
          }

          const user_reactions = {
            fire: commitReactions.some((r) => r.type === "fire" && r.user_id === user?.id),
            skull: commitReactions.some((r) => r.type === "skull" && r.user_id === user?.id),
            brain: commitReactions.some((r) => r.type === "brain" && r.user_id === user?.id),
          }

          return {
            ...commit,
            reactions,
            user_reactions,
          }
        }) || []

      setCommits(processedCommits)
    } catch (error) {
      console.error("Error fetching commits:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleReaction = async (commitId: string, type: "fire" | "skull" | "brain") => {
    if (!user) return false

    try {
      // Check if reaction exists
      const { data: existingReaction } = await supabase
        .from("commit_reactions")
        .select("id")
        .eq("commit_id", commitId)
        .eq("user_id", user.id)
        .eq("type", type)
        .single()

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase.from("commit_reactions").delete().eq("id", existingReaction.id)

        if (error) throw error
      } else {
        // Add reaction
        const { error } = await supabase.from("commit_reactions").insert([
          {
            commit_id: commitId,
            user_id: user.id,
            type,
          },
        ])

        if (error) throw error
      }

      // Refresh commits
      fetchCommits()
      return true
    } catch (error) {
      console.error("Error toggling reaction:", error)
      return false
    }
  }

  const addCommit = async (content: string) => {
    if (!user) return false

    try {
      const { error } = await supabase.from("commits").insert([{ user_id: user.id, content }])

      if (error) throw error

      // Refresh commits
      fetchCommits()
      return true
    } catch (error) {
      console.error("Error adding commit:", error)
      return false
    }
  }

  return {
    commits,
    loading,
    toggleReaction,
    addCommit,
    refetch: fetchCommits,
  }
}
