'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Database, Lightbulb } from 'lucide-react'

const edgeSections = [
  {
    id: 'people',
    icon: Users,
    title: 'People',
    subtitle: 'Investment Committee Discipline',
    description: 'Our investment committee brings together diverse perspectives and deep expertise in global markets. We maintain a rigorous research culture where every investment idea undergoes independent assessment and challenge.',
    points: [
      'Independent assessment framework for all investment theses',
      'Cross-functional research team with 8+ years combined experience',
      'Structured decision-making process with conviction scoring',
      'Daily monitoring and risk oversight protocols',
    ],
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data',
    subtitle: 'Proprietary Data Pipelines',
    description: 'We integrate quantitative signals with fundamental research through proprietary data infrastructure. Our quant analysts prepare a comprehensive data lake that informs both idea generation and risk modeling.',
    points: [
      'Proprietary data lake covering 34,000+ securities',
      'Quantitative signal generation and validation',
      'Integration of fundamental and technical analysis',
      'Real-time risk modeling and portfolio analytics',
    ],
  },
  {
    id: 'insights',
    icon: Lightbulb,
    title: 'Insights',
    subtitle: 'Thesis Generation & Catalyst Analysis',
    description: 'Our research process focuses on identifying catalysts that unlock shareholder value. We conduct deep scenario analysis and stress testing to build conviction in both long and short positions.',
    points: [
      'Catalyst-driven positioning with probabilistic assessment',
      '3-5 year financial modeling and scenario analysis',
      'Cross-checks with customers, suppliers, and competitors',
      'Valuation frameworks using multiple methodologies',
    ],
  },
]

export default function OurEdge() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="edge" ref={ref} className="section-padding bg-primary-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Edge
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Three pillars that drive our investment process and differentiate our approach
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {edgeSections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="h-full p-8 bg-primary-900/50 border border-primary-800 hover:border-primary-700 transition-all duration-300 hover:bg-primary-900/70">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary-800 flex items-center justify-center mb-4 group-hover:bg-primary-700 transition-colors">
                      <Icon className="w-8 h-8 text-accent-400" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2 text-primary-50">
                      {section.title}
                    </h3>
                    <p className="text-sm text-accent-400 font-medium mb-4">
                      {section.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-primary-300 mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  <ul className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3 text-primary-400 text-sm">
                        <span className="text-accent-500 mt-1">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
