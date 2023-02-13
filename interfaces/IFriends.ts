import { IGroup, IUser } from "./IUser";

export interface IFriends {
  people: IUser[];
  groups: IGroup[];
}
