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
const sequelize_1 = __importStar(require("sequelize"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../../config/database"));
class User extends sequelize_1.Model {
    checkPassword(senha) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(senha, this.senha);
        });
    }
}
User.init({
    id: {
        type: sequelize_1.default.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: sequelize_1.default.UUIDV4,
    },
    nome: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            isAlpha: { msg: "Informe um valor válido" },
        },
    },
    email: {
        type: sequelize_1.default.STRING,
        unique: {
            name: "email",
            msg: "Email já cadastrado",
        },
        allowNull: false,
        validate: {
            isEmail: { msg: "Informe um email válido" },
            notNull: { msg: "Email é Obrigatório" },
        },
    },
    senha: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Senha é Obrigatório" },
            is: {
                args: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])/,
                msg: "Senha precisa ter\n1 Letra Mauscula\n1 Caracter Especial\n2 Numeros\n2 Letras minusculas",
            },
            len: {
                args: [8, 255],
                msg: "A Senha precisa ter no minimo 8 caracteres.",
            },
        },
        get() {
            return undefined;
        },
    },
    telefone: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Telefone é Obrigatório" },
            len: {
                args: [10, 11],
                msg: "Telefone inválido",
            },
            is: {
                args: /^([0-9]*)$/,
                msg: "Telefone aceita apenas números.",
            },
        },
    },
    token: {
        type: sequelize_1.default.UUID,
        unique: true,
        defaultValue: sequelize_1.default.UUIDV4,
    },
}, {
    modelName: "user",
    freezeTableName: true,
    timestamps: true,
    sequelize: database_1.default,
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: ["senha"],
        },
    },
});
User.addHook("beforeSave", (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hook', user);
    if (user.senha) {
        user.senha = yield bcryptjs_1.default.hash(user.senha, 8);
    }
    console.log('hook', user);
}));
exports.default = User;
//# sourceMappingURL=user.model.js.map