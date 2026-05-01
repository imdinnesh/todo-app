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
exports.signUp = void 0;
const User_1 = require("../models/User");
const auth_service_1 = require("../services/auth.service");
/**
 * @desc    Sign up new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // 1) Create user
    const newUser = yield User_1.User.create({
        name,
        email,
        password,
    });
    // 2) Generate token
    const token = (0, auth_service_1.signToken)(newUser._id.toString());
    // 3) Send response
    res.status(201).json({
        status: 'success',
        statusCode: 0, // Internal success code
        statusDesc: 'User created successfully',
        token,
        data: {
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        },
    });
});
exports.signUp = signUp;
