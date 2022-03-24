import type { AuthChangeEvent, Session, SupabaseClient } from '@supabase/supabase-js'
import { createRenderEffect, onCleanup, useContext } from 'solid-js'
import { SupabaseContext } from './SupabaseProvider'

export const createSupabase = () => {
  const ctx = useContext(SupabaseContext)

  if (!ctx)
    throw new Error('createSupabase must be used within a SupabaseContext.Provider')

  return ctx
}

export function createSupabaseAuth(): SupabaseClient['auth'] {
  const supabase = createSupabase()
  return supabase.auth
}

export function createSupabaseStorage(): SupabaseClient['storage'] {
  const supabase = createSupabase()
  return supabase.storage
}

export function createSupabaseFrom(): SupabaseClient['from'] {
  const supabase = createSupabase()
  return supabase.from
}

type AuthChangeHandler = (event: AuthChangeEvent, session: Session | null) => void

export function createOnAuthStateChange(callback: AuthChangeHandler): void {
  const client = createSupabase()

  const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })

  createRenderEffect(() => {
    if (client.auth.session())
      callback('SIGNED_IN', client.auth.session())

    onCleanup(() => {
      authListener?.unsubscribe()
    })
  })
}
