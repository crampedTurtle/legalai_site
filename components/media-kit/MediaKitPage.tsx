'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Mail, Phone, ExternalLink, FileText, Image as ImageIcon, Palette, Type } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const brandColors = [
  { name: 'Sapphire Navy', hex: '#0a2a4a', usage: 'Primary brand color' },
  { name: 'Sapphire Blue', hex: '#1d4ed8', usage: 'Accent color' },
  { name: 'Sapphire 500', hex: '#0ea5e9', usage: 'Interactive elements' },
  { name: 'Dark 900', hex: '#0f172a', usage: 'Background' },
  { name: 'Dark 300', hex: '#cbd5e1', usage: 'Text secondary' },
  { name: 'White', hex: '#ffffff', usage: 'Text primary' },
]

const logoAssets = [
  {
    name: 'Full Logo (Light)',
    description: 'Full logo with tagline, light background',
    formats: ['PNG', 'SVG'],
    path: '/images/logo_full_light_trans.png',
    sizes: ['500px', '1000px'],
  },
  {
    name: 'Full Logo (Dark)',
    description: 'Full logo with tagline, dark background',
    formats: ['PNG'],
    path: '/images/logo_full_1000px.png',
    sizes: ['1000px'],
  },
  {
    name: 'Logo (Transparent)',
    description: 'Full logo with transparent background',
    formats: ['PNG'],
    path: '/images/logo_full_1000px_transparent.png',
    sizes: ['500px', '1000px'],
  },
  {
    name: 'Favicon',
    description: 'Square favicon for web use',
    formats: ['PNG'],
    path: '/images/favicon_128px.png',
    sizes: ['32px', '64px', '128px'],
  },
]

const pressAssets = [
  {
    name: 'Social Media Image',
    description: '1200x630px OpenGraph image',
    path: '/images/social_1200x630.png',
    format: 'PNG',
  },
  {
    name: 'Product Screenshot',
    description: 'Demo interface screenshot',
    path: '/images/slai_demo_sm.png',
    format: 'PNG',
  },
]

const companyBoilerplate = {
  short: 'Sapphire Legal AI is the private AI-powered legal operating system for mid-sized law firms.',
  medium: 'Sapphire Legal AI empowers law firms with private, secure, and practical AI—streamlining operations without sacrificing client confidentiality. Built exclusively for legal professionals, our platform combines document intelligence, collaborative drafting, case management, and AI assistance in one private workspace.',
  long: 'Sapphire Legal AI is the private AI-powered legal operating system designed exclusively for mid-sized law firms. We empower legal teams with secure, practical AI that enhances productivity, safeguards confidentiality, and ensures compliance. Unlike public AI tools that risk exposing sensitive client data, Sapphire Legal AI operates entirely within your firm\'s control—no data shared or trained outside your environment. Our platform combines document intelligence, collaborative drafting, case management, and AI assistance into a single private workspace, helping firms eliminate backlogs, unify tools, and practice more profitably.',
}

export function MediaKitPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [colorsRef, colorsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [logosRef, logosInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="bg-gradient-monday py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Media Kit
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Brand assets, logos, and resources for media and partners
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-24">
        {/* Company Overview */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-sapphire-400" />
            <h2 className="text-3xl font-bold text-white">Company Overview</h2>
          </div>
          
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Short Description (1 sentence)</h3>
              <p className="text-dark-300">{companyBoilerplate.short}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Medium Description (2-3 sentences)</h3>
              <p className="text-dark-300">{companyBoilerplate.medium}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Long Description (Full paragraph)</h3>
              <p className="text-dark-300">{companyBoilerplate.long}</p>
            </div>
            
            <div className="pt-6 border-t border-dark-700">
              <h3 className="text-lg font-semibold text-white mb-4">Key Facts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-dark-400 mb-1">Company Name</p>
                  <p className="text-white">Sapphire Legal AI (by Sapphire Five, Inc.)</p>
                </div>
                <div>
                  <p className="text-sm text-dark-400 mb-1">Founded</p>
                  <p className="text-white">2024</p>
                </div>
                <div>
                  <p className="text-sm text-dark-400 mb-1">Website</p>
                  <a href="https://sapphirelegal.ai" className="text-sapphire-400 hover:text-sapphire-300" target="_blank" rel="noopener noreferrer">
                    sapphirelegal.ai <ExternalLink className="inline h-4 w-4 ml-1" />
                  </a>
                </div>
                <div>
                  <p className="text-sm text-dark-400 mb-1">Press Contact</p>
                  <a href="mailto:info@sapphirefive.com" className="text-sapphire-400 hover:text-sapphire-300">
                    <Mail className="inline h-4 w-4 mr-1" />
                    info@sapphirefive.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Colors */}
        <section>
          <motion.div
            ref={colorsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={colorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Palette className="h-6 w-6 text-sapphire-400" />
              <h2 className="text-3xl font-bold text-white">Brand Colors</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandColors.map((color) => (
                <div
                  key={color.name}
                  className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden"
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{color.name}</h3>
                    <p className="text-sm text-dark-300 mb-2">{color.hex}</p>
                    <p className="text-xs text-dark-400">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Typography */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Type className="h-6 w-6 text-sapphire-400" />
            <h2 className="text-3xl font-bold text-white">Typography</h2>
          </div>
          
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 space-y-6">
            <div>
              <p className="text-sm text-dark-400 mb-2">Primary Font</p>
              <p className="text-2xl font-sans text-white">Inter</p>
              <p className="text-dark-300 mt-2">Used for body text and UI elements</p>
            </div>
            <div>
              <p className="text-sm text-dark-400 mb-2">Display Font</p>
              <p className="text-2xl font-display text-white">IBM Plex Sans</p>
              <p className="text-dark-300 mt-2">Used for headings and emphasis</p>
            </div>
          </div>
        </section>

        {/* Logo Assets */}
        <section>
          <motion.div
            ref={logosRef}
            initial={{ opacity: 0, y: 20 }}
            animate={logosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon className="h-6 w-6 text-sapphire-400" />
              <h2 className="text-3xl font-bold text-white">Logo Assets</h2>
            </div>
            
            <div className="space-y-6">
              {logoAssets.map((asset) => (
                <div
                  key={asset.name}
                  className="bg-dark-800/50 border border-dark-700 rounded-xl p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-shrink-0 bg-white rounded-lg p-4">
                      <Image
                        src={asset.path}
                        alt={asset.name}
                        width={200}
                        height={80}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{asset.name}</h3>
                      <p className="text-dark-300 mb-3">{asset.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs text-dark-400">Formats:</span>
                        {asset.formats.map((format) => (
                          <span
                            key={format}
                            className="px-2 py-1 bg-dark-700 text-dark-300 rounded text-xs"
                          >
                            {format}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-dark-400">Sizes:</span>
                        {asset.sizes.map((size) => (
                          <span
                            key={size}
                            className="px-2 py-1 bg-dark-700 text-dark-300 rounded text-xs"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(asset.path, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Press Assets */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <ImageIcon className="h-6 w-6 text-sapphire-400" />
            <h2 className="text-3xl font-bold text-white">Press Assets</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pressAssets.map((asset) => (
              <div
                key={asset.name}
                className="bg-dark-800/50 border border-dark-700 rounded-xl p-6"
              >
                <div className="mb-4 bg-dark-900 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                  <Image
                    src={asset.path}
                    alt={asset.name}
                    width={400}
                    height={250}
                    className="max-w-full h-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{asset.name}</h3>
                <p className="text-dark-300 mb-4">{asset.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(asset.path, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {asset.format}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Guidelines */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Brand Guidelines</h2>
          
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Logo Usage</h3>
              <ul className="space-y-2 text-dark-300">
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Maintain minimum clear space around the logo equal to the height of the "S" in Sapphire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Do not alter, rotate, or distort the logo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Use the light version on dark backgrounds and dark version on light backgrounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Do not place the logo on busy backgrounds or images</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Color Usage</h3>
              <ul className="space-y-2 text-dark-300">
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Use Sapphire Navy (#0a2a4a) as the primary brand color</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Use Sapphire Blue (#1d4ed8) for accents and CTAs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sapphire-400 mt-1">•</span>
                  <span>Maintain sufficient contrast for accessibility (WCAG AA minimum)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-monday rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Additional Assets?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            For custom logo formats, high-resolution images, or interview requests, please contact our press team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              className="bg-white text-brand-navy hover:bg-white/90"
              onClick={() => window.location.href = 'mailto:info@sapphirefive.com?subject=Media Kit Request'}
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Press Team
            </Button>
            <Button
              variant="secondary"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = 'tel:+1-216-577-9018'}
            >
              <Phone className="h-5 w-5 mr-2" />
              +1 (216) 577-9018
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

