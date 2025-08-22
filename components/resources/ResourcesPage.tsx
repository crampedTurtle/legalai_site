'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, FileText, BookOpen, CheckSquare, Play } from 'lucide-react'
import { ResourceModal } from './ResourceModal'
import { useDemoModal } from '@/hooks/useDemoModal'
import { VideoModal } from '@/components/VideoModal'

interface ResourcesPageProps {
  children: React.ReactNode
}

export function ResourcesPage({ children }: ResourcesPageProps) {
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

interface IntroProps {
  children: React.ReactNode
}

export function Intro({ children }: IntroProps) {
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

interface ResourceCardProps {
  title: string
  type: 'Whitepaper' | 'Guide' | 'Checklist' | 'Video' | 'Assessment'
  link: string
}

export function ResourceCard({ title, type, link }: ResourceCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Determine if this resource should be gated (whitepapers and guides)
  const isGated = type === 'Whitepaper' || type === 'Guide'
  
  // Check if this is the demo walkthrough video
  const isDemoVideo = title === 'Sapphire Legal AI Demo Walkthrough'

  const handleClick = (e: React.MouseEvent) => {
    if (isDemoVideo) {
      e.preventDefault()
      // For demo video, we'll handle it differently
      return
    } else if (isGated) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'Whitepaper':
        return <FileText className="h-6 w-6" />
      case 'Guide':
        return <BookOpen className="h-6 w-6" />
      case 'Checklist':
        return <CheckSquare className="h-6 w-6" />
      case 'Video':
        return <Play className="h-6 w-6" />
      case 'Assessment':
        return <CheckSquare className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'Whitepaper':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Guide':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Checklist':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Video':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Assessment':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-sapphire-500/20 text-sapphire-400 border-sapphire-500/30'
    }
  }

  return (
    <section className="py-8 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.a
              href={link}
              onClick={handleClick}
              className="card-hover block p-8 rounded-xl border border-dark-700 bg-dark-800 group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor()}`}>
                      {getIcon()}
                      {type}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sapphire-400 transition-colors">
                    {title}
                  </h3>
                </div>
                {isDemoVideo ? (
                  <VideoModal 
                    videoId="a52f3ec0cbb144f18ed654699fd23f8f"
                    buttonLabel="Watch"
                    className="bg-sapphire-500 hover:bg-sapphire-600 text-white border-0"
                  />
                ) : (
                  <ArrowRight className="h-6 w-6 text-dark-400 group-hover:text-sapphire-400 group-hover:translate-x-1 transition-all" />
                )}
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Resource Modal for gated content */}
      {isGated && (
        <ResourceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          resource={{
            title,
            type,
            downloadUrl: link
          }}
        />
      )}
    </section>
  )
}

interface CTAProps {
  children: React.ReactNode
}

export function CTA({ children }: CTAProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-sapphire-900/20 via-dark-900 to-purple-900/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button size="lg" className="group" onClick={() => useDemoModal.getState().open('resources:book-demo')}>
            {children}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 