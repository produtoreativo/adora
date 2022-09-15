import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthcheckController {

  @Get()
  check() {
    return {
      status: 'ok ECS'
    };
  }
}