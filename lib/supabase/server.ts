import { createClient } from '@supabase/supabase-js'

export const supabaseServer = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SB_SECRET || process.env.NEXT_PUBLIC_SB_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient(
    supabaseUrl,
    supabaseKey,
    { auth: { persistSession: false } }
  )
}
