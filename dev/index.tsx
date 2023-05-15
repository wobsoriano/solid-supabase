import { render } from 'solid-js/web'
import { createClient } from '@supabase/supabase-js'
import { SupabaseProvider } from '../src'

import App from './App'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

render(() => (
  <SupabaseProvider client={supabase}>
    <App />
  </SupabaseProvider>
), document.getElementById('root')!)
