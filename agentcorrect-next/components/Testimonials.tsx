'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Caught a $47K duplicate charge in staging. This tool paid for itself in one save.",
    author: "Senior Engineer",
    role: "Fintech IC",
  },
  {
    quote: "Finally, guardrails that don't slow us down. Deterministic checks mean no false positives.",
    author: "Platform Lead",
    role: "SRE",
  },
  {
    quote: "We ship AI features 3x faster knowing AgentCorrect blocks the scary stuff.",
    author: "VP Engineering",
    role: "Head of Eng",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <blockquote className="mb-4">
                <p className="text-neutral-700 italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-neutral-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}