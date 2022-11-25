import { Injectable } from '@nestjs/common';
import { getEntityManager } from '@typedorm/core';
import { EventDto } from './event.dto';
import { Event } from './event.entity';
import { createConnection } from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import EventTable from './event.table';

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

  constructor() {} // @InjectAwsService(S3) private readonly s3: S3,

  async createEvent(payload: EventDto) {
    const event = new Event();
    event.name = payload.name;
    const response = await this.entityManger.create(event);
    console.log(response);
    return response;
  }
}
