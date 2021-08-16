import { createClient, SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js'
import { Component, createContext, useContext } from 'solid-js'

const SupabaseContext = createContext<SupabaseClient>()

interface Props {
    config: {
        supabaseUrl: string
        supabaseKey: string
        supabaseOptions?: SupabaseClientOptions
    }
}

export const SupabaseProvider: Component<Props> = (props) => {
    const {
        supabaseUrl,
        supabaseKey,
        supabaseOptions
    } = props.config
    const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions)
    return (
        <SupabaseContext.Provider value={supabase}>
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