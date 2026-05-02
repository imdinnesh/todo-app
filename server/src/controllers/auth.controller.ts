import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { LoginInput, SignUpInput } from '../schemas/auth.schema';
import { AppError } from '../utils/AppError';
import { signToken } from '../services/auth.service';

/**
 * @desc    Sign up new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
export const signUp = async (
  req: Request<{}, {}, SignUpInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password,mobileNo,role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError('User already exists', 400));
  }

  

  await User.create({
    name,
    email,
    password,
    mobileNo,
    role
  });

  res.status(201).json({
    status: 'success',
    statusCode: 0,
    statusDesc: 'User created successfully',
  });
};

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Check if the user exists
  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) {
    return next(new AppError('User not found', 404));
  }

  const isPasswordValid = await existingUser.comparePassword(password);

  if (!isPasswordValid) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = signToken({
    mobileNo: existingUser.mobileNo,
    role: existingUser.role
  });

  res.status(200).json({
    status: 'success',
    statusCode: 0,
    statusDesc: 'Logged in successfully',
    accessToken:token,
  });
};
