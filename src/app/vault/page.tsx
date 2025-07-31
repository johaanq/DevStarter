"use client"

import { motion } from "framer-motion"
import IdeaCard from "@/components/IdeaCard"
import { useIdeas } from "@/hooks/useIdeas"
import { useAuth } from "@/components/AuthProvider"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Vault() {
  const { ideas, loading } = useIdeas()
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">🗄️ Tu Vault de Ideas Inútiles</h1>
          <p className="text-zinc-400 text-lg">Aquí guardas todas las ideas que jamás vas a hacer</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-400">Cargando tus ideas inútiles...</p>
            </div>
          </div>
        ) : ideas.length > 0 ? (
          <div className="space-y-6">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-2 -right-2 bg-zinc-700 text-xs px-2 py-1 rounded-full text-zinc-300">
                  {new Date(idea.created_at).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <IdeaCard
                  idea={idea.content}
                  showSaveButton={false} // No se necesita guardar de nuevo en el vault
                  showDeleteButton={true}
                  ideaId={idea.id}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-2xl p-12 text-center border border-zinc-700"
          >
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Tu vault está vacío</h3>
            <p className="text-zinc-400 mb-6">Ve al inicio y guarda algunas ideas inútiles para empezar tu colección</p>
            <motion.a
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-medium transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎲 Generar primera idea
            </motion.a>
          </motion.div>
        )}
      </div>
    </ProtectedRoute>
  )
}
