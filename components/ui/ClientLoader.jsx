'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
export default function ClientLoader({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Loader ends after hydration (client ready)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) 

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
        <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-gray-950 to-black"
          >
            {/* Animated logo / text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
            >
              Loading...
            </motion.h1>

            {/* Loader animation (bouncing dots) */}
            <div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Progress counter */}
            <div className="mt-6 text-white text-lg font-semibold">
              <CountUp end={100} duration={2.5} suffix="%" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App content */}
      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </>
  )
}
