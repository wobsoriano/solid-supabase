import type { SupabaseClient } from '@supabase/supabase-js'
import type { Component, JSX } from 'solid-js'
import { createContext } from 'solid-js'

export const SupabaseContext = createContext<SupabaseClient>()

interface Props {
  client: SupabaseClient
  children?: JSX.Element
}

export const SupabaseProvider: Component<Props> = (props) => {
  return <SupabaseContext.Provider value={props.client}>{props.children}</SupabaseContext.Provider>
}
