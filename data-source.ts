import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
  entities: [],
  migrations: [join(__dirname, 'src/migrations/*.{ts,js}')],
  subscribers: [],
});
