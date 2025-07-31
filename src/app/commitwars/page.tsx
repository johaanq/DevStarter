"use client"

import { motion } from "framer-motion"
import CommitCard from "@/components/CommitCard"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useCommits } from "@/hooks/useCommits"
import { useAuth } from "@/components/AuthProvider"

export default function CommitWars() {
  const { user } = useAuth()
  const { commits, loading } = useCommits()

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">⚔️ Commit Wars</h1>
          <p className="text-zinc-400 text-lg mb-2">El muro global de commits más absurdos</p>
          <p className="text-zinc-500 text-sm">Donde los devs presumen sus decisiones más cuestionables</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-400">Cargando commits épicos...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {commits.map((commit, index) => (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <CommitCard commit={commit} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-12 bg-zinc-800 rounded-2xl p-6 text-center border border-zinc-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-zinc-400 mb-4">¿Hiciste algo especialmente absurdo hoy?</p>
          <motion.button
            className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-xl font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Compartir mi vergüenza
          </motion.button>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}
