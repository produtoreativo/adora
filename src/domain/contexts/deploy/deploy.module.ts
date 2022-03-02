import { Module } from '@nestjs/common';
import { ShipService } from './ship/ship.service';
import { ShipController } from './ship/ship.controller';

@Module({
  providers: [ShipService],
  controllers: [ShipController]
})
export class DeployModule {}
