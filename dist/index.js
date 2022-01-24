"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
(0, dotenv_1.config)();
const port = parseInt(process.env.PORT || "3000");
const starter = new app_1.default()
    .start(port)
    .then((port) => {
    console.log(`Running on port ${port}`);
})
    .catch((error) => {
    console.log(error);
});
exports.default = starter;
//# sourceMappingURL=index.js.map