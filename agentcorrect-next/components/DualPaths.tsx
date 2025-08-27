'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Github, FileCode2, BookOpen } from 'lucide-react'

export default function DualPaths() {
  const [copied, setCopied] = useState(false)
  const installCommand = 'curl -sSL https://agentcorrect.sh/install | bash && agentcorrect scan ./'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="install">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Generate Now</h2>
              <p className="text-neutral-600">Start catching disasters in seconds</p>
            </div>
            
            <div className="bg-neutral-950 rounded-xl p-4 flex items-center justify-between group">
              <code className="text-sm text-neutral-100 font-mono flex-1 overflow-x-auto">
                {installCommand}
              </code>
              <button
                onClick={copyToClipboard}
                className="ml-4 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors flex-shrink-0"
                aria-label="Copy installation command"
              >
                {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
              </button>
            </div>

            <p className="text-sm text-neutral-500">
              One command. Zero config. Results in your terminal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">For Teams & CI</h2>
              <p className="text-neutral-600">Production-grade integration options</p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full card flex items-center justify-between group hover:translate-x-1 transition-transform">
                <div className="flex items-center gap-3">
                  <Github className="text-neutral-600" />
                  <div className="text-left">
                    <div className="font-medium">GitHub Action</div>
                    <div className="text-sm text-neutral-500">Block PRs with disasters</div>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-600">→</span>
              </button>

              <button className="w-full card flex items-center justify-between group hover:translate-x-1 transition-transform">
                <div className="flex items-center gap-3">
                  <FileCode2 className="text-neutral-600" />
                  <div className="text-left">
                    <div className="font-medium">OPA/Rego Bundle</div>
                    <div className="text-sm text-neutral-500">Policy-as-code export</div>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-600">→</span>
              </button>

              <button className="w-full card flex items-center justify-between group hover:translate-x-1 transition-transform">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-neutral-600" />
                  <div className="text-left">
                    <div className="font-medium">Docs</div>
                    <div className="text-sm text-neutral-500">Integration guides & API</div>
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-neutral-600">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}