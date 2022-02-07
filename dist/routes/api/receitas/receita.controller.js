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
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const ReceitaServices = __importStar(require("./receita.service"));
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
class ReceitaController {
    createReceita(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Receita = yield ReceitaServices.create(req.body);
                res.status(200).json(Receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getByQuery(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.descricao) {
                next();
                return;
            }
            try {
                const Receita = yield ReceitaServices.getAll({
                    includeDeleted: false,
                    isDeleted: false,
                }, {
                    descricao: {
                        [sequelize_1.Op.iLike]: `%${req.query.descricao}%`
                    }
                });
                res.status(200).json(Receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Receita = yield ReceitaServices.getAll({
                    includeDeleted: false,
                    isDeleted: false,
                });
                res.status(200).json(Receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Receita = yield ReceitaServices.getById(req.params.id);
                res.status(200).json(Receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getByAnoMes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.ano || !req.params.mes) {
                next(new ApiError_1.default({
                    code: 400,
                    err: "Requisição inválida para /receitas/{ano}/{mes}!",
                }));
                return;
            }
            if (req.params.ano < 1000) {
                next(new ApiError_1.default({
                    code: 400,
                    err: `Ano: ${req.params.ano} Inválido!`,
                }));
                return;
            }
            if (req.params.mes <= 0 || req.params.mes > 12) {
                next(new ApiError_1.default({
                    code: 400,
                    err: `Mes: ${req.params.mes} Inválido!`,
                }));
                return;
            }
            try {
                const receita = yield ReceitaServices.getAll({
                    includeDeleted: false,
                    isDeleted: false,
                }, {
                    data: {
                        [sequelize_1.Op.between]: [
                            (0, moment_1.default)({ day: 1, month: req.params.mes - 1, year: req.params.ano }).toDate(),
                            (0, moment_1.default)({ day: 1, month: req.params.mes - 1, year: req.params.ano }).endOf('month').toDate()
                        ]
                    }
                });
                res.status(200).json(receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    throw new ApiError_1.default({
                        code: 400,
                        err: "Id precisa ser informado no formato: /receitas/ID",
                    });
                }
                const Receita = yield ReceitaServices.update(req.params.id, req.body);
                res.status(200).json(Receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    throw new ApiError_1.default({
                        code: 400,
                        err: "Id precisa ser informado no formato: /receitas/ID",
                    });
                }
                const Receita = yield ReceitaServices.deleteById(req.params.id);
                res.status(200).json(Receita);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ReceitaController();
//# sourceMappingURL=receita.controller.js.map