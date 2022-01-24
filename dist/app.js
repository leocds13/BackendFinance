"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
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
        this.app = (0, express_1.default)();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    config() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        // pool.connect(function (err, client, done) {
        // 	if (err) throw new Error(err.message);
        // 	console.log("Connected");
        // 	Tabelas.init();
        // });
    }
    routerConfig() {
        this.app.use('/', routes_1.default);
        // this.app.use(routerUser);
        // this.app.use(routerContas);
        // this.app.use(apiErrorHandler);
    }
}
exports.default = Server;
//# sourceMappingURL=app.js.map