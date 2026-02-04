'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { TrendingUp, Globe, Users, Target } from 'lucide-react'

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}

function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = latest.toFixed(decimals)
        ref.current.textContent = `${prefix}${formatted}${suffix}`
      }
    })
    return () => unsubscribe()
  }, [springValue, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

const insights = [
  {
    icon: Target,
    label: 'Target ROI',
    value: 15,
    suffix: '-18%',
    description: 'Annual target return',
  },
  {
    icon: TrendingUp,
    label: 'Target Volatility',
    value: 7,
    suffix: '-8%',
    description: 'Risk management target',
  },
  {
    icon: Globe,
    label: 'Universe Coverage',
    value: 34000,
    suffix: '+',
    description: 'Securities in research universe',
  },
  {
    icon: Users,
    label: 'Team Experience',
    value: 8,
    suffix: '+ years',
    description: 'Combined market experience',
  },
]

export default function PerformanceInsights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="insights" ref={ref} className="section-padding bg-primary-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Process & Framework
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Our investment framework emphasizes process, discipline, and risk management
          </p>
        </motion.div>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-primary-900/50 border border-primary-800 hover:border-primary-700 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent-400" />
                </div>
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-primary-50">
                    <AnimatedCounter
                      value={insight.value}
                      suffix={insight.suffix}
                      decimals={insight.label === 'Target ROI' || insight.label === 'Target Volatility' ? 0 : 0}
                    />
                  </span>
                </div>
                <p className="text-sm font-medium text-primary-300 mb-1">
                  {insight.label}
                </p>
                <p className="text-xs text-primary-500">
                  {insight.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Investment Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-serif font-bold mb-8 text-center">
            Five-Stage Investment Process
          </h3>
          
          <div className="space-y-4">
            {[
              { stage: '1', title: 'Sourcing and Screening', description: 'Funnels 34,000 securities into a focused list of actionable ideas through proprietary data signals and analyst research.' },
              { stage: '2', title: 'Short Due Diligence', description: 'Quick sanity check and second perspective for shortlisting. Team assessment and quality check against preliminary framework.' },
              { stage: '3', title: 'Full Due Diligence', description: 'Deep dive research including transcripts, filings, expert interviews, and 3-5 year financial modeling with scenario analysis.' },
              { stage: '4', title: 'Final IC Approval', description: 'Lead PM presents detailed memo to investment committee. Conviction scoring and catalyst assessment for position sizing.' },
              { stage: '5', title: 'Closing & Monitoring', description: 'Positioning established from conviction. Daily tracking of idiosyncratic risks, portfolio measures, and exit criteria.' },
            ].map((process, index) => (
              <motion.div
                key={process.stage}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex gap-6 p-6 bg-primary-900/50 border border-primary-800 hover:border-primary-700 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center">
                  <span className="text-xl font-serif font-bold text-accent-400">
                    {process.stage}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-serif font-semibold mb-2 text-primary-50">
                    {process.title}
                  </h4>
                  <p className="text-primary-300 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-xs text-primary-500 text-center mt-12 italic"
        >
          There is no guarantee that the fund will achieve profitable outcomes from what is stated above, and the investment approach may evolve over time. No representation is made that this investment approach will yield a particular level of return.
        </motion.p>
      </div>
    </section>
  )
}
