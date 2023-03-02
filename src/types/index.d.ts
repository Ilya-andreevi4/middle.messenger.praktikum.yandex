import NAME_ROUTES from "../utils/routes";

export {};
declare global {
  interface Window {
    renderDom(route: keyof typeof NAME_ROUTES): void;
  }
}
