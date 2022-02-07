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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const conexao_1 = __importDefault(require("./database/conexao"));
const ErrorHandler_1 = __importDefault(require("./error/ErrorHandler"));
// import tables from "./infra/database/tables";
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app
                    .listen(port, () => {
                    resolve(port);
                })
                    .on("error", (err) => reject(err));
            });
        };
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app = (0, express_1.default)();
            yield this.dbConnect();
            this.config();
            this.routerConfig();
            this.errorConfig();
        });
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, helmet_1.default)());
            this.app.use(express_1.default.json());
        });
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexao_1.default.sync();
        });
    }
    routerConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use("/", routes_1.default);
        });
    }
    errorConfig() {
        this.app.use(ErrorHandler_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=app.js.map