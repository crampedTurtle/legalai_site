'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download, CheckCircle } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function ThankYouContent() {
  const searchParams = useSearchParams()
  const asset = searchParams.get('asset')
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [fallbackVisible, setFallbackVisible] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (asset) {
      // Trigger automatic download
      const downloadUrl = `/docs/${asset}`
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = asset
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setDownloadStarted(true)

      // Set fallback link
      const fallbackLink = document.getElementById('download-fallback') as HTMLAnchorElement
      if (fallbackLink) {
        fallbackLink.href = downloadUrl
        fallbackLink.download = asset
        fallbackLink.textContent = `Download ${asset}`
      }

      // Show fallback after 3 seconds if download hasn't started
      const timer = setTimeout(() => {
        setFallbackVisible(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [asset])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-950 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                Thanks — your download is starting
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-dark-300 max-w-2xl mx-auto"
              >
                If it doesn't, use the link below.
              </motion.p>

              {/* Download Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-4"
              >
                {downloadStarted && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Download initiated
                  </div>
                )}

                {/* Fallback Download Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={fallbackVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className="pt-4"
                >
                  <a
                    id="download-fallback"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg text-sapphire-400 hover:bg-sapphire-500/30 transition-colors"
                    style={{ display: fallbackVisible ? 'inline-flex' : 'none' }}
                  >
                    <Download className="w-5 h-5" />
                    Download manually
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Secondary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-12 border-t border-dark-800"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Next Step: See it in action
                  </h2>
                  <p className="text-dark-300">
                    Schedule a personalized demo to see how Sapphire Legal AI can transform your practice.
                  </p>
                </div>

                <Button size="lg" className="group" asChild>
                  <a href="https://cal.com/s5-brett/" target="_blank" rel="noopener noreferrer">
                    Request a Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Mautic Tracking Script */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
            w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
            a=d.createElement(t),m=d.getElementsByTagName(t)[0];
            a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://mautic.sapphirefive.com/mtc.js','mt');
            mt('send', 'pageview');
          `
        }}
      />
    </>
  )
} 