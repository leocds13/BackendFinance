"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const receita_controller_1 = __importDefault(require("./receita.controller"));
const receitasRoutes = (0, express_1.Router)();
receitasRoutes.post('/', receita_controller_1.default.createReceita);
receitasRoutes.get('/', receita_controller_1.default.getByQuery, receita_controller_1.default.getAll);
receitasRoutes.get('/:id', receita_controller_1.default.getById);
receitasRoutes.get('/:ano/:mes', receita_controller_1.default.getByAnoMes);
receitasRoutes.put('/', receita_controller_1.default.updateById);
receitasRoutes.put('/:id', receita_controller_1.default.updateById);
receitasRoutes.patch('/', receita_controller_1.default.updateById);
receitasRoutes.patch('/:id', receita_controller_1.default.updateById);
receitasRoutes.delete('/:id', receita_controller_1.default.deleteById);
exports.default = receitasRoutes;
//# sourceMappingURL=receita.routes.js.map