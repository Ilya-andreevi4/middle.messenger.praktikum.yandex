export interface IChat {
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
