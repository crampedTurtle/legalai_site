'use client'

import { DemoBookingModal } from './DemoBookingModal'
import { ConsultationModal } from './ConsultationModal'
import { SecurityDemoModal } from './SecurityDemoModal'
import { ResourceModal } from '@/components/resources/ResourceModal'
import { useDemoModal } from '@/hooks/useDemoModal'
import { useConsultationModal } from '@/hooks/useConsultationModal'
import { useSecurityDemoModal } from '@/hooks/useSecurityDemoModal'
import { useResourceModal } from '@/hooks/useResourceModal'

interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { isOpen: isDemoOpen, close: closeDemo, source: demoSource } = useDemoModal()
  const { isOpen: isConsultationOpen, close: closeConsultation, source: consultationSource } = useConsultationModal()
  const { isOpen: isSecurityDemoOpen, close: closeSecurityDemo, source: securityDemoSource } = useSecurityDemoModal()
  const { isOpen: isResourceOpen, close: closeResource, resource } = useResourceModal()

  return (
    <>
      {children}
      
      {/* Demo Modal */}
      <DemoBookingModal
        isOpen={isDemoOpen}
        onClose={closeDemo}
        source={demoSource}
      />
      
      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
        source={consultationSource}
      />
      
      {/* Security Demo Modal */}
      <SecurityDemoModal
        isOpen={isSecurityDemoOpen}
        onClose={closeSecurityDemo}
        source={securityDemoSource}
      />
      
      {/* Resource Modal */}
      {resource && (
        <ResourceModal
          isOpen={isResourceOpen}
          onClose={closeResource}
          resource={resource}
        />
      )}
    </>
  )
}
