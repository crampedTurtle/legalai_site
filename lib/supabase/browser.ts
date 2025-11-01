import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const supabase = (): SupabaseClient => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SB_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLIC_KEY

    if (!supabaseUrl || !supabaseKey) {
      const missing = []
      if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL')
      if (!supabaseKey) missing.push('NEXT_PUBLIC_SB_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_PUBLIC_KEY')
      console.error('Missing Supabase environment variables:', missing)
      console.error('Available env vars:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        urlLength: supabaseUrl?.length || 0,
        keyLength: supabaseKey?.length || 0,
      })
      throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`)
    }

    supabaseClient = createClient(
      supabaseUrl,
      supabaseKey,
      { auth: { persistSession: false } }
    )
  }
  
  return supabaseClient
} 