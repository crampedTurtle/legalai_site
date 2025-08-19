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
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
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

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`)
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // Expire 1 minute early

      return this.accessToken!
    } catch (error) {
      console.error('Error getting Mautic access token:', error)
      throw error
    }
  }

  async submitForm(submission: MauticFormSubmission): Promise<any> {
    try {
      const token = await this.getAccessToken()

      // First, create or update the contact
      const contactResponse = await fetch(`${this.config.baseUrl}/api/contacts/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
            'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
  username: process.env.MAUTIC_USERNAME || '',
  password: process.env.MAUTIC_PASSWORD || '',
}

// Validate Mautic configuration
if (!mauticConfig.baseUrl || !mauticConfig.username || !mauticConfig.password) {
  console.warn('Mautic configuration incomplete. Mautic integration will be disabled.')
  console.warn('Required environment variables: MAUTIC_BASE_URL, MAUTIC_USERNAME, MAUTIC_PASSWORD')
}

export const mauticAPI = new MauticAPI(mauticConfig)

// Form configurations
export const MAUTIC_FORMS = {
  CONTACT: parseInt(process.env.MAUTIC_CONTACT_FORM_ID || '1'),
  DEMO: parseInt(process.env.MAUTIC_DEMO_FORM_ID || '2'),
  SUPPORT: parseInt(process.env.MAUTIC_SUPPORT_FORM_ID || '3'),
  NEWSLETTER: parseInt(process.env.MAUTIC_NEWSLETTER_FORM_ID || '4'),
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