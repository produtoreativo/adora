import { registerAs } from '@nestjs/config';

console.log('DIR', `${__dirname}/**/*.entity{.ts,.js}`);

const ssl = process.env.DATABASE_SSL
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};

export default registerAs('database', () => {
  return {
    type: 'postgres',
    synchronize: false,
    logging: true,
    ...ssl,
    autoLoadEntities: true,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/**/migrations/*.ts`],
    host: process.env.DB_MAIN_HOST,
    port: parseInt(process.env.DB_MAIN_PORT),
    username: process.env.DB_MAIN_USER,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    schema: process.env.DB_MAIN_SCHEMA,
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
});
