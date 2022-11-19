import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    HealthcheckModule,
  ],
})
export class AppModule {}
