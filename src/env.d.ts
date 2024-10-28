/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
