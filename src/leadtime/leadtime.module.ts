import { Module } from '@nestjs/common';
import { LeadtimeController } from './leadtime.controller';
import { LeadtimeService } from './leadtime.service';

@Module({
  providers: [LeadtimeService],
  controllers: [LeadtimeController]
})
export class LeadtimeModule {}
