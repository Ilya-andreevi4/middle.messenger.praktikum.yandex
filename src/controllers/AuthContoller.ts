import API, { AuthAPI } from "../api/AuthAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import { Routes, SigninData, SignupData } from "../utils/Interfaces";

const startLoading = () => store.set("user.isLoading", true);
const endLoading = () => store.set("user.isLoading", false);
export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    startLoading();
    try {
      console.log("user data in AuthController signin: ", data);
      await this.api.signin(data);
      await this.fetchUser();
      router.go(Routes.Chats);
      endLoading();
    } catch (e: any) {
      console.error(e);
      store.set("user.error", `Возможно вы ввели не правильный пароль или логин:  ${JSON.stringify(e)}`);
      endLoading();
    }
  }

  async signup(data: SignupData) {
    startLoading();
    try {
      console.log("user data in AuthController: ", data);
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.Chats);
      endLoading();
    } catch (e) {
      console.error("Trouble with signup in AuthController:", e);
      endLoading();
    }
  }

  async fetchUser(id?: number) {
    try {
      console.log("try to fetch user from AuthController");

      const user = await this.api.read(id);
      console.log("user fetching success", user);
      store.set("user.data", user);
      store.set("user.error", undefined);
    } catch (e) {
      console.error("Error with fetch user from Auth controller: ", e);
      store.set("user.error", `Не удалось найти профиль:  ${JSON.stringify(e)}`);
    }
  }

  async logout() {
    startLoading();
    try {
      await this.api.logout();

      store.set("user.data", {});

      router.go(Routes.Index);

      endLoading();
    } catch (e) {
      store.set("user.error", `Не удалось выйти из профиля: ${JSON.stringify(e)}`);
      endLoading();
      console.error(e);
    }
  }
}

export default new AuthController();
