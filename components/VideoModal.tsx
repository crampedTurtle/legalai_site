'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { Play, X } from 'lucide-react'

interface VideoModalProps {
  videoId: string
  buttonLabel?: string
  thumbnailUrl?: string
  className?: string
}

export function VideoModal({ 
  videoId, 
  buttonLabel = "Watch Demo", 
  thumbnailUrl,
  className = ""
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleOpen = async () => {
    setIsOpen(true)
    
    // Track video view
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'video_view',
          videoId: videoId
        }),
      })
    } catch (error) {
      console.error('Failed to track video view:', error)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    // Clear iframe src to stop video
    if (iframeRef.current) {
      iframeRef.current.src = ''
    }
  }

  const getLoomEmbedUrl = (id: string) => {
    return `https://www.loom.com/embed/${id}?autoplay=1&muted=0&hide_owner=true&hide_share=true`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={handleOpen}
          size="lg" 
          className={`group ${className}`}
        >
          {thumbnailUrl && (
            <img 
              src={thumbnailUrl} 
              alt="Video thumbnail" 
              className="w-6 h-6 rounded mr-2 object-cover"
            />
          )}
          <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-[95vw] p-0 border-0 bg-transparent">
        <div className="relative bg-dark-900 rounded-2xl overflow-hidden shadow-2xl">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Video iframe */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              ref={iframeRef}
              src={isOpen ? getLoomEmbedUrl(videoId) : ''}
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
