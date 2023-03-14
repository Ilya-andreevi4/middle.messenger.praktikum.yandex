import AuthController from "./controllers/AuthContoller";
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

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Registation:
      isProtectedRoute = false;
      break;
  }
  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute && !store.getState().user.error) {
      Router.go(Routes.Profile);
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
