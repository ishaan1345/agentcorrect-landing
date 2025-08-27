'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server } from 'lucide-react'

export default function Security() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Shield className="w-16 h-16 mx-auto mb-6 text-neutral-700" />
          <h2 className="text-4xl font-bold mb-6">Security & Privacy First</h2>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <Lock className="w-8 h-8 mx-auto mb-3 text-neutral-600" />
              <h3 className="font-semibold mb-2">Offline-first</h3>
              <p className="text-sm text-neutral-600">
                Runs entirely on your machine
              </p>
            </div>
            
            <div className="card">
              <Eye className="w-8 h-8 mx-auto mb-3 text-neutral-600" />
              <h3 className="font-semibold mb-2">No data retention</h3>
              <p className="text-sm text-neutral-600">
                Zero telemetry, zero tracking
              </p>
            </div>
            
            <div className="card">
              <Server className="w-8 h-8 mx-auto mb-3 text-neutral-600" />
              <h3 className="font-semibold mb-2">Allow-list only</h3>
              <p className="text-sm text-neutral-600">
                Explicit permission model
              </p>
            </div>
          </div>
          
          <a 
            href="/security" 
            className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:underline"
          >
            Read our Security Policy
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}