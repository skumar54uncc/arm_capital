'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { TrendingUp, TrendingDown, Globe, BarChart3 } from 'lucide-react'

const sectors = [
  'AI & Machine Learning',
  'Financial Services',
  'Medical and Biotech',
  'Robotics',
  'Energy',
  'Software & Internet',
]

const strategyData = {
  long: {
    title: 'Long Positions',
    description: 'Businesses with potential for margin expansion driven by operating leverage, favourable input costs, and macro tailwinds.',
    focus: 'Focus on IRR over 3-5 years versus normalised returns appropriate for their market cap, business model, and industry norms.',
  },
  short: {
    title: 'Short Positions',
    description: 'Short book comprises stories with overhyped business models, structural weaknesses, and valuations disconnected from fundamentals.',
    focus: 'Inconsistencies between reported earnings and cash flows, strong momentum disconnected from underlying value.',
  },
}

export default function InvestmentStrategy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<'long' | 'short'>('long')

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
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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

        {/* Long/Short Framework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex gap-4 mb-8 border-b border-primary-800">
            <button
              onClick={() => setActiveTab('long')}
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === 'long'
                  ? 'text-primary-50 border-b-2 border-accent-400'
                  : 'text-primary-400 hover:text-primary-300'
              }`}
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Long Framework
            </button>
            <button
              onClick={() => setActiveTab('short')}
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === 'short'
                  ? 'text-primary-50 border-b-2 border-accent-400'
                  : 'text-primary-400 hover:text-primary-300'
              }`}
            >
              <TrendingDown className="w-5 h-5 inline mr-2" />
              Short Framework
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'long' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 bg-primary-900/50 border border-primary-800"
          >
            <h3 className="text-2xl font-serif font-bold mb-4 text-primary-50">
              {strategyData[activeTab].title}
            </h3>
            <p className="text-primary-300 mb-4 leading-relaxed text-lg">
              {strategyData[activeTab].description}
            </p>
            <p className="text-primary-400 italic">
              {strategyData[activeTab].focus}
            </p>
          </motion.div>
        </motion.div>

        {/* Sector Exposure */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-serif font-bold mb-6 text-center">
            Sector Focus
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="p-4 bg-primary-900/50 border border-primary-800 hover:border-primary-700 hover:bg-primary-900/70 transition-all duration-300 text-center"
              >
                <p className="text-sm text-primary-300">{sector}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-primary-500 text-center mt-6 italic">
            For illustrative purposes only. Sector allocations may vary based on market conditions and opportunity set.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
