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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.deleteById = exports.getById = exports.update = exports.create = void 0;
const UserDal = __importStar(require("../../database/dal/user.dal"));
const create = (payload) => {
    return UserDal.create(payload);
};
exports.create = create;
const update = (id, payload) => {
    return UserDal.update(id, payload);
};
exports.update = update;
const getById = (id) => {
    return UserDal.getById(id);
};
exports.getById = getById;
const deleteById = (id) => {
    return UserDal.deleteById(id);
};
exports.deleteById = deleteById;
const getAll = (filters) => {
    return UserDal.getAll(filters);
};
exports.getAll = getAll;
//# sourceMappingURL=user.service.js.map