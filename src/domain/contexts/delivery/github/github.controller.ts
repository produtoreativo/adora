import { Body, Controller, Param, Post } from '@nestjs/common';
import StartCycle from '../../../dtos/StartCycle.dto';
import { GithubService } from './github.service';
import { Event } from '../../../entities/event.entity';

@Controller('github')
export class GithubController {
  constructor(private readonly eventService: GithubService) {}

  @Post(':app_id/hack')
  async hack(
    @Body() payload: StartCycle, 
    @Param('app_id') applicationId: number,
  ): Promise<Event> {
    return this.eventService.createTask(applicationId, payload);
  }

  @Post(':app_id/start')
  async createStartCycle(
    @Body() payload: StartCycle, 
    @Param('app_id') applicationId: number,
  ): Promise<Event> {
    return this.eventService.createEvent(applicationId, payload);
  }

  @Post(':app_id/start_from_merge')
  async createStartCycleFromMerge(
    @Body() payload: StartCycle, 
    @Param('app_id') applicationId: number,
  ): Promise<Event[]> {
    return this.eventService.createEventFromMerge(applicationId, payload);
  }
  
}
