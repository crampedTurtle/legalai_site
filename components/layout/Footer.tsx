import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Shield, Lock, Eye } from 'lucide-react'

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Why Private AI', href: '/why-private-ai' },
    { name: 'Pricing', href: '/pricing' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Whitepapers', href: '/resources' },
    { name: 'Legal AI Guide', href: '/resources' },
    { name: 'Support', href: '/support' },
  ],
  legal: [
            { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'GDPR Compliance', href: '/gdpr' },
    { name: 'CCPA Compliance', href: '/ccpa' },
  ],
}

const trustBadges = [
  { icon: Shield, label: 'SOC 2 Type II Certified' },
  { icon: Lock, label: 'End-to-End Encryption' },
  { icon: Eye, label: 'GDPR & CCPA Compliant' },
]

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              src="/images/logo_full_light_trans.png"
              alt="Sapphire Legal AI"
              width={288}
              height={66}
              className="h-14 w-auto"
            />
            <p className="text-sm leading-6 text-dark-300 max-w-xs">
              AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-xs text-dark-400">
                  <badge.icon className="h-4 w-4" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-dark-300">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@sapphirefive.com" className="hover:text-sapphire-400 transition-colors">
                  info@sapphirefive.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-300">
                <Phone className="h-4 w-4" />
                <a href="tel:+1-216-577-9018" className="hover:text-sapphire-400 transition-colors">
                  +1 (216) 577-9018
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-300">
                <MapPin className="h-4 w-4" />
                <span>Sapphire Five, Inc.</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-sapphire-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-sapphire-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-sapphire-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-sapphire-400 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-dark-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-dark-400">
            &copy; {new Date().getFullYear()} Sapphire Five, Inc. All rights reserved. Sapphire Legal AI is a trademark of Sapphire Five, Inc.
          </p>
          <div className="mt-4 text-xs text-dark-400">
            <p>
              This website uses cookies to enhance your experience. By continuing to use this site, you consent to our use of cookies. 
              For more information, see our{' '}
                              <Link href="/privacy-policy" className="text-sapphire-400 hover:text-sapphire-300 transition-colors">
                  Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 