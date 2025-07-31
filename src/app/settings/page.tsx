"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/components/AuthProvider"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Settings, User, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()

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
              Configuración
            </h1>
            <p className="text-xl text-zinc-400">Personaliza tu experiencia en DevStarter Wars</p>
          </div>

          {/* Settings Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Settings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Cuenta</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-300">Email</span>
                  <span className="text-zinc-400">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-300">Proveedor</span>
                  <span className="text-zinc-400 capitalize">{user?.app_metadata?.provider || "Email"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-300">Miembro desde</span>
                  <span className="text-zinc-400">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Nuevas ideas</span>
                  <button className="w-12 h-6 bg-zinc-700 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Commit Wars</span>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Recordatorios</span>
                  <button className="w-12 h-6 bg-zinc-700 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Privacy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Privacidad</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Perfil público</span>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Mostrar email</span>
                  <button className="w-12 h-6 bg-zinc-700 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Analytics</span>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Appearance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Apariencia</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Tema</span>
                  <select className="bg-zinc-700 text-white px-3 py-1 rounded-lg border border-zinc-600">
                    <option>Oscuro</option>
                    <option>Claro</option>
                    <option>Sistema</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Animaciones</span>
                  <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-300">Reducir movimiento</span>
                  <button className="w-12 h-6 bg-zinc-700 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Acciones</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-medium transition-colors">
                Exportar datos
              </button>
              <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-medium transition-colors">
                Cambiar contraseña
              </button>
              <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl font-medium transition-colors">
                Eliminar cuenta
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
} 