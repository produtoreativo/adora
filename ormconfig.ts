import { ConfigModule } from '@nestjs/config';
import defaultDbConfig, { seedDbConfig } from './db.config';

import * as dotenv from 'dotenv';
dotenv.config();
const SEED = process.env.SEED;

ConfigModule.forRoot({
  isGlobal: true,
  load: [SEED ? seedDbConfig : defaultDbConfig],
});

export default SEED ? seedDbConfig() : defaultDbConfig();
