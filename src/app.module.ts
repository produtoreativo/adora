import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsSdkModule } from 'nest-aws-sdk';
import { GithubModule } from './github/github.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region: process.env.AWS_DEFAULT_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        },
      },
    }),
    HealthcheckModule,
    GithubModule,
  ],
})
export class AppModule {}
