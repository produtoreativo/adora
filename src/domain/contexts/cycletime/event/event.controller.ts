import { Body, Controller, Param, Post } from '@nestjs/common';
import StartCycle from '../../../dtos/StartCycle.dto';
import { EventService } from './event.service';
import { Event } from '../../../entities/event.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post(':app_id/start_cycle')
  async createStartCycle(
    @Body() payload: StartCycle, 
    @Param('app_id') applicationId: number,
  ): Promise<Event> {
    return this.eventService.createStartCycle(applicationId, payload);
  }

  @Post(':app_id/generic')
  async createGenericEvent(
    @Body() payload: StartCycle, 
    @Param('app_id') applicationId: number,
  ): Promise<Event> {
    return this.eventService.createGeneric(applicationId, payload);
  }
  
}
