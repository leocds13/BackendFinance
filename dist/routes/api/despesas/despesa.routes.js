"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const despesa_controller_1 = __importDefault(require("./despesa.controller"));
const entradasRoutes = (0, express_1.Router)();
entradasRoutes.post('/', despesa_controller_1.default.createDespesa);
entradasRoutes.get('/', despesa_controller_1.default.getByQuery, despesa_controller_1.default.getAll);
entradasRoutes.get('/:id', despesa_controller_1.default.getById);
entradasRoutes.get('/:ano/:mes', despesa_controller_1.default.getByAnoMes);
entradasRoutes.put('/', despesa_controller_1.default.updateById);
entradasRoutes.put('/:id', despesa_controller_1.default.updateById);
entradasRoutes.patch('/', despesa_controller_1.default.updateById);
entradasRoutes.patch('/:id', despesa_controller_1.default.updateById);
entradasRoutes.delete('/:id', despesa_controller_1.default.deleteById);
exports.default = entradasRoutes;
//# sourceMappingURL=despesa.routes.js.map