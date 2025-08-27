'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle } from 'lucide-react'

const examples = [
  {
    id: 1,
    title: 'Payment Duplication',
    before: {
      code: `stripe.Charge.create({
  amount: 5000,
  currency: 'usd',
  customer: customer_id
})`,
      issue: 'Missing idempotency key',
    },
    after: {
      code: `stripe.Charge.create({
  amount: 5000,
  currency: 'usd',
  customer: customer_id,
  idempotency_key: generate_key()
})`,
      fix: 'Idempotency enforced',
    },
  },
  {
    id: 2,
    title: 'Destructive SQL',
    before: {
      code: `db.execute(
  "DELETE FROM users WHERE active = false"
)`,
      issue: 'No safety check',
    },
    after: {
      code: `// BLOCKED: Destructive operation
// Suggested: Add dry-run first
db.execute(
  "SELECT COUNT(*) FROM users WHERE active = false"
)`,
      fix: 'Requires confirmation',
    },
  },
  {
    id: 3,
    title: 'Infrastructure Wipe',
    before: {
      code: `redis.flushall()
// Clear all Redis data`,
      issue: 'Nuclear operation',
    },
    after: {
      code: `// BLOCKED: redis.flushall()
// Exit code: 2
// Policy violation: infra-protection`,
      fix: 'Command blocked',
    },
  },
]

export default function Gallery() {
  const [selectedExample, setSelectedExample] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Before & After</h2>
          <p className="text-xl text-neutral-600">Real disasters we catch daily</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedExample(example.id)}
              className="card cursor-pointer group hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                {example.title}
                <span className="text-neutral-400 group-hover:text-neutral-600 transition-colors">→</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-danger" />
                    <span className="text-xs font-medium text-danger">Before</span>
                  </div>
                  <pre className="bg-neutral-100 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                    <code>{example.before.code}</code>
                  </pre>
                  <p className="text-xs text-neutral-500 mt-1">{example.before.issue}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-xs font-medium text-success">After</span>
                  </div>
                  <pre className="bg-neutral-100 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                    <code>{example.after.code}</code>
                  </pre>
                  <p className="text-xs text-neutral-500 mt-1">{example.after.fix}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedExample && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedExample(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedExample(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
                
                {examples.find(e => e.id === selectedExample) && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">
                      {examples.find(e => e.id === selectedExample)?.title}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-danger" />
                          <span className="font-medium text-danger">Before AgentCorrect</span>
                        </div>
                        <pre className="bg-neutral-100 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                          <code>{examples.find(e => e.id === selectedExample)?.before.code}</code>
                        </pre>
                        <p className="text-sm text-neutral-600 mt-2">
                          Issue: {examples.find(e => e.id === selectedExample)?.before.issue}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span className="font-medium text-success">After AgentCorrect</span>
                        </div>
                        <pre className="bg-neutral-100 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                          <code>{examples.find(e => e.id === selectedExample)?.after.code}</code>
                        </pre>
                        <p className="text-sm text-neutral-600 mt-2">
                          Fix: {examples.find(e => e.id === selectedExample)?.after.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <noscript>
          <div className="mt-8 p-4 bg-neutral-100 rounded-xl">
            <p className="text-sm text-neutral-600">
              JavaScript is disabled. View examples directly in documentation.
            </p>
          </div>
        </noscript>
      </div>
    </section>
  )
}