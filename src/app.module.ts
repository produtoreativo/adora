import * as Joi from 'joi';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { Application } from './domain/entities/application.entity';
import { ApplicationModule } from './domain/contexts/application/application.module';
import { Event } from './domain/entities/event.entity';
import { GithubModule } from './domain/contexts/delivery/github/github.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfiguration from '../db.config';
import { DeliveryModule } from './domain/contexts/delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
      validationSchema: Joi.object({
        DB_MAIN_HOST: Joi.string().required(),
        DB_MAIN_PORT: Joi.number().required(),
        DB_MAIN_USER: Joi.string().required(),
        DB_MAIN_PASSWORD: Joi.string().required(),
        DB_MAIN_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    TypeOrmModule.forFeature([Application, Event]),
    ApplicationModule,
    DeliveryModule,
    GithubModule,
  ],
})
export class AppModule {}
