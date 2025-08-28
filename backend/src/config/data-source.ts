import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_DATABASE,

    synchronize: false,

    logging: false,

    entities: [__dirname + '/../entities/**/*.js', __dirname + '/../entities/**/*.ts'],
    migrations: [__dirname + '/../migrations/**/*.js', __dirname + '/../migrations/**/*.ts'],
    
};

export const AppDataSource = new DataSource(dataSourceOptions);