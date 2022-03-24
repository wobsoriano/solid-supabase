import { useContext } from 'solid-js';
import { SupabaseContext } from './SupabaseProvider';

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext);

  if (!ctx) {
    throw new Error('useSupabase must be used within a SupabaseContext.Provider');
  }

  return ctx;
};
