import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { ApplicationService } from './application.service';
// import { Application } from '../..//entities/application.entity';
import { ApiBody } from '@nestjs/swagger';
import { LeadtimeService } from './leadtime.service';


@Controller()
export class LeadtimeController {
  constructor(private readonly leadtimeService: LeadtimeService) {}

  @Get(':app_id/leadtime')
  async getLeadtime(
    @Param('app_id') applicationId: number,
  ) {
    return {};
  }
  
  @Post(':app_id/create-event')
  async createEvent(
    @Body() payload: any,
  ): Promise<any> {
    console.log( payload )
    const created = await this.leadtimeService.createEvent(payload);
    console.log( created );
    return {}
  }




}
