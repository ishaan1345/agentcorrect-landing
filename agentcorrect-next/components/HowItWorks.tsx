'use client'

import { motion } from 'framer-motion'
import { FileText, Shield, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Intent Gate',
    description: 'Analyze agent traces for risky patterns',
    artifact: 'Intent Plan',
  },
  {
    icon: Shield,
    title: 'Safety Gate (Preflight)',
    description: 'Block disasters before execution',
    artifact: 'Preflight Spec',
  },
  {
    icon: CheckCircle,
    title: 'Finish-the-Job',
    description: 'Verify safe completion',
    artifact: 'Audit Log',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-neutral-600">Three gates to production safety</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 mx-auto w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center">
                <step.icon className="w-8 h-8 text-neutral-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-neutral-600 mb-3">{step.description}</p>
              <span className="badge">{step.artifact}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-semibold mb-4">Example Preflight Spec</h3>
          <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-6 overflow-x-auto">
            <code className="font-mono text-sm">{`rules:
  - id: payment-idempotency
    match: stripe.*.create
    require: idempotency_key
    
  - id: sql-safety
    match: "DELETE|DROP|TRUNCATE"
    require: dry_run_first
    
  - id: infra-protection
    match: "FLUSHALL|FLUSHDB"
    action: block
    exit_code: 2`}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}