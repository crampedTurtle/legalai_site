import { Calendar, Phone, Mail, Clock } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-white mb-6">
          Get in Touch
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-dark-300">
            <Calendar className="h-5 w-5 text-sapphire-400" />
            <span>Schedule a demo at cal.com/s5-brett</span>
          </div>
          <div className="flex items-center gap-3 text-dark-300">
            <Phone className="h-5 w-5 text-sapphire-400" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-dark-300">
            <Mail className="h-5 w-5 text-sapphire-400" />
            <span>info@sapphirelegal.ai</span>
          </div>
          <div className="flex items-center gap-3 text-dark-300">
            <Clock className="h-5 w-5 text-sapphire-400" />
            <span>Available Mon-Fri, 9AM-6PM EST</span>
          </div>
        </div>
      </div>
    </div>
  )
} 