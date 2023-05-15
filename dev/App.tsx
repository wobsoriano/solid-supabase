import type { Component } from 'solid-js'
import { Match, Switch, createResource, createSignal } from 'solid-js'
import { useSupabase } from '../src'

const App: Component = () => {
  const supabase = useSupabase()

  const [carId, setCarId] = createSignal(1)
  const [data, { refetch }] = createResource(carId, (arg) => {
    return supabase.from('cars').select('*').eq('id', arg)
  })

  return (
    <Switch>
      <Match when={data.loading}>
        <div>Loading...</div>
      </Match>
      <Match when={data.error}>
        <div>{data.error}</div>
      </Match>
      <Match when={data()}>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
        <button onClick={refetch}>Refetch</button>
        <button onClick={() => setCarId(prev => prev + 1)}>Next</button>
      </Match>
    </Switch>
  )
}

export default App
