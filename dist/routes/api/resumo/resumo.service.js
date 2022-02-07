"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDespesasByCategoria = exports.getDespesas = exports.getReceitas = void 0;
const Receita_model_1 = __importDefault(require("../../../database/models/Receita.model"));
const sequelize_1 = require("sequelize");
const despesa_model_1 = __importDefault(require("../../../database/models/despesa.model"));
const categoria_model_1 = __importDefault(require("../../../database/models/categoria.model"));
const getReceitas = (where) => {
    return Receita_model_1.default.sum("valor", {
        where: where,
    });
};
exports.getReceitas = getReceitas;
const getDespesas = (where) => {
    return despesa_model_1.default.sum("valor", {
        where: where,
    });
};
exports.getDespesas = getDespesas;
const getDespesasByCategoria = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return despesa_model_1.default.findAll({
        attributes: [
            "categoria_id",
            [(0, sequelize_1.col)("categ.nome"), "categoria_nome"],
            [(0, sequelize_1.fn)("sum", (0, sequelize_1.col)("valor")), "valor"],
        ],
        include: [
            {
                model: categoria_model_1.default,
                as: "categ",
                attributes: [],
            },
        ],
        group: ["categoria_id", "categ.nome"],
        where: where,
        raw: true,
        nest: true,
    });
});
exports.getDespesasByCategoria = getDespesasByCategoria;
//# sourceMappingURL=resumo.service.js.map