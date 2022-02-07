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
const CategoriaServices = __importStar(require("./categoria.service"));
class CategoriaController {
    createCategoria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield CategoriaServices.create(req.body);
                res.status(200).json(categoria);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield CategoriaServices.getAll({
                    includeDeleted: false,
                    isDeleted: false,
                });
                res.status(200).json(categoria);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield CategoriaServices.getById(req.params.id);
                res.status(200).json(categoria);
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
                        err: "Id precisa ser informado no formato: /Categorias/{ID}",
                    });
                }
                const categoria = yield CategoriaServices.update(req.params.id, req.body);
                res.status(200).json(categoria);
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
                        err: "Id precisa ser informado no formato: /Categorias/{ID}",
                    });
                }
                const categoria = yield CategoriaServices.deleteById(req.params.id);
                res.status(200).json(categoria);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new CategoriaController();
//# sourceMappingURL=categoria.controller.js.map