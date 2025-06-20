/**
 * Script Name : task.model.ts
 * Description : Definition of interfaces for a task
 * Author      : @tonybnya
 */

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewTask {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
}
