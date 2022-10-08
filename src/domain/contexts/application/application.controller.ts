import { Body, Controller, Post } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { Application } from "../..//entities/application.entity";
import { ApiBody } from "@nestjs/swagger";

@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiBody({ type: Application })
  @Post("application")
  async createApplication(@Body() application: Application): Promise<Application> {
    return this.applicationService.createApplication(application);
  }
  @Get('health')
  health() {
    return 'OK';
  }
}
