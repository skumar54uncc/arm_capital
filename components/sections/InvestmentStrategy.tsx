'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, TrendingDown, Globe, BarChart3 } from 'lucide-react'

const positions = [
  {
    title: 'Long Positions',
    description:
      'Businesses with potential for margin expansion driven by operating leverage, favourable input costs, and macro tailwinds.',
    focus:
      'Focus on IRR over 3-5 years versus normalised returns appropriate for their market cap, business model, and industry norms.',
    icon: TrendingUp,
  },
  {
    title: 'Short Positions',
    description:
      'Short book comprises stories with overhyped business models, structural weaknesses, and valuations disconnected from fundamentals.',
    focus:
      'Inconsistencies between reported earnings and cash flows, strong momentum disconnected from underlying value.',
    icon: TrendingDown,
  },
]

export default function InvestmentStrategy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="strategy" ref={ref} className="section-padding bg-primary-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Investment Strategy
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            A disciplined, fundamental approach to global equity investing
          </p>
        </motion.div>

        {/* Portfolio Structure */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary-900/50 border border-primary-800">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-accent-400" />
                <h3 className="text-xl font-serif font-semibold">Portfolio Structure</h3>
              </div>
              <p className="text-primary-300 text-sm leading-relaxed">
                10-15 core positions, diversified across sectors and geographies. Net long exposure of 60-70% (longs) and 30-40% (shorts).
              </p>
            </div>

            <div className="p-6 bg-primary-900/50 border border-primary-800">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-accent-400" />
                <h3 className="text-xl font-serif font-semibold">Universe</h3>
              </div>
              <p className="text-primary-300 text-sm leading-relaxed">
                MSCI GIMI: Full investible universe covering large, mid, small, and micro-cap securities across global markets.
              </p>
            </div>

            <div className="p-6 bg-primary-900/50 border border-primary-800">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-accent-400" />
                <h3 className="text-xl font-serif font-semibold">Leverage</h3>
              </div>
              <p className="text-primary-300 text-sm leading-relaxed">
                Strategic use of 3-4x leverage in specific positions where conviction and risk management support it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Long & Short Positions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {positions.map((position, index) => {
            const Icon = position.icon
            return (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-8 md:p-10 bg-primary-900/50 border border-primary-800"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="w-6 h-6 text-accent-400" />
                  <h3 className="text-2xl font-serif font-bold text-primary-50">
                    {position.title}
                  </h3>
                </div>
                <p className="text-primary-300 mb-5 leading-relaxed text-lg">
                  {position.description}
                </p>
                <p className="text-primary-400 italic text-sm leading-relaxed">
                  {position.focus}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
