import {Attribute, Entity, AutoGenerateAttribute} from '@typedorm/common';
import {AUTO_GENERATE_ATTRIBUTE_STRATEGY, INDEX_TYPE} from '@typedorm/common';

@Entity({
  name: 'leadtime',
  primaryKey: {
    partitionKey: 'LT#{{id}}',
    sortKey: 'LT#{{id}}',
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: 'LT#{{id}}#STATUS#{{status}}',
      sortKey: 'LT#{{id}}#ACTIVE#{{active}}',
      type: INDEX_TYPE.GSI,
    },
    // specify LSI1 key
    // LSI1: {
    //   sortKey: 'TICKETS#UPDATED_AT#{{updatedAt}}',
    //   type: INDEX_TYPE.LSI,
    // },
  },
})
export class Leadtime {
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

}