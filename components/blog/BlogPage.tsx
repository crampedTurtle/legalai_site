'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import Image from 'next/image'

interface BlogPageProps {
  children: React.ReactNode
}

export function BlogPage({ children }: BlogPageProps) {
  return (
    <div className="pt-32 pb-24">
      {children}
    </div>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            {children}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

interface SubheadProps {
  children: React.ReactNode
}

export function Subhead({ children }: SubheadProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-dark-300 leading-relaxed">
            {children}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  slug: string
}

export function BlogCard({ title, excerpt, author, date, readTime, category, image, slug }: BlogCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-8 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.article
            className="card-hover block rounded-xl border border-dark-700 bg-dark-800 overflow-hidden group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-1/3">
                <div className="relative h-48 md:h-full bg-gradient-to-br from-sapphire-500/20 to-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-sapphire-400 text-4xl font-bold opacity-20">
                      {title.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="md:w-2/3 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sapphire-500/20 text-sapphire-400 border border-sapphire-500/30">
                    {category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-sapphire-400 transition-colors">
                  {title}
                </h2>
                
                <p className="text-dark-300 mb-6 leading-relaxed">
                  {excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-dark-400">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sapphire-400 group-hover:text-sapphire-300 transition-colors">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
} 