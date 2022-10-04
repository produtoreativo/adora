import { ConfigModule } from '@nestjs/config';
import defaultDbConfig from './db.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [defaultDbConfig],
});

export default defaultDbConfig();
