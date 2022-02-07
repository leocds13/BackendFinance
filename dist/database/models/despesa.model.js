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
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = __importDefault(require("../../config/database"));
const categoria_model_1 = __importDefault(require("./categoria.model"));
class Despesa extends sequelize_1.Model {
}
Despesa.init({
    categoria_id: {
        type: sequelize_1.default.UUID,
        allowNull: false,
        validate: {
            notNull: { msg: "Categoria é Obrigatória!" },
            isInCategoria(value) {
                return __awaiter(this, void 0, void 0, function* () {
                    let achou = yield categoria_model_1.default.findByPk(value).then((categoria) => {
                        return !!categoria;
                    });
                    if (!achou) {
                        throw "Categoria não encontrada";
                    }
                });
            },
        },
    },
    id: {
        type: sequelize_1.default.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: sequelize_1.default.UUIDV4,
    },
    descricao: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Descrição é Obrigatória!" },
            notEmpty: { msg: "Descrição não pode ficar vazia!" },
        },
    },
    valor: {
        type: sequelize_1.default.FLOAT(10, 2),
        allowNull: false,
        validate: {
            notNull: { msg: "Valor é Obrigatório!" },
            min: {
                args: [0.01],
                msg: "Valor tem que ser maior que zero!",
            },
        },
    },
    data: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        set(val) {
            this.setDataValue("data", (0, moment_1.default)(val, "DD/MM/YYYY hh:mm").toDate());
        },
        validate: {
            notNull: {
                msg: "Data precisa ser informada!",
            },
            isDate: {
                args: true,
                msg: "Informe uma data válida!",
            },
        },
    },
}, {
    timestamps: true,
    sequelize: database_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "despesa",
});
exports.default = Despesa;
//# sourceMappingURL=despesa.model.js.map