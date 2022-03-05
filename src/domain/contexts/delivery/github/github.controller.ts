import { Body, Controller, Param, Post } from '@nestjs/common';
import StartCycle from '../../../dtos/StartCycle.dto';
import { GithubService } from './github.service';
import { Event } from '../../../entities/event.entity';
import DeployDTO from '../../../dtos/Deploy.dto';
import { Deployment } from '../../../entities/deployment.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('github')
export class GithubController {
  constructor(private readonly eventService: GithubService) {}

  @ApiBody({ type: StartCycle })
  @Post(':app_id/hack')
  async hack(
    @Body() payload: StartCycle,
    @Param('app_id') applicationId: number,
  ): Promise<Event> {
    return this.eventService.createTask(applicationId, payload);
  }

  @ApiBody({ type: StartCycle })
  @Post(':app_id/start')
  async createStartCycle(
    @Body() payload: StartCycle,
    @Param('app_id') applicationId: number,
  ): Promise<Event> {
    return this.eventService.createEvent(applicationId, payload);
  }

  @ApiBody({ type: StartCycle })
  @Post(':app_id/start_from_merge')
  async createStartCycleFromMerge(
    @Body() payload: StartCycle,
    @Param('app_id') applicationId: number,
  ): Promise<Event[]> {
    return this.eventService.createEventFromMerge(applicationId, payload);
  }

  @ApiBody({ type: DeployDTO })
  @Post(':app_id/deploy')
  async createDeploy(
    @Body() payload: DeployDTO,
    @Param('app_id') applicationId: number,
  ): Promise<Deployment> {
    return this.eventService.createDeploy(applicationId, payload);
  }

}
