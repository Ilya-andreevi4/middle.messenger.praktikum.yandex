import { IChat, IUser } from "../utils/Interfaces";
import BaseAPI from "./BaseAPI";

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  read(): Promise<IChat[]> {
    return this.http.get("/");
  }

  getUsers(id: number): Promise<Array<IUser & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { users, chatId: id });
  }

  deleteUserFromChat(id: number, users: number[]): Promise<unknown> {
    return this.http.delete("/users", { users, chatId: id });
  }

  changeChatAvatar(data: FormData): Promise<unknown> {
    return this.http.put("/avatar", data);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
