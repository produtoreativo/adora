import {registerAs} from "@nestjs/config";

console.log('DIR', `${__dirname}/**/*.entity{.ts,.js}` );

export default registerAs('database', () => {
    return { 
      type: "postgres",
      synchronize: false,
      logging: true,
        ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/**/migrations/*.ts`],
      url: process.env.DATABASE_URL,
      // host: process.env.DB_MAIN_HOST,
      // port: parseInt(process.env.DB_MAIN_PORT),
      // username: process.env.DB_MAIN_USER,
      // password: process.env.DB_MAIN_PASSWORD,
      // database: process.env.DB_MAIN_DATABASE,
      cli: {
        migrationsDir: 'src/migrations'
      }
    }
})