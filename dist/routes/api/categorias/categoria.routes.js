"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_controller_1 = __importDefault(require("./categoria.controller"));
const entradasRoutes = (0, express_1.Router)();
entradasRoutes.post('/', categoria_controller_1.default.createCategoria);
entradasRoutes.get('/', categoria_controller_1.default.getAll);
entradasRoutes.get('/:id', categoria_controller_1.default.getById);
entradasRoutes.put('/', categoria_controller_1.default.updateById);
entradasRoutes.put('/:id', categoria_controller_1.default.updateById);
entradasRoutes.patch('/', categoria_controller_1.default.updateById);
entradasRoutes.patch('/:id', categoria_controller_1.default.updateById);
entradasRoutes.delete('/:id', categoria_controller_1.default.deleteById);
exports.default = entradasRoutes;
//# sourceMappingURL=categoria.routes.js.map