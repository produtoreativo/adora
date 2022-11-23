import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    HealthcheckModule,
    GithubModule
  ],
})
export class AppModule {}
