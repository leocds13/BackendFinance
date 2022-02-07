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
const database_1 = __importDefault(require("../config/database"));
// import User from "./models/user.model";
const categoria_model_1 = __importDefault(require("./models/categoria.model"));
const receita_model_1 = __importDefault(require("./models/receita.model"));
const despesa_model_1 = __importDefault(require("./models/despesa.model"));
class Database {
    constructor() {
        this.connection = database_1.default;
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            const isDev = process.env.NODE_ENV === "development";
            this.createRelations();
            console.log("=========  Criando Tabelas  =========");
            yield categoria_model_1.default.sync({ alter: isDev });
            yield receita_model_1.default.sync({ alter: isDev });
            yield despesa_model_1.default.sync({ alter: isDev });
            // await User.sync({ alter: isDev });
            console.log("=========  Tabelas Criadas  =========");
            yield this.insertValoresIniciais();
        });
    }
    createRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            receita_model_1.default.hasOne(categoria_model_1.default, {
                sourceKey: "categoria_id",
                foreignKey: "id",
                as: "categ",
            });
            despesa_model_1.default.hasOne(categoria_model_1.default, {
                sourceKey: "categoria_id",
                foreignKey: "id",
                as: "categ",
            });
            // User.hasMany(Categoria, {
            // 	sourceKey: "id",
            // 	foreignKey: "user_id",
            // 	as: "Categorias",
            // });
        });
    }
    insertValoresIniciais() {
        return __awaiter(this, void 0, void 0, function* () {
            yield categoria_model_1.default.findOrCreate({
                where: { nome: "Alimentação" },
                defaults: {
                    nome: "Alimentação",
                    descricao: "Use esta Categoria para suas receitas e despesas de Alimentação",
                },
            });
            yield categoria_model_1.default.findOrCreate({
                where: { nome: "Saúde" },
                defaults: {
                    nome: "Saúde",
                    descricao: "Use esta Categoria para suas receitas e despesas de Saúde",
                },
            });
            categoria_model_1.default.findOrCreate({
                where: { nome: "Moradia" },
                defaults: {
                    nome: "Moradia",
                    descricao: "Use esta Categoria para suas receitas e despesas de Moradia",
                },
            });
            categoria_model_1.default.findOrCreate({
                where: { nome: "Transporte" },
                defaults: {
                    nome: "Transporte",
                    descricao: "Use esta Categoria para suas receitas e despesas de Transporte",
                },
            });
            categoria_model_1.default.findOrCreate({
                where: { nome: "Educação" },
                defaults: {
                    nome: "Educação",
                    descricao: "Use esta Categoria para suas receitas e despesas de Educação",
                },
            });
            categoria_model_1.default.findOrCreate({
                where: { nome: "Lazer" },
                defaults: {
                    nome: "Lazer",
                    descricao: "Use esta Categoria para suas receitas e despesas de Lazer",
                },
            });
            categoria_model_1.default.findOrCreate({
                where: { nome: "Imprevistos" },
                defaults: {
                    nome: "Imprevistos",
                    descricao: "Use esta Categoria para suas receitas e despesas de Imprevistos",
                },
            });
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=conexao.js.map