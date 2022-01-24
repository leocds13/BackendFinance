"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoutes = (0, express_1.Router)();
usersRoutes.get('/', (req, res, next) => { res.json('Funfo'); });
exports.default = usersRoutes;
//# sourceMappingURL=user.routes.js.map