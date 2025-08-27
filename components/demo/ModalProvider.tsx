'use client'

import { DemoModal } from './DemoModal'
import { ConsultationModal } from './ConsultationModal'
import { SecurityDemoModal } from './SecurityDemoModal'
import { ResourceModal } from '@/components/resources/ResourceModal'
import { BookingModal } from '@/components/BookingModal'
import { PartnerCallModal } from './PartnerCallModal'
import { useDemoModal } from '@/hooks/useDemoModal'
import { useConsultationModal } from '@/hooks/useConsultationModal'
import { useSecurityDemoModal } from '@/hooks/useSecurityDemoModal'
import { useResourceModal } from '@/hooks/useResourceModal'
import { useBookingModal } from '@/hooks/useBookingModal'
import { usePartnerCallModal } from '@/hooks/usePartnerCallModal'

interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const { isOpen: isDemoOpen, close: closeDemo, source: demoSource } = useDemoModal()
  const { isOpen: isConsultationOpen, close: closeConsultation, source: consultationSource } = useConsultationModal()
  const { isOpen: isSecurityDemoOpen, close: closeSecurityDemo, source: securityDemoSource } = useSecurityDemoModal()
  const { isOpen: isResourceOpen, close: closeResource, resource } = useResourceModal()
  const { isOpen: isBookingOpen, close: closeBooking } = useBookingModal()
  const { isOpen: isPartnerCallOpen, close: closePartnerCall } = usePartnerCallModal()

  return (
    <>
      {children}
      <DemoModal />
      <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultation} source={consultationSource} />
      <SecurityDemoModal isOpen={isSecurityDemoOpen} onClose={closeSecurityDemo} source={securityDemoSource} />
      {resource && (<ResourceModal isOpen={isResourceOpen} onClose={closeResource} resource={resource} />)}
      <BookingModal />
      <PartnerCallModal />
    </>
  )
}
