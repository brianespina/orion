/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Endpoint the contact form POSTs JSON to. When unset the form falls back to
   * composing a mailto: message in the visitor's mail client.
   */
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
