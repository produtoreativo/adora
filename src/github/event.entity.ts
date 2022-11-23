import {Attribute, Entity, AutoGenerateAttribute} from '@typedorm/common';
import {AUTO_GENERATE_ATTRIBUTE_STRATEGY} from '@typedorm/common';

@Entity({
  name: 'adora-dynamodb-dev',
  primaryKey: {
    partitionKey: 'EVENT#{{id}}',
    sortKey: 'EVENT#{{id}}',
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    // GSI1: {
    //   partitionKey: 'ORG#{{id}}#STATUS#{{status}}',
    //   sortKey: 'ORG#{{id}}#ACTIVE#{{active}}',
    //   type: INDEX_TYPE.GSI,
    // },
    // // specify LSI1 key
    // LSI1: {
    //   sortKey: 'TICKETS#UPDATED_AT#{{updatedAt}}',
    //   type: INDEX_TYPE.LSI,
    // },
  },
})
export class Event {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  status: string;

  @Attribute()
  active: boolean;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}