export interface IUser {
  avatar?: string;
  mail?: string;
  login?: string;
  firstName: string;
  lastName: string;
  chatName?: string;
  phone?: string;
  password?: string;
  lastMessage?: string;
}
export interface IGroup {
  title: string;
  image: string;
  users: IUser[];
  lastMessage?: string;
}
