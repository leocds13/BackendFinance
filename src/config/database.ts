import { Options, Sequelize } from "sequelize";

const databaseConfig: Options = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    define: {
        timestamps: true,
    },
}

const sequelizeConnection = new Sequelize(databaseConfig);

export default sequelizeConnection;