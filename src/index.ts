import { ChatInfo } from "./components/chat-info";
import { Message } from "./components/message";
import { PopListItem } from "./components/pop-list-item";
import { Modal } from "./layouts/modal";
import { registerComponent } from "./utils/register-component";
import { renderDom } from "./utils/render-dom";

registerComponent("ChatInfo", ChatInfo);
registerComponent("Message", Message);
registerComponent("PopListItem", PopListItem);
registerComponent("Modal", Modal);

window.addEventListener("DOMContentLoaded", () => {
  renderDom("main");
});
