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
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_model_1.default.create(payload)
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
    return categoria;
});
exports.create = create;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_model_1.default.findByPk(id)
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
    if (!categoria) {
        // @todo throw custom error
        throw new ApiError_1.default({
            code: 400,
            err: "Categoria não encontrada!"
        });
    }
    const updatedCategoria = yield categoria
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
    return updatedCategoria;
});
exports.update = update;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_model_1.default.findByPk(id)
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
    if (!categoria) {
        // @todo throw custom error
        throw new ApiError_1.default({
            code: 400,
            err: "Categoria não encontrada!"
        });
    }
    return categoria;
});
exports.getById = getById;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategoriaCount = yield categoria_model_1.default.destroy({
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
    return !!deletedCategoriaCount;
});
exports.deleteById = deleteById;
const getAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    return categoria_model_1.default.findAll(Object.assign({ where: Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && {
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
//# sourceMappingURL=categoria.dal.js.map