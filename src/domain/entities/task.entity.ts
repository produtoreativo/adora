import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Application } from './application.entity';
import { BaseEntity } from './base.entity';
import { Event } from './event.entity';

import * as dotenv from 'dotenv';
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

@Entity({ name: 'tasks', schema: dbMainSchema })
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column()
  ref: string;

  @Column()
  hash: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  // @CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => null })
  @Column({ type: 'timestamptz', nullable: true, default: null })
  finishedAt!: Date;

  // @CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => null })
  @Column({ type: 'timestamptz', nullable: true, default: null })
  deployedAt!: Date;

  @Column()
  applicationId: number;

  @Column({ type: 'json', nullable: true })
  payload: JSON;

  @ManyToOne((type) => Application)
  application: Application;

  @OneToMany((type) => Event, (events) => events.application)
  events: Event[];
}
