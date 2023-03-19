import { SigninData, SignupData, User } from "src/utils/Interfaces";
import BaseAPI from "./BaseAPI";

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signin(data: SigninData) {
    return this.http.post("/signin", data);
  }

  signup(data: SignupData) {
    return this.http.post("/signup", data);
  }

  read(id?: number): Promise<User> {
    return this.http.get("/user", id);
  }

  logout() {
    return this.http.post("/logout");
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
