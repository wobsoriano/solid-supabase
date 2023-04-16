import type { AuthChangeEvent, AuthSession, SupabaseClient } from '@supabase/supabase-js'
import { createEffect, onCleanup, useContext } from 'solid-js'
import { SupabaseContext } from './SupabaseProvider'

export const useSupabase = <
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>() => {
  const ctx = useContext(SupabaseContext)

  if (!ctx)
    throw new Error('useSupabase must be used within a SupabaseContext.Provider')

  return ctx as SupabaseClient<Database, SchemaName, Schema>
}

export function useSupabaseAuth<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>(): SupabaseClient<Database, SchemaName, Schema>['auth'] {
  const supabase = useSupabase<Database, Schema, SchemaName>()
  return supabase.auth
}

export function useSupabaseStorage<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>(): SupabaseClient<Database, SchemaName, Schema>['storage'] {
  const supabase = useSupabase<Database, SchemaName, Schema>()
  return supabase.storage
}

export function useSupabaseFrom<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>(): SupabaseClient<Database, SchemaName, Schema>['from'] {
  const supabase = useSupabase<Database, SchemaName, Schema>()
  return supabase.from
}

type AuthChangeHandler = (event: AuthChangeEvent, session: AuthSession | null) => void

interface OnAuthStateChangeOptions {
  autoDispose?: boolean
}

export function useOnAuthStateChange<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>(callback: AuthChangeHandler, options: OnAuthStateChangeOptions = { autoDispose: true }): void {
  const client = useSupabase<Database, SchemaName, Schema>()

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
