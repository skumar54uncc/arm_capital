'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'

// Stock ticker data
const tickerSymbols = [
  { symbol: 'AAPL', price: 185.42, change: 2.3 },
  { symbol: 'MSFT', price: 378.85, change: -1.2 },
  { symbol: 'GOOGL', price: 142.56, change: 0.8 },
  { symbol: 'AMZN', price: 151.94, change: 1.5 },
  { symbol: 'TSLA', price: 248.50, change: -0.7 },
  { symbol: 'META', price: 485.39, change: 3.1 },
  { symbol: 'NVDA', price: 875.23, change: 5.2 },
  { symbol: 'JPM', price: 195.67, change: -0.5 },
]

// Chart data points for background visualization (scaled for larger viewBox)
const chartData = [
  [0, 400], [100, 350], [200, 380], [300, 320], [400, 360], [500, 300], [600, 340], [700, 280], [800, 320], [900, 300]
]

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [tickerOffset, setTickerOffset] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animate ticker
  useEffect(() => {
    const tickerWidth = tickerSymbols.length * 300
    const interval = setInterval(() => {
      setTickerOffset((prev) => {
        const newOffset = prev - 2
        return newOffset <= -tickerWidth ? 0 : newOffset
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.2 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
        }} />
      </div>

      {/* Stock Chart Pattern Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.25 }}>
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="chartArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area under curve */}
          <motion.path
            d={`M 0,600 L ${chartData.map(([x, y]) => `${x},${y}`).join(' L ')} L 1000,600 Z`}
            fill="url(#chartArea)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 1 }}
          />
          {/* Main trend line */}
          <motion.path
            d={`M ${chartData.map(([x, y], i) => `${x},${y}`).join(' L ')}`}
            fill="none"
            stroke="url(#chartGradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          {/* Data points */}
          {chartData.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#0ea5e9"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
            />
          ))}
          {/* Additional trend lines */}
          <motion.path
            d="M 0,300 L 1000,200"
            fill="none"
            stroke="rgba(14, 165, 233, 0.3)"
            strokeWidth="2"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.path
            d="M 0,400 L 1000,360"
            fill="none"
            stroke="rgba(14, 165, 233, 0.25)"
            strokeWidth="2"
            strokeDasharray="8,12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>
      </div>

      {/* Floating Financial Indicators */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {['+2.3%', '+15.8%', '-0.5%', '+8.2%', '1,234.56', '98.7%', '45.2K', '+12.4%', '2,456.78'].map((value, index) => {
          const positions = [
            { x: '10%', y: '20%' },
            { x: '85%', y: '15%' },
            { x: '15%', y: '70%' },
            { x: '80%', y: '75%' },
            { x: '50%', y: '10%' },
            { x: '25%', y: '50%' },
            { x: '75%', y: '45%' },
            { x: '5%', y: '40%' },
            { x: '95%', y: '60%' },
          ]
          const pos = positions[index] || { x: `${(index % 5) * 20}%`, y: `${(index % 3) * 30}%` }
          return (
            <motion.div
              key={index}
              className="absolute text-accent-400 text-sm font-mono font-semibold"
              style={{
                left: pos.x,
                top: pos.y,
                opacity: 0.4,
                textShadow: '0 0 10px rgba(14, 165, 233, 0.5)',
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.5, 0.3],
                scale: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 6 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.8,
                ease: 'easeInOut',
              }}
            >
              {value}
            </motion.div>
          )
        })}
      </div>

      {/* Data Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.08 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(14, 165, 233, 0.3) 2px, rgba(14, 165, 233, 0.3) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(14, 165, 233, 0.3) 2px, rgba(14, 165, 233, 0.3) 4px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Stock Ticker Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-primary-950/90 border-t border-primary-800/50 overflow-hidden z-30">
        <motion.div
          className="flex items-center h-full gap-8 whitespace-nowrap"
          animate={{ x: tickerOffset }}
          transition={{ duration: 0, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...tickerSymbols, ...tickerSymbols].map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              className="flex items-center gap-3 px-6 py-2 border-r border-primary-800/30"
            >
              <span className="text-primary-300 font-semibold text-sm">{stock.symbol}</span>
              <span className="text-primary-200 font-mono text-sm">${stock.price.toFixed(2)}</span>
              <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs font-medium">
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlay - Subtle, doesn't hide animations */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950/60 to-primary-950/80 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 container-custom px-4 pb-24"
      >
        {/* Main Headline */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-balance tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Alpha Generation
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="text-lg md:text-xl text-primary-400 font-light tracking-wider mb-10 md:mb-12"
            style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            Driven by
          </motion.div>
        </div>

        {/* Three Pillars - Boxed/Highlighted */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {[
              { text: 'Quantitative Research', delay: 0.8 },
              { text: 'Fundamental Insight', delay: 0.9 },
              { text: 'Valuation Dislocation', delay: 1.0 },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: pillar.delay, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="group relative"
              >
                <div className="relative px-6 md:px-8 py-4 md:py-5 bg-primary-900/30 border border-primary-700/40 hover:border-primary-600/60 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary-900/40">
                  <motion.span
                    className="text-lg md:text-xl lg:text-2xl font-serif font-medium text-primary-100 group-hover:text-primary-50 transition-colors"
                    style={{ 
                      letterSpacing: '0.01em',
                      lineHeight: '1.4',
                    }}
                  >
                    {pillar.text}
                  </motion.span>
                  {/* Subtle glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-400/0 via-accent-400/5 to-accent-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          >
            <a
              href="#strategy"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary-800/90 hover:bg-primary-700/90 border border-primary-700/50 hover:border-primary-600/70 text-primary-50 font-medium transition-all duration-300 group backdrop-blur-sm"
            >
              Explore Strategy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
