import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './domain/entities/application.entity';
import { Event } from './domain/entities/event.entity';
import { ApplicationModule } from './domain/contexts/application/application.module';
import { CycletimeModule } from './domain/contexts/cycletime/cycletime.module';
import { DeployModule } from './domain/contexts/deploy/deploy.module';

import dbConfiguration from "../db.config";
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
    CycletimeModule,
    DeployModule,
  ]
})
export class AppModule {}
