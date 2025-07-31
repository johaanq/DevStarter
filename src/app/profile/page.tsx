"use client"

import { useAuth } from "@/components/AuthProvider"
import { useIdeas } from "@/hooks/useIdeas"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function ProfilePage() {
  const { user } = useAuth()
  const { ideas, loading: ideasLoading } = useIdeas()

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
            <p className="text-xl text-zinc-400">Configuración y estadísticas de DevStarter Wars</p>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-lg"
          >
            <div className="flex items-center gap-6 mb-8">
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-purple-500"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-purple-500">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "?"}
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user?.user_metadata?.full_name || "Usuario"}
                </h2>
                <p className="text-zinc-400 mb-2">{user?.email}</p>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span>🆔</span>
                  <span>ID: {user?.id}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/"
                  className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-medium transition-colors"
                >
                  🏠 Inicio
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-700/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💡</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {ideasLoading ? "..." : ideas.length}
                </div>
                <div className="text-zinc-400 text-sm">Ideas Guardadas</div>
              </div>
              <div className="bg-zinc-700/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                </div>
                <div className="text-zinc-400 text-sm">Miembro Desde</div>
              </div>
              <div className="bg-zinc-700/50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "N/A"}
                </div>
                <div className="text-zinc-400 text-sm">Último Acceso</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-zinc-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/vault"
                  className="flex items-center gap-3 p-4 bg-zinc-700/50 hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  <span className="text-2xl">🗄️</span>
                  <div>
                    <div className="font-medium text-white">Ver mi Vault</div>
                    <div className="text-sm text-zinc-400">Todas mis ideas guardadas</div>
                  </div>
                </Link>
                <Link
                  href="/commitwars"
                  className="flex items-center gap-3 p-4 bg-zinc-700/50 hover:bg-zinc-700 rounded-xl transition-colors"
                >
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <div className="font-medium text-white">Commit Wars</div>
                    <div className="text-sm text-zinc-400">Batalla de commits</div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Ideas */}
          {ideas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Mis Últimas Ideas</h3>
              <div className="space-y-4">
                {ideas.slice(0, 3).map((idea) => (
                  <div key={idea.id} className="bg-zinc-700/50 rounded-xl p-4">
                    <p className="text-zinc-100">{idea.content}</p>
                    <p className="text-xs text-zinc-500 mt-2">
                      Guardada el {new Date(idea.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              {ideas.length > 3 && (
                <div className="mt-6 text-center">
                  <Link
                    href="/vault"
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Ver todas mis ideas →
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </ProtectedRoute>
  )
} 