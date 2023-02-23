export {};

declare global {
  interface Window {
    renderPage(route?: string): void;
  }
}
