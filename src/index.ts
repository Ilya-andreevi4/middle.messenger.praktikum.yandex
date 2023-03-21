import AuthController from "./controllers/AuthContoller";
import chatController from "./controllers/ChatController";
import { LoginPage } from "./pages/login-page";
import { MainPage } from "./pages/main-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { RegistrationPage } from "./pages/registration-page";
import { ErrorPage } from "./pages/server-error-page";
import { Routes } from "./utils/Interfaces";
import Router from "./utils/Router";
import store from "./utils/Store";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Chats, MainPage)
    .use(Routes.Registation, RegistrationPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.NotFound, NotFoundPage)
    .use(Routes.NetworkError, ErrorPage);

  const path = window.location.pathname;

  let isProtectedRoute = true;

  switch (path) {
    case Routes.Index:
    case Routes.Registation:
      isProtectedRoute = false;
      break;
  }
  try {
    await AuthController.fetchUser();
    await chatController.fetchChats();
    Router.start();
    if (store.getState().user.data) {
      if (!isProtectedRoute) {
        Router.go(Routes.Chats);
      }
      Router.go(path);
    } else {
      Router.go(Routes.Index);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
