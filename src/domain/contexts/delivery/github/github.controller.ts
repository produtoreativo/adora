import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { GithubService } from "./github.service";
import { Event } from "../../../entities/event.entity";
import { Deployment } from "../../../entities/deployment.entity";
import StartCycle from "../../../dtos/StartCycle.dto";
import GithubDeploy from "../../../dtos/GithubDeploy.dto";

@Controller("github")
export class GithubController {
  constructor(private readonly eventService: GithubService) {}

  @ApiBody({ type: StartCycle })
  @Post(":app_id/hack")
  async hack(@Body() payload: StartCycle, @Param("app_id") applicationId: number): Promise<Event> {
    return this.eventService.createTask(applicationId, payload);
  }

  @ApiBody({ type: StartCycle })
  @Post(":app_id/start")
  async createStartCycle(
    @Body() payload: StartCycle,
    @Param("app_id") applicationId: number,
  ): Promise<Event> {
    return this.eventService.createEvent(applicationId, payload);
  }

  @ApiBody({ type: StartCycle })
  @Post(":app_id/start_from_merge")
  async createStartCycleFromMerge(
    @Body() payload: StartCycle,
    @Param("app_id") applicationId: number,
  ): Promise<Event[]> {
    return this.eventService.createEventFromMerge(applicationId, payload);
  }

  @ApiBody({ type: GithubDeploy })
  @Post(":app_id/deploy")
  async createDeploy(
    @Body() payload: GithubDeploy,
    @Param("app_id") applicationId: number,
  ): Promise<Deployment> {
    return this.eventService.createDeploy(applicationId, payload);
  }
}
