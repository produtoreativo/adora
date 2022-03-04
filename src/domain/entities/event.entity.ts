import { Column, Entity, ManyToOne } from 'typeorm';

import { Application } from './application.entity';
import { BaseEntity } from './base.entity';
import { Task } from './task.entity';

export enum EventType {
  START_CYCLE = 'START_CYCLE',
  SHIP = 'SHIP',
  PROMOTE = 'PROMOTE',
  FAIL = 'FAIL',
  RECOVERY = 'RECOVERY',
  GENERIC = 'GENERIC',
}

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @Column()
  name: string;

  @Column()
  applicationId: number;

  @Column()
  taskId: number;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.START_CYCLE,
  })
  eventType: EventType;

  @Column({ type: 'json', nullable: true })
  payload: JSON;

  @ManyToOne((type) => Application)
  application: Application;

  @ManyToOne((type) => Task)
  task: Task;
}
