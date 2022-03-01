import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StartCycle from '../../../dtos/StartCycle.dto';
import { Event, EventType } from '../../../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createStartCycle(
    applicationId: number, 
    payload: StartCycle): Promise<Event> {
    const event = new Event;
    this.eventRepository.merge(event, {
      applicationId,
      name: payload.name,
      eventType: EventType.START_CYCLE,
      payload: payload as unknown as JSON,
      createdBy: payload.author,
      lastChangedBy: payload.author,
    });
    return this.eventRepository.save(event);
  }

  async createGeneric(
      applicationId: number, 
      payload: StartCycle): Promise<Event> {
      const event = new Event;
      this.eventRepository.merge(event, {
        applicationId,
        name: 'GENERIC',
        eventType: EventType.GENERIC,
        payload: payload as unknown as JSON,
        createdBy: payload.author,
        lastChangedBy: payload.author,
      });
      return this.eventRepository.save(event);
    }

}
