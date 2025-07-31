import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // ¡IMPORTANTE! redirectTo NO va aquí. Se pasa directamente a signInWithOAuth.
    flowType: "pkce",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type Database = {
  public: {
    Tables: {
      ideas: {
        Row: {
          id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      commits: {
        Row: {
          id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      commit_reactions: {
        Row: {
          id: string
          commit_id: string
          user_id: string
          type: "fire" | "skull" | "brain"
          created_at: string
        }
        Insert: {
          id?: string
          commit_id: string
          user_id: string
          type: "fire" | "skull" | "brain"
          created_at?: string
        }
        Update: {
          id?: string
          commit_id?: string
          user_id?: string
          type?: "fire" | "skull" | "brain"
          created_at?: string
        }
      }
    }
  }
}
