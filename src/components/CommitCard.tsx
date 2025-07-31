"use client"

import { motion } from "framer-motion"
import { useCommits, type Commit } from "@/hooks/useCommits"
import { useAuth } from "@/components/AuthProvider"

interface CommitCardProps {
  commit: Commit
}

const avatars = ["🤓", "😎", "🔥", "🎨", "⚡", "🚀", "💻", "🧠", "👾", "🦄"]

export default function CommitCard({ commit }: CommitCardProps) {
  const { user } = useAuth()
  const { toggleReaction } = useCommits()

  const handleReaction = async (type: "fire" | "skull" | "brain") => {
    if (!user) return
    await toggleReaction(commit.id, type)
  }

  const getRandomAvatar = (userId: string) => {
    const index = userId.charCodeAt(0) % avatars.length
    return avatars[index]
  }

  const getUsername = (userId: string) => {
    // Generate a fake username based on user ID
    const adjectives = ["Code", "Dev", "Bug", "Stack", "React", "Node", "CSS", "JS"]
    const nouns = ["Master", "Ninja", "Wizard", "Guru", "Beast", "God", "Hero", "Legend"]

    const adjIndex = userId.charCodeAt(0) % adjectives.length
    const nounIndex = userId.charCodeAt(1) % nouns.length
    const number = (userId.charCodeAt(2) % 9999) + 1

    return `${adjectives[adjIndex]}${nouns[nounIndex]}${number}`
  }

  return (
    <motion.div
      className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-zinc-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          className="text-2xl"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {getRandomAvatar(commit.user_id)}
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-zinc-100">{getUsername(commit.user_id)}</h3>
            <span className="text-zinc-500 text-sm">
              {new Date(commit.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="bg-zinc-900 rounded-xl p-3 font-mono text-sm border border-zinc-600">
            <span className="text-green-400">git commit -m </span>
            <span className="text-zinc-300">"{commit.content}"</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => handleReaction("fire")}
            disabled={!user}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${
              commit.user_reactions.fire
                ? "bg-orange-600/20 text-orange-400 scale-110"
                : "bg-zinc-700 hover:bg-zinc-700 text-zinc-400 hover:text-orange-400"
            } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
            whileHover={user ? { scale: 1.1 } : {}}
            whileTap={user ? { scale: 0.9 } : {}}
          >
            <span>🔥</span>
            <span className="text-sm font-medium">{commit.reactions.fire}</span>
          </motion.button>

          <motion.button
            onClick={() => handleReaction("skull")}
            disabled={!user}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${
              commit.user_reactions.skull
                ? "bg-gray-600/20 text-gray-300 scale-110"
                : "bg-zinc-700 hover:bg-zinc-600 text-zinc-400 hover:text-gray-300"
            } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
            whileHover={user ? { scale: 1.1 } : {}}
            whileTap={user ? { scale: 0.9 } : {}}
          >
            <span>💀</span>
            <span className="text-sm font-medium">{commit.reactions.skull}</span>
          </motion.button>

          <motion.button
            onClick={() => handleReaction("brain")}
            disabled={!user}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${
              commit.user_reactions.brain
                ? "bg-pink-600/20 text-pink-400 scale-110"
                : "bg-zinc-700 hover:bg-zinc-600 text-zinc-400 hover:text-pink-400"
            } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
            whileHover={user ? { scale: 1.1 } : {}}
            whileTap={user ? { scale: 0.9 } : {}}
          >
            <span>🧠</span>
            <span className="text-sm font-medium">{commit.reactions.brain}</span>
          </motion.button>
        </div>

        <button className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Compartir vergüenza</button>
      </div>
    </motion.div>
  )
}
