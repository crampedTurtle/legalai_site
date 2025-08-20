interface MauticConfig {
  baseUrl: string
  username: string
  password: string
}

interface MauticContact {
  firstname?: string
  lastname?: string
  email: string
  company?: string
  phone?: string
  [key: string]: any
}

interface MauticFormSubmission {
  formId: number
  contact: MauticContact
  tags?: string[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

class MauticAPI {
  private config: MauticConfig
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor(config: MauticConfig) {
    this.config = config
  }

  private async getAccessToken(): Promise<string> {
    // Validate configuration first
    if (!this.config.baseUrl || !this.config.username || !this.config.password) {
      throw new Error('Mautic configuration incomplete. Cannot get access token.')
    }

    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    // Try OAuth2 first, then fallback to Basic Auth
    try {
      return await this.getOAuthToken()
    } catch (oauthError) {
      console.log('OAuth2 failed, trying Basic Auth...')
      return await this.getBasicAuthToken()
    }
  }

  private async getOAuthToken(): Promise<string> {

    try {
      console.log('Attempting Mautic OAuth authentication...')
      console.log('Base URL:', this.config.baseUrl)
      console.log('Username length:', this.config.username.length)
      console.log('Password length:', this.config.password.length)
      
      const response = await fetch(`${this.config.baseUrl}/oauth/v2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          client_id: this.config.username,
          client_secret: this.config.password,
          username: this.config.username,
          password: this.config.password,
        }),
      })

      console.log('OAuth response status:', response.status)
      console.log('OAuth response status text:', response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('OAuth error response:', errorText)
        throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('OAuth response keys:', Object.keys(data))
      
      if (!data.access_token) {
        throw new Error('No access_token in OAuth response')
      }
      
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // Expire 1 minute early

      return this.accessToken!
    } catch (error) {
      console.error('Error getting Mautic access token:', error)
      throw error
    }
  }

  private async getBasicAuthToken(): Promise<string> {
    try {
      console.log('Attempting Mautic Basic Auth...')
      
      // For Basic Auth, we'll use the credentials directly
      // Some Mautic instances don't use OAuth2
      const basicAuth = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64')
      
      // Test the connection with a simple API call
      const response = await fetch(`${this.config.baseUrl}/api/contacts`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('Basic Auth response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Basic Auth error response:', errorText)
        throw new Error(`Basic Auth failed: ${response.status} ${response.statusText}`)
      }

      // If Basic Auth works, we'll use it for subsequent requests
      // Store the Basic Auth header instead of OAuth token
      this.accessToken = `Basic ${basicAuth}`
      this.tokenExpiry = Date.now() + (3600 * 1000) - 60000 // 1 hour expiry
      
      console.log('Basic Auth successful')
      return this.accessToken
    } catch (error) {
      console.error('Error with Basic Auth:', error)
      throw error
    }
  }

  async submitForm(submission: MauticFormSubmission): Promise<any> {
    // Validate configuration first
    if (!this.config.baseUrl || !this.config.username || !this.config.password) {
      throw new Error('Mautic configuration incomplete. Cannot submit form.')
    }

    try {
      const token = await this.getAccessToken()

      // First, create or update the contact
      const authHeader = token.startsWith('Basic ') ? token : `Bearer ${token}`
      const contactResponse = await fetch(`${this.config.baseUrl}/api/contacts/new`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission.contact),
      })

      if (!contactResponse.ok) {
        throw new Error(`Failed to create contact: ${contactResponse.statusText}`)
      }

      const contactData = await contactResponse.json()
      const contactId = contactData.contact.id

      // Add tags if provided
      if (submission.tags && submission.tags.length > 0) {
        await fetch(`${this.config.baseUrl}/api/contacts/${contactId}/edit`, {
          method: 'PATCH',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: submission.tags,
          }),
        })
      }

      // Submit the form
      const formData = {
        formId: submission.formId,
        contactId: contactId,
        utm_source: submission.utm_source,
        utm_medium: submission.utm_medium,
        utm_campaign: submission.utm_campaign,
      }

      const formResponse = await fetch(`${this.config.baseUrl}/api/forms/${submission.formId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!formResponse.ok) {
        throw new Error(`Failed to submit form: ${formResponse.statusText}`)
      }

      return await formResponse.json()
    } catch (error) {
      console.error('Error submitting to Mautic:', error)
      throw error
    }
  }

  async createContact(contact: MauticContact, tags?: string[]): Promise<any> {
    // Validate configuration first
    if (!this.config.baseUrl || !this.config.username || !this.config.password) {
      throw new Error('Mautic configuration incomplete. Cannot create contact.')
    }

    try {
      const token = await this.getAccessToken()

      const response = await fetch(`${this.config.baseUrl}/api/contacts/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })

      if (!response.ok) {
        throw new Error(`Failed to create contact: ${response.statusText}`)
      }

      const data = await response.json()

      // Add tags if provided
      if (tags && tags.length > 0) {
        await fetch(`${this.config.baseUrl}/api/contacts/${data.contact.id}/edit`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: tags,
          }),
        })
      }

      return data
    } catch (error) {
      console.error('Error creating Mautic contact:', error)
      throw error
    }
  }
}

// Initialize Mautic API with environment variables
const mauticConfig: MauticConfig = {
  baseUrl: process.env.MAUTIC_BASE_URL || '',
  username: process.env.MAUTIC_API_USERNAME || '',
  password: process.env.MAUTIC_API_PASSWORD || '',
}

// Debug environment variables (only log if they exist to avoid exposing values)
console.log('Mautic configuration check:')
console.log('- MAUTIC_BASE_URL exists:', !!process.env.MAUTIC_BASE_URL)
console.log('- MAUTIC_API_USERNAME exists:', !!process.env.MAUTIC_API_USERNAME)
console.log('- MAUTIC_API_PASSWORD exists:', !!process.env.MAUTIC_API_PASSWORD)
console.log('- Base URL length:', mauticConfig.baseUrl.length)

// Validate Mautic configuration
if (!mauticConfig.baseUrl || !mauticConfig.username || !mauticConfig.password) {
  console.warn('Mautic configuration incomplete. Mautic integration will be disabled.')
  console.warn('Required environment variables: MAUTIC_BASE_URL, MAUTIC_API_USERNAME, MAUTIC_API_PASSWORD')
}

export const mauticAPI = new MauticAPI(mauticConfig)

// Form configurations
export const MAUTIC_FORMS = {
  CONTACT: parseInt(process.env.MAUTIC_CONTACT_FORM_ID || '1'),
  DEMO: parseInt(process.env.MAUTIC_DEMO_FORM_ID || '2'),
  PUBLIC_AI_WHITEPAPER: parseInt(process.env.MAUTIC_PUBLIC_AI_WHITEPAPER_FORM_ID || '3'),
  SECURITY_WHITEPAPER: parseInt(process.env.MAUTIC_SECURITY_WHITEPAPER_FORM_ID || '4'),
  SIGLITE: parseInt(process.env.MAUTIC_SIGLITE_FORM_ID || '5'),
  NEWSLETTER: parseInt(process.env.MAUTIC_NEWSLETTER_FORM_ID || '6'),
  FEATURE_GUIDE: parseInt(process.env.MAUTIC_FEATURE_GUIDE_FORM_ID || '7'),
  SUPPORT: parseInt(process.env.MAUTIC_SUPPORT_FORM_ID || '8'),
}

// Helper function to extract UTM parameters
export function getUTMParams(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  }
}

// Helper function to format contact data
export function formatContactData(data: any): MauticContact {
  const contact: MauticContact = {
    email: data.email,
  }

  // Handle name fields
  if (data.name) {
    const nameParts = data.name.split(' ')
    contact.firstname = nameParts[0] || ''
    contact.lastname = nameParts.slice(1).join(' ') || ''
  } else if (data.firstName || data.lastName) {
    contact.firstname = data.firstName || ''
    contact.lastname = data.lastName || ''
  }

  // Handle company/firm
  if (data.firm || data.company) {
    contact.company = data.firm || data.company
  }

  // Handle phone
  if (data.phone) {
    contact.phone = data.phone
  }

  // Add custom fields
  if (data.practiceArea) {
    contact.practice_area = data.practiceArea
  }

  if (data.message) {
    contact.message = data.message
  }

  if (data.subject) {
    contact.subject = data.subject
  }

  if (data.priority) {
    contact.priority = data.priority
  }

  return contact
} 