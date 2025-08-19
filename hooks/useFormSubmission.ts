import { useState } from 'react'
import { getUTMParams } from '@/lib/mautic'

interface FormSubmissionState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

interface FormSubmissionOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useFormSubmission(endpoint: string, options: FormSubmissionOptions = {}) {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  })

  const submitForm = async (data: any) => {
    setState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    })

    try {
      // Get UTM parameters
      const utmParams = getUTMParams()
      
      // Combine form data with UTM parameters
      const submissionData = {
        ...data,
        ...utmParams,
      }

      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      })

      options.onSuccess?.()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      
      setState({
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage,
      })

      options.onError?.(errorMessage)
    }
  }

  const reset = () => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    })
  }

  return {
    ...state,
    submitForm,
    reset,
  }
} 