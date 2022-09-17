import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Deployment } from "./deployment.entity";
import { Event } from "./event.entity";
import { Task } from "./task.entity";

@Entity({ name: "applications" })
export class Application extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "json", nullable: true })
  configuration: JSON;

  @OneToMany((type) => Event, (events) => events.application)
  events: Event[];

  @OneToMany((type) => Task, (tasks) => tasks.application)
  tasks: Task[];

  @OneToMany((type) => Deployment, (deployment) => deployment.application)
  deployments: Deployment[];
}
