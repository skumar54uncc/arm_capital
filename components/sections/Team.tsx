'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { GraduationCap, Briefcase, Award } from 'lucide-react'

// Component to handle image loading with fallback
function TeamMemberImage({ src, name }: { src: string; name: string }) {
  const [imageError, setImageError] = useState(false)
  const initials = name.split(' ').map(n => n[0]).join('')

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary-800 text-primary-400 text-2xl font-serif">
        {initials}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`${name}`}
      fill
      className="object-cover"
      sizes="128px"
      onError={() => setImageError(true)}
    />
  )
}

const teamMembers = [
  {
    name: 'Mikhail Gorshkov',
    role: 'Portfolio Manager',
    image: '/images/mikhail-gorshkov.png',
    experience: 'Buyside investment research at HFIM (London, 2025). Prior experience in Technology and Fintech. Built proprietary hedge fund Exebridge Associates and sustainable student investment fund ExSIF.',
    education: [
      'Bayes Business School, City University of London - MSc Investment Management, Distinction (2025)',
      'University of Exeter Business School - MSc Finance and Investment, Distinction (2024)',
      'Bayes Business School, City University of London - BSc Investment and Financial Risk Management (2021)',
    ],
    stats: {
      label: 'Track Record',
      value: 'Global Equities & FX',
      detail: 'Active in US, European markets and currencies',
    },
  },
  {
    name: 'Rahul Khandelwal',
    role: 'Investment Research',
    image: '/images/rahul-khandelwal.png',
    experience: 'Investment Research in hedge fund strategies at HFIM (London, 2024-25). Active participant in US, European markets and currencies. Prior experience in equity research in Indian small cap segment.',
    education: [
      'M.Sc. Investment Management from Bayes Business School, London, UK',
      'Bachelor of Technology in Computer Science',
      'CFA Level 1',
    ],
    stats: {
      label: 'Track Record',
      value: 'Indian Equities',
      detail: '10% YTD from 01 Jan 2025 - 09 Dec 2025',
    },
  },
]

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <section id="team" ref={ref} className="section-padding bg-primary-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Team
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Experienced investment professionals with deep expertise in global equity markets
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-[600px]"
              style={{ perspective: '1000px' }}
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 p-8 bg-primary-900/50 border border-primary-800 hover:border-primary-700 transition-all duration-300"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="h-full flex flex-col">
                    {/* Profile Image */}
                    <div className="mb-6 flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-primary-700 bg-primary-800">
                        <TeamMemberImage 
                          src={member.image}
                          name={member.name}
                        />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-2 text-primary-50 text-center">
                        {member.name}
                      </h3>
                      <p className="text-accent-400 font-medium mb-4 text-center">
                        {member.role}
                      </p>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-5 h-5 text-accent-400" />
                          <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide">
                            Experience
                          </h4>
                        </div>
                        <p className="text-primary-300 text-sm leading-relaxed">
                          {member.experience}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-5 h-5 text-accent-400" />
                          <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide">
                            Track Record
                          </h4>
                        </div>
                        <p className="text-primary-50 font-medium mb-1">
                          {member.stats.value}
                        </p>
                        <p className="text-primary-400 text-sm">
                          {member.stats.detail}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-primary-800">
                      <p className="text-xs text-primary-500 text-center">
                        Hover to view education
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 p-8 bg-primary-800/50 border border-primary-700"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-full flex flex-col">
                    <div className="mb-6 text-center">
                      <h3 className="text-2xl font-serif font-bold mb-2 text-primary-50">
                        {member.name}
                      </h3>
                      <p className="text-accent-400 font-medium">
                        Education
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="w-5 h-5 text-accent-400" />
                        <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wide">
                          Qualifications
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {member.education.map((edu, eduIndex) => (
                          <li key={eduIndex} className="text-primary-300 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-accent-500 mt-1 flex-shrink-0">▸</span>
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xs text-primary-500 text-center mt-12 italic"
        >
          Combined team experience: 8+ years in financial markets. Track record figures calculated as per trade analytics provided by the broker.
        </motion.p>
      </div>

    </section>
  )
}
