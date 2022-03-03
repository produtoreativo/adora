import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './domain/entities/application.entity';
import { Event } from './domain/entities/event.entity';
import { ApplicationModule } from './domain/contexts/application/application.module';
import dbConfiguration from "../db.config";
import { GithubModule } from './domain/contexts/delivery/github/github.module';
@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({...configService.get('database')})
    }),
    TypeOrmModule.forFeature([Application, Event]),
    ApplicationModule,
    GithubModule,
  ]
})
export class AppModule {}
