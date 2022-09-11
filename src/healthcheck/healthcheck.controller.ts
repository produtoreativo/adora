import { Controller, Get } from '@nestjs/common';
// import { 
//   HealthCheckService, 
//   HttpHealthIndicator, 
//   HealthCheck 
// } from '@nestjs/terminus';

@Controller('health')
export class HealthcheckController {
  constructor(
    // private health: HealthCheckService,
    // private http: HttpHealthIndicator,
  ) {}

  @Get()
  // @HealthCheck()
  check() {
    return {
      status: 'ok'
    };
  }
}