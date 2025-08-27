'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How do you handle false positives?',
    answer: 'Our rules are deterministic, not probabilistic. Each rule has explicit allow-lists and context awareness. You can waive specific rules per-project.',
  },
  {
    question: 'Which tracers do you support?',
    answer: 'OpenTelemetry, Langfuse, Galileo, and any JSONL trace format. We also support direct API call logs from major providers.',
  },
  {
    question: 'What languages and runtimes work?',
    answer: 'Any language that outputs traces. The scanner itself runs as a standalone binary (Go) or Python package.',
  },
  {
    question: 'How does CI mode work?',
    answer: 'Exit code 2 on critical findings blocks your pipeline. Non-blocking warnings use exit code 0. Full reports go to your artifact store.',
  },
  {
    question: 'How do you detect payment idempotency issues?',
    answer: 'We pattern-match against 25+ payment provider APIs and check for idempotency keys, request IDs, or nonce parameters.',
  },
  {
    question: 'Can I customize SQL safety rules?',
    answer: 'Yes. Define patterns, required confirmations, and dry-run requirements in YAML. We ship sensible defaults for Postgres, MySQL, and SQLite.',
  },
  {
    question: 'What support do you offer?',
    answer: 'Community support via GitHub, Pro includes Slack, Enterprise gets dedicated SRE with 15-minute SLA.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-semibold pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-neutral-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}