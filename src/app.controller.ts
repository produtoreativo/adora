import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import StartCycle from './domain/dtos/StartCycle.dto';
import { Event } from './domain/entities/event.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post(':app_id/start_cycle')
  // async createStartCycle(
  //   @Body() payload: StartCycle, 
  //   @Param('app_id') applicationId: number,
  // ): Promise<Event> {
  //   return this.appService.createStartCycle(applicationId, payload);
  // }


}
