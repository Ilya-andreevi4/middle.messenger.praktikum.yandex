export type Primitive = bigint | boolean | null | number | string | symbol | undefined;

export type userStatus = "online" | "offline" | "invisible";

export type JsonValue = Primitive | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export interface AddUserToChat {
  users: number[];
  chatId: number;
}

export interface ILastMessage extends JsonObject {
  user: IUser;
  time: string;
  content: string;
}
export interface IChat extends JsonObject {
  id: number;
  avatar?: string;
  title?: string;
  last_message?: ILastMessage;
  isActive?: boolean;
  unread_count?: number;
  status?: userStatus; //TODO лишнее
  isGroup?: boolean;
  users?: (IUser & { role: string })[];
}

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content?: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

export const enum Routes {
  Index = "/",
  Chats = "/chats",
  NotFound = "/404",
  NetworkError = "/505",
  Registation = "/reg",
  Profile = "/profile",
}

export interface SigninData extends JsonObject {
  login: string;
  password: string;
}

export interface SignupData extends JsonObject {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ChangeProfileProps extends JsonObject {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordProps extends JsonObject {
  oldPassword: string;
  newPassword: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string | undefined;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string | undefined;
}
export interface IUser extends JsonObject {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  display_name?: string;
  avatar?: string;
  email: string;
}
