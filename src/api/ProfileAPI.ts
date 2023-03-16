import { User, ChangeProfileProps, ChangePasswordProps } from "../utils/Interfaces";
import BaseAPI from "./BaseAPI";

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
    return this.http.put("/user/profile/avatar", data);
  }

  update = undefined;

  create = undefined;
  delete = undefined;
}

export default new ProfileAPI();
