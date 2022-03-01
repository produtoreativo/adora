import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Event ]),
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class CycletimeModule {}
