import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  mobileNo:string;
  currentDate:string;
  expiryDate:string;
  status: 'pending' | 'completed';
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Please provide your title'],
      trim: true,
      maxLength:[100,'Title must be at most 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide your description'],
      trim: true,
      maxLength:[200,'Description must be at most 200 characters']
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
    expiryDate: {
      type: String,
      required: [true, 'Please provide your expiry date'],
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

export const Task = mongoose.model<ITask>('Task', taskSchema);
