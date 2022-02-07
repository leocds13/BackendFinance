"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const despesa_routes_1 = __importDefault(require("./despesas/despesa.routes"));
const receita_routes_1 = __importDefault(require("./receitas/receita.routes"));
const categoria_routes_1 = __importDefault(require("./categorias/categoria.routes"));
const resumo_routes_1 = __importDefault(require("./resumo/resumo.routes"));
const apiRoutes = (0, express_1.Router)();
apiRoutes.use('/receitas', receita_routes_1.default);
apiRoutes.use('/despesas', despesa_routes_1.default);
apiRoutes.use('/categorias', categoria_routes_1.default);
apiRoutes.use('/resumo', resumo_routes_1.default);
exports.default = apiRoutes;
//# sourceMappingURL=index.js.map