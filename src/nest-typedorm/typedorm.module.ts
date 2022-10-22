import { Module, DynamicModule, Global } from '@nestjs/common';
// import { createDatabaseProviders } from './database.providers';
import { createConnection, getEntityManager } from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { Leadtime } from './leadtime.entity';
// import GlobalTable from './global.table';

@Global()
@Module({

})
export class TypeDORMModule {
  static forRoot(
    entities = [], 
    table,
    options?): DynamicModule {

    const documentClient = new DocumentClientV3(new DynamoDBClient({
      ...options,
      // region: 'us-east-1',
      // credentials: {
      //   accessKeyId: process.env.APP_ACCESS_KEY_ID,
      //   secretAccessKey: process.env.APP_SECRET_ACCESS_KEY,
      // }
    }));
    
    createConnection({
      // table: GlobalTable,
      // entities: [Leadtime],
      table,
      entities,
      documentClient, // <-- When documentClient is not provided, TypeDORM defaults to use the DocumentClientV2
    });


    const entityManager = getEntityManager();
    const provider = {
      provide: 'TYPEDORM',
      useValue: entityManager,
    }

    return {
      module: TypeDORMModule,
      providers: [ provider ],
      exports: [ provider ],
    };
  }
}