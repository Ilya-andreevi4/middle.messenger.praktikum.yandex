import store from "../utils/Store";
import router from "../utils/Router";
import { ChangePasswordProps, ChangeProfileProps, Routes } from "../utils/Interfaces";
import API, { ProfileAPI } from "../api/ProfileAPI";

class ProfileController {
  private readonly api: ProfileAPI;

  constructor() {
    this.api = API;
  }

  async changeProfile(data: ChangeProfileProps) {
    store.set("user.isLoading", true);
    try {
      await this.api
        .changeProfile(data)
        .then(async (res) => {
          console.log("res: ", res);
          // @ts-ignore
          const UserId = res.id;
          await this.fetchUser(UserId);
        })
        .catch((e) => {
          console.error("error with changeProfile: ", e);
        });

      console.log("router go to profile! user:", store.getState().user.data);
      router.go(Routes.Profile);
    } catch (e) {
      console.error("Troble with change profile in profileController:", e);
      store.set("user.isLoading", false);
    }
  }

  async changePassword(data: ChangePasswordProps) {
    store.set("user.isLoading", true);
    try {
      await this.api.changePassword(data).then(async (res) => {
        //@ts-ignore
        const UserId = res.id;
        await this.fetchUser(UserId);
      });

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error("Troble with change password in profileController:", e);
      store.set("user.isLoading", false);
    }
  }
  async changeAvatar(data: FormData) {
    store.set("user.isLoading", true);
    try {
      await this.api.changeAvatar(data);

      await this.fetchUser();

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error("Troble with change avatar in profileController:", e);
      store.set("user.isLoading", false);
    }
  }

  async fetchUser(id?: number) {
    try {
      const user = await this.api.read(id);
      store.set("user.data", user);
      store.set("user.isLoading", false);
    } catch (e: any) {
      console.error("Troble with fetchUser in profileController:", e);
      store.set("user.isLoading", false);
    }
  }
}

export default new ProfileController();
