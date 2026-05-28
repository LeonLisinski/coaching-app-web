import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey      = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceKey   = process.env.SUPABASE_SERVICE_ROLE_KEY

/** Public client — respects RLS. Use for reading available slots. */
export const supabase = createClient(supabaseUrl, anonKey)

/** Admin client — bypasses RLS. Server-side only. */
export function adminSupabase() {
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })
}
