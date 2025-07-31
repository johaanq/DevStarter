"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useIdeas } from "@/hooks/useIdeas"
import { useAuth } from "@/components/AuthProvider"

interface IdeaCardProps {
  idea: string
  showSaveButton?: boolean
  showDeleteButton?: boolean
  ideaId?: string
}

export default function IdeaCard({ idea, showSaveButton = false, showDeleteButton = false, ideaId }: IdeaCardProps) {
  const { user } = useAuth()
  const { saveIdea, deleteIdea } = useIdeas()
  const [isSaved, setIsSaved] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSave = async () => {
    if (!user) return // No hacer nada si no hay usuario logueado

    const success = await saveIdea(idea)
    if (success) {
      setIsSaved(true)
      // El botón se desactiva por 2 segundos y luego vuelve a su estado normal
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const handleDelete = async () => {
    if (!ideaId) return

    setIsDeleting(true)
    const success = await deleteIdea(ideaId)
    if (!success) {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div
      className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-zinc-600"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
        >
          💡
        </motion.div>
        <div className="flex-1">
          <p className="text-lg leading-relaxed text-zinc-100">{idea}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Nivel de inutilidad:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="text-yellow-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: i * 0.1, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
              >
                ⭐
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {showSaveButton && ( // Este botón solo se muestra si showSaveButton es true
            <motion.button
              onClick={handleSave}
              disabled={isSaved}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isSaved ? "bg-green-600 text-white" : "bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSaved ? "✅ Guardado" : "💾 Guardar"}
            </motion.button>
          )}

          {showDeleteButton && (
            <motion.button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl font-medium bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDeleting ? "🗑️ Eliminando..." : "🗑️ Eliminar"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
