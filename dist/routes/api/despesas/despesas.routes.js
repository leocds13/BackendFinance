"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const despesasRoutes = (0, express_1.Router)();
despesasRoutes.get('/', (req, res, next) => { res.json('Funfo'); });
exports.default = despesasRoutes;
//# sourceMappingURL=despesas.routes.js.map