/// <reference types="vite/client" />

// Declaración para importar archivos CSS
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Declaración para otros assets
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
