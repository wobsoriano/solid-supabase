import type { AuthChangeEvent, AuthSession, SupabaseClient } from '@supabase/supabase-js'
import { createEffect, onCleanup, useContext } from 'solid-js'
import { SupabaseContext } from './SupabaseProvider'

export function useSupabase() {
  const ctx = useContext(SupabaseContext)

  if (!ctx)
    throw new Error('useSupabase must be used within a SupabaseContext.Provider')

  return ctx
}

export function useSupabaseAuth(): SupabaseClient['auth'] {
  const supabase = useSupabase()
  return supabase.auth
}

export function useSupabaseStorage(): SupabaseClient['storage'] {
  const supabase = useSupabase()
  return supabase.storage
}

export function useSupabaseFrom(): SupabaseClient['from'] {
  const supabase = useSupabase()
  return supabase.from
}

type AuthChangeHandler = (event: AuthChangeEvent, session: AuthSession | null) => void

interface OnAuthStateChangeOptions {
  autoDispose?: boolean
}

export function useOnAuthStateChange(callback: AuthChangeHandler, options: OnAuthStateChangeOptions = { autoDispose: true }): void {
  const client = useSupabase()

  const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })

  createEffect(async () => {
    const { data } = await client.auth.getSession()
    if (data.session)
      callback('SIGNED_IN', data.session)
  })

  onCleanup(() => {
    if (options.autoDispose)
      authListener.subscription.unsubscribe()
  })
}
