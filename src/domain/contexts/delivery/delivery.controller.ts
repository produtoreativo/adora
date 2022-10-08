import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { DeliveryService } from "./delivery.service";
import { Event } from "../../entities/event.entity";
import { Deployment } from "../../entities/deployment.entity";
import HackDTO from "../../dtos/Hack.dto";
import DeployDTO from "../../dtos/Deploy.dto";
import FinishDTO from "../../dtos/Finish.dto";

@Controller("leadtime")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @ApiBody({ type: HackDTO })
  @Post(":app_id/hack")
  async hack(@Body() payload: HackDTO, @Param("app_id") applicationId: number): Promise<Event> {
    return this.deliveryService.createTask(applicationId, payload);
  }

  @ApiBody({ type: FinishDTO })
  @Post(":app_id/finish")
  async finish(@Body() payload: FinishDTO, @Param("app_id") applicationId: number): Promise<Event> {
    return this.deliveryService.finishTask(applicationId, payload);
  }

  @ApiBody({ type: DeployDTO })
  @Post(":app_id/ship")
  async ship(
    @Body() payload: DeployDTO,
    @Param("app_id") applicationId: number,
  ): Promise<Deployment> {
    return this.deliveryService.ship(applicationId, payload);
  }
}
