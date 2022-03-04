import { Event } from '../../../entities/event.entity';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { Module } from '@nestjs/common';
import { Task } from '../../../entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Task])],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
