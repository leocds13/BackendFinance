"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resumo_controller_1 = __importDefault(require("./resumo.controller"));
const resumoRoutes = (0, express_1.Router)();
resumoRoutes.get('/:ano/:mes', resumo_controller_1.default.getByAnoMes);
exports.default = resumoRoutes;
//# sourceMappingURL=resumo.routes.js.map