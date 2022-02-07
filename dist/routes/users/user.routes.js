"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const usersRoutes = (0, express_1.Router)();
usersRoutes.get("/:id", user_controller_1.default.getById);
usersRoutes.post("/", user_controller_1.default.createUser);
exports.default = usersRoutes;
//# sourceMappingURL=user.routes.js.map