'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeroSplitScreen() {
  const [currentLine, setCurrentLine] = useState(0)
  const [showDetection, setShowDetection] = useState(false)
  const [chargeCount, setChargeCount] = useState(1)

  const traceLines = [
    '{"role":"http","meta":{"http":{"method":"POST","url":"https://api.stripe.com/v1/charges","headers":{},"body":{"amount":4999,"currency":"usd","customer":"cus_PQ3kL9mN2o"}}}}',
    '{"role":"system","content":"Network timeout, retrying..."}',
    '{"role":"http","meta":{"http":{"method":"POST","url":"https://api.stripe.com/v1/charges","headers":{},"body":{"amount":4999,"currency":"usd","customer":"cus_PQ3kL9mN2o"}}}}',
    '{"role":"system","content":"Request failed, retrying..."}',
    '{"role":"http","meta":{"http":{"method":"POST","url":"https://api.stripe.com/v1/charges","headers":{},"body":{"amount":4999,"currency":"usd","customer":"cus_PQ3kL9mN2o"}}}}',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < traceLines.length - 1) {
          // Count charges
          const nextLine = traceLines[prev + 1]
          if (nextLine.includes('stripe.com/v1/charges')) {
            setChargeCount(c => c + 1)
          }
          return prev + 1
        }
        setShowDetection(true)
        clearInterval(timer)
        return prev
      })
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-emerald-950/20" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-20 pb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-red-500">47 seconds.</span>
              <br />
              <span className="text-white">$2,349.53 charged.</span>
              <br />
              <span className="text-emerald-400">1 angry customer.</span>
            </h1>
            <p className="text-xl text-gray-400 mt-6 max-w-3xl mx-auto">
              Your AI agent just retried a payment 47 times because it didn't get a response.
              <br />
              <span className="text-white font-semibold">This is happening in your staging environment right now.</span>
            </p>
          </motion.div>
        </div>

        {/* Split Screen */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left Panel - The Disaster */}
          <div className="flex-1 border-r border-gray-800 p-8 bg-red-950/10">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-400">What Your Agent Did</h2>
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-mono">
                  LIVE TRACE
                </div>
              </div>

              <div className="bg-black/50 rounded-lg p-6 font-mono text-sm border border-red-900/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-gray-500">agent_trace_20240327_1452.jsonl</span>
                  <span className="text-red-400 font-bold">
                    Charges: {chargeCount}x
                  </span>
                </div>
                
                {traceLines.slice(0, currentLine + 1).map((line, idx) => {
                  const isCharge = line.includes('stripe.com/v1/charges')
                  const isRetry = line.includes('retrying')
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-2 ${isCharge ? 'text-red-400' : isRetry ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      {isCharge ? (
                        <div>
                          <span className="text-red-500">→ CHARGE</span>
                          <span className="text-red-400 ml-2">$49.99 to customer cus_PQ3kL9mN2o</span>
                        </div>
                      ) : isRetry ? (
                        <div className="text-yellow-500 italic">{line.match(/"content":"(.+?)"/)?.[1]}</div>
                      ) : (
                        <span className="text-gray-600">{line.substring(0, 80)}...</span>
                      )}
                    </motion.div>
                  )
                })}
                
                {currentLine === traceLines.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 pt-4 border-t border-red-900/30"
                  >
                    <div className="text-red-500 font-bold">
                      RESULT: Customer charged ${(49.99 * chargeCount).toFixed(2)}
                    </div>
                  </motion.div>
                )}
              </div>

              {currentLine === traceLines.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg"
                >
                  <h3 className="text-red-400 font-bold mb-2">What Went Wrong:</h3>
                  <ul className="text-gray-400 space-y-1 text-sm">
                    <li>• No idempotency key on payment API call</li>
                    <li>• Each retry created a new charge</li>
                    <li>• Customer's card charged multiple times</li>
                    <li>• This will cause chargebacks & angry support tickets</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Panel - The Solution */}
          <div className="flex-1 p-8 bg-emerald-950/10">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-400">What AgentCorrect Caught</h2>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-mono">
                  CI/CD CHECK
                </div>
              </div>

              <div className="bg-black/50 rounded-lg p-6 font-mono text-sm border border-emerald-900/30">
                <div className="mb-4 text-gray-500">
                  $ agentcorrect analyze agent_trace_20240327_1452.jsonl
                </div>
                
                {showDetection && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-4"
                    >
                      <span className="text-blue-400">Analyzing 5 API calls...</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6"
                    >
                      <div className="text-red-500 font-bold mb-2">
                        [SEV0] PAYMENT WITHOUT IDEMPOTENCY KEY
                      </div>
                      <div className="text-gray-400 ml-4 space-y-1">
                        <div>Provider: Stripe</div>
                        <div>Endpoint: https://api.stripe.com/v1/charges</div>
                        <div>Missing: Idempotency-Key header</div>
                        <div>Risk: Duplicate charges on retry</div>
                        <div className="text-yellow-400">Detected: 3 duplicate calls with same params</div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mb-4 p-3 bg-emerald-900/20 border border-emerald-800 rounded"
                    >
                      <div className="text-emerald-400 font-bold mb-2">REQUIRED FIX:</div>
                      <div className="text-white">
                        Add header: Idempotency-Key: order_{'{order_id}'}
                      </div>
                      <div className="text-gray-400 text-xs mt-2">
                        See: stripe.com/docs/api/idempotent_requests
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="pt-4 border-t border-gray-800"
                    >
                      <div className="text-red-500 font-bold">
                        Exit code: 2 (BUILD FAILED)
                      </div>
                      <div className="text-gray-500 text-sm mt-1">
                        Deployment blocked until idempotency added
                      </div>
                    </motion.div>
                  </>
                )}
              </div>

              {showDetection && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 p-4 bg-emerald-900/20 border border-emerald-800 rounded-lg"
                >
                  <h3 className="text-emerald-400 font-bold mb-2">Protection Enabled:</h3>
                  <ul className="text-gray-400 space-y-1 text-sm">
                    <li>✓ Detected missing idempotency key</li>
                    <li>✓ Identified duplicate charge pattern</li>
                    <li>✓ Blocked deployment to production</li>
                    <li>✓ Saved customer from triple charging</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {showDetection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center py-12 px-4 border-t border-gray-800"
          >
            <p className="text-xl text-gray-400 mb-6">
              Stop disasters before they reach production
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition-colors">
                Install AgentCorrect
              </button>
              <a href="#examples" className="text-gray-400 hover:text-white underline">
                See more disasters we catch →
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              pip install agentcorrect • Runs offline • No data leaves your machine
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}