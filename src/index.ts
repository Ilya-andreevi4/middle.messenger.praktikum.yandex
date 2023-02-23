import { ChatInfo } from "./components/chat-info";
import { Message } from "./components/message";
import { PopListItem } from "./components/pop-list-item";
import { MainPage } from "./pages/main-page/index";
import { registerComponent } from "./utils/registerComponent";

registerComponent("ChatInfo", ChatInfo);
registerComponent("Message", Message);
registerComponent("PopListItem", PopListItem);

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app")!;

  const mainPage = new MainPage();

  root.append(mainPage.getContent()!);

  mainPage.dispatchComponentDidMount();
});
