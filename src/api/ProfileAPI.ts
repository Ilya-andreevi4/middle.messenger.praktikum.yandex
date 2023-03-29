import BaseAPI from "./BaseAPI";
import { User, ChangeProfileProps, ChangePasswordProps } from "../utils/Interfaces";

export class ProfileAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  read(id?: number): Promise<User> {
    return this.http.get("", id);
  }

  changeProfile(data: ChangeProfileProps) {
    return this.http.put("/profile", data);
  }

  changePassword(data: ChangePasswordProps) {
    return this.http.put("/password", data);
  }

  changeAvatar(data: FormData) {
    return this.http.put("/profile/avatar", data);
  }

  update = undefined;

  create = undefined;

  delete = undefined;
}

export default new ProfileAPI();
