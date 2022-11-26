import { Attribute, Entity, AutoGenerateAttribute } from '@typedorm/common';
import { AUTO_GENERATE_ATTRIBUTE_STRATEGY } from '@typedorm/common';

@Entity({
  name: 'events',
  primaryKey: {
    partitionKey: 'id',
    sortKey: 'id',
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
