import type { SupabaseClient } from '@supabase/supabase-js'
import { Component, createContext, useContext } from 'solid-js'

const SupabaseContext = createContext<SupabaseClient>()

interface Props {
    client: SupabaseClient
}

export const SupabaseProvider: Component<Props> = (props) => {
    return (
        <SupabaseContext.Provider value={props.client}>
            {props.children}
        </SupabaseContext.Provider>
    )
}

export const useSupabase = () => {
    const ctx = useContext(SupabaseContext)

    if (!ctx) {
        throw new Error('useSupabase must be used within a SupabaseContext.Provider')
    }

    return ctx
}