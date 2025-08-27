'use client'

import { motion } from 'framer-motion'

export default function PricingSimple() {
  const disasters = [
    { 
      type: "Duplicate Charges",
      cost: "$47,000",
      description: "Average chargeback cost per incident",
      example: "Agent retries Stripe charge 47 times"
    },
    {
      type: "Database Wipe",
      cost: "$2.3M",
      description: "Average data recovery + downtime",
      example: "DELETE FROM users (no WHERE clause)"
    },
    {
      type: "Cache Flush",
      cost: "$89,000",
      description: "Service degradation + recovery",
      example: "Redis FLUSHALL in production"
    }
  ]

  return (
    <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Cost of One Disaster
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A single agent mistake can cost more than a year of prevention
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {disasters.map((disaster, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/50 rounded-lg p-6 border border-red-900/20"
            >
              <div className="text-red-400 font-semibold mb-2">{disaster.type}</div>
              <div className="text-3xl font-bold text-white mb-2">{disaster.cost}</div>
              <div className="text-sm text-gray-400 mb-3">{disaster.description}</div>
              <div className="text-xs text-gray-500 font-mono bg-gray-900/50 p-2 rounded">
                {disaster.example}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-950/50 to-emerald-900/30 rounded-2xl p-8 border border-emerald-800/50"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">
                Start Free, Stay Safe
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Free for personal use & small teams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Runs completely offline - your code never leaves your machine</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Open source - audit the code yourself</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Enterprise support available for large teams</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/50 rounded-lg p-6 border border-gray-800">
              <div className="font-mono text-sm text-gray-400 mb-4">
                # Install in 30 seconds
              </div>
              <div className="bg-gray-950 rounded p-3 font-mono">
                <div className="text-emerald-400">$ pip install agentcorrect</div>
                <div className="text-gray-500">$ agentcorrect analyze trace.jsonl</div>
                <div className="text-gray-600 mt-2"># Add to GitHub Actions</div>
                <div className="text-gray-500">- run: agentcorrect analyze</div>
              </div>
              <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-lg transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Questions? Email security@agentcorrect.com or open an issue on GitHub
          </p>
        </motion.div>
      </div>
    </section>
  )
}