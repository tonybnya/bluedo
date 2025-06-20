/**
 * Script Name : user.model.ts
 * Description : Definition of interfaces for a user
 * Author      : @tonybnya
 */

export interface User {
  _id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    username: string;
  };
}
