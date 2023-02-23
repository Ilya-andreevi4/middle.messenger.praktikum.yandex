import { EntryPage } from "../pages/entry-page";
import { NotFoundPage } from "../pages/not-found-page";
import { ErrorPage } from "../pages/server-error-page";
import { MainPage } from "../pages/main-page";
import { ProfilePage } from "../pages/profile-page";

export const ROUTES = {
  main: MainPage,
  error: ErrorPage,
  notFound: NotFoundPage,
  entry: EntryPage,
  profile: ProfilePage,
};

export function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;
  root.innerHTML = ``;
  const pageComponent = ROUTES[route];
  const page = new pageComponent();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
