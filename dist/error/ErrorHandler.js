"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("./ApiError"));
function ErrorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.default) {
        console.log('Erro Esperado!');
        res.status(err.code).json(err.err);
        return;
    }
    console.log(err);
    res.status(500).json("Desculpe-nos por isso mas algo deu errado internamente");
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map