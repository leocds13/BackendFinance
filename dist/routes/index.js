"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = __importDefault(require("./api"));
const user_routes_1 = __importDefault(require("./users/user.routes"));
const rootRoutes = (0, express_1.Router)();
rootRoutes.use('/users', user_routes_1.default);
rootRoutes.use('/api', api_1.default);
exports.default = rootRoutes;
//# sourceMappingURL=index.js.map