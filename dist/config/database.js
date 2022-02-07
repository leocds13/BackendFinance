"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseConfig = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    define: {
        timestamps: true,
    },
};
const sequelizeConnection = new sequelize_1.Sequelize(databaseConfig);
exports.default = sequelizeConnection;
//# sourceMappingURL=database.js.map