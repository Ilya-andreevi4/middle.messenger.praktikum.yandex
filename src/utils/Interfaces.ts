export type userStatus = "online" | "offline" | "invisible";

export interface IUser {
  id: number;
  avatar: string;
  mail?: string;
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
