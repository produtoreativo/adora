import { Injectable } from '@nestjs/common';
import { getEntityManager } from '@typedorm/core';
import { EventDto } from './event.dto';
import { Event } from './event.entity';
import { createConnection } from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import EventTable from './event.table';
import { SNS } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';

const env = process.env.NODE_ENV;

const documentClient = new DocumentClientV3(
  env === 'prod'
    ? new DynamoDBClient({})
    : new DynamoDBClient({
        endpoint: 'http://localhost:8000',
      }),
);
createConnection({
  table: EventTable,
  entities: [Event],
  documentClient, // <-- When documentClient is not provided, TypeDORM defaults to use the DocumentClientV2
});

@Injectable()
export class GithubService {
  entityManger = getEntityManager();

  constructor(
    @InjectAwsService(SNS)
    private readonly snsService: SNS,
  ) {} // @InjectAwsService(S3) private readonly s3: S3,

  async createEvent(payload: EventDto) {
    try {
      const event = new Event();
      event.name = payload.name;
      const dynamoResponse = await this.entityManger.create(event);
      const params: PublishInput = {
        TopicArn: process.env.AWS_TOPIC_ARN,
        Message: JSON.stringify(dynamoResponse),
      };
      // const snsResponse = await this.snsService.publish(params).promise();
      // console.log(snsResponse);
      const sns = new SNS({
        endpoint:
          process.env.NODE_ENV === 'prod' ? undefined : 'http://127.0.0.1:4002',
        region: process.env.AWS_REGION,
      });
      const snsResponse = await sns.publish(params).promise();
      console.log(snsResponse);
      return dynamoResponse;
    } catch (error) {
      console.log('ERR: ', error);
      return 'Something goes wrong';
    }
  }
}
