"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const User_1 = require("../models/User");
const AppError_1 = require("../utils/AppError");
const auth_service_1 = require("../services/auth.service");
/**
 * @desc    Sign up new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, mobileNo, role } = req.body;
    yield User_1.User.create({
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
});
exports.signUp = signUp;
/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if the user exists (explicitly select password)
    const existingUser = yield User_1.User.findOne({ email }).select('+password');
    if (!existingUser) {
        return next(new AppError_1.AppError('User not found', 404));
    }
    const isPasswordValid = yield existingUser.comparePassword(password);
    if (!isPasswordValid) {
        return next(new AppError_1.AppError('Invalid credentials', 401));
    }
    const token = (0, auth_service_1.signToken)({
        name: existingUser.name,
        email: existingUser.email,
        password: '',
        mobileNo: existingUser.mobileNo,
        role: existingUser.role
    });
    res.status(200).json({
        status: 'success',
        statusCode: 0,
        statusDesc: 'Logged in successfully',
        accessToken: token,
    });
});
exports.login = login;
