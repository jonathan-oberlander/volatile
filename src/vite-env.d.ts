/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COINBASE_API: string
  readonly VITE_COINBASE_WS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
