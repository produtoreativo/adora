import { Column, Entity, ManyToOne } from 'typeorm';

import { Application } from './application.entity';
import { BaseEntity } from './base.entity';
import { Task } from './task.entity';

import * as dotenv from 'dotenv';
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

export enum EventType {
  START_CYCLE = 'START_CYCLE',
  FINISH = 'FINISH',
  SHIP = 'SHIP',
  PROMOTE = 'PROMOTE',
  FAIL = 'FAIL',
  RECOVERY = 'RECOVERY',
  GENERIC = 'GENERIC',
}

@Entity({ name: 'events', schema: dbMainSchema })
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
