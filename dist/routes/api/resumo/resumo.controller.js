"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ResumoServices = __importStar(require("./resumo.service"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
class ResumoController {
    getByAnoMes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {
                    data: {
                        [sequelize_1.Op.between]: [
                            (0, moment_1.default)({
                                day: 1,
                                month: req.params.mes - 1,
                                year: req.params.ano,
                            }).toDate(),
                            (0, moment_1.default)({
                                day: 1,
                                month: req.params.mes - 1,
                                year: req.params.ano,
                            })
                                .endOf("M")
                                .toDate(),
                        ],
                    },
                };
                const receitas = ResumoServices.getReceitas(where);
                const despesas = ResumoServices.getDespesas(where);
                const despesasOfEachCateg = ResumoServices.getDespesasByCategoria(where);
                const totalOfEachCateg = (yield despesasOfEachCateg).reduce((anterior, atual) => {
                    return Object.assign(Object.assign({}, anterior), { [atual.categoria_nome
                            ? atual.categoria_nome
                            : atual.categoria_id]: {
                            id: atual.categoria_id,
                            valor: atual.valor,
                        } });
                }, {});
                const results = {
                    totalReceitas: yield receitas,
                    totalDespesas: yield despesas,
                    saldo: (yield receitas) - (yield despesas),
                    categorias: totalOfEachCateg,
                };
                res.status(200).json(results);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ResumoController();
//# sourceMappingURL=resumo.controller.js.map