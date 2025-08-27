'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CTASticky() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 600
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold">Ready to catch disasters?</p>
                <p className="text-sm text-neutral-600">
                  Press <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs">Cmd+K</kbd> to start
                </p>
              </div>
              <button className="btn-primary whitespace-nowrap">
                Run a Free Local Check
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}