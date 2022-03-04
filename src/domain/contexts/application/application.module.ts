import { Application } from '../..//entities/application.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
