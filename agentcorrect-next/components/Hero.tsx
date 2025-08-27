'use client'

import { motion } from 'framer-motion'
import ProofTerminal from './ProofTerminal'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Catch disasters in your agent traces.
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-10">
            Deterministic, offline checks that block duplicate charges, dangerous SQL, and infra wipes—before they hit prod.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button 
              className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              aria-label="Run a free local check on your agent traces"
              onClick={() => document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Run a Free Local Check
            </button>
            <a 
              href="#sample-findings" 
              className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4 text-lg"
              aria-label="View sample findings from AgentCorrect"
            >
              See sample findings →
            </a>
          </div>
          
          <p className="text-sm text-neutral-500">
            Offline by default • No data leaves your machine
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <ProofTerminal />
        </motion.div>
        
        <noscript>
          <div className="terminal max-w-4xl mx-auto mt-8">
            <div className="space-y-2">
              <div><span className="terminal-prompt">$</span> agentcorrect scan ./traces.jsonl</div>
              <div>Scanning 1,247 API calls...</div>
              <div className="terminal-danger">[CRITICAL] stripe.Charge.create() missing idempotency_key</div>
              <div className="terminal-danger">[DANGER] DELETE FROM users WHERE 1=1</div>
              <div className="terminal-danger">[DANGER] redis.FLUSHALL detected</div>
              <div className="terminal-success">✓ Generated 3 policy blocks • Exit code: 2</div>
            </div>
          </div>
        </noscript>
      </div>
    </section>
  )
}