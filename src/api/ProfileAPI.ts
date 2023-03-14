import { User, ChangeProfileProps, ChangePasswordProps } from "../utils/Interfaces";
import BaseAPI from "./BaseAPI";

// TODO Переписать весь файл под редактор профиля

export class ProfileAPI extends BaseAPI {
  constructor() {
    super("");
  }

  read(id?: number): Promise<User> {
    return this.http.get("/user", id);
  }

  changeProfile(data: ChangeProfileProps) {
    return this.http.put("/user/profile", data);
  }

  changePassword(data: ChangePasswordProps) {
    return this.http.put("/user/password", data);
  }

  changeAvatar(data: FormData) {
    console.log("strAvatar: ", JSON.stringify(data));
    return this.http.put("/user/avatar", data);
  } //TODO

  update = undefined;

  create = undefined;
  delete = undefined;
}

export default new ProfileAPI();
