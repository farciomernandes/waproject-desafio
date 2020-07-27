import { IUser } from './user';

export interface IRequest {
  id: string;
  title: string;
  userEmail?: string;
  description: string;
  price: number;
  quantity: number;

  user?: IUser;
}
