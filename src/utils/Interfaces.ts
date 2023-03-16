export type Primitive = bigint | boolean | null | number | string | symbol | undefined;

export type userStatus = "online" | "offline" | "invisible";

export type JsonValue = Primitive | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export interface IUser extends JsonObject {
  id?: number;
  avatar?: string;
  email?: string;
  login?: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  phone?: string;
  password?: string;
  status?: userStatus;
}

// [
//   {
//     id: 123,
//     title: "my-chat",
//     avatar: "/123/avatar1.jpg",
//     unread_count: 15,
//     last_message: {
//       user: {
//         first_name: "Petya",
//         second_name: "Pupkin",
//         avatar: "/path/to/avatar.jpg",
//         email: "my@email.com",
//         login: "userLogin",
//         phone: "8(911)-222-33-22",
//       },
//       time: "2020-01-02T14:22:22.000Z",
//       content: "this is message content",
//     },
//   },
// ];

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
  time?: string; //TODO лишнее
  status?: userStatus; //TODO лишнее
  isGroup?: boolean; //TODO лишнее
  users?: IUser[];
}

export interface IСhatting extends JsonObject {
  author: string;
  authorID: number;
  messages: IMessages[];
}

// TODO trash
export interface IMessages extends JsonObject {
  from: string;
  text?: string;
  time: string;
  image?: any;
  my?: boolean;
}
//

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
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
  display_name?: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
}
