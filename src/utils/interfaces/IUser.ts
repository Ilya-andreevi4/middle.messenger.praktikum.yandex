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
  lastMessage?: string;
  isActive?: boolean;
  numberNewMessages?: number;
  time?: string;
  status: userStatus;
}

export interface IGroup {
  id: number;
  title: string;
  avatar: string;
  users: IUser[];
  numberNewMessages?: number;
  time?: string;
  isActive: boolean;
  lastMessage?: string;
}

export interface IPeople {
  friends: IUser[];
  groups: IGroup[];
}
