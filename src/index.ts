import { renderDom } from "./utils/render-dom";

window.renderDom = renderDom;

window.addEventListener("DOMContentLoaded", () => {
  window.renderDom("login");
});
