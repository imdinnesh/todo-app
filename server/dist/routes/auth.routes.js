"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middleware/validate");
const auth_schema_1 = require("../schemas/auth.schema");
const router = (0, express_1.Router)();
router.post('/signup', (0, validate_1.validate)(auth_schema_1.signUpSchema), auth_controller_1.signUp);
exports.default = router;
