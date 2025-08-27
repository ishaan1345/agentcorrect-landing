'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Local checks forever',
    features: [
      'Unlimited local scans',
      'Core safety rules',
      'CLI tool',
      'No data retention',
    ],
    cta: 'Download Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    description: 'CI/CD integration',
    features: [
      'Everything in Free',
      'GitHub Actions',
      'Audit logs',
      'Custom rules',
      'Slack alerts',
    ],
    cta: 'Start Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full control',
    features: [
      'Everything in Pro',
      'SSO/SAML',
      'Policy waivers',
      'SLA support',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-xl text-neutral-600 mb-8">Start free, scale as you grow</p>
          
          <div className="inline-flex items-center p-1 bg-neutral-200 rounded-xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-white shadow-sm' 
                  : 'text-neutral-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingPeriod === 'yearly' 
                  ? 'bg-white shadow-sm' 
                  : 'text-neutral-600'
              }`}
            >
              Yearly (save 20%)
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card ${
                plan.highlighted 
                  ? 'ring-2 ring-neutral-900 shadow-xl scale-105' 
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="badge bg-neutral-900 text-white mb-4">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-neutral-600">
                    {billingPeriod === 'yearly' ? '/year' : plan.period}
                  </span>
                )}
              </div>
              <p className="text-neutral-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={
                  plan.highlighted 
                    ? 'w-full btn-primary' 
                    : 'w-full btn-secondary'
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-neutral-500 mt-8">
          * Usage caps: Free (1K scans/day), Pro (100K scans/day), Enterprise (unlimited)
        </p>
      </div>
    </section>
  )
}