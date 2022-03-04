import { ConfigModule, ConfigService } from '@nestjs/config';

import { Application } from './domain/entities/application.entity';
import { ApplicationModule } from './domain/contexts/application/application.module';
import { Event } from './domain/entities/event.entity';
import { GithubModule } from './domain/contexts/delivery/github/github.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfiguration from '../db.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    TypeOrmModule.forFeature([Application, Event]),
    ApplicationModule,
    GithubModule,
  ],
})
export class AppModule {}
