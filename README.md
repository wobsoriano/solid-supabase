# Solid + Supabase

A simple wrapper around Supabase.js that gives you access to the client as a Solid primitive.

## Installation

```bash
npm install @supabase/supabase-js solid-supabase # or pnpm or yarn
```

## Quick start

In the root of your app, use the `SupabaseProvider` and pass the supabase client with your credentials.

```tsx
import { render } from 'solid-js/web';
import App from './App';
import { createClient } from '@supabase/supabase-js';
import { SupabaseProvider } from 'solid-supabase';

const supabase = createClient('SUPABASE_URL', 'SUPABASE_KEY');

render(
  () => (
    <SupabaseProvider client={supabase}>
      <App />
    </SupabaseProvider>
  ),
  document.getElementById('root'),
);
```

This will make the supabase client available anywhere along the component tree.

## Use the primitive

```tsx
import { createResource, createSignal } from 'solid-js';
import { createSupabase } from 'solid-supabase';

const App = () => {
  const supabase = createSupabase();

  const [postId] = createSignal(1);
  const [data, { refetch }] = createResource(postId, (arg) => {
    return supabase.from('posts').select('*').eq('id', arg);
  });

  return (
    <>
      {data.loading && <div>Loading...</div>}
      {data.error && <div>{data.error}</div>}
      <pre>{JSON.stringify(data(), null, 2)}</pre>
      <button onClick={refetch}>Refetch</button>
    </>
  );
};

export default App;
```

Other available primitives

```ts
import { createSupabaseAuth, createSupabaseStorage, createOnAuthStateChange } from 'solid-supabase';

const auth = createSupabaseAuth();
const storage = createSupabaseStorage();

createOnAuthStateChange((event, session) => {
  console.log(event, session);
});
```

## License

MIT
