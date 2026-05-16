import mongoose, { Schema, Document } from 'mongoose';

export interface TaskDocument extends Document {
  title: string;
  description?: string;
  mobileNo: string;
  currentDate: string;
  endDate: string;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: [true, 'Please provide your title'],
      trim: true,
      maxLength: [100, 'Title must be at most 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, 'Description must be at most 200 characters']
    },
    mobileNo: {
      type: String,
      required: [true, 'Please provide your mobile number'],
      match: [/^\d{10}$/, 'Mobile Number must be exactly 10 digits'],
    },
    currentDate: {
      type: String,
      required: [true, 'Please provide your current date'],
    },
    endDate: {
      type: String,
      required: [true, 'Please provide your end date'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
