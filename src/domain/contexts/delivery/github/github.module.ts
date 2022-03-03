import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../../entities/task.entity';
import { Event } from '../../../entities/event.entity';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Event, Task ]),
  ],
  controllers: [ GithubController],
  providers: [ GithubService]
})
export class GithubModule {}
