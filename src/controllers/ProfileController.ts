import store from "../utils/Store";
import router from "../utils/Router";
import { ChangePasswordProps, ChangeProfileProps, Routes } from "../utils/Interfaces";
import API, { ProfileAPI } from "src/api/ProfileAPI";

class ProfileController {
  private readonly api: ProfileAPI;

  constructor() {
    this.api = API;
  }

  async changeProfile(data: ChangeProfileProps) {
    try {
      await this.api.changeProfile(data);

      router.go(Routes.Chats);
    } catch (e: any) {
      console.error(e);
    }
  }

  async changePassword(data: ChangePasswordProps) {
    try {
      await this.api.changePassword(data);

      await this.fetchUser();

      router.go(Routes.Chats);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      store.set("user", user);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  // async changeAvatar() { //TODO
  //   try {
  //     await this.api.ChangeAvatarProps();

  //     router.go(Routes.Index);
  //   } catch (e: any) {
  //     console.error(e.message);
  //   }
  // }
}

export default new ProfileController();
