/// <reference types="vite/client" />

import { Buffer } from "buffer";

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

export {};
