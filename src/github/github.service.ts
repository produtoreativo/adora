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

const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;

const documentClient = new DocumentClientV3(
  awsAccessKey
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
    const event = new Event();
    event.name = payload.name;
    const response = await this.entityManger.create(event);
    const params: PublishInput = {
      // TopicArn: process.env.AWS_TOPIC_ARN,
      TopicArn: 'arn:aws:sns:us-east-1:513154394236:CapturaEventoGithub',
      Message: JSON.stringify(response),
    };
    await this.snsService
      .publish(params)
      .promise()
      .then((res) => {
        console.log('RES: ', res);
      })
      .catch((err) => {
        console.log('ERR: ', err);
      });
    return response;
  }
}
