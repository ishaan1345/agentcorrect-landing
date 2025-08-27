'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

const terminalLines = [
  { type: 'prompt', text: '$ agentcorrect scan ./traces.jsonl', delay: 0 },
  { type: 'normal', text: 'Scanning 1,247 API calls...', delay: 500 },
  { type: 'danger', text: '[CRITICAL] stripe.Charge.create() missing idempotency_key', delay: 1200 },
  { type: 'danger', text: '[DANGER] DELETE FROM users WHERE 1=1', delay: 1800 },
  { type: 'danger', text: '[DANGER] redis.FLUSHALL detected', delay: 2400 },
  { type: 'success', text: '✓ Generated 3 policy blocks • Exit code: 2', delay: 3000 },
]

export default function ProofTerminal() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentLine < terminalLines.length - 1) {
        setCurrentLine(currentLine + 1)
      } else {
        setTimeout(() => {
          setCurrentLine(0)
        }, 3000)
      }
    }, terminalLines[currentLine]?.delay || 500)

    return () => clearTimeout(timer)
  }, [currentLine, isPlaying])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const restart = () => {
    setCurrentLine(0)
    setIsPlaying(true)
  }

  const getLineClass = (type: string) => {
    switch (type) {
      case 'prompt': return 'terminal-prompt'
      case 'danger': return 'terminal-danger'
      case 'success': return 'terminal-success'
      default: return ''
    }
  }

  return (
    <div className="relative">
      <div className="terminal min-h-[240px] relative overflow-hidden">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            aria-label={isPlaying ? 'Pause terminal animation' : 'Play terminal animation'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={restart}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            aria-label="Restart terminal animation"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="space-y-2 mt-2">
          <AnimatePresence mode="sync">
            {terminalLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={getLineClass(line.type)}
              >
                {line.text}
                {index === currentLine && showCursor && (
                  <span className="inline-block w-2 h-4 bg-neutral-400 ml-1 animate-cursor-blink" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}