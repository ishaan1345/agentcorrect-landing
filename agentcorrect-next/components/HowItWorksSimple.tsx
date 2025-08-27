'use client'

import { motion } from 'framer-motion'

export default function HowItWorksSimple() {
  const steps = [
    {
      number: "1",
      title: "Your agent executes",
      description: "AI agents run tasks, call APIs, modify databases",
      code: `# Agent making API calls
agent.stripe.charge(amount=49.99)
agent.sql.execute("DELETE FROM orders")
agent.redis.flushall()`,
      color: "text-blue-400",
      borderColor: "border-blue-900/30"
    },
    {
      number: "2",
      title: "Trace captured",
      description: "Execution logs saved as JSONL traces",
      code: `# Trace file generated
{"role":"http","meta":{"http":{
  "method":"POST",
  "url":"https://api.stripe.com/v1/charges",
  "headers":{},
  "body":{"amount":4999}
}}}`,
      color: "text-purple-400",
      borderColor: "border-purple-900/30"
    },
    {
      number: "3",
      title: "AgentCorrect scans",
      description: "Analyzes traces for 47+ disaster patterns",
      code: `$ agentcorrect analyze trace.jsonl

[SEV0] Missing payment idempotency
[SEV0] SQL DELETE without WHERE
[SEV0] Redis FLUSHALL detected`,
      color: "text-red-400",
      borderColor: "border-red-900/30"
    },
    {
      number: "4",
      title: "CI/CD blocks",
      description: "Exit code 2 prevents deployment",
      code: `# GitHub Actions
✗ AgentCorrect Safety Check
  Exit code: 2
  
Deployment blocked
Fix required before merge`,
      color: "text-emerald-400",
      borderColor: "border-emerald-900/30"
    }
  ]

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Actually Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AgentCorrect runs in your CI/CD pipeline. No agents to install, no runtime overhead.
            Just deterministic safety checks that prevent disasters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gray-950/50 rounded-lg p-6 border ${step.borderColor}`}
            >
              <div className={`text-3xl font-bold ${step.color} mb-3`}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{step.description}</p>
              <div className="bg-black/50 rounded p-3 font-mono text-xs overflow-x-auto">
                <pre className="text-gray-500 whitespace-pre">{step.code}</pre>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 p-6 bg-gray-950/50 rounded-lg border border-gray-800">
            <div>
              <div className="text-3xl font-bold text-emerald-400">0</div>
              <div className="text-sm text-gray-400">Runtime overhead</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div>
              <div className="text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-sm text-gray-400">Deterministic</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div>
              <div className="text-3xl font-bold text-emerald-400">47+</div>
              <div className="text-sm text-gray-400">Disaster patterns</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}