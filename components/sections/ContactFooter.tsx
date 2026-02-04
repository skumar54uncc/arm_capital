'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Building2 } from 'lucide-react'

export default function ContactFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      {/* Contact Section */}
      <section id="contact" ref={ref} className="section-padding bg-primary-900/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Request Materials
            </h2>
            <p className="text-xl text-primary-300 mb-12 leading-relaxed">
              For institutional investors, family offices, and qualified allocators interested in learning more about our investment strategy and process.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="mailto:investorrelations@armcapital.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-800 hover:bg-primary-700 border border-primary-700 hover:border-primary-600 text-primary-50 font-medium transition-all duration-300 group"
              >
                <Mail className="w-5 h-5" />
                Contact Investor Relations
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-950 border-t border-primary-800">
        <div className="container-custom py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 text-primary-50">
                ARM CAPITAL
              </h3>
              <p className="text-sm text-primary-400 leading-relaxed">
                Institutional investment management focused on generating alpha through fundamental research and quantitative analysis.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide mb-4">
                Information
              </h4>
              <ul className="space-y-2 text-sm text-primary-400">
                <li>
                  <a href="#about" className="hover:text-primary-300 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#strategy" className="hover:text-primary-300 transition-colors">
                    Investment Strategy
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-primary-300 transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary-300 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-primary-400">
                <li className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>London, United Kingdom</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:investorrelations@armcapital.com" className="hover:text-primary-300 transition-colors">
                    investorrelations@armcapital.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-8 border-t border-primary-800">
            <div className="text-xs text-primary-500 leading-relaxed space-y-3">
              <p className="font-semibold text-primary-400 mb-2">
                IMPORTANT DISCLOSURES
              </p>
              <p>
                This website is for informational purposes only and does not constitute an offer to sell, or a solicitation of an offer to buy, any securities or any interest in any investment fund managed by ARM Capital or its affiliates (collectively, &quot;ARM Capital&quot;). Any such offer or solicitation will be made only through a confidential private placement memorandum and related documents (the &quot;Offering Documents&quot;) and only in jurisdictions where permitted by law.
              </p>
              <p>
                Past performance is not indicative of future results. No representation is being made that any investment or account will or is likely to achieve profits or losses similar to those shown. There can be no assurance that ARM Capital will achieve its investment objectives or that any investment will be profitable. All investments involve risk, including the possible loss of principal.
              </p>
              <p>
                The information contained herein is based on sources believed to be reliable, but no representation or warranty is made as to its accuracy or completeness. ARM Capital reserves the right to modify its investment process, strategy, and approach at any time without notice.
              </p>
              <p>
                This website may contain forward-looking statements that are based on current expectations, estimates, and projections about the markets in which ARM Capital operates. These statements are not guarantees of future performance and involve certain risks, uncertainties, and assumptions that are difficult to predict.
              </p>
              <p>
                © {new Date().getFullYear()} ARM CAPITAL. PROPRIETARY & CONFIDENTIAL. ALL RIGHTS RESERVED. NOT FOR REDISTRIBUTION.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
