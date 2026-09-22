// CSS Module type declarations for TypeScript
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

// Web Worker import type for Vite's ?worker syntax
declare module '*?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
