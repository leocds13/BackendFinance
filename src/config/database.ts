import * as dotenv from "dotenv";

dotenv.config();

import { Options, Sequelize } from "sequelize";

const databaseConfig: Options = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    define: {
        timestamps: true,
    },
    logging: !(process.env.NODE_ENV === 'test')
}

const sequelizeConnection = new Sequelize(databaseConfig);

export default sequelizeConnection;