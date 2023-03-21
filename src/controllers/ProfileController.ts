import API, { ProfileAPI } from "../api/ProfileAPI";
import { ChangePasswordProps, ChangeProfileProps, Routes } from "../utils/Interfaces";
import router from "../utils/Router";
import store from "../utils/Store";

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
          // @ts-ignore
          const UserId = res.id;
          await this.fetchUser(UserId);
        })
        .catch((err) => {
          throw new Error("error with changeProfile: ", err);
        });
      router.go(Routes.Profile);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`Troble with change profile in profileController: ${err}`);
    }
  }

  async changePassword(data: ChangePasswordProps) {
    store.set("user.isLoading", true);
    try {
      await this.api.changePassword(data);

      router.go(Routes.Profile);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`Troble with change password in profileController: ${err}`);
    }
  }

  async changeAvatar(data: File) {
    store.set("user.isLoading", true);

    const fileData = new FormData();
    fileData.append("avatar", data);

    try {
      await this.api.changeAvatar(fileData).then(async (res) => {
        // @ts-ignore
        const UserId = res.id;
        await this.fetchUser(UserId);
      });

      router.go(Routes.Profile);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`Troble with change avatar in profileController: ${err}`);
    }
  }

  async fetchUser(id?: number) {
    store.set("user.isLoading", true);
    try {
      const user = await this.api.read(id);
      store.set("user.data", user);
      store.set("user.data.avatar", `https://ya-praktikum.tech/api/v2/resources${user.avatar}`);
      store.set("user.isLoading", false);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`Troble with cfetchUser in profileController: ${err}`);
    }
  }
}

export default new ProfileController();
