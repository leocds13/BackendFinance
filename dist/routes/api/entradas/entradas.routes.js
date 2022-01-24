"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entradasRoutes = (0, express_1.Router)();
entradasRoutes.get('/', (req, res, next) => { res.json('Funfo'); });
exports.default = entradasRoutes;
//# sourceMappingURL=entradas.routes.js.map