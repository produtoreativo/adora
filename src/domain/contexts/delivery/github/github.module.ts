import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../entities/event.entity';
import { Task } from '../../../entities/task.entity';
import { Deployment } from '../../../entities/deployment.entity';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { DeliveryService } from '../delivery.service';
import { DeliveryModule } from '../delivery.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Task, Deployment]),
    DeliveryModule,
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
