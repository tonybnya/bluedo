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

export interface CreateTaskDto {
  title: string;
  description?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
}
