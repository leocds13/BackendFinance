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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = __importDefault(require("../../config/database"));
class Categoria extends sequelize_1.Model {
}
Categoria.init({
    // user_id: {
    // 	type: Sequelize.UUID,
    // 	allowNull: false,
    // 	primaryKey: true,
    // },
    id: {
        type: sequelize_1.default.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.default.UUIDV4,
    },
    nome: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Informe um nome da Categoria!",
            },
            notNull: {
                msg: "Nome é obrigatório!",
            },
        },
    },
    descricao: {
        type: sequelize_1.default.STRING,
        defaultValue: "",
    },
    vlr_em_categoria: {
        type: sequelize_1.default.FLOAT(10, 2),
        defaultValue: 0,
    },
}, {
    timestamps: true,
    sequelize: database_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "categoria",
});
exports.default = Categoria;
//# sourceMappingURL=categoria.model.js.map