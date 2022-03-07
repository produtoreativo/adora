import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { Task } from '../../entities/task.entity';
import { Deployment } from '../../entities/deployment.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Task, Deployment])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports:  [DeliveryService],
})
export class DeliveryModule {}
