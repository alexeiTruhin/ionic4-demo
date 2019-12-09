import { User } from '../users/user.model';

export interface Story {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  author: User;
}