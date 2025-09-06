'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, RefreshCw } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Floating 404 */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-[10rem] font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-gray-300 mb-8 text-center px-4"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-200 font-semibold shadow-lg hover:bg-gray-700 hover:scale-105 transition-transform"
        >
          <RefreshCw className="w-5 h-5" />
          Reload
        </button>
      </motion.div>

      {/* Floating shapes for extra interactivity */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-1/4 w-16 h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-30"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-20 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-30"
      ></motion.div>
    </div>
  )
}
