export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;

export type userStatus = "online" | "offline" | "invisible";

export type JsonValue = Primitive | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}
export interface IUser {
  id: number;
  avatar: string;
  email?: string;
  login?: string;
  firstName: string;
  lastName: string;
  chatName?: string;
  phone?: string;
  password?: string;
  status: userStatus;
}

export interface IChat {
  id: number;
  avatar: string;
  title: string;
  lastMessage: string;
  isActive: boolean;
  numberNewMessages?: number;
  time: string;
  status?: userStatus;
  isGroup: boolean;
  users?: IUser[];
}

export interface IСhatting {
  author: string;
  authorID: number;
  messages: IMessages[];
}

export interface IMessages {
  from: string;
  text?: string;
  time: string;
  image?: any;
  my?: boolean;
}
