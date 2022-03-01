import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Event } from './event.entity';

@Entity({ name: 'applications' })
export class Application extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  configuration: JSON;

  @OneToMany(type => Event, events => events.application)
  events: Event[];

}
