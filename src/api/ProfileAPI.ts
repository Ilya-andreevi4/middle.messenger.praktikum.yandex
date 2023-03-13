import { User, ChangeProfileProps, ChangePasswordProps } from "src/utils/Interfaces";
import BaseAPI from "./BaseAPI";

// TODO Переписать весь файл под редактор профиля

export class ProfileAPI extends BaseAPI {
  constructor() {
    super("/auth");
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

  //   changeAvatar(file: File) {
  //     return this.http.put("/user/avatar", file);
  //   } //TODO

  update = undefined;

  create = undefined;
  delete = undefined;
}

export default new ProfileAPI();
