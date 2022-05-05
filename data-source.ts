import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5454,
  username: 'postgres',
  password: 'postgres',
  database: 'promocode',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
  entities: [],
  migrations: [join(__dirname, 'src/migrations/*.{ts,js}')],
  subscribers: [],
});