/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Public URL of the app, used in the open graph tags of index.html (formerly NEXT_PUBLIC_APP_URL)
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
