import { LoginPage } from "../pages/login-page";
import { NotFoundPage } from "../pages/not-found-page";
import { ErrorPage } from "../pages/server-error-page";
import { MainPage } from "../pages/main-page";
import { ProfilePage } from "../pages/profile-page";
import { RegistrationPage } from "../pages/registration-page";
import ROUTES_NAMES from "./routes";

const { main, error, notFound, login, registration, profile } = ROUTES_NAMES;

export const ROUTES = {
  [main]: MainPage,
  [error]: ErrorPage,
  [notFound]: NotFoundPage,
  [login]: LoginPage,
  [registration]: RegistrationPage,
  [profile]: ProfilePage,
};

export default function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;
  root.innerHTML = ``;
  const pageComponent = ROUTES[route || notFound];
  const page = new pageComponent();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
