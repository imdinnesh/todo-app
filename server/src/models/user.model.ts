import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    mobileNo: string;
    password?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: [true, 'Please provide your mobile number'],
      match: [/^\d{10}$/, 'Mobile Number must be exactly 10 digits'],
    },
    password: {
      type: String,
      required: [false, 'Please provide a password'], // Handled in UseCase
      minlength: 8,
      // Removed select: false to let repository handle projection when needed
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);