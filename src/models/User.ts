import { Timestamp } from 'firebase/firestore';

export interface User {
  id?: string;
  fullName: string;
  username: string;
  password?: string; // Bu sadece kayıt işlemi için kullanılacak, veritabanında saklanmayacak
  email: string;
  createdAt?: Timestamp;
}