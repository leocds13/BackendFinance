"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const despesas_routes_1 = __importDefault(require("./despesas/despesas.routes"));
const entradas_routes_1 = __importDefault(require("./entradas/entradas.routes"));
const apiRoutes = (0, express_1.Router)();
apiRoutes.use('/entradas', entradas_routes_1.default);
apiRoutes.use('/despesas', despesas_routes_1.default);
exports.default = apiRoutes;
//# sourceMappingURL=index.js.map