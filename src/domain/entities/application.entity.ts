import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Deployment } from './deployment.entity';
import { Event } from './event.entity';
import { Task } from './task.entity';

import * as dotenv from 'dotenv';
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

@Entity({ name: 'applications', schema: dbMainSchema })
export class Application extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  configuration: JSON;

  @OneToMany((type) => Event, (events) => events.application)
  events: Event[];

  @OneToMany((type) => Task, (tasks) => tasks.application)
  tasks: Task[];

  @OneToMany((type) => Deployment, (deployment) => deployment.application)
  deployments: Deployment[];
}
