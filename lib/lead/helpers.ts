export function splitName(fullName?: string) {
  const name = (fullName || '').trim().replace(/\s+/g, ' ')
  if (!name) return { first_name: null, last_name: null }
  const parts = name.split(' ')
  if (parts.length === 1) return { first_name: parts[0], last_name: null }
  const first_name = parts.slice(0, -1).join(' ')
  const last_name = parts.slice(-1)[0]
  return { first_name, last_name }
}

export function getUTMFromUrl(search?: string) {
  const url = new URLSearchParams(search || (typeof window !== 'undefined' ? window.location.search : ''))
  const get = (k: string) => url.get(k) || undefined
  return {
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
  }
}

export function deriveSource(fallback?: string) {
  if (typeof document !== 'undefined') {
    const p = document.referrer || ''
    if (p) return 'referrer:' + new URL(p).hostname
  }
  return fallback || 'website'
}

export function sanitizePhone(s?: string) {
  if (!s) return undefined
  const digits = s.replace(/[^\d+]/g, '')
  return digits || undefined
} 