'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="section-padding bg-primary-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">
            About Us
          </h2>

          <div className="space-y-8 text-primary-200 leading-relaxed">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-4 text-primary-50">
                Mission
              </h3>
              <p className="text-lg">
                ARM Capital seeks to deliver superior risk-adjusted returns for institutional investors through a disciplined, research-driven approach to global equity investing. We combine fundamental analysis with quantitative rigor to identify mispriced securities and construct portfolios that aim to outperform global equity benchmarks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-4 text-primary-50">
                Investment Philosophy
              </h3>
              <p className="text-lg">
                Our investment philosophy centers on three core principles: rigorous bottom-up stock selection, top-down country allocation, and momentum-driven positioning. We believe that alpha generation requires deep fundamental research, proprietary data insights, and the discipline to act on conviction while managing risk. Our process emphasizes quality over quantity, focusing on a concentrated portfolio of 10-15 high-conviction positions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-4 text-primary-50">
                Legacy & Values
              </h3>
              <p className="text-lg">
                Founded with a commitment to institutional-grade investment management, ARM Capital operates with transparency, integrity, and a long-term perspective. We maintain a culture of intellectual curiosity, where research drives decisions and risk management is embedded in every aspect of our investment process. Our values reflect the highest standards of fiduciary responsibility and alignment with investor interests.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
