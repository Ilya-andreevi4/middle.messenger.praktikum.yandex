import BaseAPI from "./BaseAPI";
import { IChat, IUser } from "../utils/Interfaces";

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    const data = { title };
    return this.http.post("/", { data });
  }

  delete(id: number) {
    const data = { chatId: id };
    return this.http.delete("/", { data });
  }

  read(): Promise<IChat[]> {
    return this.http.get("/") as Promise<IChat[]>;
  }

  getUsers(id: number): Promise<Array<IUser & { role: string }>> {
    return this.http.get(`/${id}/users`) as Promise<Array<IUser & { role: string }>>;
  }

  addUsers(id: number, users: number[]) {
    const data = { users, chatId: id };
    return this.http.put("/users", { data });
  }

  deleteUserFromChat(id: number, users: number[]) {
    const data = { users, chatId: id };
    return this.http.delete("/users", { data });
  }

  changeChatAvatar(data: FormData) {
    return this.http.put("/avatar", { data });
  }

  async getToken(id: number): Promise<string> {
    const response = await (this.http.post(`/token/${id}`) as Promise<{ token: string }>);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
