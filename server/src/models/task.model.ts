/**
 * Script Name : task.model.ts
 * Description : Definition of task model
 * Author      : @tonybnya
 */

import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, maxLength: 255 },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
