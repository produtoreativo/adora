import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StartCycle from './domain/dtos/StartCycle.dto';
import { Event, EventType } from './domain/entities/event.entity';

@Injectable()
export class AppService {

}
