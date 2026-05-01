import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  mobileNo: string;
  password?: string;
  role: 'user' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
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
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
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

// Hash password before saving
userSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password!, salt);
  } catch (err) {
    throw err;
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password!);
};

export const User = mongoose.model<IUser>('User', userSchema);
