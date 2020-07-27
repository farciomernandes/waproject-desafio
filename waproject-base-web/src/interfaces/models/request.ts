import IUser from './user';

export default interface IRequest {
  id: string;
  title: string;
  userId?: number;
  description: string;
  price: number;
  quantity: number;

  user?: IUser;
}
