import {Table, INDEX_TYPE} from '@typedorm/common';

const eventTable = new Table({
  name: 'adora-dynamodb-dev',
  partitionKey: 'PK',
  sortKey: 'SK',
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'GSI1PK',
      sortKey: 'GSI1SK',
    },
    GSI2: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'GSI2PK',
      sortKey: 'GSI2SK',
    },
    LSI1: {
      type: INDEX_TYPE.LSI,
      sortKey: 'LSI1SK',
    },
  },
});

export default eventTable;