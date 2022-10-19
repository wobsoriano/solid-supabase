import type { AuthChangeEvent, AuthSession, SupabaseClient } from '@supabase/supabase-js'
import { createEffect, onCleanup, useContext } from 'solid-js'
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

type AuthChangeHandler = (event: AuthChangeEvent, session: AuthSession | null) => void

interface CreateOnAuthStateChangeOptions {
  autoDispose?: boolean
}

export function createOnAuthStateChange(callback: AuthChangeHandler, options: CreateOnAuthStateChangeOptions = { autoDispose: true }): void {
  const client = createSupabase()

  const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })

  createEffect(async() => {
    const { data } = await client.auth.getSession()
    if (data.session)
      callback('SIGNED_IN', data.session)
  })

  onCleanup(() => {
    if (options.autoDispose)
      authListener.subscription.unsubscribe()
  })
}
