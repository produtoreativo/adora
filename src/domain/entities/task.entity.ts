import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Application } from './application.entity';
import { BaseEntity } from './base.entity';
import { Event } from './event.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column()
  ref: string;

  @Column()
  hash: string;

  @Column()
  applicationId: number;

  @Column({ type: 'json', nullable: true })
  payload: JSON;

  @ManyToOne((type) => Application)
  application: Application;

  @OneToMany(type => Event, events => events.application)
  events: Event[];

}
