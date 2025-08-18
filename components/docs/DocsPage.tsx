'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Rocket, Book, Shield, Code, Download, Play, FileText, Users, Briefcase, Bot, Settings, Database, Key, Bell, Package } from 'lucide-react'

interface DocsPageProps {
  children: React.ReactNode
}

export function DocsPage({ children }: DocsPageProps) {
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

interface Article {
  title: string
  description: string
  link: string
  icon: string
}

interface DocSectionProps {
  title: string
  description: string
  articles: Article[]
  icon: string
}

export function DocSection({ title, description, articles, icon }: DocSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getSectionIcon = () => {
    switch (icon) {
      case 'rocket':
        return <Rocket className="h-12 w-12" />
      case 'book':
        return <Book className="h-12 w-12" />
      case 'shield':
        return <Shield className="h-12 w-12" />
      case 'code':
        return <Code className="h-12 w-12" />
      default:
        return <Book className="h-12 w-12" />
    }
  }

  const getArticleIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket className="h-5 w-5" />
      case 'download':
        return <Download className="h-5 w-5" />
      case 'play':
        return <Play className="h-5 w-5" />
      case 'file-text':
        return <FileText className="h-5 w-5" />
      case 'users':
        return <Users className="h-5 w-5" />
      case 'briefcase':
        return <Briefcase className="h-5 w-5" />
      case 'bot':
        return <Bot className="h-5 w-5" />
      case 'settings':
        return <Settings className="h-5 w-5" />
      case 'database':
        return <Database className="h-5 w-5" />
      case 'key':
        return <Key className="h-5 w-5" />
      case 'code':
        return <Code className="h-5 w-5" />
      case 'bell':
        return <Bell className="h-5 w-5" />
      case 'package':
        return <Package className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex p-4 rounded-xl bg-sapphire-500/20 border border-sapphire-500/30 mb-6">
              <div className="text-sapphire-400">
                {getSectionIcon()}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-dark-300 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.a
                  href={article.link}
                  className="card-hover block p-6 rounded-xl border border-dark-700 bg-dark-800 group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-sapphire-500/20 border border-sapphire-500/30">
                      <div className="text-sapphire-400">
                        {getArticleIcon(article.icon)}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-dark-400 group-hover:text-sapphire-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-sapphire-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {article.description}
                  </p>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 