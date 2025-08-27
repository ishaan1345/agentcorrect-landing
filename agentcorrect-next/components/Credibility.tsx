'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Credibility() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">SOC2</span>
            </div>
            <span className="text-sm text-neutral-600">Type II</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">GDPR</span>
            </div>
            <span className="text-sm text-neutral-600">Compliant</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">100%</span>
            </div>
            <span className="text-sm text-neutral-600">Local execution</span>
          </div>
        </motion.div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Deterministic core rules with transparent coverage reports
        </p>
      </div>
    </section>
  )
}