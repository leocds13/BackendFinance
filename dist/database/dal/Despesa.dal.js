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
exports.getAll = exports.deleteById = exports.getById = exports.update = exports.create = void 0;
const sequelize_1 = require("sequelize");
const Despesa_model_1 = __importDefault(require("../models/Despesa.model"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
function atualizaVlrEmCategoria(categoriaAntiga, vlrAntigo, categoriaNova, vlrNovo) {
    return __awaiter(this, void 0, void 0, function* () {
        let categoria = yield categoria_model_1.default.findByPk(categoriaAntiga)
            .then((value) => value)
            .catch((e) => {
            if (!(e instanceof sequelize_1.ValidationError)) {
                throw e;
            }
            throw new ApiError_1.default({
                code: 400,
                err: e,
            });
        });
        yield categoria
            .update({ vlr_em_categoria: categoria.vlr_em_categoria + vlrAntigo })
            .then((value) => value)
            .catch((e) => {
            if (!(e instanceof sequelize_1.ValidationError)) {
                throw e;
            }
            throw new ApiError_1.default({
                code: 400,
                err: e,
            });
        });
        categoria = yield categoria_model_1.default.findByPk(categoriaNova)
            .then((value) => value)
            .catch((e) => {
            if (!(e instanceof sequelize_1.ValidationError)) {
                throw e;
            }
            throw new ApiError_1.default({
                code: 400,
                err: e,
            });
        });
        yield categoria
            .update({ vlr_em_categoria: categoria.vlr_em_categoria - vlrNovo })
            .then((value) => value)
            .catch((e) => {
            if (!(e instanceof sequelize_1.ValidationError)) {
                throw e;
            }
            throw new ApiError_1.default({
                code: 400,
                err: e,
            });
        });
    });
}
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const despesa = yield Despesa_model_1.default.create(payload)
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
    atualizaVlrEmCategoria(despesa.categoria_id, 0, despesa.categoria_id, despesa.valor);
    return despesa;
});
exports.create = create;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const despesa = yield Despesa_model_1.default.findByPk(id)
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
    if (!despesa) {
        // @todo throw custom error
        throw new ApiError_1.default({
            code: 400,
            err: "Despesa não encontrada!",
        });
    }
    const categoriaAntiga = despesa.categoria_id;
    const valorAntigo = despesa.valor;
    const updatedDespesa = yield despesa
        .update(payload)
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
    atualizaVlrEmCategoria(categoriaAntiga, valorAntigo, updatedDespesa.categoria_id, updatedDespesa.valor);
    return updatedDespesa;
});
exports.update = update;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const despesa = yield Despesa_model_1.default.findByPk(id)
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
    if (!despesa) {
        // @todo throw custom error
        throw new ApiError_1.default({
            code: 400,
            err: "Despesa não encontrada!",
        });
    }
    return despesa;
});
exports.getById = getById;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const despesa = yield Despesa_model_1.default.findByPk(id)
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
    if (!despesa) {
        // @todo throw custom error
        throw new ApiError_1.default({
            code: 400,
            err: "Despesa não encontrada!",
        });
    }
    const categoria = despesa.categoria_id;
    const valor = despesa.valor;
    const deletedDespesaCount = yield Despesa_model_1.default.destroy({
        where: { id },
    })
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
    atualizaVlrEmCategoria(categoria, valor, categoria, 0);
    return !!deletedDespesaCount;
});
exports.deleteById = deleteById;
const getAll = (filters, where) => __awaiter(void 0, void 0, void 0, function* () {
    return Despesa_model_1.default.findAll(Object.assign({ where: Object.assign(Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })), where) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && {
        paranoid: true,
    })))
        .then((value) => value)
        .catch((e) => {
        if (!(e instanceof sequelize_1.ValidationError)) {
            throw e;
        }
        throw new ApiError_1.default({
            code: 400,
            err: e,
        });
    });
});
exports.getAll = getAll;
//# sourceMappingURL=Despesa.dal.js.map