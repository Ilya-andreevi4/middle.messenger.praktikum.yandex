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
    }
  }

  async changePassword(data: ChangePasswordProps) {
    try {
      await this.api.changePassword(data).then(async (res) => {
        //@ts-ignore
        const UserId = res.id;
        await this.fetchUser(UserId);
      });

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error("Troble with change password in profileController:", e);
    }
  }
  async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);

      await this.fetchUser();

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error("Troble with change avatar in profileController:", e);
    }
  }

  async fetchUser(id?: number) {
    try {
      const user = await this.api.read(id);
      store.set("user.data", user);
    } catch (e: any) {
      console.error("Troble with fetchUser in profileController:", e);
    }
  }
}

export default new ProfileController();
