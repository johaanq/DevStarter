"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import IdeaCard from "@/components/IdeaCard"
import { useAuth } from "@/components/AuthProvider"

const loadingMessages = [
  "Generando ideas...",
  "Pensando en la próxima burrada...",
  "Invocando la creatividad...",
  "Mezclando café con inspiración...",
  "Creando tu próxima excusa para procrastinar...",
  "Procesando ideas inútiles...",
  "Calibrando el generador de absurdos...",
]

export default function Home() {
  const { user, loading: authLoading } = useAuth() // Renombrar loading para evitar conflicto
  const [currentIdea, setCurrentIdea] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [generatorStatus, setGeneratorStatus] = useState<"checking" | "connected" | "error">("checking")

  // Verificar conexión con el generador al cargar
  useEffect(() => {
    checkGeneratorConnection()
  }, [])

  const checkGeneratorConnection = async () => {
    try {
      const response = await fetch("/api/test-groq") // Sigue usando esta ruta para verificar el backend
      const data = await response.json()

      if (data.connected) {
        setGeneratorStatus("connected")
      } else {
        setGeneratorStatus("error")
        setError(`Error de conexión con el generador: ${data.error}`)
      }
    } catch (error) {
      setGeneratorStatus("error")
      setError("No se pudo verificar la conexión con el generador de ideas.")
    }
  }

  const generateIdea = async () => {
    if (generatorStatus !== "connected") {
      setError("El generador de ideas no está disponible. Verifica tu configuración.")
      return
    }

    setIsGenerating(true)
    setError(null)

    // Random loading message
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    setLoadingMessage(randomMessage)

    try {
      const response = await fetch("/api/generate-idea", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentIdea(data.idea)
      } else {
        setError(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error generating idea:", error)
      setError("Error de conexión. Verifica tu internet y configuración.")
    } finally {
      setTimeout(() => setIsGenerating(false), 500)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          DevStarter Wars
        </h1>
        <p className="text-xl text-zinc-400 mb-8">Ideas inútiles para tu próxima procrastinación</p>
        <p className="text-zinc-500 mb-8">
          ¿Necesitas motivación falsa? ¿Quieres sentirte productivo sin serlo?
          <br />
          ¡Perfecto! Tenemos ideas absurdas para ti.
        </p>

        {/* Mensaje de bienvenida si el usuario está logueado */}
        {!authLoading && user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800 rounded-xl p-4 text-zinc-300 mb-8 border border-zinc-700"
          >
            <p className="text-lg font-semibold">¡Bienvenido, {user.user_metadata?.full_name || user.email}!</p>
            <p className="text-sm text-zinc-400">Ahora puedes guardar tus ideas inútiles en el Vault.</p>
          </motion.div>
        )}

        {/* Mensaje de estado del generador (más discreto) */}
        {generatorStatus === "checking" && (
          <div className="flex items-center justify-center gap-2 text-zinc-500 mb-8">
            <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Verificando generador de ideas...</span>
          </div>
        )}

        {generatorStatus === "error" && (
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 text-red-400 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span>❌</span>
              <span>Error de conexión con el generador de ideas</span>
            </div>
            <p className="text-sm">{error}</p>
            <button
              onClick={checkGeneratorConnection}
              className="mt-2 text-xs bg-red-700 hover:bg-red-600 px-3 py-1 rounded-lg transition-colors"
            >
              Reintentar conexión
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <button
          onClick={generateIdea}
          disabled={isGenerating || generatorStatus !== "connected"}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {loadingMessage}
            </div>
          ) : generatorStatus === "connected" ? (
            "🎲 Generar idea inútil"
          ) : (
            "⚠️ Generador no disponible"
          )}
        </button>
      </motion.div>

      {/* Error display */}
      {error && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/20 border border-red-700 rounded-2xl p-6 text-center mb-8"
        >
          <div className="text-4xl mb-2">😵</div>
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentIdea && !error && (
          <motion.div
            key={currentIdea}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <IdeaCard idea={currentIdea} showSaveButton={!!user} />
          </motion.div>
        )}

        {!currentIdea && !isGenerating && !error && generatorStatus === "connected" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-800 rounded-2xl p-8 text-center border border-zinc-700"
          >
            <div className="text-6xl mb-4">💡</div>
            <p className="text-zinc-400">Haz clic en el botón para obtener una idea absurda</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
