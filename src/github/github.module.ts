import { Module } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [AwsSdkModule.forFeatures([SNS])],
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
