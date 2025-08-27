'use client'

import { motion } from 'framer-motion'
import { Shield, Database, Zap, Lock } from 'lucide-react'

const outcomes = [
  {
    icon: Shield,
    title: 'Block duplicate payments',
    description: 'Idempotency checks for 25+ payment providers',
  },
  {
    icon: Database,
    title: 'Refuse dangerous SQL',
    description: 'DELETE without WHERE and other table-killers',
  },
  {
    icon: Zap,
    title: 'Infra kill-switch detection',
    description: 'FLUSHALL, DROP *, and nuclear commands',
  },
  {
    icon: Lock,
    title: 'Offline-first privacy',
    description: 'Zero data retention, works in CI',
  },
]

export default function WhyItWins() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="mb-4 p-3 bg-neutral-100 rounded-xl w-fit">
                <outcome.icon className="w-6 h-6 text-neutral-700" />
              </div>
              <h3 className="font-semibold mb-2">{outcome.title}</h3>
              <p className="text-sm text-neutral-600">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}